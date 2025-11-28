import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import type { Socket } from 'socket.io';
import type { ClientToServerEvents, MatchmakingQueuedAck, ServerToClientEvents } from '@chess/contracts';
import { MatchmakingJoinDto } from './dto/matchmaking.dto';
import { GameService } from './game.service';
type TypedSocket = Socket<ClientToServerEvents, ServerToClientEvents>;
export declare class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly gameService;
    private readonly logger;
    private readonly server;
    constructor(gameService: GameService);
    handleConnection(client: TypedSocket): void;
    handleDisconnect(client: TypedSocket): void;
    handleMatchmakingJoin(client: TypedSocket, payload: MatchmakingJoinDto): MatchmakingQueuedAck;
    handleMatchmakingLeave(payload: {
        queueId: string;
    }, client: TypedSocket): void;
}
export {};
