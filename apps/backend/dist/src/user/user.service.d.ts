import { PrismaService } from '../prisma/prisma.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
export declare class UserService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    updateProfile(userId: string, updateData: UpdateProfileDto): Promise<({
        ratings: {
            rating: number;
            userId: string;
            deviation: number;
            volatility: number;
            id: string;
            timeControl: import("src/generated/client").$Enums.TimeControl;
            updatedAt: Date;
        }[];
    } & {
        id: string;
        createdAt: Date;
        email: string;
        username: string;
        updatedAt: Date;
        passwordHash: string;
        isEmailVerified: boolean;
        refreshTokenHash: string | null;
        lastLoginAt: Date | null;
        biography: string | null;
        flair: string | null;
        country: string | null;
        location: string | null;
        realName: string | null;
        fideRating: number | null;
        uscfRating: number | null;
        ecfRating: number | null;
        rcfRating: number | null;
        cfcRating: number | null;
        dsbRating: number | null;
        socialLinks: string | null;
    }) | null>;
    getProfile(userId: string): Promise<({
        ratings: {
            rating: number;
            userId: string;
            deviation: number;
            volatility: number;
            id: string;
            timeControl: import("src/generated/client").$Enums.TimeControl;
            updatedAt: Date;
        }[];
    } & {
        id: string;
        createdAt: Date;
        email: string;
        username: string;
        updatedAt: Date;
        passwordHash: string;
        isEmailVerified: boolean;
        refreshTokenHash: string | null;
        lastLoginAt: Date | null;
        biography: string | null;
        flair: string | null;
        country: string | null;
        location: string | null;
        realName: string | null;
        fideRating: number | null;
        uscfRating: number | null;
        ecfRating: number | null;
        rcfRating: number | null;
        cfcRating: number | null;
        dsbRating: number | null;
        socialLinks: string | null;
    }) | null>;
    private upsertRating;
}
