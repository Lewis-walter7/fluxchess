import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import type { EnvironmentVariables } from '../../config/env.validation';
export declare class WsJwtGuard implements CanActivate {
    private readonly jwtService;
    private readonly configService;
    constructor(jwtService: JwtService, configService: ConfigService<EnvironmentVariables>);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private extractTokenFromHandshake;
}
