// Authentication types
export interface RegisterPayload {
  email: string;
  username: string;
  password: string;
}

export interface LoginPayload {
  emailOrUsername: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: AuthenticatedUser;
}

export interface AuthenticatedUser {
  id: string;
  email: string;
  username: string;
  isEmailVerified: boolean;
}

export interface RefreshTokenPayload {
  refreshToken: string;
}

// Game types
export type TimeControl = "bullet" | "blitz" | "rapid" | "classical";

export interface RatingSnapshot {
  rating: number;
  deviation: number;
  volatility: number;
}

export interface RatingRange {
  min: number;
  max: number;
}

export interface MatchmakingJoinPayload {
  userId: string;
  timeControl: TimeControl;
  rating: RatingSnapshot;
  latencyMs: number;
  preferredRange?: number;
  deviceFingerprint: string;
}

export interface MatchmakingQueuedAck {
  queueId: string;
  ratingRange: RatingRange;
  nextExpansionInMs: number;
}

export interface MatchmakingProgressPayload {
  queueId: string;
  ratingRange: RatingRange;
  elapsedMs: number;
}

export type MatchmakingUpdatePayload = MatchmakingProgressPayload;

export interface MatchFoundPayload {
  queueId: string;
  gameId: string;
  opponent: {
    userId: string;
    rating: RatingSnapshot;
    latencyMs: number;
  };
  initialFen: string;
}

export interface MoveSubmittedPayload {
  gameId: string;
  san: string;
  moveTimeMs: number;
  clientMoveId: string;
}

export interface GameStateDiff {
  fen: string;
  moves: Array<{
    moveId: string;
    san: string;
    player: "white" | "black";
    captured?: string;
  }>;
  clocks: {
    whiteMs: number;
    blackMs: number;
  };
  turn: "white" | "black";
}

export interface GameErrorPayload {
  gameId?: string;
  message: string;
  code: string;
}

export interface ClientToServerEvents {
  "queue.join": (payload: MatchmakingJoinPayload) => MatchmakingQueuedAck;
  "queue.leave": (payload: { queueId: string }) => void;
  "game:move": (payload: MoveSubmittedPayload) => void;
  "game:resign": (payload: { gameId: string }) => void;
}

export interface ServerToClientEvents {
  "queue.update": (payload: MatchmakingUpdatePayload) => void;
  "queue.matchFound": (payload: MatchFoundPayload) => void;
  "game:diff": (payload: { gameId: string; diff: GameStateDiff }) => void;
  "game:error": (payload: GameErrorPayload) => void;
}

