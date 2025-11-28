"use client";

import { useState } from "react";
import { UserMenu } from "./user-menu";
import { AuthModal } from "./auth-modal";
import { useAuthStore } from "@/state/auth-store";
import Link from "next/link";

export function Navbar() {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const { isAuthenticated } = useAuthStore();

    return (
        <>
            <header className="border-b border-white/5 bg-slate-950/60 backdrop-blur-md sticky top-0 z-50">
                <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-8">
                        <Link href="/" className="text-xl font-bold tracking-tight text-white flex items-center gap-2 hover:opacity-80 transition">
                            <span className="h-8 w-8 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950">
                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
                                </svg>
                            </span>
                            Flux Chess
                        </Link>
                        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
                            <Link href="/" className="hover:text-emerald-400 transition">Play</Link>
                            <Link href="/puzzles" className="hover:text-emerald-400 transition">Puzzles</Link>
                            <Link href="/analysis-board" className="hover:text-emerald-400 transition">Analysis</Link>
                            <Link href="/watch" className="hover:text-emerald-400 transition">Watch</Link>
                            <Link href="/community" className="hover:text-emerald-400 transition">Community</Link>
                        </nav>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="text-slate-400 hover:text-white transition">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                        {isAuthenticated ? (
                            <UserMenu />
                        ) : (
                            <button
                                onClick={() => setIsAuthModalOpen(true)}
                                className="rounded-lg bg-emerald-500 px-5 py-2 text-sm font-bold text-slate-950 transition hover:bg-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                            >
                                Log In
                            </button>
                        )}
                    </div>
                </div>
            </header>

            <AuthModal
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
            />
        </>
    );
}
