'use client';
import { useEffect, useState } from 'react';
import { Chess, Square } from 'chess.js';
import { pieceSprite } from '@/components/piece-sprites';
import { useStockfish } from '@/hooks/useStockfish';

// Simple list of openings with FEN strings
const openings = [
    {
        name: 'Starting Position',
        fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
        description: 'The initial starting position of a chess game. White to move.'
    },
    {
        name: 'Ruy Lopez',
        fen: 'r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 2 3',
        description: 'The Ruy Lopez is one of the oldest and most classical of all openings. It is named after a Spanish bishop who wrote one of the first books on chess. White puts immediate pressure on the e5 pawn and begins to develop pieces harmoniously.'
    },
    {
        name: 'Sicilian Defense',
        fen: 'rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 2',
        description: 'The Sicilian Defense is the most popular and best-scoring response to White\'s 1.e4. It creates an asymmetrical position and allows Black to fight for the initiative from the very first move.'
    },
    {
        name: 'French Defense',
        fen: 'rnbqkbnr/pppp1ppp/8/4p3/3PP3/8/PPP2PPP/RNBQKBNR b KQkq d3 0 2',
        description: 'The French Defense is a solid and strategic opening that leads to a closed position. Black accepts a somewhat cramped position in exchange for a solid pawn structure and counterplay opportunities.'
    },
];

const files = ["a", "b", "c", "d", "e", "f", "g", "h"] as const;
const ranks = [8, 7, 6, 5, 4, 3, 2, 1] as const;

const isDarkSquare = (fileIndex: number, rankIndex: number) =>
    (fileIndex + rankIndex) % 2 === 1;

