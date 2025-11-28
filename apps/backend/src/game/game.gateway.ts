import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger, UsePipes, ValidationPipe } from '@nestjs/common';
import type { Server, Socket } from 'socket.io';
import type {
  ClientToServerEvents,
  MatchmakingQueuedAck,
  ServerToClientEvents,
} from '@chess/contracts';
import { MatchmakingJoinDto } from './dto/matchmaking.dto';
import { GameService } from './game.service';

type TypedServer = Server<ClientToServerEvents, ServerToClientEvents>;
type TypedSocket = Socket<ClientToServerEvents, ServerToClientEvents>;

const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN ?? 'http://localhost:3000';

@WebSocketGateway({
  namespace: '/core',
  cors: {
    origin: FRONTEND_ORIGIN,
    credentials: true,
  },
})
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(GameGateway.name);

  @WebSocketServer()
  private readonly server!: TypedServer;

  constructor(private readonly gameService: GameService) { }

  handleConnection(client: TypedSocket) {
    this.logger.log(`Client connected ${client.id}`);
  }

  handleDisconnect(client: TypedSocket) {
    this.logger.log(`Client disconnected ${client.id}`);
  }

  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  )
  @SubscribeMessage('queue.join')
  handleMatchmakingJoin(
    @ConnectedSocket() client: TypedSocket,
    @MessageBody() payload: MatchmakingJoinDto,
  ): MatchmakingQueuedAck {
    return this.gameService.enqueue(payload, (progress) => {
      client.emit('queue.update', progress);
    });
  }

  @SubscribeMessage('queue.leave')
  handleMatchmakingLeave(
    @MessageBody() payload: { queueId: string },
    @ConnectedSocket() client: TypedSocket,
  ) {
    const cancelled = this.gameService.cancel(payload.queueId);

    if (!cancelled) {
      client.emit('game:error', {
        code: 'QUEUE_NOT_FOUND',
        message: 'Unable to cancel matchmaking request.',
      });
    }
  }
}
