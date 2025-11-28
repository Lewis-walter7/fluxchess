"use client";

import { useEffect, useState } from "react";
import { socketClient } from "@/lib/socket/client";

type ConnectionState = "connected" | "reconnected" | "reconnecting" | "disconnected" | "offline" | null;

export function ConnectionStatus() {
    const [state, setState] = useState<ConnectionState>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [hasConnectedBefore, setHasConnectedBefore] = useState(false);

    useEffect(() => {
        const socket = socketClient();

        const handleConnect = () => {
            if (hasConnectedBefore) {
                // If we've connected before, this is a reconnection
                setState("reconnected");
                setIsVisible(true);

                // Auto-hide after 3 seconds
                setTimeout(() => {
                    setIsVisible(false);
                    setTimeout(() => setState(null), 300); // Wait for fade out
                }, 3000);
            } else {
                // First connection
                setState("connected");
                setIsVisible(true);
                setHasConnectedBefore(true);

                // Auto-hide after 3 seconds
                setTimeout(() => {
                    setIsVisible(false);
                    setTimeout(() => setState(null), 300); // Wait for fade out
                }, 3000);
            }
        };

        const handleDisconnect = () => {
            setState("disconnected");
            setIsVisible(true);
        };

        const handleReconnecting = () => {
            setState("reconnecting");
            setIsVisible(true);
        };

        const handleConnectError = () => {
            setState("offline");
            setIsVisible(true);
        };

        // Check initial connection state
        if (socket.connected) {
            setHasConnectedBefore(true);
        }

        socket.on('connect', handleConnect);
        socket.on('disconnect', handleDisconnect);
        socket.io.on('reconnect_attempt', handleReconnecting);
        socket.on('connect_error', handleConnectError);

        return () => {
            socket.off('connect', handleConnect);
            socket.off('disconnect', handleDisconnect);
            socket.io.off('reconnect_attempt', handleReconnecting);
            socket.off('connect_error', handleConnectError);
        };
    }, [hasConnectedBefore]);

    if (!state) return null;

    const getStateConfig = () => {
        switch (state) {
            case "connected":
                return {
                    bg: "bg-emerald-500/20",
                    border: "border-emerald-500/30",
                    text: "text-emerald-400",
                    label: "Connected",
                    icon: (
                        <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
                    ),
                };
            case "reconnected":
                return {
                    bg: "bg-blue-500/20",
                    border: "border-blue-500/30",
                    text: "text-blue-400",
                    label: "Reconnected",
                    icon: (
                        <span className="inline-block w-2 h-2 rounded-full bg-blue-400"></span>
                    ),
                };
            case "reconnecting":
                return {
                    bg: "bg-amber-500/20",
                    border: "border-amber-500/30",
                    text: "text-amber-400",
                    label: "Reconnecting...",
                    icon: (
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                        </span>
                    ),
                };
            case "disconnected":
            case "offline":
                return {
                    bg: "bg-red-500/20",
                    border: "border-red-500/30",
                    text: "text-red-400",
                    label: state === "offline" ? "Offline" : "Disconnected",
                    icon: (
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                        </span>
                    ),
                };
        }
    };

    const config = getStateConfig();

    return (
        <div
            className={`fixed top-4 right-4 z-50 px-3 py-2 rounded-lg ${config.bg} border ${config.border} ${config.text} text-xs font-medium shadow-lg backdrop-blur-sm transition-all duration-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
                }`}
        >
            <div className="flex items-center gap-2">
                {config.icon}
                <span>{config.label}</span>
            </div>
        </div>
    );
}