export default function AnalysisBoardPage() {
    const [selectedOpening, setSelectedOpening] = useState(openings[0]);
    const [engineEnabled, setEngineEnabled] = useState(true);
    const [mounted, setMounted] = useState(false);

    // Game state management
    const [game, setGame] = useState<Chess | null>(null);
    const [moveHistory, setMoveHistory] = useState<string[]>([]);
    const [currentMoveIndex, setCurrentMoveIndex] = useState(-1);

    // Click-based piece selection
    const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
    const [validMoves, setValidMoves] = useState<Square[]>([]);
    const [lastMove, setLastMove] = useState<{ from: Square; to: Square } | null>(null);

    // Analysis arrows
    const [arrows, setArrows] = useState<Array<{ from: Square; to: Square }>>([]);
    const [drawingArrow, setDrawingArrow] = useState<{ from: Square; to: Square | null } | null>(null);
    const [isRightMouseDown, setIsRightMouseDown] = useState(false);

    // Stockfish analysis
    const analysis = useStockfish(engineEnabled, game?.fen() || '');

    // Initialize game on client side to avoid hydration issues
    useEffect(() => {
        setGame(new Chess(selectedOpening.fen));
        setMounted(true);

        // Prevent context menu on right-click
        const handleContextMenu = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest('.chess-board')) {
                e.preventDefault();
            }
        };

        document.addEventListener('contextmenu', handleContextMenu);
        return () => document.removeEventListener('contextmenu', handleContextMenu);
    }, []);

    if (!game || !mounted) {
        return <div className="h-screen bg-[#1a1918] flex items-center justify-center text-white">Loading...</div>;
    }

    const board = game.board();

    // Handle opening change
    const handleOpeningChange = (openingName: string) => {
        const opening = openings.find((o) => o.name === openingName);
        if (opening) {
            setSelectedOpening(opening);
            const newGame = new Chess(opening.fen);
            setGame(newGame);
            setMoveHistory([]);
            setCurrentMoveIndex(-1);
            setArrows([]); // Clear arrows when changing position
            setLastMove(null); // Clear last move when changing position
        }
    };

    // Arrow handlers
    const handleSquareRightMouseDown = (square: Square) => {
        setIsRightMouseDown(true);
        setDrawingArrow({ from: square, to: null });
    };

    const handleSquareMouseEnter = (square: Square) => {
        if (isRightMouseDown && drawingArrow) {
            setDrawingArrow({ ...drawingArrow, to: square });
        }
    };

    const handleSquareRightMouseUp = (square: Square) => {
        if (drawingArrow && drawingArrow.from !== square) {
            // Add or remove arrow
            const arrowExists = arrows.some(a => a.from === drawingArrow.from && a.to === square);
            if (arrowExists) {
                setArrows(arrows.filter(a => !(a.from === drawingArrow.from && a.to === square)));
            } else {
                setArrows([...arrows, { from: drawingArrow.from, to: square }]);
            }
        }
        setIsRightMouseDown(false);
        setDrawingArrow(null);
    };

    const handleMouseUp = () => {
        setIsRightMouseDown(false);
        setDrawingArrow(null);
    };

    // Click-based piece movement (more reliable than drag-and-drop)
    const handleSquareClick = (square: Square) => {
        const piece = board[ranks.indexOf(parseInt(square[1]) as any)][files.indexOf(square[0] as any)];

        console.log('Square clicked:', square, 'Piece:', piece, 'Selected:', selectedSquare);

        // If no piece is selected, select this piece (if it exists and is the right color)
        if (!selectedSquare) {
            if (piece) {
                // Check if it's the correct player's turn
                const isWhiteTurn = game.turn() === 'w';
                const isWhitePiece = piece.color === 'w';

                if (isWhiteTurn === isWhitePiece) {
                    console.log('Selecting piece at', square);
                    setSelectedSquare(square);
                    setArrows([]); // Clear arrows when selecting a piece
                    const moves = game.moves({ square, verbose: true });
                    console.log('Valid moves:', moves.map(m => m.to));
                    setValidMoves(moves.map(m => m.to as Square));
                }
            }
        } else {
            // A piece is already selected
            if (square === selectedSquare) {
                // Clicking the same square deselects
                console.log('Deselecting');
                setSelectedSquare(null);
                setValidMoves([]);
            } else if (piece && piece.color === game.turn()) {
                // Clicking another piece of the same color selects it instead
                console.log('Selecting different piece at', square);
                setSelectedSquare(square);
                const moves = game.moves({ square, verbose: true });
                setValidMoves(moves.map(m => m.to as Square));
            } else {
                // Try to move the selected piece to this square
                console.log('Attempting move from', selectedSquare, 'to', square);
                try {
                    const newGame = new Chess(game.fen());
                    const move = newGame.move({
                        from: selectedSquare,
                        to: square,
                        promotion: 'q',
                    });

                    if (move) {
                        console.log('Move successful:', move.san);
                        const newHistory = [...moveHistory.slice(0, currentMoveIndex + 1), move.san];
                        setMoveHistory(newHistory);
                        setCurrentMoveIndex(newHistory.length - 1);
                        setGame(newGame);
                        setLastMove({ from: selectedSquare, to: square }); // Track last move
                    }
                } catch (error) {
                    console.log('Invalid move:', error);
                }

                // Clear selection after move attempt
                setSelectedSquare(null);
                setValidMoves([]);
            }
        }
    };

    // Navigation handlers
    const goToFirstMove = () => {
        const newGame = new Chess(selectedOpening.fen);
        setGame(newGame);
        setCurrentMoveIndex(-1);
        setLastMove(null); // Clear last move on navigation
    };

    const goToPreviousMove = () => {
        if (currentMoveIndex < 0) return;

        const newGame = new Chess(selectedOpening.fen);
        for (let i = 0; i < currentMoveIndex; i++) {
            newGame.move(moveHistory[i]);
        }
        setGame(newGame);
        setCurrentMoveIndex(currentMoveIndex - 1);
        // Update last move based on the new current position
        if (currentMoveIndex > 0) {
            const prevMove = new Chess(selectedOpening.fen);
            for (let i = 0; i < currentMoveIndex - 1; i++) {
                prevMove.move(moveHistory[i]);
            }
            const lastMoveInfo = prevMove.history({ verbose: true }).pop();
            if (lastMoveInfo) {
                setLastMove({ from: lastMoveInfo.from, to: lastMoveInfo.to });
            } else {
                setLastMove(null);
            }
        } else {
            setLastMove(null);
        }
    };

    const goToNextMove = () => {
        if (currentMoveIndex >= moveHistory.length - 1) return;

        game.move(moveHistory[currentMoveIndex + 1]);
        setGame(new Chess(game.fen()));
        setCurrentMoveIndex(currentMoveIndex + 1);
        const lastMoveInfo = game.history({ verbose: true }).pop();
        if (lastMoveInfo) {
            setLastMove({ from: lastMoveInfo.from, to: lastMoveInfo.to });
        } else {
            setLastMove(null);
        }
    };

    const goToLastMove = () => {
        const newGame = new Chess(selectedOpening.fen);
        moveHistory.forEach(move => newGame.move(move));
        setGame(newGame);
        setCurrentMoveIndex(moveHistory.length - 1);
        const lastMoveInfo = newGame.history({ verbose: true }).pop();
        if (lastMoveInfo) {
            setLastMove({ from: lastMoveInfo.from, to: lastMoveInfo.to });
        } else {
            setLastMove(null);
        }
    };

    // Format moves for display
    const formattedMoves: { white?: string; black?: string }[] = [];
    for (let i = 0; i < moveHistory.length; i += 2) {
        formattedMoves.push({
            white: moveHistory[i],
            black: moveHistory[i + 1],
        });
    }

    return (
        <div className="h-screen bg-[#1a1918] text-white p-4 flex overflow-hidden">
            <div className="flex-1 flex bg-[#1a1918] rounded-lg overflow-hidden shadow-2xl">
                {/* Left Sidebar - Opening Selection */}
                <div className="w-[300px] bg-[#2b2a27] flex flex-col border-r border-black/20">
                    {/* Opening Selector */}
                    <div className="p-4 border-b border-black/20">
                        <label className="block">
                            <span className="text-xs text-slate-400 mb-2 block uppercase tracking-wide">Opening</span>
                            <select
                                value={selectedOpening.name}
                                onChange={(e) => handleOpeningChange(e.target.value)}
                                className="w-full rounded bg-[#1a1918] px-3 py-2 text-white text-sm border border-black/30 focus:outline-none focus:border-slate-600"
                            >
                                {openings.map((o) => (
                                    <option key={o.name} value={o.name}>
                                        {o.name}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>

                    {/* WikiBook Section */}
                    <div className="flex-1 overflow-y-auto p-4">
                        <div className="mb-3 flex items-center gap-2">
                            <span className="text-xs bg-[#1a1918] px-2 py-1 rounded text-slate-300">WikiBook</span>
                            <button className="text-slate-400 hover:text-white">▼</button>
                        </div>
                        <h2 className="text-lg font-semibold mb-3 text-slate-100">{selectedOpening.name}</h2>
                        <p className="text-sm text-slate-300 leading-relaxed">
                            {selectedOpening.description}
                        </p>
                    </div>
                </div>

                {/* Center - Chess Board */}
                <div className="flex-1 flex flex-col items-center justify-center px-12 py-8">
                    <div className="w-full max-w-[min(600px,calc(100vh-200px))] aspect-square">
                        <div className="w-full h-full rounded-lg overflow-hidden shadow-2xl border-2 border-black/30 relative">
                            <div className="grid grid-cols-8 w-full h-full chess-board" onMouseUp={handleMouseUp}>
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
                                                className={`${bg} relative flex items-center justify-center aspect-square cursor-pointer ${isSelected ? 'bg-slate-400/30' : ''
                                                    } ${isLastMoveSquare ? 'bg-yellow-200/40' : ''
                                                    }`}
                                                onClick={() => handleSquareClick(squareName)}
                                                onMouseDown={(e) => {
                                                    if (e.button === 2) { // Right mouse button
                                                        e.preventDefault();
                                                        handleSquareRightMouseDown(squareName);
                                                    }
                                                }}
                                                onMouseEnter={() => handleSquareMouseEnter(squareName)}
                                                onMouseUp={(e) => {
                                                    if (e.button === 2) { // Right mouse button
                                                        e.preventDefault();
                                                        handleSquareRightMouseUp(squareName);
                                                    }
                                                }}
                                            >
                                                {/* Valid move indicator */}
                                                {isValidMove && (
                                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                                        <div className={`${square ? 'w-full h-full border-4 border-green-500/50' : 'w-4 h-4 bg-green-500/50 rounded-full'}`}></div>
                                                    </div>
                                                )}

                                                {square && (
                                                    <img
                                                        src={
                                                            pieceSprite[`${square.color}${square.type}`] ??
                                                            "/pieces-svg/pawn-w.svg"
                                                        }
                                                        alt={`${square.color}${square.type}`}
                                                        className="w-[80%] h-[80%] object-contain select-none pointer-events-none"
                                                    />
                                                )}
                                            </div>
                                        );
                                    })
                                )}
                            </div>

                            {/* SVG Arrow Overlay */}
                            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 800">
                                <defs>
                                    <marker
                                        id="arrowhead"
                                        markerWidth="10"
                                        markerHeight="10"
                                        refX="9"
                                        refY="3"
                                        orient="auto"
                                    >
                                        <polygon points="0 0, 10 3, 0 6" fill="rgba(34, 197, 94, 0.8)" />
                                    </marker>
                                    <marker
                                        id="arrowhead-blue"
                                        markerWidth="10"
                                        markerHeight="10"
                                        refX="9"
                                        refY="3"
                                        orient="auto"
                                    >
                                        <polygon points="0 0, 10 3, 0 6" fill="rgba(59, 130, 246, 0.8)" />
                                    </marker>
                                </defs>

                                {/* Helper function to get square center coordinates */}
                                {(() => {
                                    const getSquareCenter = (square: Square) => {
                                        const file = square[0];
                                        const rank = parseInt(square[1]);
                                        const fileIndex = files.indexOf(file as any);
                                        const rankIndex = 8 - rank; // Reversed because rank 8 is at top
                                        const x = (fileIndex + 0.5) * 100;
                                        const y = (rankIndex + 0.5) * 100;
                                        return { x, y };
                                    };

                                    // Render persistent arrows
                                    const persistentArrows = arrows.map((arrow, index) => {
                                        const from = getSquareCenter(arrow.from);
                                        const to = getSquareCenter(arrow.to);
                                        return (
                                            <line
                                                key={`arrow-${index}`}
                                                x1={from.x}
                                                y1={from.y}
                                                x2={to.x}
                                                y2={to.y}
                                                stroke="rgba(34, 197, 94, 0.8)"
                                                strokeWidth="8"
                                                markerEnd="url(#arrowhead)"
                                            />
                                        );
                                    });

                                    // Render drawing arrow (if active)
                                    const drawingArrowElement = drawingArrow && drawingArrow.to ? (() => {
                                        const from = getSquareCenter(drawingArrow.from);
                                        const to = getSquareCenter(drawingArrow.to);
                                        return (
                                            <line
                                                key="drawing-arrow"
                                                x1={from.x}
                                                y1={from.y}
                                                x2={to.x}
                                                y2={to.y}
                                                stroke="rgba(34, 197, 94, 0.5)"
                                                strokeWidth="8"
                                                markerEnd="url(#arrowhead)"
                                                strokeDasharray="10,5"
                                            />
                                        );
                                    })() : null;

                                    // Render best move arrow (if engine enabled)
                                    const bestMoveArrow = analysis.bestMove && engineEnabled ? (() => {
                                        const fromSquare = analysis.bestMove.substring(0, 2) as Square;
                                        const toSquare = analysis.bestMove.substring(2, 4) as Square;
                                        const from = getSquareCenter(fromSquare);
                                        const to = getSquareCenter(toSquare);
                                        return (
                                            <line
                                                key="best-move-arrow"
                                                x1={from.x}
                                                y1={from.y}
                                                x2={to.x}
                                                y2={to.y}
                                                stroke="rgba(59, 130, 246, 0.8)" // Blue color for engine move
                                                strokeWidth="8"
                                                markerEnd="url(#arrowhead-blue)"
                                            />
                                        );
                                    })() : null;

                                    return [persistentArrows, drawingArrowElement, bestMoveArrow];
                                })()}
                            </svg>
                        </div>
                    </div>

                    {/* Navigation Controls */}
                    <div className="mt-6 flex items-center gap-2">
                        <button
                            onClick={goToFirstMove}
                            disabled={currentMoveIndex < 0}
                            className="p-2 hover:bg-white/10 rounded transition-colors text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z" />
                            </svg>
                        </button>
                        <button
                            onClick={goToPreviousMove}
                            disabled={currentMoveIndex < 0}
                            className="p-2 hover:bg-white/10 rounded transition-colors text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" />
                            </svg>
                        </button>
                        <button
                            onClick={goToNextMove}
                            disabled={currentMoveIndex >= moveHistory.length - 1}
                            className="p-2 hover:bg-white/10 rounded transition-colors text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" />
                            </svg>
                        </button>
                        <button
                            onClick={goToLastMove}
                            disabled={currentMoveIndex >= moveHistory.length - 1}
                            className="p-2 hover:bg-white/10 rounded transition-colors text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798l-5.445-3.63z" />
                            </svg>
                        </button>
                        <div className="w-px h-6 bg-slate-600 mx-2"></div>
                        <button className="p-2 hover:bg-white/10 rounded transition-colors text-slate-300 hover:text-white">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
                            </svg>
                        </button>
                    </div>

                    {/* FEN Display */}
                    <div className="mt-4 text-xs text-slate-500 font-mono">
                        {game.fen()}
                    </div>
                </div>

                {/* Right Panel - Analysis */}
                <div className="w-[350px] bg-[#2b2a27] flex flex-col border-l border-black/20">
                    {/* Engine Toggle */}
                    <div className="p-4 border-b border-black/20 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setEngineEnabled(!engineEnabled)}
                                className={`p-2 rounded transition-colors ${engineEnabled ? 'bg-green-600 text-white' : 'bg-[#1a1918] text-slate-400'}`}
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                                </svg>
                            </button>
                            <span className="text-2xl font-bold text-slate-100">
                                {engineEnabled ? analysis.evaluation : '-'}
                            </span>
                        </div>
                        <div className="text-xs text-slate-400 text-right">
                            <div>Stockfish 16</div>
                            <div>
                                {engineEnabled ? (
                                    <>Depth <span className="text-green-400">{analysis.depth}</span></>
                                ) : (
                                    <span>Engine Off</span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Evaluation Bar */}
                    <div className="h-2 bg-[#1a1918] relative">
                        <div
                            className="absolute left-0 top-0 bottom-0 bg-slate-100 transition-all duration-500"
                            style={{
                                width: engineEnabled
                                    ? `${Math.min(Math.max((parseFloat(analysis.evaluation) + 5) * 10, 5), 95)}%`
                                    : '50%'
                            }}
                        ></div>
                    </div>

                    {/* Move History Table */}
                    <div className="flex-1 overflow-y-auto p-4">
                        <div className="text-xs text-slate-400 mb-2 uppercase tracking-wide">Move History</div>
                        {formattedMoves.length > 0 ? (
                            <table className="w-full text-sm">
                                <thead className="sticky top-0 bg-[#2b2a27]">
                                    <tr className="text-slate-400 text-xs">
                                        <th className="py-1 px-2 text-left">#</th>
                                        <th className="py-1 px-2 text-left">White</th>
                                        <th className="py-1 px-2 text-left">Black</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {formattedMoves.map((move, index) => (
                                        <tr key={index} className="border-t border-white/5">
                                            <td className="py-1 px-2 text-slate-500">{index + 1}.</td>
                                            <td className="py-1 px-2 text-slate-200">{move.white}</td>
                                            <td className="py-1 px-2 text-slate-200">{move.black || ''}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="text-sm text-slate-500 italic">No moves yet. Start playing!</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
