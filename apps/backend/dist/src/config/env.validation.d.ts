import { z } from 'zod';
declare const envSchema: z.ZodObject<{
    NODE_ENV: z.ZodDefault<z.ZodEnum<["development", "production", "test"]>>;
    PORT: z.ZodDefault<z.ZodNumber>;
    FRONTEND_ORIGIN: z.ZodDefault<z.ZodString>;
    DATABASE_URL: z.ZodString;
    REDIS_URL: z.ZodString;
    JWT_ACCESS_SECRET: z.ZodString;
    JWT_REFRESH_SECRET: z.ZodString;
    JWT_ACCESS_EXPIRATION: z.ZodDefault<z.ZodString>;
    JWT_REFRESH_EXPIRATION: z.ZodDefault<z.ZodString>;
    BCRYPT_ROUNDS: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    DATABASE_URL: string;
    NODE_ENV: "development" | "production" | "test";
    PORT: number;
    FRONTEND_ORIGIN: string;
    REDIS_URL: string;
    JWT_ACCESS_SECRET: string;
    JWT_REFRESH_SECRET: string;
    JWT_ACCESS_EXPIRATION: string;
    JWT_REFRESH_EXPIRATION: string;
    BCRYPT_ROUNDS: number;
}, {
    DATABASE_URL: string;
    REDIS_URL: string;
    JWT_ACCESS_SECRET: string;
    JWT_REFRESH_SECRET: string;
    NODE_ENV?: "development" | "production" | "test" | undefined;
    PORT?: number | undefined;
    FRONTEND_ORIGIN?: string | undefined;
    JWT_ACCESS_EXPIRATION?: string | undefined;
    JWT_REFRESH_EXPIRATION?: string | undefined;
    BCRYPT_ROUNDS?: number | undefined;
}>;
export type EnvironmentVariables = z.infer<typeof envSchema>;
export declare const validateEnv: (config: Record<string, unknown>) => EnvironmentVariables;
export {};
