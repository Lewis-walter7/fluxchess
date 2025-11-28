"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var GameService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameService = void 0;
const common_1 = require("@nestjs/common");
const node_crypto_1 = require("node:crypto");
let GameService = class GameService {
    static { GameService_1 = this; }
    static BASE_RANGE = 75;
    static EXPANSION_DELTA = 25;
    static EXPANSION_INTERVAL_MS = 5_000;
    logger = new common_1.Logger(GameService_1.name);
    searches = new Map();
    enqueue(payload, progressCallback) {
        const queueId = (0, node_crypto_1.randomUUID)();
        const createdAt = Date.now();
        const initialRange = this.buildRange(payload);
        const search = {
            queueId,
            createdAt,
            payload,
            ratingRange: initialRange,
            expansionStep: 0,
        };
        this.searches.set(queueId, search);
        this.logger.verbose(`Queued ${payload.userId} (${payload.timeControl}) with range ±${initialRange.max}`);
        this.scheduleExpansion(search, progressCallback);
        return {
            queueId,
            ratingRange: initialRange,
            nextExpansionInMs: GameService_1.EXPANSION_INTERVAL_MS,
        };
    }
    cancel(queueId) {
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
    scheduleExpansion(search, callback) {
        search.timeout = setTimeout(() => {
            if (!this.searches.has(search.queueId)) {
                return;
            }
            search.expansionStep += 1;
            const updatedRange = this.buildRange(search.payload, search.expansionStep);
            search.ratingRange = updatedRange;
            callback({
                queueId: search.queueId,
                ratingRange: updatedRange,
                elapsedMs: Date.now() - search.createdAt,
            });
            this.scheduleExpansion(search, callback);
        }, GameService_1.EXPANSION_INTERVAL_MS);
    }
    buildRange(payload, expansionStep = 0) {
        const baseRange = payload.preferredRange ?? GameService_1.BASE_RANGE;
        const totalRange = baseRange + expansionStep * GameService_1.EXPANSION_DELTA;
        return {
            min: -totalRange,
            max: totalRange,
        };
    }
};
exports.GameService = GameService;
exports.GameService = GameService = GameService_1 = __decorate([
    (0, common_1.Injectable)()
], GameService);
//# sourceMappingURL=game.service.js.map