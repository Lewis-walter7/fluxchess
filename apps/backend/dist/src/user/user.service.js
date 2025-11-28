"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("../generated/client");
let UserService = class UserService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async updateProfile(userId, updateData) {
        const { bulletRating, blitzRating, rapidRating, classicalRating, ...userProfileData } = updateData;
        const user = await this.prisma.user.update({
            where: { id: userId },
            data: userProfileData,
        });
        const ratingUpdates = [];
        if (bulletRating !== undefined) {
            ratingUpdates.push(this.upsertRating(userId, client_1.TimeControl.BULLET, bulletRating));
        }
        if (blitzRating !== undefined) {
            ratingUpdates.push(this.upsertRating(userId, client_1.TimeControl.BLITZ, blitzRating));
        }
        if (rapidRating !== undefined) {
            ratingUpdates.push(this.upsertRating(userId, client_1.TimeControl.RAPID, rapidRating));
        }
        if (classicalRating !== undefined) {
            ratingUpdates.push(this.upsertRating(userId, client_1.TimeControl.CLASSICAL, classicalRating));
        }
        await Promise.all(ratingUpdates);
        return this.getProfile(userId);
    }
    async getProfile(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: {
                ratings: true,
            },
        });
        if (!user)
            return null;
        return user;
    }
    async upsertRating(userId, timeControl, rating) {
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
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map