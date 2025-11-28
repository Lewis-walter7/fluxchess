import { Injectable, Logger } from '@nestjs/common';
import type {
  MatchmakingJoinPayload,
  MatchmakingProgressPayload,
  MatchmakingQueuedAck,
  RatingRange,
} from '@chess/contracts';
import { randomUUID } from 'node:crypto';

interface MatchmakingSearch {
  queueId: string;
  createdAt: number;
  payload: MatchmakingJoinPayload;
  ratingRange: RatingRange;
  expansionStep: number;
  timeout?: NodeJS.Timeout;
}

type ProgressCallback = (payload: MatchmakingProgressPayload) => void;

@Injectable()
export class GameService {
  private static readonly BASE_RANGE = 75;
  private static readonly EXPANSION_DELTA = 25;
  private static readonly EXPANSION_INTERVAL_MS = 5_000;

  private readonly logger = new Logger(GameService.name);
  private readonly searches = new Map<string, MatchmakingSearch>();

  enqueue(
    payload: MatchmakingJoinPayload,
    progressCallback: ProgressCallback,
  ): MatchmakingQueuedAck {
    const queueId = randomUUID();
    const createdAt = Date.now();
    const initialRange = this.buildRange(payload);

    const search: MatchmakingSearch = {
      queueId,
      createdAt,
      payload,
      ratingRange: initialRange,
      expansionStep: 0,
    };

    this.searches.set(queueId, search);
    this.logger.verbose(
      `Queued ${payload.userId} (${payload.timeControl}) with range ±${initialRange.max}`,
    );

    this.scheduleExpansion(search, progressCallback);

    return {
      queueId,
      ratingRange: initialRange,
      nextExpansionInMs: GameService.EXPANSION_INTERVAL_MS,
    };
  }

  cancel(queueId: string): boolean {
    const search = this.searches.get(queueId);

    if (!search) {
      return false;
    }

    if (search.timeout) {
      clearTimeout(search.timeout);
    }

    this.searches.delete(queueId);
    this.logger.verbose(`Cancelled queue ${queueId}`);

    return true;
  }

  private scheduleExpansion(
    search: MatchmakingSearch,
    callback: ProgressCallback,
  ) {
    search.timeout = setTimeout(() => {
      if (!this.searches.has(search.queueId)) {
        return;
      }

      search.expansionStep += 1;
      const updatedRange = this.buildRange(
        search.payload,
        search.expansionStep,
      );
      search.ratingRange = updatedRange;

      callback({
        queueId: search.queueId,
        ratingRange: updatedRange,
        elapsedMs: Date.now() - search.createdAt,
      });

      this.scheduleExpansion(search, callback);
    }, GameService.EXPANSION_INTERVAL_MS);
  }

  private buildRange(
    payload: MatchmakingJoinPayload,
    expansionStep = 0,
  ): RatingRange {
    const baseRange = payload.preferredRange ?? GameService.BASE_RANGE;
    const totalRange = baseRange + expansionStep * GameService.EXPANSION_DELTA;

    return {
      min: -totalRange,
      max: totalRange,
    };
  }
}
