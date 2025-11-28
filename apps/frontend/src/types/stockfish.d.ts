declare module 'stockfish.js' {
    interface StockfishEngine {
        onmessage: (event: { data: string }) => void;
        postMessage: (message: string) => void;
        terminate: () => void;
    }

    const Stockfish: () => Worker | StockfishEngine;
    export default Stockfish;
}
