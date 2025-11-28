import type { TimeControl } from '@chess/contracts';
export interface MatchmakingQueueEntry {
    queueId: string;
    userId: string;
    timeControl: TimeControl;
    rating: number;
    deviation: number;
    volatility: number;
    latencyMs: number;
    joinTimestamp: number;
    baseWindow: number;
    currentWindow: number;
    expansionStep: number;
    antiCheatOnCooldown: boolean;
    socketId: string;
}
export interface MatchCandidatePair {
    a: MatchmakingQueueEntry;
    b: MatchmakingQueueEntry;
    ratingDiff: number;
    volatilityDiff: number;
    latencyDiff: number;
}
