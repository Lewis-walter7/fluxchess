import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import type { Socket } from 'socket.io';
import type { ClientToServerEvents, MatchmakingJoinPayload, ServerToClientEvents, MoveSubmittedPayload } from '@chess/contracts';
import { MatchmakingService } from './matchmaking.service';
type TypedSocket = Socket<ClientToServerEvents, ServerToClientEvents>;
export declare class MatchmakingGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly matchmakingService;
    private readonly logger;
    private readonly server;
    constructor(matchmakingService: MatchmakingService);
    handleConnection(client: TypedSocket): void;
    handleDisconnect(client: TypedSocket): void;
    handleJoin(client: TypedSocket, payload: MatchmakingJoinPayload): Promise<import("@chess/contracts").MatchmakingQueuedAck>;
    handleLeave(client: TypedSocket, body: {
        queueId: string;
    }): Promise<void>;
    emitMatchFound(aSocketId: string, bSocketId: string, payloadForA: Parameters<ServerToClientEvents['queue.matchFound']>[0], payloadForB: Parameters<ServerToClientEvents['queue.matchFound']>[0]): void;
    joinGameRoom(socketId1: string, socketId2: string, gameId: string): void;
    emitQueueUpdate(socketId: string, payload: Parameters<ServerToClientEvents['queue.update']>[0]): void;
    emitGameAborted(gameId: string, reason: string): void;
    handleMove(client: TypedSocket, payload: MoveSubmittedPayload): Promise<void>;
}
export {};
