"use client";

import { useState, useEffect, useRef } from "react";
import { Chess, Square } from "chess.js";
import { useAuthStore } from "@/state/auth-store";
import { pieceSprite } from "@/components/piece-sprites";
import { WinDialog } from "@/components/win-dialog";

const files = ["a", "b", "c", "d", "e", "f", "g", "h"] as const;
const ranks = [8, 7, 6, 5, 4, 3, 2, 1] as const;

const isDarkSquare = (fileIndex: number, rankIndex: number) =>
    (fileIndex + rankIndex) % 2 === 1;

export default function GamePage({ params }: { params: { id: string } }) {
    const { user } = useAuthStore();
    const [activeTab, setActiveTab] = useState<"chat" | "notes">("chat");

    // Game state
    const [game, setGame] = useState<Chess>(new Chess());
    const [moveHistory, setMoveHistory] = useState<string[]>([]);
    const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
    const [validMoves, setValidMoves] = useState<Square[]>([]);
    const [lastMove, setLastMove] = useState<{ from: Square; to: Square } | null>(null);
    const [mounted, setMounted] = useState(false);

    // Clock state (in seconds)
    const [whiteTime, setWhiteTime] = useState(600); // 10 minutes
    const [blackTime, setBlackTime] = useState(600); // 10 minutes
    const [abortTime, setAbortTime] = useState(30); // 30 seconds abort timer
    const clockIntervalRef = useRef<NodeJS.Timeout | null>(null);

    // Win state
    const [playerColor] = useState<'white' | 'black'>('white'); // TODO: Determine from game/match data
    const [gameEnded, setGameEnded] = useState(false);
    const [winner, setWinner] = useState<'white' | 'black' | null>(null);
    const [showWinDialogState, setShowWinDialogState] = useState(false);
    const [ratingChange, setRatingChange] = useState<number | null>(null);
    const [newRating, setNewRating] = useState<number | null>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Helper function: Calculate Elo rating change
    const calculateRatingChange = (userWon: boolean, userRating: number, opponentRating: number): number => {
        const K = 32; // K-factor for standard games
        const expectedScore = 1 / (1 + Math.pow(10, (opponentRating - userRating) / 400));
        const actualScore = userWon ? 1 : 0;
        return Math.round(K * (actualScore - expectedScore));
    };

    // Helper function: Stop clocks
    const stopClocks = () => {
        if (clockIntervalRef.current) {
            clearInterval(clockIntervalRef.current);
            clockIntervalRef.current = null;
        }
        setGameEnded(true);
    };

    // Helper function: Handle timeout
    const handleTimeOut = (colorWhoFlagged: 'white' | 'black') => {
        if (gameEnded) return; // Prevent multiple calls

        const winnerColor = colorWhoFlagged === 'white' ? 'black' : 'white';
        setWinner(winnerColor);
        stopClocks();

        const userIsWinner = winnerColor === playerColor;

        // Calculate rating change
        const userRating = currentUser.rating;
        const opponentRating = opponent.rating;
        const change = calculateRatingChange(userIsWinner, userRating, opponentRating);
        setRatingChange(change);
        setNewRating(userRating + change);

        showWinDialog({ winner: winnerColor, userIsWinner });
    };

    // Helper function: Handle checkmate
    const handleCheckmate = (winnerColor: 'white' | 'black') => {
        if (gameEnded) return; // Prevent multiple calls

        setWinner(winnerColor);
        stopClocks();

        const userIsWinner = winnerColor === playerColor;

        // Calculate rating change
        const userRating = currentUser.rating;
        const opponentRating = opponent.rating;
        const change = calculateRatingChange(userIsWinner, userRating, opponentRating);
        setRatingChange(change);
        setNewRating(userRating + change);

        showWinDialog({ winner: winnerColor, userIsWinner });
    };

    // Helper function: Show win dialog
    const showWinDialog = ({ winner, userIsWinner }: { winner: 'white' | 'black', userIsWinner: boolean }) => {
        setShowWinDialogState(true);
    };

    // Clock timer effect
    useEffect(() => {
        if (!mounted || game.isGameOver() || gameEnded) {
            if (clockIntervalRef.current) {
                clearInterval(clockIntervalRef.current);
                clockIntervalRef.current = null;
            }
            return;
        }

        clockIntervalRef.current = setInterval(() => {
            const isWhiteTurn = game.turn() === 'w';
            const movesMade = moveHistory.length;

            // If less than 2 moves (1 full round), use abort timer
            if (movesMade < 2) {
                setAbortTime((prev) => {
                    const newTime = Math.max(0, prev - 1);
                    // Check for abort timeout
                    if (newTime === 0 && prev > 0) {
                        handleTimeOut(isWhiteTurn ? 'white' : 'black');
                    }
                    return newTime;
                });
            } else {
                // Main game clock
                if (isWhiteTurn) {
                    setWhiteTime((prev) => {
                        const newTime = Math.max(0, prev - 1);
                        // Check for timeout
                        if (newTime === 0 && prev > 0) {
                            handleTimeOut('white');
                        }
                        return newTime;
                    });
                } else {
                    setBlackTime((prev) => {
                        const newTime = Math.max(0, prev - 1);
                        // Check for timeout
                        if (newTime === 0 && prev > 0) {
                            handleTimeOut('black');
                        }
                        return newTime;
                    });
                }
            }
        }, 1000);

        return () => {
            if (clockIntervalRef.current) {
                clearInterval(clockIntervalRef.current);
                clockIntervalRef.current = null;
            }
        };
    }, [game, mounted, moveHistory.length, gameEnded]);

    // Reset abort timer when turn changes (only relevant for first move)
    useEffect(() => {
        if (moveHistory.length < 2) {
            setAbortTime(30);
        }
    }, [moveHistory.length]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // Dummy opponent data
    const opponent = {
        username: "Grandmaster Gary",
        rating: 2800,
        ratingDiff: -5,
        avatar: null,
        isOnline: true,
    };

    // Dummy user data (for display)
    const currentUser = {
        username: user?.username || "You",
        rating: 1500,
        ratingDiff: +6,
    };

    // Dummy time control
    const timeControl = {
        white: "10:00",
        black: "09:45",
    };

    const handleSquareClick = (square: Square) => {
        // Disable moves if game has ended
        if (gameEnded) return;

        const board = game.board();
        const piece = board[ranks.indexOf(parseInt(square[1]) as any)][files.indexOf(square[0] as any)];

        // If no piece is selected, select this piece (if it exists and is the right color)
        if (!selectedSquare) {
            if (piece) {
                // Check if it's the correct player's turn
                const isWhiteTurn = game.turn() === 'w';
                const isWhitePiece = piece.color === 'w';

                if (isWhiteTurn === isWhitePiece) {
                    setSelectedSquare(square);
                    const moves = game.moves({ square, verbose: true });
                    setValidMoves(moves.map(m => m.to as Square));
                }
            }
        } else {
            // A piece is already selected
            if (square === selectedSquare) {
                // Clicking the same square deselects
                setSelectedSquare(null);
                setValidMoves([]);
            } else if (piece && piece.color === game.turn()) {
                // Clicking another piece of the same color selects it instead
                setSelectedSquare(square);
                const moves = game.moves({ square, verbose: true });
                setValidMoves(moves.map(m => m.to as Square));
            } else {
                // Try to move the selected piece to this square
                try {
                    const newGame = new Chess(game.fen());
                    const move = newGame.move({
                        from: selectedSquare,
                        to: square,
                        promotion: 'q', // Always promote to queen for simplicity for now
                    });

                    if (move) {
                        setGame(newGame);
                        setMoveHistory([...moveHistory, move.san]);
                        setLastMove({ from: selectedSquare, to: square });

                        // Check for checkmate
                        if (newGame.isCheckmate()) {
                            // The player who just moved is the winner
                            const winnerColor = game.turn() === 'w' ? 'white' : 'black';
                            handleCheckmate(winnerColor);
                        }
                    }
                } catch (error) {
                    // Invalid move
                }

                // Clear selection after move attempt
                setSelectedSquare(null);
                setValidMoves([]);
            }
        }
    };

    if (!mounted) return null;

    const board = game.board();
    const isAbortPhase = moveHistory.length < 2;

    return (
        <div className="max-h-[calc(100vh-64px)] bg-slate-950 flex flex-col ml-10 mr-10">
            <main className="flex-1 grid grid-cols-1 lg:grid-cols-[300px_1fr_300px] h-[calc(100vh-64px)] overflow-hidden">

                {/* LEFT COLUMN: Game Info & Chat */}
                <div className="hidden lg:flex flex-col border-r border-white/10 bg-slate-900/50 backdrop-blur-sm">
                    {/* Game Info Card */}
                    <div className="p-4 border-b border-white/10 bg-slate-900/80">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-10 w-10 rounded bg-slate-800 flex items-center justify-center text-2xl">
                                🐇
                            </div>
                            <div>
                                <div className="text-sm font-bold text-white">10+0 • Rated • Rapid</div>
                                <div className="text-xs text-slate-400">3 hours ago</div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                    <span className="h-2 w-2 rounded-full bg-white border border-slate-600"></span>
                                    <span className="text-slate-300">{currentUser.username} ({currentUser.rating})</span>
                                </div>
                                <span className="text-emerald-400 font-mono text-xs">+{currentUser.ratingDiff}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                    <span className="h-2 w-2 rounded-full bg-slate-900 border border-slate-600"></span>
                                    <span className="text-slate-300">{opponent.username} ({opponent.rating})</span>
                                </div>
                                <span className="text-red-400 font-mono text-xs">{opponent.ratingDiff}</span>
                            </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-white/5 text-center text-slate-400 text-sm">
                            {game.isGameOver() ? (
                                game.isCheckmate() ? (
                                    game.turn() === 'w' ? "Black won by checkmate" : "White won by checkmate"
                                ) : "Game drawn"
                            ) : "Game in progress"}
                        </div>
                    </div>

                    {/* Chat / Notes Tabs */}
                    <div className="flex border-b border-white/10">
                        <button
                            onClick={() => setActiveTab("chat")}
                            className={`flex-1 py-3 text-sm font-medium transition ${activeTab === "chat" ? "text-emerald-400 border-b-2 border-emerald-400 bg-white/5" : "text-slate-400 hover:text-white hover:bg-white/5"}`}
                        >
                            Chat room
                        </button>
                        <button
                            onClick={() => setActiveTab("notes")}
                            className={`flex-1 py-3 text-sm font-medium transition ${activeTab === "notes" ? "text-emerald-400 border-b-2 border-emerald-400 bg-white/5" : "text-slate-400 hover:text-white hover:bg-white/5"}`}
                        >
                            Notes
                        </button>
                    </div>

                    {/* Chat Content */}
                    <div className="flex-1 p-4 overflow-y-auto bg-slate-950/30">
                        {activeTab === "chat" ? (
                            <div className="text-slate-500 text-sm text-center italic mt-10">
                                No messages yet. Say hello!
                            </div>
                        ) : (
                            <textarea
                                className="w-full h-full bg-transparent text-slate-300 text-sm resize-none focus:outline-none"
                                placeholder="Type your private notes here..."
                            />
                        )}
                    </div>

                    {/* Chat Input */}
                    {activeTab === "chat" && (
                        <div className="p-3 border-t border-white/10">
                            <input
                                type="text"
                                placeholder="Type a message..."
                                className="w-full bg-slate-800/50 border border-white/10 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-500/50"
                            />
                        </div>
                    )}
                </div>

                {/* CENTER COLUMN: Board */}
                <div className="flex justify-center bg-slate-950">
                    <div className="w-full max-w-[570px] h-full max-h-[calc(100vh-100px)] aspect-square shadow-2xl">
                        <div className="w-full h-full rounded-lg overflow-hidden shadow-2xl border border-white/10 relative">
                            <div className="grid grid-cols-8 w-full h-full">
                                {ranks.map((rank, rankIndex) =>
                                    files.map((file, fileIndex) => {
                                        const square = board[rankIndex][fileIndex];
                                        const squareName = `${file}${rank}` as Square;
                                        const bg = isDarkSquare(fileIndex, rankIndex)
                                            ? "bg-[#b58863]"
                                            : "bg-[#f0d9b5]";
                                        const isValidMove = validMoves.includes(squareName);
                                        const isSelected = selectedSquare === squareName;
                                        const isLastMoveSquare = lastMove && (lastMove.from === squareName || lastMove.to === squareName);

                                        return (
                                            <div
                                                key={squareName}
                                                className={`${bg} relative flex items-center justify-center aspect-square cursor-pointer ${isSelected ? 'bg-slate-400/50' : ''
                                                    } ${isLastMoveSquare ? 'bg-yellow-200/40' : ''
                                                    }`}
                                                onClick={() => handleSquareClick(squareName)}
                                            >
                                                {/* Valid move indicator */}
                                                {isValidMove && (
                                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                                                        <div className={`${square ? 'w-full h-full border-4 border-black/10 rounded-full' : 'w-1/3 h-1/3 bg-black/10 rounded-full'}`}></div>
                                                    </div>
                                                )}

                                                {square && (
                                                    <img
                                                        src={
                                                            pieceSprite[`${square.color}${square.type}`] ??
                                                            "/pieces-svg/pawn-w.svg"
                                                        }
                                                        alt={`${square.color}${square.type}`}
                                                        className="w-[85%] h-[85%] object-contain select-none pointer-events-none z-20"
                                                    />
                                                )}

                                                {/* Rank/File Labels */}
                                                {fileIndex === 0 && (
                                                    <span className={`absolute top-0.5 left-0.5 text-[10px] font-bold ${isDarkSquare(fileIndex, rankIndex) ? 'text-[#f0d9b5]' : 'text-[#b58863]'}`}>
                                                        {rank}
                                                    </span>
                                                )}
                                                {rankIndex === 7 && (
                                                    <span className={`absolute bottom-0.5 right-0.5 text-[10px] font-bold ${isDarkSquare(fileIndex, rankIndex) ? 'text-[#f0d9b5]' : 'text-[#b58863]'}`}>
                                                        {file}
                                                    </span>
                                                )}
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: Clocks & Moves */}
                <div className="hidden lg:flex flex-col border-l border-white/10 bg-slate-900/50 backdrop-blur-sm">

                    {/* Opponent Clock Area */}
                    <div className={`bg-slate-800/50 p-4 border-b border-white/5 ${game.turn() === 'b' ? 'bg-slate-800' : ''}`}>
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                                <span className="font-bold text-slate-200">{opponent.username}</span>
                            </div>
                            <span className="text-slate-400 text-sm">{opponent.rating} <span className="text-red-400 text-xs">{opponent.ratingDiff}</span></span>
                        </div>
                        <div className={`rounded px-4 py-2 text-right transition-colors ${game.turn() === 'b' ? 'bg-slate-700 text-white' : 'bg-slate-900 text-slate-400'}`}>
                            <span className="text-4xl font-mono font-bold">
                                {isAbortPhase && game.turn() === 'b' ? formatTime(abortTime) : formatTime(blackTime)}
                            </span>
                        </div>
                    </div>

                    {/* Move List */}
                    <div className="h-[150px] overflow-y-auto bg-slate-950/30 border-b border-white/5" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                        <style jsx>{`
                            div::-webkit-scrollbar {
                                display: none;
                            }
                        `}</style>
                        <table className="w-full text-sm text-left border-collapse">
                            <thead className="sticky top-0 bg-slate-900 z-10">
                                <tr className="text-slate-500">
                                    <th className="py-1 pl-4 w-12 font-normal">#</th>
                                    <th className="py-1 font-normal">White</th>
                                    <th className="py-1 font-normal">Black</th>
                                </tr>
                            </thead>
                            <tbody className="text-slate-300 font-mono">
                                {Array.from({ length: Math.ceil(moveHistory.length / 2) }).map((_, i) => (
                                    <tr key={i} className={`hover:bg-white/5 transition-colors ${i % 2 === 0 ? 'bg-white/[0.02]' : ''}`}>
                                        <td className="py-1 pl-4 text-slate-600 border-r border-white/5">{i + 1}</td>
                                        <td className="py-1 pl-2 border-r border-white/5 hover:bg-white/10 cursor-pointer">{moveHistory[i * 2]}</td>
                                        <td className="py-1 pl-2 hover:bg-white/10 cursor-pointer">{moveHistory[i * 2 + 1] || ''}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-1 divide-y divide-white/10 bg-slate-800/50">
                        <button className="py-4 text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-white transition uppercase tracking-wider">
                            Rematch
                        </button>
                        <button className="py-4 text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-white transition uppercase tracking-wider">
                            New Opponent
                        </button>
                        <button className="py-4 text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-white transition uppercase tracking-wider">
                            Analysis Board
                        </button>
                    </div>

                    {/* User Clock Area */}
                    <div className={`bg-slate-800/50 p-4 border-t border-white/5 ${game.turn() === 'w' ? 'bg-slate-800' : ''}`}>
                        <div className={`rounded px-4 py-2 text-right mb-2 border-b-4 border-emerald-600 transition-colors ${game.turn() === 'w' ? 'bg-white text-slate-900' : 'bg-slate-900 text-white'}`}>
                            <span className="text-4xl font-mono font-bold">
                                {isAbortPhase && game.turn() === 'w' ? formatTime(abortTime) : formatTime(whiteTime)}
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                                <span className="font-bold text-slate-200">{currentUser.username}</span>
                            </div>
                            <span className="text-slate-400 text-sm">{currentUser.rating} <span className="text-emerald-400 text-xs">+{currentUser.ratingDiff}</span></span>
                        </div>
                    </div>
                </div>
            </main>

            {/* Win Dialog */}
            {showWinDialogState && winner && (
                <WinDialog
                    winner={winner}
                    userIsWinner={winner === playerColor}
                    ratingChange={ratingChange ?? undefined}
                    newRating={newRating ?? undefined}
                    onClose={() => setShowWinDialogState(false)}
                    onRematch={() => {
                        // TODO: Implement rematch logic
                        console.log('Rematch requested');
                    }}
                    onNewGame={() => {
                        // TODO: Implement new game logic
                        console.log('New game requested');
                    }}
                />
            )}
        </div>
    );
}
