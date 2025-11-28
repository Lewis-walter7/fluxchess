import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
import { AuthService, type JwtPayload } from '../auth.service';
import type { EnvironmentVariables } from '../../config/env.validation';
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly authService;
    constructor(authService: AuthService, configService: ConfigService<EnvironmentVariables>);
    validate(payload: JwtPayload): Promise<{
        id: string;
        createdAt: Date;
        email: string;
        username: string;
        isEmailVerified: boolean;
    }>;
}
export {};
