import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
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
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    private readonly configService;
    private readonly logger;
    private readonly bcryptRounds;
    constructor(prisma: PrismaService, jwtService: JwtService, configService: ConfigService<EnvironmentVariables>);
    register(registerDto: RegisterDto): Promise<AuthResponse>;
    login(loginDto: LoginDto): Promise<AuthResponse>;
    refreshToken(refreshToken: string): Promise<AuthTokens>;
    logout(userId: string): Promise<void>;
    validateUser(userId: string): Promise<{
        id: string;
        createdAt: Date;
        email: string;
        username: string;
        isEmailVerified: boolean;
    }>;
    private generateTokens;
    private updateRefreshToken;
    private hashPassword;
    private comparePassword;
}
