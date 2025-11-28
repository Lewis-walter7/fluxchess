import { Injectable, Logger, Inject, forwardRef } from '@nestjs/common';
import type {
  MatchFoundPayload,
  MatchmakingJoinPayload,
  MatchmakingQueuedAck,
  MatchmakingUpdatePayload,
  RatingSnapshot,
  TimeControl,
} from '@chess/contracts';
import type { Socket } from 'socket.io';
import { randomUUID } from 'node:crypto';
import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import {
  type MatchCandidatePair,
  type MatchmakingQueueEntry,
} from './matchmaking.types';
import { MatchmakingGateway } from './matchmaking.gateway';

type TypedSocket = Socket;

const INITIAL_WINDOW = 75;
const EXPANSION_DELTA = 25;
const EXPANSION_INTERVAL_MS = 3_000;
const MAX_RATING_GAP = 350;

const queueKey = (timeControl: TimeControl) => `queue:${timeControl}`;
const entryKey = (queueId: string) => `queue:entry:${queueId}`;
const activeGamesKey = 'active_games';

@Injectable()
export class MatchmakingService {
  private readonly logger = new Logger(MatchmakingService.name);

  // In-memory view for fast matching in this instance.
  private readonly queues = new Map<
    TimeControl,
    Map<string, MatchmakingQueueEntry>
  >();

