"use client";

import { useAuthStore } from "@/state/auth-store";
import { authApi } from "@/lib/auth-api";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export function UserMenu() {
    const router = useRouter();
    const { user, logout } = useAuthStore();
    const [ping, setPing] = useState(0);

    useEffect(() => {
        // Simulate ping measurement (replace with actual implementation)
        const interval = setInterval(() => {
            setPing(Math.floor(Math.random() * 100) + 50);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const handleLogout = async () => {
        await authApi.logout();
    };

    if (!user) return null;

    return (
        <div className="relative group">
            <button
                type="button"
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 font-medium text-white transition hover:bg-white/10"
            >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-sm font-bold">
                    {user.username.charAt(0).toUpperCase()}
                </div>
                <span>{user.username}</span>
                <span aria-hidden>▾</span>
            </button>

            <div className="pointer-events-none absolute right-0 top-full z-20 mt-2 hidden min-w-[220px] flex-col rounded-2xl border border-white/10 bg-slate-900/95 backdrop-blur-sm shadow-2xl transition group-hover:flex group-hover:pointer-events-auto before:absolute before:-top-2 before:left-0 before:h-2 before:w-full before:content-['']">
                {/* User Info Header */}
                <div className="border-b border-white/10 px-4 py-3">
                    <p className="text-sm font-semibold text-white">{user.username}</p>
                    <p className="text-xs text-slate-400">{user.email}</p>
                </div>

                {/* Main Navigation */}
                <div className="flex flex-col py-1">
                    <button className="flex items-center gap-3 px-4 py-2.5 text-left text-sm font-medium text-white transition hover:bg-white/10">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Profile
                    </button>
                    <button className="flex items-center gap-3 px-4 py-2.5 text-left text-sm font-medium text-white transition hover:bg-white/10">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Inbox
                    </button>
                    <button
                        onClick={() => router.push("/preferences")}
                        className="flex items-center gap-3 px-4 py-2.5 text-left text-sm font-medium text-white transition hover:bg-white/10"
                    >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Preferences
                    </button>
                </div>

                {/* Divider */}
                <div className="border-t border-white/10" />

                {/* Settings Categories */}
                <div className="flex flex-col py-1">
                    <button className="flex items-center justify-between px-4 py-2.5 text-left text-sm font-medium text-white transition hover:bg-white/10">
                        <span>Language</span>
                        <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                    <button className="flex items-center justify-between px-4 py-2.5 text-left text-sm font-medium text-white transition hover:bg-white/10">
                        <span>Sound</span>
                        <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                    <button className="flex items-center justify-between px-4 py-2.5 text-left text-sm font-medium text-white transition hover:bg-white/10">
                        <span>Background</span>
                        <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                    <button className="flex items-center justify-between px-4 py-2.5 text-left text-sm font-medium text-white transition hover:bg-white/10">
                        <span>Board</span>
                        <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                    <button className="flex items-center justify-between px-4 py-2.5 text-left text-sm font-medium text-white transition hover:bg-white/10">
                        <span>Piece set</span>
                        <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                {/* Divider */}
                <div className="border-t border-white/10" />

                {/* Sign Out */}
                <div className="py-1">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-2.5 text-left text-sm font-medium text-red-400 transition hover:bg-white/10"
                    >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Sign out
                    </button>
                </div>

                {/* Connection Status Footer */}
                <div className="border-t border-white/10 px-4 py-2 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                        <span className="text-slate-400">PING</span>
                        <span className="font-mono text-emerald-400">{ping} ms</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-slate-400">SERVER</span>
                        <div className="flex gap-0.5">
                            <div className="h-3 w-1 bg-emerald-500 rounded-sm" />
                            <div className="h-3 w-1 bg-emerald-500 rounded-sm opacity-75" />
                            <div className="h-3 w-1 bg-slate-600 rounded-sm" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
