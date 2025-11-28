"use client";

import { useState } from "react";
import { authApi } from "@/lib/auth-api";

interface LoginFormProps {
    onSuccess: () => void;
    onSwitchToRegister: () => void;
}

export function LoginForm({ onSuccess, onSwitchToRegister }: LoginFormProps) {
    const [emailOrUsername, setEmailOrUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            await authApi.login({ emailOrUsername, password });
            onSuccess();
        } catch (err: any) {
            setError(
                err.response?.data?.message || "Login failed. Please try again."
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
                <label
                    htmlFor="emailOrUsername"
                    className="mb-2 block text-sm font-medium text-slate-200"
                >
                    Email or Username
                </label>
                <input
                    id="emailOrUsername"
                    type="text"
                    value={emailOrUsername}
                    onChange={(e) => setEmailOrUsername(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-400 transition focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/20"
                    placeholder="Enter your email or username"
                    required
                    disabled={isLoading}
                />
            </div>

            <div>
                <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium text-slate-200"
                >
                    Password
                </label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-400 transition focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/20"
                    placeholder="Enter your password"
                    required
                    disabled={isLoading}
                />
            </div>

            {error && (
                <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                    {error}
                </div>
            )}

            <button
                type="submit"
                disabled={isLoading}
                className="rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-white transition hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isLoading ? "Logging in..." : "Log In"}
            </button>

            <p className="text-center text-sm text-slate-400">
                Don't have an account?{" "}
                <button
                    type="button"
                    onClick={onSwitchToRegister}
                    className="font-medium text-emerald-400 transition hover:text-emerald-300"
                >
                    Sign up
                </button>
            </p>
        </form>
    );
}
