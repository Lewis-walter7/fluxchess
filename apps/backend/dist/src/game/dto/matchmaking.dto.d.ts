import type { MatchmakingJoinPayload, RatingSnapshot, TimeControl } from '@chess/contracts';
declare class RatingSnapshotDto implements RatingSnapshot {
    rating: number;
    deviation: number;
    volatility: number;
}
export declare class MatchmakingJoinDto implements MatchmakingJoinPayload {
    userId: string;
    timeControl: TimeControl;
    rating: RatingSnapshotDto;
    latencyMs: number;
    preferredRange?: number;
    deviceFingerprint: string;
}
export {};
