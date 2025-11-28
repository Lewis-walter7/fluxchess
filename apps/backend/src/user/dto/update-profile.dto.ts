import { IsOptional, IsString, IsInt, IsEnum } from 'class-validator';
import { TimeControl } from '@prisma/client';

export class UpdateProfileDto {
    @IsOptional()
    @IsString()
    biography?: string;

    @IsOptional()
    @IsString()
    flair?: string;

    @IsOptional()
    @IsString()
    country?: string;

    @IsOptional()
    @IsString()
    location?: string;

    @IsOptional()
    @IsString()
    realName?: string;

    // Federation ratings
    @IsOptional()
    @IsInt()
    fideRating?: number;

    @IsOptional()
    @IsInt()
    uscfRating?: number;

    @IsOptional()
    @IsInt()
    ecfRating?: number;

    @IsOptional()
    @IsInt()
    rcfRating?: number;

    @IsOptional()
    @IsInt()
    cfcRating?: number;

    @IsOptional()
    @IsInt()
    dsbRating?: number;

    @IsOptional()
    @IsString()
    socialLinks?: string;

    // Per‑time‑control ratings (optional)
    @IsOptional()
    @IsInt()
    bulletRating?: number;

    @IsOptional()
    @IsInt()
    blitzRating?: number;

    @IsOptional()
    @IsInt()
    rapidRating?: number;

    @IsOptional()
    @IsInt()
    classicalRating?: number;
}
