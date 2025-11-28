"use client";

import Image from "next/image";
import { Chess } from "chess.js";
import { useGameStore } from "@/state/game/store";
import { pieceSprite } from "@/components/piece-sprites";

const chess = new Chess();

const files = ["a", "b", "c", "d", "e", "f", "g", "h"] as const;
const ranks = [8, 7, 6, 5, 4, 3, 2, 1] as const;

const isDarkSquare = (fileIndex: number, rankIndex: number) =>
  (fileIndex + rankIndex) % 2 === 1;

export const ChessBoardPreview = ({ fen }: { fen?: string }) => {
  const latestDiff = useGameStore((state) => state.latestDiff);
  const board = (() => {
    if (fen) {
      const custom = new Chess();
      custom.load(fen);
      return custom.board();
    }
    if (latestDiff?.fen) {
      const custom = new Chess();
      custom.load(latestDiff.fen);
      return custom.board();
    }
    return chess.board();
  })();

  return (
    <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-4 shadow-2xl max-w-[600px] mx-auto overflow-hidden">
      <header className="mb-4 flex items-center justify-between text-sm text-slate-200">
        <span className="font-semibold tracking-wide">Live Board</span>
        <span className="text-slate-400">
          {fen ? (new Chess(fen).turn() === "b" ? "Black to move" : "White to move") : (latestDiff?.turn === "black" ? "Black to move" : "White to move")}
        </span>
      </header>
      <div className="grid grid-cols-8 overflow-hidden rounded-xl border border-slate-700">
        {ranks.map((rank, rankIndex) =>
          files.map((file, fileIndex) => {
            const square = board[rankIndex][fileIndex];
            const bg = isDarkSquare(fileIndex, rankIndex)
              ? "bg-slate-800"
              : "bg-slate-700";

            return (
              <div
                key={`${file}${rank}`}
                className={`${bg} relative flex aspect-square items-center justify-center`}
              >
                {square && (
                  <Image
                    src={
                      pieceSprite[`${square.color}${square.type}`] ??
                      "/pieces-svg/pawn-w.svg"
                    }
                    alt={`${square.color}${square.type}`}
                    width={36}
                    height={36}
                  />
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

