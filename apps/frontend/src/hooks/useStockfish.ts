import { useEffect, useRef, useState } from 'react';

export interface StockfishAnalysis {
    evaluation: string; // "+1.2", "-0.5", "M5" (mate in 5)
    depth: number;
    bestMove: string | null; // "e2e4"
    pv: string[]; // Principal variation (best line)
}

export function useStockfish(enabled: boolean, fen: string) {
    const [analysis, setAnalysis] = useState<StockfishAnalysis>({
        evaluation: '0.0',
        depth: 0,
        bestMove: null,
        pv: [],
    });
    const engineRef = useRef<Worker | null>(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        if (!enabled) {
            // Stop engine if disabled
            if (engineRef.current) {
                engineRef.current.terminate();
                engineRef.current = null;
                setIsReady(false);
            }
            setAnalysis({
                evaluation: '0.0',
                depth: 0,
                bestMove: null,
                pv: [],
            });
            return;
        }

        // Initialize Stockfish worker
        const initEngine = async () => {
            try {
                // Import Stockfish dynamically
                // const Stockfish = await import('stockfish.js');
                const engine = new Worker('/stockfish/stockfish.js');
                engineRef.current = engine;

                engine.onmessage = (event) => {
                    const message = event.data;
                    console.log('Stockfish:', message);

                    if (message === 'uciok') {
                        setIsReady(true);
                        engine.postMessage('setoption name Hash value 64');
                        engine.postMessage('setoption name Threads value 1');
                        engine.postMessage('ucinewgame');
                        engine.postMessage('isready');
                    }

                    if (message === 'readyok') {
                        // Engine is ready, start analyzing current position
                        engine.postMessage(`position fen ${fen}`);
                        engine.postMessage('go depth 22');
                    }

                    // Parse analysis info
                    if (message.startsWith('info')) {
                        parseAnalysis(message, fen);
                    }

                    // Parse best move
                    if (message.startsWith('bestmove')) {
                        const parts = message.split(' ');
                        const bestMove = parts[1];
                        if (bestMove && bestMove !== '(none)') {
                            setAnalysis(prev => ({ ...prev, bestMove }));
                        }
                    }
                };

                // Initialize UCI
                engine.postMessage('uci');
            } catch (error) {
                console.error('Failed to initialize Stockfish:', error);
            }
        };

        initEngine();

        return () => {
            if (engineRef.current) {
                engineRef.current.terminate();
                engineRef.current = null;
            }
        };
    }, [enabled]);

    // Update position when FEN changes
    useEffect(() => {
        if (enabled && isReady && engineRef.current) {
            engineRef.current.postMessage('stop');
            engineRef.current.postMessage(`position fen ${fen}`);
            engineRef.current.postMessage('go depth 22');
        }
    }, [enabled, isReady, fen]);

    const parseAnalysis = (message: string, currentFen: string) => {
        try {
            const parts = message.split(' ');
            let depth = 0;
            let evaluation = '0.0';
            let pv: string[] = [];

            // Extract depth
            const depthIndex = parts.indexOf('depth');
            if (depthIndex !== -1 && parts[depthIndex + 1]) {
                depth = parseInt(parts[depthIndex + 1]);
            }

            // Extract evaluation
            const scoreIndex = parts.indexOf('score');
            if (scoreIndex !== -1) {
                const scoreType = parts[scoreIndex + 1];
                const scoreValue = parts[scoreIndex + 2];

                if (scoreType === 'cp' && scoreValue) {
                    // Centipawns (divide by 100 for pawn units)
                    let pawns = parseInt(scoreValue) / 100;

                    // Normalize score to White's perspective
                    // Stockfish gives score relative to side to move
                    const turn = currentFen.split(' ')[1]; // 'w' or 'b'
                    if (turn === 'b') {
                        pawns = -pawns;
                    }

                    evaluation = pawns >= 0 ? `+${pawns.toFixed(1)}` : pawns.toFixed(1);
                } else if (scoreType === 'mate' && scoreValue) {
                    // Mate in X moves
                    evaluation = `M${scoreValue}`;
                }
            }

            // Extract principal variation
            const pvIndex = parts.indexOf('pv');
            if (pvIndex !== -1) {
                pv = parts.slice(pvIndex + 1, pvIndex + 6); // Get first 5 moves
            }

            setAnalysis(prev => ({
                ...prev,
                depth,
                evaluation,
                pv,
                // Update best move immediately from PV if available
                // This makes the arrow update much faster than waiting for 'bestmove'
                bestMove: pv.length > 0 ? pv[0] : prev.bestMove
            }));
        } catch (error) {
            console.error('Error parsing analysis:', error);
        }
    };

    return analysis;
}
