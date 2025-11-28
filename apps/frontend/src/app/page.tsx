"use client";

import { useState } from "react";
import { ChessBoardPreview } from "@/components/chess-board";
import { MatchmakingPanel } from "@/components/matchmaking-panel";
import { AuthModal } from "@/components/auth-modal";
import { ConnectionStatus } from "@/components/connection-status";

export default function Home() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <div className="min-h-screen selection:bg-emerald-500/30">
      <main className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-8 lg:grid-cols-12 lg:gap-12">
        {/* Left Column: Quick Pairing & Actions */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-bold text-white">Play Chess</h1>
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              12,403 players online
            </div>
          </div>

          <MatchmakingPanel />

          {/* Recent Games / Activity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-white/5 bg-white/5 p-5 backdrop-blur-sm">
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-400">Daily Puzzle</h3>
              <div className="aspect-[2/1] rounded-xl bg-slate-800/50 flex items-center justify-center border border-white/5">
                <span className="text-slate-500 text-sm">Puzzle of the Day</span>
              </div>
            </div>
            <div className="rounded-2xl border border-white/5 bg-white/5 p-5 backdrop-blur-sm">
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-400">Top Streamers</h3>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-slate-700"></div>
                    <div className="flex-1">
                      <div className="h-3 w-24 rounded bg-slate-700/50 mb-1"></div>
                      <div className="h-2 w-16 rounded bg-slate-800"></div>
                    </div>
                    <div className="h-2 w-2 rounded-full bg-red-500"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Featured Board / TV */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-slate-900">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 to-transparent z-10 pointer-events-none"></div>
            <ChessBoardPreview />
            <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between rounded-xl bg-slate-950/80 p-3 backdrop-blur border border-white/10">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded bg-slate-800 flex items-center justify-center text-xs font-bold">GM</div>
                <div className="text-sm">
                  <div className="font-bold text-white">MagnusCarlsen</div>
                  <div className="text-xs text-slate-400">2882</div>
                </div>
              </div>
              <div className="text-xs font-mono text-emerald-400">1:02</div>
            </div>
            <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between rounded-xl bg-slate-950/80 p-3 backdrop-blur border border-white/10">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded bg-slate-800 flex items-center justify-center text-xs font-bold">GM</div>
                <div className="text-sm">
                  <div className="font-bold text-white">Hikaru</div>
                  <div className="text-xs text-slate-400">2874</div>
                </div>
              </div>
              <div className="text-xs font-mono text-white">0:45</div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/5 bg-white/5 p-6 text-center">
            <h3 className="text-lg font-bold text-white mb-2">Flux TV</h3>
            <p className="text-sm text-slate-400 mb-4">Watch top players battle it out live.</p>
            <button className="w-full rounded-xl bg-slate-800 py-3 text-sm font-semibold text-white hover:bg-slate-700 transition">
              Watch Now
            </button>
          </div>
        </div>
      </main>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      <ConnectionStatus />
    </div>
  );
}
