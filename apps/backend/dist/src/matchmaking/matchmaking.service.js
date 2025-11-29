"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var MatchmakingService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchmakingService = void 0;
const common_1 = require("@nestjs/common");
const node_crypto_1 = require("node:crypto");
const prisma_service_1 = require("../prisma/prisma.service");
const redis_service_1 = require("../redis/redis.service");
const matchmaking_gateway_1 = require("./matchmaking.gateway");
const INITIAL_WINDOW = 75;
const EXPANSION_DELTA = 25;
const EXPANSION_INTERVAL_MS = 3_000;
const MAX_RATING_GAP = 350;
const queueKey = (timeControl) => `queue:${timeControl}`;
const entryKey = (queueId) => `queue:entry:${queueId}`;
const activeGamesKey = 'active_games';
let MatchmakingService = MatchmakingService_1 = class MatchmakingService {
    prisma;
    redis;
    gateway;
    logger = new common_1.Logger(MatchmakingService_1.name);
    queues = new Map();
    timers = new Map();
    constructor(prisma, redis, gateway) {
        this.prisma = prisma;
        this.redis = redis;
        this.gateway = gateway;
    }
    async joinQueue(socket, payload) {
        await this.removeByUser(payload.userId);
        const queueId = (0, node_crypto_1.randomUUID)();
        const now = Date.now();
        const entry = {
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
        await this.tryMatch(entry.timeControl);
        return {
            queueId,
            ratingRange: this.computeWindow(entry),
            nextExpansionInMs: EXPANSION_INTERVAL_MS,
        };
    }
    async removeByUser(userId) {
        const all = [...this.queues.values()].flatMap((map) => [...map.values()].filter((entry) => entry.userId === userId));
        await Promise.all(all.map((entry) => this.leaveQueue(entry.socketId, entry.queueId)));
    }
    async leaveQueue(socketId, queueId) {
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
    async removeBySocket(socketId) {
        const all = [...this.queues.values()].flatMap((map) => [...map.values()].filter((entry) => entry.socketId === socketId));
        await Promise.all(all.map((entry) => this.leaveQueue(socketId, entry.queueId)));
    }
    addToMemoryQueue(entry) {
        let pool = this.queues.get(entry.timeControl);
        if (!pool) {
            pool = new Map();
            this.queues.set(entry.timeControl, pool);
        }
        pool.set(entry.queueId, entry);
    }
    removeFromMemoryQueue(queueId) {
        for (const pool of this.queues.values()) {
            const existing = pool.get(queueId);
            if (existing) {
                pool.delete(queueId);
                return existing;
            }
        }
        return null;
    }
    async persistEntry(entry) {
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
    scheduleExpansion(queueId) {
        this.clearTimer(queueId);
        const timer = setTimeout(() => {
            void this.handleExpansionTick(queueId);
        }, EXPANSION_INTERVAL_MS);
        this.timers.set(queueId, timer);
    }
    clearTimer(queueId) {
        const existing = this.timers.get(queueId);
        if (existing) {
            clearTimeout(existing);
            this.timers.delete(queueId);
        }
    }
    findEntry(queueId) {
        for (const pool of this.queues.values()) {
            const existing = pool.get(queueId);
            if (existing) {
                return existing;
            }
        }
        return null;
    }
    computeWindow(entry) {
        const min = entry.rating - entry.currentWindow;
        const max = entry.rating + entry.currentWindow;
        return { min, max };
    }
    async updateWindowInRedis(entry) {
        const client = await this.redis.getClient();
        await client.hset(entryKey(entry.queueId), {
            currentWindow: entry.currentWindow.toString(10),
            expansionStep: entry.expansionStep.toString(10),
        });
    }
    async handleExpansionTick(queueId) {
        const entry = this.findEntry(queueId);
        if (!entry) {
            return;
        }
        entry.expansionStep += 1;
        entry.currentWindow =
            entry.baseWindow + entry.expansionStep * EXPANSION_DELTA;
        const payload = {
            queueId: entry.queueId,
            ratingRange: this.computeWindow(entry),
            elapsedMs: Date.now() - entry.joinTimestamp,
        };
        this.gateway.emitQueueUpdate(entry.socketId, payload);
        await this.updateWindowInRedis(entry);
        await this.tryMatch(entry.timeControl);
        this.scheduleExpansion(queueId);
    }
    async tryMatch(timeControl) {
        const pool = this.queues.get(timeControl);
        if (!pool || pool.size < 2) {
            return;
        }
        const entries = [...pool.values()];
        const pairs = [];
        for (let i = 0; i < entries.length; i += 1) {
            for (let j = i + 1; j < entries.length; j += 1) {
                const a = entries[i];
                const b = entries[j];
                if (a.antiCheatOnCooldown || b.antiCheatOnCooldown)
                    continue;
                if (a.userId === b.userId)
                    continue;
                const aWindow = this.computeWindow(a);
                const bWindow = this.computeWindow(b);
                const overlap = aWindow.min <= bWindow.max && bWindow.min <= aWindow.max;
                if (!overlap)
                    continue;
                const ratingDiff = Math.abs(a.rating - b.rating);
                if (ratingDiff > MAX_RATING_GAP)
                    continue;
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
    async finalizeMatch(a, b) {
        this.logger.log(`Matched ${a.userId} vs ${b.userId} (${a.timeControl})`);
        this.removeFromMemoryQueue(a.queueId);
        this.removeFromMemoryQueue(b.queueId);
        this.clearTimer(a.queueId);
        this.clearTimer(b.queueId);
        const client = await this.redis.getClient();
        const gameId = (0, node_crypto_1.randomUUID)();
        const tx = client.multi();
        tx.zrem(queueKey(a.timeControl), a.queueId, b.queueId);
        tx.del(entryKey(a.queueId), entryKey(b.queueId));
        tx.sadd(activeGamesKey, gameId);
        await tx.exec();
        const initialFen = 'startpos';
        const randomize = Math.random() < 0.5;
        const whitePlayer = randomize ? b : a;
        const blackPlayer = randomize ? a : b;
        this.logger.verbose(`Color assignment: ${whitePlayer.userId} (white) vs ${blackPlayer.userId} (black)`);
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
        const [userA, userB] = await Promise.all([
            this.prisma.user.findUnique({
                where: { id: a.userId },
                select: { username: true, flair: true },
            }),
            this.prisma.user.findUnique({
                where: { id: b.userId },
                select: { username: true, flair: true },
            }),
        ]);
        const basePayload = {
            queueId: a.queueId,
            gameId,
            timeControl: a.timeControl,
            initialFen,
        };
        const payloadForA = {
            ...basePayload,
            opponent: {
                userId: b.userId,
                username: userB?.username || b.userId,
                flair: userB?.flair || undefined,
                rating: this.toRatingSnapshot(b),
                latencyMs: b.latencyMs,
            },
        };
        const payloadForB = {
            ...basePayload,
            queueId: b.queueId,
            opponent: {
                userId: a.userId,
                username: userA?.username || a.userId,
                flair: userA?.flair || undefined,
                rating: this.toRatingSnapshot(a),
                latencyMs: a.latencyMs,
            },
        };
        this.gateway.joinGameRoom(a.socketId, b.socketId, gameId);
        this.gateway.emitMatchFound(a.socketId, b.socketId, payloadForA, payloadForB);
        this.scheduleAbortCheck(gameId, 30_000);
    }
    abortTimers = new Map();
    scheduleAbortCheck(gameId, delayMs) {
        const timer = setTimeout(() => {
            void this.checkAndAbortGame(gameId);
        }, delayMs);
        this.abortTimers.set(gameId, timer);
    }
    async handleMove(gameId) {
        const timer = this.abortTimers.get(gameId);
        if (timer) {
            clearTimeout(timer);
            this.abortTimers.delete(gameId);
            await this.prisma.game.updateMany({
                where: {
                    id: gameId,
                    status: 'WAITING_FOR_START',
                },
                data: {
                    status: 'IN_PROGRESS',
                    startedAt: new Date(),
                },
            });
        }
    }
    async checkAndAbortGame(gameId) {
        const game = await this.prisma.game.findUnique({
            where: { id: gameId },
        });
        if (!game || game.status !== 'WAITING_FOR_START') {
            return;
        }
        await this.prisma.game.update({
            where: { id: gameId },
            data: {
                status: 'ABORTED',
                abortedAt: new Date(),
            },
        });
        this.gateway.emitGameAborted(gameId, 'Players did not start the game within 30 seconds');
        this.abortTimers.delete(gameId);
        const client = await this.redis.getClient();
        await client.srem(activeGamesKey, gameId);
    }
    toRatingSnapshot(entry) {
        return {
            rating: entry.rating,
            deviation: entry.deviation,
            volatility: entry.volatility,
        };
    }
    mapTimeControl(timeControl) {
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
};
exports.MatchmakingService = MatchmakingService;
exports.MatchmakingService = MatchmakingService = MatchmakingService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => matchmaking_gateway_1.MatchmakingGateway))),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        redis_service_1.RedisService,
        matchmaking_gateway_1.MatchmakingGateway])
], MatchmakingService);
//# sourceMappingURL=matchmaking.service.js.map