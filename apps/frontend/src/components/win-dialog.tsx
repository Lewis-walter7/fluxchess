"use client";

import { useEffect } from "react";

interface WinDialogProps {
    winner: 'white' | 'black';
    userIsWinner: boolean;
    ratingChange?: number;
    newRating?: number;
    onClose: () => void;
    onRematch?: () => void;
    onNewGame?: () => void;
}

export function WinDialog({ winner, userIsWinner, ratingChange, newRating, onClose, onRematch, onNewGame }: WinDialogProps) {
    // Prevent body scroll when dialog is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const title = userIsWinner ? "You win!" : `${winner.charAt(0).toUpperCase() + winner.slice(1)} wins`;
    const emoji = userIsWinner ? "🎉" : "😔";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <div className="bg-slate-900 border border-white/10 rounded-lg shadow-2xl w-full max-w-md mx-4 overflow-hidden">
                {/* Header */}
                <div className={`p-6 text-center border-b border-white/10 ${userIsWinner ? 'bg-gradient-to-br from-emerald-600 to-emerald-700' : 'bg-gradient-to-br from-slate-700 to-slate-800'}`}>
                    <div className="text-6xl mb-3">{emoji}</div>
                    <h2 className="text-3xl font-bold text-white mb-2">{title}</h2>
                    <p className="text-white/80 text-sm">
                        {userIsWinner ? "Congratulations on your victory!" : "Better luck next time!"}
                    </p>
                </div>

                {/* Body */}
                <div className="p-6">
                    <div className="bg-slate-800/50 rounded-lg p-4 mb-4">
                        <div className="flex items-center justify-between text-sm mb-3">
                            <span className="text-slate-400">Winner:</span>
                            <span className="text-white font-bold flex items-center gap-2">
                                <span className={`h-3 w-3 rounded-full ${winner === 'white' ? 'bg-white border border-slate-600' : 'bg-slate-900 border border-slate-600'}`}></span>
                                {winner.charAt(0).toUpperCase() + winner.slice(1)}
                            </span>
                        </div>

                        {/* Rating Change Display */}
                        {ratingChange !== undefined && newRating !== undefined && (
                            <div className="pt-3 border-t border-white/10">
                                <div className="flex items-center justify-between text-sm mb-2">
                                    <span className="text-slate-400">Rating Change:</span>
                                    <span className={`font-bold font-mono text-lg ${ratingChange > 0 ? 'text-emerald-400' : ratingChange < 0 ? 'text-red-400' : 'text-slate-400'
                                        }`}>
                                        {ratingChange > 0 ? '+' : ''}{ratingChange}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-slate-400">New Rating:</span>
                                    <span className="text-white font-bold font-mono text-lg">
                                        {newRating}
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                        {onRematch && (
                            <button
                                onClick={onRematch}
                                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors"
                            >
                                Rematch
                            </button>
                        )}
                        {onNewGame && (
                            <button
                                onClick={onNewGame}
                                className="w-full py-3 px-4 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg transition-colors"
                            >
                                New Opponent
                            </button>
                        )}
                        <button
                            onClick={onClose}
                            className="w-full py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium rounded-lg transition-colors border border-white/10"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
