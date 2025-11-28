import axios from 'axios';
import type {
    RegisterPayload,
    LoginPayload,
    AuthResponse,
    RefreshTokenPayload,
    AuthenticatedUser,
} from '@chess/contracts';
import { useAuthStore } from '../state/auth-store';

const API_URL = process.env.NEXT_PUBLIC_WS_URL || 'http://localhost:4000';

// Create axios instance
const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

// Request interceptor to add auth token
api.interceptors.request.use(
    (config) => {
        const token = useAuthStore.getState().accessToken;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor for token refresh
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If error is 401 and we haven't retried yet
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Try to refresh the token
                const refreshToken = localStorage.getItem('refreshToken');
                if (!refreshToken) {
                    throw new Error('No refresh token');
                }

                const response = await axios.post<{ accessToken: string; refreshToken: string }>(
                    `${API_URL}/auth/refresh`,
                    { refreshToken },
                    { withCredentials: true }
                );

                const { accessToken, refreshToken: newRefreshToken } = response.data;

                // Update tokens
                useAuthStore.getState().setAccessToken(accessToken);
                localStorage.setItem('refreshToken', newRefreshToken);

                // Retry original request with new token
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                // Refresh failed, logout user
                useAuthStore.getState().logout();
                localStorage.removeItem('refreshToken');
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export const authApi = {
    async register(payload: RegisterPayload): Promise<AuthResponse> {
        const response = await api.post<AuthResponse>('/auth/register', payload);
        const { user, accessToken, refreshToken } = response.data;

        // Store tokens
        useAuthStore.getState().login(user, accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        return response.data;
    },

    async login(payload: LoginPayload): Promise<AuthResponse> {
        const response = await api.post<AuthResponse>('/auth/login', payload);
        const { user, accessToken, refreshToken } = response.data;

        // Store tokens
        useAuthStore.getState().login(user, accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        return response.data;
    },

    async logout(): Promise<void> {
        try {
            await api.post('/auth/logout');
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            // Clear local state regardless of API call result
            useAuthStore.getState().logout();
            localStorage.removeItem('refreshToken');
        }
    },

    async getCurrentUser(): Promise<AuthenticatedUser> {
        const response = await api.get<AuthenticatedUser>('/auth/me');
        useAuthStore.getState().setUser(response.data);
        return response.data;
    },

    async refreshToken(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> {
        const response = await api.post<{ accessToken: string; refreshToken: string }>(
            '/auth/refresh',
            { refreshToken }
        );
        return response.data;
    },
};

export default api;
