import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { TimeControl } from '@prisma/client';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) { }

    async updateProfile(userId: string, updateData: UpdateProfileDto) {
        const {
            bulletRating,
            blitzRating,
            rapidRating,
            classicalRating,
            ...userProfileData
        } = updateData;

        // Update User model fields
        const user = await this.prisma.user.update({
            where: { id: userId },
            data: userProfileData,
        });

        // Update or create ratings if provided
        const ratingUpdates = [];

        if (bulletRating !== undefined) {
            ratingUpdates.push(this.upsertRating(userId, TimeControl.BULLET, bulletRating));
        }
        if (blitzRating !== undefined) {
            ratingUpdates.push(this.upsertRating(userId, TimeControl.BLITZ, blitzRating));
        }
        if (rapidRating !== undefined) {
            ratingUpdates.push(this.upsertRating(userId, TimeControl.RAPID, rapidRating));
        }
        if (classicalRating !== undefined) {
            ratingUpdates.push(this.upsertRating(userId, TimeControl.CLASSICAL, classicalRating));
        }

        await Promise.all(ratingUpdates);

        return this.getProfile(userId);
    }

    async getProfile(userId: string) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: {
                ratings: true,
            },
        });

        if (!user) return null;

        // Transform ratings array into an object for easier consumption if needed,
        // or just return as is. The frontend might expect specific fields.
        // For now, let's return the user with the ratings array.
        return user;
    }

    private async upsertRating(userId: string, timeControl: TimeControl, rating: number) {
        // Default values for new ratings
        const defaultDeviation = 350;
        const defaultVolatility = 0.06;

        return this.prisma.rating.upsert({
            where: {
                userId_timeControl: {
                    userId,
                    timeControl,
                },
            },
            update: {
                rating,
            },
            create: {
                userId,
                timeControl,
                rating,
                deviation: defaultDeviation,
                volatility: defaultVolatility,
            },
        });
    }
}
