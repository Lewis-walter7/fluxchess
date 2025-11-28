import type { MatchmakingJoinPayload, MatchmakingProgressPayload, MatchmakingQueuedAck } from '@chess/contracts';
type ProgressCallback = (payload: MatchmakingProgressPayload) => void;
export declare class GameService {
    private static readonly BASE_RANGE;
    private static readonly EXPANSION_DELTA;
    private static readonly EXPANSION_INTERVAL_MS;
    private readonly logger;
    private readonly searches;
    enqueue(payload: MatchmakingJoinPayload, progressCallback: ProgressCallback): MatchmakingQueuedAck;
    cancel(queueId: string): boolean;
    private scheduleExpansion;
    private buildRange;
}
export {};
