import api from '../auth-api';

export interface UpdateProfilePayload {
    biography?: string;
    flair?: string;
    country?: string;
    location?: string;
    realName?: string;
    fideRating?: number;
    uscfRating?: number;
    ecfRating?: number;
    rcfRating?: number;
    cfcRating?: number;
    dsbRating?: number;
    socialLinks?: string;
    bulletRating?: number;
    blitzRating?: number;
    rapidRating?: number;
    classicalRating?: number;
}

export interface UserProfile {
    id: string;
    email: string;
    username: string;
    biography?: string;
    flair?: string;
    country?: string;
    location?: string;
    realName?: string;
    fideRating?: number;
    uscfRating?: number;
    ecfRating?: number;
    rcfRating?: number;
    cfcRating?: number;
    dsbRating?: number;
    socialLinks?: string;
    ratings: {
        timeControl: 'BULLET' | 'BLITZ' | 'RAPID' | 'CLASSICAL';
        rating: number;
        deviation: number;
        volatility: number;
    }[];
}

export const userApi = {
    async getProfile(): Promise<UserProfile> {
        const response = await api.get<UserProfile>('/users/profile');
        return response.data;
    },

    async updateProfile(payload: UpdateProfilePayload): Promise<UserProfile> {
        const response = await api.patch<UserProfile>('/users/profile', payload);
        return response.data;
    },
};
