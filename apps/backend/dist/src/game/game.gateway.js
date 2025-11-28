"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var GameGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const common_1 = require("@nestjs/common");
const matchmaking_dto_1 = require("./dto/matchmaking.dto");
const game_service_1 = require("./game.service");
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN ?? 'http://localhost:3000';
let GameGateway = GameGateway_1 = class GameGateway {
    gameService;
    logger = new common_1.Logger(GameGateway_1.name);
    server;
    constructor(gameService) {
        this.gameService = gameService;
    }
    handleConnection(client) {
        this.logger.log(`Client connected ${client.id}`);
    }
    handleDisconnect(client) {
        this.logger.log(`Client disconnected ${client.id}`);
    }
    handleMatchmakingJoin(client, payload) {
        return this.gameService.enqueue(payload, (progress) => {
            client.emit('queue.update', progress);
        });
    }
    handleMatchmakingLeave(payload, client) {
        const cancelled = this.gameService.cancel(payload.queueId);
        if (!cancelled) {
            client.emit('game:error', {
                code: 'QUEUE_NOT_FOUND',
                message: 'Unable to cancel matchmaking request.',
            });
        }
    }
};
exports.GameGateway = GameGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", Object)
], GameGateway.prototype, "server", void 0);
__decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
    })),
    (0, websockets_1.SubscribeMessage)('queue.join'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, matchmaking_dto_1.MatchmakingJoinDto]),
    __metadata("design:returntype", Object)
], GameGateway.prototype, "handleMatchmakingJoin", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('queue.leave'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], GameGateway.prototype, "handleMatchmakingLeave", null);
exports.GameGateway = GameGateway = GameGateway_1 = __decorate([
    (0, websockets_1.WebSocketGateway)({
        namespace: '/core',
        cors: {
            origin: FRONTEND_ORIGIN,
            credentials: true,
        },
    }),
    __metadata("design:paramtypes", [game_service_1.GameService])
], GameGateway);
//# sourceMappingURL=game.gateway.js.map