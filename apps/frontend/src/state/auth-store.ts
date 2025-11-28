import { create } from 'zustand';
import type { AuthenticatedUser } from '@chess/contracts';

interface AuthState {
    user: AuthenticatedUser | null;
    accessToken: string | null;
    isAuthenticated: boolean;
    login: (user: AuthenticatedUser, accessToken: string) => void;
    logout: () => void;
    setUser: (user: AuthenticatedUser) => void;
    setAccessToken: (token: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    accessToken: null,
    isAuthenticated: false,

    login: (user, accessToken) =>
        set({
            user,
            accessToken,
            isAuthenticated: true,
        }),

    logout: () =>
        set({
            user: null,
            accessToken: null,
            isAuthenticated: false,
        }),

    setUser: (user) =>
        set({ user }),

    setAccessToken: (token) =>
        set({ accessToken: token }),
}));
