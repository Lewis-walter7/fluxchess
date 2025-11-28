"use client";

import type {
  GameStateDiff,
  MatchFoundPayload,
  MatchmakingJoinPayload,
  MatchmakingQueuedAck,
  MatchmakingUpdatePayload,
} from "@chess/contracts";
import { create } from "zustand";
import { socketClient, waitForConnection } from "@/lib/socket/client";

type QueueStatus = "idle" | "searching" | "matched";

interface GameStoreState {
  status: QueueStatus;
  queueId?: string;
  ratingRange?: MatchmakingUpdatePayload["ratingRange"];
  nextExpansionInMs?: number;
  queueError?: string;
  searchElapsedMs?: number;
  match?: MatchFoundPayload;
  latestDiff?: GameStateDiff;
  joinQueue: (payload: MatchmakingJoinPayload) => Promise<void>;
  cancelQueue: () => Promise<void>;
  handleUpdate: (payload: MatchmakingUpdatePayload) => void;
  setMatched: (payload: MatchFoundPayload) => void;
  handleDiff: (diff: GameStateDiff, gameId: string) => void;
}

export const useGameStore = create<GameStoreState>((set, get) => ({
  status: "idle",
  async joinQueue(payload) {
    const socket = socketClient();

    set({
      status: "searching",
      queueError: undefined,
      ratingRange: undefined,
      searchElapsedMs: 0,
    });

    try {
      // Wait for socket to connect first
      console.log('[Queue] Waiting for WebSocket connection...');
      await waitForConnection(socket, 5000);
      console.log('[Queue] WebSocket connected, joining queue...');

      // Now emit with longer timeout
      const ackPromise = (socket as any).emitWithAck("queue.join", payload);
      const ack = (await Promise.race([
        ackPromise,
        new Promise<never>((_, reject) =>
          setTimeout(
            () => reject(new Error("Queue join timed out. Please check your connection and try again.")),
            8000, // Increased from 4000ms
          ),
        ),
      ])) as MatchmakingQueuedAck;

      console.log('[Queue] Successfully joined queue:', ack.queueId);
      set({
        queueId: ack.queueId,
        ratingRange: ack.ratingRange,
        nextExpansionInMs: ack.nextExpansionInMs,
      });
    } catch (error) {
      console.error('[Queue] Join error:', error);
      const message =
        error instanceof Error ? error.message : "Unable to join queue";
      set({ status: "idle", queueError: message });
    }
  },
  async cancelQueue() {
    const socket = socketClient();
    const queueId = get().queueId;

    if (queueId) {
      socket.emit("queue.leave", { queueId });
    }

    set({
      status: "idle",
      queueId: undefined,
      ratingRange: undefined,
      nextExpansionInMs: undefined,
      searchElapsedMs: undefined,
    });
  },
  handleUpdate(payload) {
    if (payload.queueId !== get().queueId) {
      return;
    }

    set({
      ratingRange: payload.ratingRange,
      searchElapsedMs: payload.elapsedMs,
    });
  },
  setMatched(payload) {
    if (payload.queueId !== get().queueId) {
      return;
    }

    set({
      status: "matched",
      match: payload,
    });
  },
  handleDiff(diff, gameId) {
    if (get().match?.gameId !== gameId) {
      return;
    }

    set({ latestDiff: diff });
  },
}));

