"use client";

import type { TimeControl } from "@chess/contracts";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useGameStore } from "@/state/game/store";
import { useMatchmakingSocket } from "@/state/game/useMatchmakingSocket";
import { useAuthStore } from "@/state/auth-store";

const DEFAULT_RATING = 1500;
const PREFERRED_RANGE = 75;

const DEFAULT_RATING_SNAPSHOT = {
  rating: DEFAULT_RATING,
  deviation: 60,
  volatility: 0.06,
};

const timeControls = [
  { id: "1+0", label: "Bullet 1+0", category: "bullet" as TimeControl },
  { id: "2+1", label: "Bullet 2+1", category: "bullet" as TimeControl },
  { id: "3+0", label: "Bullet 3+0", category: "blitz" as TimeControl },
  { id: "3+2", label: "Bullet 3+2", category: "blitz" as TimeControl },
  { id: "5+0", label: "Blitz 5+0", category: "blitz" as TimeControl },
  { id: "5+3", label: "Blitz 5+3", category: "blitz" as TimeControl },
  { id: "10+0", label: "Rapid 10+0", category: "rapid" as TimeControl },
  { id: "10+5", label: "Rapid 10+5", category: "rapid" as TimeControl },
  { id: "15+10", label: "Rapid 15+10", category: "rapid" as TimeControl },
  { id: "30+0", label: "Classical 30+0", category: "classical" as TimeControl },
  { id: "30+20", label: "Classical 30+20", category: "classical" as TimeControl },
];

import { CreateGameModal } from "./create-game-modal";

export const MatchmakingPanel = () => {
  useMatchmakingSocket();
  const router = useRouter();

  const status = useGameStore((state) => state.status);
  const match = useGameStore((state) => state.match);
  const ratingRange = useGameStore((state) => state.ratingRange);
  const searchElapsedMs = useGameStore((state) => state.searchElapsedMs);
  const queueError = useGameStore((state) => state.queueError);
  const joinQueue = useGameStore((state) => state.joinQueue);
  const cancelQueue = useGameStore((state) => state.cancelQueue);

  const [submitting, setSubmitting] = useState(false);
  const [isCreateGameModalOpen, setIsCreateGameModalOpen] = useState(false);

  // Get authenticated user ID
  const user = useAuthStore((state) => state.user);

  // Redirect to game page when match is found
  useEffect(() => {
    if (status === "matched" && match?.gameId) {
      console.log('[Matchmaking] Match found! Redirecting to game:', match.gameId);
      router.push(`/game/${match.gameId}`);
    }
  }, [status, match, router]);

  const handleTimeSelect = async (id: string) => {
    if (status === "searching" || submitting) return;

    // Ensure user is authenticated
    if (!user?.id) {
      console.error('[Matchmaking] User not authenticated');
      return;
    }

    setSubmitting(true);
    const selected = timeControls.find((option) => option.id === id);
    const category: TimeControl = selected?.category ?? "blitz";

    await joinQueue({
      userId: user.id,
      timeControl: category,
      rating: DEFAULT_RATING_SNAPSHOT,
      latencyMs: 45,
      preferredRange: PREFERRED_RANGE,
      deviceFingerprint: user.id,
    });
    setSubmitting(false);
  };

  const searching = status === "searching";

  return (
    <div className="flex flex-col gap-6">
      {/* Quick Pairing Grid */}
      {!searching ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {timeControls.map((option) => (
            <button
              key={option.id}
              onClick={() => handleTimeSelect(option.id)}
              disabled={submitting}
              className="group relative flex flex-col items-center justify-center gap-1 rounded-xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10 hover:border-white/20 active:scale-95"
            >
              <span className="text-lg font-bold text-white group-hover:text-emerald-400">
                {option.id}
              </span>
              <span className="text-xs font-medium uppercase tracking-wider text-slate-400 group-hover:text-slate-300">
                {option.category}
              </span>
            </button>
          ))}
          <button
            onClick={() => setIsCreateGameModalOpen(true)}
            className="group relative flex flex-col items-center justify-center gap-1 rounded-xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10 hover:border-white/20 active:scale-95"
          >
            <span className="text-lg font-bold text-white group-hover:text-emerald-400">
              Custom
            </span>
            <span className="text-xs font-medium uppercase tracking-wider text-slate-400 group-hover:text-slate-300">
              Create
            </span>
          </button>
        </div>
      ) : (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-xl backdrop-blur">
          <div className="mb-6 flex justify-center">
            <div className="relative h-16 w-16">
              <div className="absolute inset-0 animate-ping rounded-full bg-emerald-500/20"></div>
              <div className="absolute inset-0 flex items-center justify-center rounded-full border-2 border-emerald-500 text-emerald-400">
                <svg className="h-8 w-8 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            </div>
          </div>

          <h3 className="mb-2 text-xl font-semibold text-white">Searching for opponent...</h3>
          <p className="mb-6 text-slate-400">
            {(searchElapsedMs ?? 0) / 1000}s elapsed
          </p>

          <button
            onClick={cancelQueue}
            className="rounded-xl bg-slate-700 px-6 py-2 font-medium text-white transition hover:bg-slate-600"
          >
            Cancel
          </button>
        </div>
      )}

      {queueError && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-center text-sm text-red-200">
          {queueError}
        </div>
      )}

      {/* Stats / Info Footer */}
      {!searching && (
        <div className="flex items-center justify-between border-t border-white/5 pt-4 text-xs text-slate-500">
          <div className="flex gap-4">
            <span>12,403 Players Online</span>
            <span>4,291 Games in Progress</span>
          </div>
          <div className="flex gap-4">
            <button className="hover:text-slate-300">Leaderboards</button>
            <button className="hover:text-slate-300">Tournaments</button>
          </div>
        </div>
      )}

      <CreateGameModal
        isOpen={isCreateGameModalOpen}
        onClose={() => setIsCreateGameModalOpen(false)}
      />
    </div>
  );
};
