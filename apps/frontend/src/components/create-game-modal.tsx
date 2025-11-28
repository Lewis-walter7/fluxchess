"use client";

import { useState } from "react";
import { useGameStore } from "@/state/game/store";
import type { TimeControl } from "@chess/contracts";

interface CreateGameModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type Variant = "standard" | "chess960" | "crazyhouse" | "kingofthehill" | "threecheck";
type GameMode = "rated" | "casual";
type GameColor = "white" | "black" | "random";

const VARIANTS: { id: Variant; label: string }[] = [
    { id: "standard", label: "Standard" },
    { id: "chess960", label: "Chess960" },
    { id: "crazyhouse", label: "Crazyhouse" },
    { id: "kingofthehill", label: "King of the Hill" },
    { id: "threecheck", label: "Three-check" },
];

export function CreateGameModal({ isOpen, onClose }: CreateGameModalProps) {
    const [step, setStep] = useState<"menu" | "friend_setup">("menu");
    const [variant, setVariant] = useState<Variant>("standard");
    const [timeControlType, setTimeControlType] = useState<"realtime" | "correspondence" | "unlimited">("realtime");
    const [mode, setMode] = useState<GameMode>("rated");
    const [color, setColor] = useState<GameColor>("random");

    // Real-time settings
    const [minutes, setMinutes] = useState(10);
    const [increment, setIncrement] = useState(0);

    // Correspondence settings
    const [daysPerTurn, setDaysPerTurn] = useState(1);

    const joinQueue = useGameStore((state) => state.joinQueue);

    if (!isOpen) return null;

    const handleCreate = () => {
        console.log({
            variant,
            timeControlType,
            mode,
            color,
            settings: timeControlType === 'realtime' ? { minutes, increment } : { daysPerTurn }
        });
        onClose();
    };

    const resetAndClose = () => {
        setStep("menu");
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-slate-900 shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/5 px-6 py-4 bg-slate-900/50">
                    <div className="flex items-center gap-3">
                        {step === "friend_setup" && (
                            <button
                                onClick={() => setStep("menu")}
                                className="rounded-full p-1 text-slate-400 hover:text-white transition"
                            >
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                        )}
                        <h2 className="text-xl font-bold text-white">
                            {step === "menu" ? "Play Chess" : "Challenge a Friend"}
                        </h2>
                    </div>
                    <button
                        onClick={resetAndClose}
                        className="rounded-full p-2 text-slate-400 hover:bg-white/10 hover:text-white transition"
                    >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {step === "menu" ? (
                    <div className="p-4 space-y-3">
                        <button
                            disabled
                            className="w-full flex items-center gap-3 rounded-xl border border-white/5 bg-white/5 p-3 text-left opacity-50 cursor-not-allowed"
                        >
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-slate-400">
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-sm">Create Lobby Game</h3>
                                <p className="text-xs text-slate-400">Coming soon</p>
                            </div>
                        </button>

                        <button
                            onClick={() => setStep("friend_setup")}
                            className="w-full flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 text-left transition hover:bg-white/10 hover:border-emerald-500/50 group"
                        >
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-slate-900 transition">
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-sm group-hover:text-emerald-400 transition">Challenge a Friend</h3>
                                <p className="text-xs text-slate-400">Create a link to play with someone</p>
                            </div>
                        </button>

                        <button
                            disabled
                            className="w-full flex items-center gap-3 rounded-xl border border-white/5 bg-white/5 p-3 text-left opacity-50 cursor-not-allowed"
                        >
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-slate-400">
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-sm">Play vs Computer</h3>
                                <p className="text-xs text-slate-400">Coming soon</p>
                            </div>
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="p-4 space-y-5 max-h-[60vh] overflow-y-auto">
                            {/* Variant Selection */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Variant</label>
                                <select
                                    value={variant}
                                    onChange={(e) => setVariant(e.target.value as Variant)}
                                    className="w-full rounded-lg border border-white/10 bg-slate-800 px-3 py-2 text-sm text-white outline-none focus:border-emerald-500 transition"
                                >
                                    {VARIANTS.map((v) => (
                                        <option key={v.id} value={v.id}>{v.label}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Time Control Type */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Time Control</label>
                                <div className="flex rounded-lg bg-slate-800 p-1">
                                    {(['realtime', 'correspondence', 'unlimited'] as const).map((type) => (
                                        <button
                                            key={type}
                                            onClick={() => setTimeControlType(type)}
                                            className={`flex-1 rounded-md py-1.5 text-[10px] font-bold uppercase transition ${timeControlType === type
                                                ? "bg-emerald-600 text-white shadow-lg"
                                                : "text-slate-400 hover:text-white"
                                                }`}
                                        >
                                            {type === 'realtime' ? 'Real Time' : type}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Time Settings */}
                            {timeControlType === 'realtime' && (
                                <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
                                    <div className="space-y-1">
                                        <div className="flex justify-between text-xs">
                                            <span className="text-slate-300">Minutes per side</span>
                                            <span className="font-mono text-emerald-400">{minutes} min</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="0"
                                            max="180"
                                            value={minutes}
                                            onChange={(e) => setMinutes(parseInt(e.target.value))}
                                            className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-slate-800 accent-emerald-500"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex justify-between text-xs">
                                            <span className="text-slate-300">Increment in seconds</span>
                                            <span className="font-mono text-emerald-400">{increment} sec</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="0"
                                            max="180"
                                            value={increment}
                                            onChange={(e) => setIncrement(parseInt(e.target.value))}
                                            className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-slate-800 accent-emerald-500"
                                        />
                                    </div>
                                </div>
                            )}

                            {timeControlType === 'correspondence' && (
                                <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
                                    <div className="space-y-1">
                                        <div className="flex justify-between text-xs">
                                            <span className="text-slate-300">Days per turn</span>
                                            <span className="font-mono text-emerald-400">{daysPerTurn} {daysPerTurn === 1 ? 'day' : 'days'}</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="1"
                                            max="14"
                                            value={daysPerTurn}
                                            onChange={(e) => setDaysPerTurn(parseInt(e.target.value))}
                                            className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-slate-800 accent-emerald-500"
                                        />
                                        <div className="flex justify-between text-[10px] text-slate-500">
                                            <span>1</span>
                                            <span>3</span>
                                            <span>7</span>
                                            <span>14</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Mode */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Mode</label>
                                <div className="flex rounded-lg bg-slate-800 p-1">
                                    <button
                                        onClick={() => setMode("rated")}
                                        className={`flex-1 rounded-md py-1.5 text-xs font-medium transition ${mode === "rated"
                                            ? "bg-emerald-600 text-white shadow-lg"
                                            : "text-slate-400 hover:text-white"
                                            }`}
                                    >
                                        Rated
                                    </button>
                                    <button
                                        onClick={() => setMode("casual")}
                                        className={`flex-1 rounded-md py-1.5 text-xs font-medium transition ${mode === "casual"
                                            ? "bg-emerald-600 text-white shadow-lg"
                                            : "text-slate-400 hover:text-white"
                                            }`}
                                    >
                                        Casual
                                    </button>
                                </div>
                            </div>

                            {/* Color */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Color</label>
                                <div className="flex gap-3 justify-center">
                                    <button
                                        onClick={() => setColor("white")}
                                        className={`group flex h-12 w-12 items-center justify-center rounded-xl border-2 transition ${color === "white"
                                            ? "border-emerald-500 bg-white text-slate-900"
                                            : "border-white/10 bg-white/5 text-white hover:border-white/30"
                                            }`}
                                    >
                                        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => setColor("random")}
                                        className={`group flex h-12 w-12 items-center justify-center rounded-xl border-2 transition ${color === "random"
                                            ? "border-emerald-500 bg-gradient-to-br from-slate-700 to-slate-800 text-white"
                                            : "border-white/10 bg-white/5 text-slate-300 hover:border-white/30"
                                            }`}
                                    >
                                        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => setColor("black")}
                                        className={`group flex h-12 w-12 items-center justify-center rounded-xl border-2 transition ${color === "black"
                                            ? "border-emerald-500 bg-black text-white"
                                            : "border-white/10 bg-black/40 text-slate-500 hover:border-white/30"
                                            }`}
                                    >
                                        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="border-t border-white/5 bg-slate-900/50 p-4">
                            <button
                                onClick={handleCreate}
                                className="w-full rounded-xl bg-emerald-500 py-3 text-base font-bold text-slate-900 shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-400 hover:shadow-emerald-500/30 active:scale-[0.98]"
                            >
                                Create Game
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
