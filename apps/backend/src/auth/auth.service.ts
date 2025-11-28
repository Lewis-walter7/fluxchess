import {
    Injectable,
    UnauthorizedException,
    ConflictException,
    Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import type { EnvironmentVariables } from '../config/env.validation';

export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
}

export interface AuthResponse extends AuthTokens {
    user: {
        id: string;
        email: string;
        username: string;
        isEmailVerified: boolean;
    };
}

export interface JwtPayload {
    sub: string;
    email: string;
    username: string;
}

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);
    private readonly bcryptRounds: number;

    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService<EnvironmentVariables>,
    ) {
        this.bcryptRounds = this.configService.get('BCRYPT_ROUNDS', { infer: true }) ?? 10;
    }

    async register(registerDto: RegisterDto): Promise<AuthResponse> {
        const { email, username, password } = registerDto;

        // Check if user already exists
        const existingUser = await this.prisma.user.findFirst({
            where: {
                OR: [{ email }, { username }],
            },
        });

        if (existingUser) {
            if (existingUser.email === email) {
                throw new ConflictException('Email already registered');
            }
            throw new ConflictException('Username already taken');
        }

        // Hash password
        const passwordHash = await this.hashPassword(password);

        // Create user
        const user = await this.prisma.user.create({
            data: {
                email,
                username,
                passwordHash,
            },
        });

        this.logger.log(`New user registered: ${user.username} (${user.id})`);

        // Generate tokens
        const tokens = await this.generateTokens(user.id, user.email, user.username);

        // Store refresh token hash
        await this.updateRefreshToken(user.id, tokens.refreshToken);

        return {
            ...tokens,
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
                isEmailVerified: user.isEmailVerified,
            },
        };
    }

    async login(loginDto: LoginDto): Promise<AuthResponse> {
        const { emailOrUsername, password } = loginDto;

        // Find user by email or username
        const user = await this.prisma.user.findFirst({
            where: {
                OR: [{ email: emailOrUsername }, { username: emailOrUsername }],
            },
        });

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // Verify password
        const isPasswordValid = await this.comparePassword(
            password,
            user.passwordHash,
        );

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // Update last login
        await this.prisma.user.update({
            where: { id: user.id },
            data: { lastLoginAt: new Date() },
        });

        this.logger.log(`User logged in: ${user.username} (${user.id})`);

        // Generate tokens
        const tokens = await this.generateTokens(user.id, user.email, user.username);

        // Store refresh token hash
        await this.updateRefreshToken(user.id, tokens.refreshToken);

        return {
            ...tokens,
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
                isEmailVerified: user.isEmailVerified,
            },
        };
    }

    async refreshToken(refreshToken: string): Promise<AuthTokens> {
        try {
            const payload = await this.jwtService.verifyAsync<JwtPayload>(
                refreshToken,
                {
                    secret: this.configService.get('JWT_REFRESH_SECRET', {
                        infer: true,
                    }),
                },
            );

            // Find user and verify refresh token
            const user = await this.prisma.user.findUnique({
                where: { id: payload.sub },
            });

            if (!user || !user.refreshTokenHash) {
                throw new UnauthorizedException('Invalid refresh token');
            }

            const isRefreshTokenValid = await this.comparePassword(
                refreshToken,
                user.refreshTokenHash,
            );

            if (!isRefreshTokenValid) {
                throw new UnauthorizedException('Invalid refresh token');
            }

            // Generate new tokens
            const tokens = await this.generateTokens(
                user.id,
                user.email,
                user.username,
            );

            // Update refresh token hash
            await this.updateRefreshToken(user.id, tokens.refreshToken);

            return tokens;
        } catch (error) {
            throw new UnauthorizedException('Invalid refresh token');
        }
    }

    async logout(userId: string): Promise<void> {
        await this.prisma.user.update({
            where: { id: userId },
            data: { refreshTokenHash: null },
        });

        this.logger.log(`User logged out: ${userId}`);
    }

    async validateUser(userId: string) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                username: true,
                isEmailVerified: true,
                createdAt: true,
            },
        });

        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        return user;
    }

    private async generateTokens(
        userId: string,
        email: string,
        username: string,
    ): Promise<AuthTokens> {
        const payload: JwtPayload = {
            sub: userId,
            email,
            username,
        };

        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload, {
                secret: this.configService.get('JWT_ACCESS_SECRET', { infer: true }),
                expiresIn: this.configService.get('JWT_ACCESS_EXPIRATION', {
                    infer: true,
                }),
            }),
            this.jwtService.signAsync(payload, {
                secret: this.configService.get('JWT_REFRESH_SECRET', { infer: true }),
                expiresIn: this.configService.get('JWT_REFRESH_EXPIRATION', {
                    infer: true,
                }),
            }),
        ]);

        return { accessToken, refreshToken };
    }

    private async updateRefreshToken(
        userId: string,
        refreshToken: string,
    ): Promise<void> {
        const refreshTokenHash = await this.hashPassword(refreshToken);

        await this.prisma.user.update({
            where: { id: userId },
            data: { refreshTokenHash },
        });
    }

    private async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, this.bcryptRounds);
    }

    private async comparePassword(
        password: string,
        hash: string,
    ): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }
}
