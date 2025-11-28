import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import type { Socket } from 'socket.io';
import type { EnvironmentVariables } from '../../config/env.validation';
import type { JwtPayload } from '../auth.service';

@Injectable()
export class WsJwtGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService<EnvironmentVariables>,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const client: Socket = context.switchToWs().getClient();
        const token = this.extractTokenFromHandshake(client);

        if (!token) {
            return false;
        }

        try {
            const payload = await this.jwtService.verifyAsync<JwtPayload>(token, {
                secret: this.configService.get('JWT_ACCESS_SECRET', { infer: true }),
            });

            // Attach user to socket
            client.data.user = {
                id: payload.sub,
                email: payload.email,
                username: payload.username,
            };

            return true;
        } catch {
            return false;
        }
    }

    private extractTokenFromHandshake(client: Socket): string | null {
        const token =
            client.handshake.auth?.token || client.handshake.headers?.authorization;

        if (!token) {
            return null;
        }

        // Remove 'Bearer ' prefix if present
        return token.startsWith('Bearer ') ? token.substring(7) : token;
    }
}
