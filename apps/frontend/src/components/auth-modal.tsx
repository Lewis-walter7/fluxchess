"use client";

import { useState } from "react";
import { LoginForm } from "./auth/login-form";
import { RegisterForm } from "./auth/register-form";

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
    const [mode, setMode] = useState<"login" | "register">("login");

    if (!isOpen) return null;

    const handleSuccess = () => {
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-slate-900/95 p-8 shadow-2xl">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-slate-400 transition hover:text-white"
                    aria-label="Close"
                >
                    <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>

                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-white">
                        {mode === "login" ? "Welcome Back" : "Create Account"}
                    </h2>
                    <p className="mt-1 text-sm text-slate-400">
                        {mode === "login"
                            ? "Log in to start playing chess"
                            : "Sign up to join the Flux Chess community"}
                    </p>
                </div>

                {mode === "login" ? (
                    <LoginForm
                        onSuccess={handleSuccess}
                        onSwitchToRegister={() => setMode("register")}
                    />
                ) : (
                    <RegisterForm
                        onSuccess={handleSuccess}
                        onSwitchToLogin={() => setMode("login")}
                    />
                )}
            </div>
        </div>
    );
}