  private readonly timers = new Map<string, NodeJS.Timeout>();

  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
    @Inject(forwardRef(() => MatchmakingGateway))
    private readonly gateway: MatchmakingGateway,
  ) { }

  async joinQueue(
    socket: TypedSocket,
    payload: MatchmakingJoinPayload,
  ): Promise<MatchmakingQueuedAck> {
    const queueId = randomUUID();
    const now = Date.now();

    const entry: MatchmakingQueueEntry = {
      queueId,
      userId: payload.userId,
      timeControl: payload.timeControl,
      rating: payload.rating.rating,
      deviation: payload.rating.deviation,
      volatility: payload.rating.volatility,
      latencyMs: payload.latencyMs,
      joinTimestamp: now,
      baseWindow: payload.preferredRange ?? INITIAL_WINDOW,
      currentWindow: payload.preferredRange ?? INITIAL_WINDOW,
      expansionStep: 0,
      antiCheatOnCooldown: false,
      socketId: socket.id,
    };

    this.addToMemoryQueue(entry);
    await this.persistEntry(entry);

    this.scheduleExpansion(entry.queueId);

    // Try immediate match on join
    await this.tryMatch(entry.timeControl);

    return {
      queueId,
      ratingRange: this.computeWindow(entry),
      nextExpansionInMs: EXPANSION_INTERVAL_MS,
    };
  }

  async leaveQueue(socketId: string, queueId: string): Promise<void> {
    const entry = this.removeFromMemoryQueue(queueId);
    this.clearTimer(queueId);

    if (entry) {
      const client = await this.redis.getClient();
      const tx = client.multi();
      tx.zrem(queueKey(entry.timeControl), queueId);
      tx.del(entryKey(queueId));
      await tx.exec();
    }

    this.logger.verbose(`Socket ${socketId} left queue ${queueId}`);
  }

  async removeBySocket(socketId: string): Promise<void> {
    const all = [...this.queues.values()].flatMap((map) =>
      [...map.values()].filter((entry) => entry.socketId === socketId),
    );

    await Promise.all(
      all.map((entry) => this.leaveQueue(socketId, entry.queueId)),
    );
  }

  private addToMemoryQueue(entry: MatchmakingQueueEntry) {
    let pool = this.queues.get(entry.timeControl);

    if (!pool) {
      pool = new Map<string, MatchmakingQueueEntry>();
      this.queues.set(entry.timeControl, pool);
    }

    pool.set(entry.queueId, entry);
  }

  private removeFromMemoryQueue(queueId: string): MatchmakingQueueEntry | null {
    for (const pool of this.queues.values()) {
      const existing = pool.get(queueId);
      if (existing) {
        pool.delete(queueId);
        return existing;
      }
    }

    return null;
  }

  private async persistEntry(entry: MatchmakingQueueEntry) {
    const client = await this.redis.getClient();
    const tx = client.multi();

    tx.zadd(queueKey(entry.timeControl), entry.joinTimestamp, entry.queueId);
    tx.hset(entryKey(entry.queueId), {
      userId: entry.userId,
      rating: entry.rating.toString(10),
      deviation: entry.deviation.toString(10),
      volatility: entry.volatility.toString(10),
      latencyMs: entry.latencyMs.toString(10),
      joinTimestamp: entry.joinTimestamp.toString(10),
      baseWindow: entry.baseWindow.toString(10),
      currentWindow: entry.currentWindow.toString(10),
      expansionStep: entry.expansionStep.toString(10),
    });

    await tx.exec();
  }

  private scheduleExpansion(queueId: string) {
    this.clearTimer(queueId);

    const timer = setTimeout(() => {
      void this.handleExpansionTick(queueId);
    }, EXPANSION_INTERVAL_MS);

    this.timers.set(queueId, timer);
  }

  private clearTimer(queueId: string) {
    const existing = this.timers.get(queueId);

    if (existing) {
      clearTimeout(existing);
      this.timers.delete(queueId);
    }
  }

  private findEntry(queueId: string): MatchmakingQueueEntry | null {
    for (const pool of this.queues.values()) {
      const existing = pool.get(queueId);
      if (existing) {
        return existing;
      }
    }

    return null;
  }

  private computeWindow(entry: MatchmakingQueueEntry) {
    const min = entry.rating - entry.currentWindow;
    const max = entry.rating + entry.currentWindow;

    return { min, max };
  }

  private async updateWindowInRedis(entry: MatchmakingQueueEntry) {
    const client = await this.redis.getClient();

    await client.hset(entryKey(entry.queueId), {
      currentWindow: entry.currentWindow.toString(10),
      expansionStep: entry.expansionStep.toString(10),
    });
  }

  private async handleExpansionTick(queueId: string): Promise<void> {
    const entry = this.findEntry(queueId);

    if (!entry) {
      return;
    }

    entry.expansionStep += 1;
    entry.currentWindow =
      entry.baseWindow + entry.expansionStep * EXPANSION_DELTA;

    const payload: MatchmakingUpdatePayload = {
      queueId: entry.queueId,
      ratingRange: this.computeWindow(entry),
      elapsedMs: Date.now() - entry.joinTimestamp,
    };

    this.gateway.emitQueueUpdate(entry.socketId, payload);
    await this.updateWindowInRedis(entry);
    await this.tryMatch(entry.timeControl);

    this.scheduleExpansion(queueId);
  }

  private async tryMatch(timeControl: TimeControl) {
    const pool = this.queues.get(timeControl);
    if (!pool || pool.size < 2) {
      return;
    }

    const entries = [...pool.values()];

    const pairs: MatchCandidatePair[] = [];

    for (let i = 0; i < entries.length; i += 1) {
      for (let j = i + 1; j < entries.length; j += 1) {
        const a = entries[i];
        const b = entries[j];

        if (a.antiCheatOnCooldown || b.antiCheatOnCooldown) continue;

        const aWindow = this.computeWindow(a);
        const bWindow = this.computeWindow(b);

        const overlap =
          aWindow.min <= bWindow.max && bWindow.min <= aWindow.max;

        if (!overlap) continue;

        const ratingDiff = Math.abs(a.rating - b.rating);
        if (ratingDiff > MAX_RATING_GAP) continue;

        const volatilityDiff = Math.abs(a.volatility - b.volatility);
        const latencyDiff = Math.abs(a.latencyMs - b.latencyMs);

        pairs.push({ a, b, ratingDiff, volatilityDiff, latencyDiff });
      }
    }

    if (!pairs.length) {
      return;
    }

    pairs.sort((p1, p2) => {
      if (p1.ratingDiff !== p2.ratingDiff) {
        return p1.ratingDiff - p2.ratingDiff;
      }

      if (p1.volatilityDiff !== p2.volatilityDiff) {
        return p1.volatilityDiff - p2.volatilityDiff;
      }

      if (p1.latencyDiff !== p2.latencyDiff) {
        return p1.latencyDiff - p2.latencyDiff;
      }

      const aJoin = Math.min(p1.a.joinTimestamp, p1.b.joinTimestamp);
      const bJoin = Math.min(p2.a.joinTimestamp, p2.b.joinTimestamp);
      return aJoin - bJoin;
    });

    const best = pairs[0];

    await this.finalizeMatch(best.a, best.b);
  }

  private async finalizeMatch(
    a: MatchmakingQueueEntry,
    b: MatchmakingQueueEntry,
  ): Promise<void> {
    this.logger.log(`Matched ${a.userId} vs ${b.userId} (${a.timeControl})`);

    this.removeFromMemoryQueue(a.queueId);
    this.removeFromMemoryQueue(b.queueId);
    this.clearTimer(a.queueId);
    this.clearTimer(b.queueId);

    const client = await this.redis.getClient();
    const gameId = randomUUID();

    const tx = client.multi();
    tx.zrem(queueKey(a.timeControl), a.queueId, b.queueId);
    tx.del(entryKey(a.queueId), entryKey(b.queueId));
    tx.sadd(activeGamesKey, gameId);

    await tx.exec();

    const initialFen = 'startpos';

    // Randomize color assignment for fairness (50/50 chance)
    const randomize = Math.random() < 0.5;
    const whitePlayer = randomize ? b : a;
    const blackPlayer = randomize ? a : b;

    this.logger.verbose(
      `Color assignment: ${whitePlayer.userId} (white) vs ${blackPlayer.userId} (black)`,
    );

    await this.prisma.game.create({
      data: {
        id: gameId,
        timeControl: this.mapTimeControl(a.timeControl),
        whiteUserId: whitePlayer.userId,
        blackUserId: blackPlayer.userId,
        whiteRating: whitePlayer.rating,
        blackRating: blackPlayer.rating,
        whiteDeviation: whitePlayer.deviation,
        blackDeviation: blackPlayer.deviation,
        whiteVolatility: whitePlayer.volatility,
        blackVolatility: blackPlayer.volatility,
        initialFen,
      },
    });

    const basePayload: Omit<MatchFoundPayload, 'opponent'> = {
      queueId: a.queueId,
      gameId,
      initialFen,
    };

    const payloadForA: MatchFoundPayload = {
      ...basePayload,
      opponent: {
        userId: b.userId,
        rating: this.toRatingSnapshot(b),
        latencyMs: b.latencyMs,
      },
    };

    const payloadForB: MatchFoundPayload = {
      ...basePayload,
      queueId: b.queueId,
      opponent: {
        userId: a.userId,
        rating: this.toRatingSnapshot(a),
        latencyMs: a.latencyMs,
      },
    };

    this.gateway.emitMatchFound(
      a.socketId,
      b.socketId,
      payloadForA,
      payloadForB,
    );
  }

  private toRatingSnapshot(entry: MatchmakingQueueEntry): RatingSnapshot {
    return {
      rating: entry.rating,
      deviation: entry.deviation,
      volatility: entry.volatility,
    };
  }

  private mapTimeControl(timeControl: TimeControl) {
    switch (timeControl) {
      case 'bullet':
        return 'BULLET';
      case 'blitz':
        return 'BLITZ';
      case 'rapid':
        return 'RAPID';
      case 'classical':
        return 'CLASSICAL';
      default:
        return 'BLITZ';
    }
  }
}
