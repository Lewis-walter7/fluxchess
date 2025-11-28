"use client";

import type { ClientToServerEvents, ServerToClientEvents } from "@chess/contracts";
import { io, type Socket } from "socket.io-client";
import { useAuthStore } from "@/state/auth-store";

type TypedSocket = Socket<ServerToClientEvents, ClientToServerEvents>;

let socketRef: TypedSocket | null = null;

const WS_URL = process.env.NEXT_PUBLIC_WS_URL ?? "http://localhost:4000";

export const socketClient = (): TypedSocket => {
  if (socketRef && socketRef.connected) {
    return socketRef;
  }

  if (!socketRef) {
    // Get auth token from store
    const token = useAuthStore.getState().accessToken;

    socketRef = io(`${WS_URL}/core`, {
      transports: ["websocket", "polling"],
      withCredentials: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      auth: {
        token: token || undefined, // Send token in auth handshake
      },
    });

    // Add connection event listeners for debugging
    socketRef.on('connect', () => {
      console.log('[WebSocket] Connected to server');
    });

    socketRef.on('connect_error', (error) => {
      console.error('[WebSocket] Connection error:', error.message);
    });

    socketRef.on('disconnect', (reason) => {
      console.log('[WebSocket] Disconnected:', reason);
    });
  } else if (!socketRef.connected) {
    socketRef.connect();
  }

  return socketRef;
};

/**
 * Wait for socket to be connected before proceeding
 */
export const waitForConnection = (socket: TypedSocket, timeoutMs = 5000): Promise<void> => {
  if (socket.connected) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error('WebSocket connection timeout'));
    }, timeoutMs);

    const handleConnect = () => {
      clearTimeout(timeout);
      socket.off('connect_error', handleError);
      resolve();
    };

    const handleError = (error: Error) => {
      clearTimeout(timeout);
      socket.off('connect', handleConnect);
      reject(error);
    };

    socket.once('connect', handleConnect);
    socket.once('connect_error', handleError);
  });
};

