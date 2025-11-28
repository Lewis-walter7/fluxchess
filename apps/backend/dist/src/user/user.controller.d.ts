import { UserService } from './user.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { User } from '../generated/client';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getProfile(user: User): Promise<({
        ratings: {
            id: string;
            updatedAt: Date;
            rating: number;
            userId: string;
            timeControl: import("../generated/client").$Enums.TimeControl;
            deviation: number;
            volatility: number;
        }[];
    } & {
        id: string;
        email: string;
        username: string;
        createdAt: Date;
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
    updateProfile(user: User, updateProfileDto: UpdateProfileDto): Promise<({
        ratings: {
            id: string;
            updatedAt: Date;
            rating: number;
            userId: string;
            timeControl: import("../generated/client").$Enums.TimeControl;
            deviation: number;
            volatility: number;
        }[];
    } & {
        id: string;
        email: string;
        username: string;
        createdAt: Date;
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
}
