import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Redis } from 'ioredis';
import RedisClient, { type ChainableCommander } from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private client!: Redis;

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    const url =
      this.configService.get<string>('REDIS_URL') ?? 'redis://localhost:6379';
    this.client = new RedisClient(url, {
      lazyConnect: true,
      maxRetriesPerRequest: 3,
    });
  }

  async getClient(): Promise<Redis> {
    const client: Redis = this.client;

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
}
