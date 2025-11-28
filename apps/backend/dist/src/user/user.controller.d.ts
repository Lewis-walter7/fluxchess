import { UserService } from './user.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { User } from '../generated/client';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getProfile(user: User): Promise<({
        ratings: {
            rating: number;
            userId: string;
            deviation: number;
            volatility: number;
            id: string;
            timeControl: import("../generated/client").$Enums.TimeControl;
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
    updateProfile(user: User, updateProfileDto: UpdateProfileDto): Promise<({
        ratings: {
            rating: number;
            userId: string;
            deviation: number;
            volatility: number;
            id: string;
            timeControl: import("../generated/client").$Enums.TimeControl;
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
}
