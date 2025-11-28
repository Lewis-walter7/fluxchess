import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger, UseGuards, UnauthorizedException, Inject, forwardRef } from '@nestjs/common';
import type { Server, Socket } from 'socket.io';
import type {
  ClientToServerEvents,
  MatchmakingJoinPayload,
  ServerToClientEvents,
} from '@chess/contracts';
import { MatchmakingService } from './matchmaking.service';
import { WsJwtGuard } from '../auth/guards/ws-jwt.guard';

type TypedServer = Server<ClientToServerEvents, ServerToClientEvents>;
type TypedSocket = Socket<ServerToClientEvents, ClientToServerEvents>;

const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN ?? 'http://localhost:3000';

@WebSocketGateway({
  namespace: '/core',
  cors: {
    origin: FRONTEND_ORIGIN,
    credentials: true,
  },
})
export class MatchmakingGateway
  implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(MatchmakingGateway.name);

  @WebSocketServer()
  private readonly server!: TypedServer;

  constructor(
    @Inject(forwardRef(() => MatchmakingService))
    private readonly matchmakingService: MatchmakingService,
  ) { }

  handleConnection(client: TypedSocket) {
    this.logger.log(`Client connected ${client.id}`);
  }

  handleDisconnect(client: TypedSocket) {
    this.logger.log(`Client disconnected ${client.id}`);
    void this.matchmakingService.removeBySocket(client.id);
  }

  // TODO: Re-enable auth guard in production
  // @UseGuards(WsJwtGuard)
  @SubscribeMessage('queue.join')
  async handleJoin(
    @ConnectedSocket() client: TypedSocket,
    @MessageBody() payload: MatchmakingJoinPayload,
  ) {
    try {
      this.logger.log(`Queue join request from ${client.id} for user ${payload.userId}`);

      // Validate that the userId in payload matches the authenticated user (if authenticated)
      const authenticatedUserId = client.data.user?.id;
      if (authenticatedUserId && payload.userId !== authenticatedUserId) {
        this.logger.warn(`User ID mismatch: ${payload.userId} vs ${authenticatedUserId}`);
        throw new UnauthorizedException('User ID mismatch');
      }

      const result = await this.matchmakingService.joinQueue(client, payload);
      this.logger.log(`Queue join successful: ${result.queueId}`);
      return result;
    } catch (error) {
      this.logger.error(`Queue join failed: ${error.message}`, error.stack);
      throw error;
    }
  }

  // TODO: Re-enable auth guard in production
  // @UseGuards(WsJwtGuard)
  @SubscribeMessage('queue.leave')
  async handleLeave(
    @ConnectedSocket() client: TypedSocket,
    @MessageBody() body: { queueId: string },
  ) {
    await this.matchmakingService.leaveQueue(client.id, body.queueId);
  }

  /**
   * Internal helper used by service to notify both players.
   */
  emitMatchFound(
    aSocketId: string,
    bSocketId: string,
    payloadForA: Parameters<ServerToClientEvents['queue.matchFound']>[0],
    payloadForB: Parameters<ServerToClientEvents['queue.matchFound']>[0],
  ) {
    this.server.to(aSocketId).emit('queue.matchFound', payloadForA);
    this.server.to(bSocketId).emit('queue.matchFound', payloadForB);
  }

  emitQueueUpdate(
    socketId: string,
    payload: Parameters<ServerToClientEvents['queue.update']>[0],
  ) {
    this.server.to(socketId).emit('queue.update', payload);
  }
}
