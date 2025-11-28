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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const ioredis_1 = require("ioredis");
let RedisService = class RedisService {
    configService;
    client;
    constructor(configService) {
        this.configService = configService;
    }
    onModuleInit() {
        const url = this.configService.get('REDIS_URL') ?? 'redis://localhost:6379';
        const isUpstash = url.includes('upstash.io');
        this.client = new ioredis_1.default(url, {
            lazyConnect: true,
            maxRetriesPerRequest: 3,
            ...(isUpstash && {
                tls: {
                    rejectUnauthorized: true,
                },
                family: 6,
            }),
        });
    }
    async getClient() {
        const client = this.client;
        if (!client.status || client.status === 'end') {
            await client.connect();
        }
        return client;
    }
    async onModuleDestroy() {
        if (this.client && this.client.status !== 'end') {
            await this.client.quit();
        }
    }
};
exports.RedisService = RedisService;
exports.RedisService = RedisService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], RedisService);
//# sourceMappingURL=redis.service.js.map