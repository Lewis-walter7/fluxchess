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
var MatchmakingGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchmakingGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const common_1 = require("@nestjs/common");
const matchmaking_service_1 = require("./matchmaking.service");
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN ?? 'http://localhost:3000';
let MatchmakingGateway = MatchmakingGateway_1 = class MatchmakingGateway {
    matchmakingService;
    logger = new common_1.Logger(MatchmakingGateway_1.name);
    server;
    constructor(matchmakingService) {
        this.matchmakingService = matchmakingService;
    }
    handleConnection(client) {
        this.logger.log(`Client connected ${client.id}`);
    }
    handleDisconnect(client) {
        this.logger.log(`Client disconnected ${client.id}`);
        void this.matchmakingService.removeBySocket(client.id);
    }
    async handleJoin(client, payload) {
        try {
            this.logger.log(`Queue join request from ${client.id} for user ${payload.userId}`);
            const authenticatedUserId = client.data.user?.id;
            if (authenticatedUserId && payload.userId !== authenticatedUserId) {
                this.logger.warn(`User ID mismatch: ${payload.userId} vs ${authenticatedUserId}`);
                throw new common_1.UnauthorizedException('User ID mismatch');
            }
            const result = await this.matchmakingService.joinQueue(client, payload);
            this.logger.log(`Queue join successful: ${result.queueId}`);
            return result;
        }
        catch (error) {
            this.logger.error(`Queue join failed: ${error.message}`, error.stack);
            throw error;
        }
    }
    async handleLeave(client, body) {
        await this.matchmakingService.leaveQueue(client.id, body.queueId);
    }
    emitMatchFound(aSocketId, bSocketId, payloadForA, payloadForB) {
        this.server.to(aSocketId).emit('queue.matchFound', payloadForA);
        this.server.to(bSocketId).emit('queue.matchFound', payloadForB);
    }
    emitQueueUpdate(socketId, payload) {
        this.server.to(socketId).emit('queue.update', payload);
    }
};
exports.MatchmakingGateway = MatchmakingGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", Object)
], MatchmakingGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('queue.join'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MatchmakingGateway.prototype, "handleJoin", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('queue.leave'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MatchmakingGateway.prototype, "handleLeave", null);
exports.MatchmakingGateway = MatchmakingGateway = MatchmakingGateway_1 = __decorate([
    (0, websockets_1.WebSocketGateway)({
        namespace: '/core',
        cors: {
            origin: FRONTEND_ORIGIN,
            credentials: true,
        },
    }),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => matchmaking_service_1.MatchmakingService))),
    __metadata("design:paramtypes", [matchmaking_service_1.MatchmakingService])
], MatchmakingGateway);
//# sourceMappingURL=matchmaking.gateway.js.map