import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Redis } from 'ioredis';
import RedisClient from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private client!: Redis;

  constructor(private readonly configService: ConfigService) { }

  onModuleInit() {
    const url =
      this.configService.get<string>('REDIS_URL') ?? 'redis://localhost:6379';

    // Enable TLS for Upstash Redis
    const isUpstash = url.includes('upstash.io');

    this.client = new RedisClient(url, {
      lazyConnect: true,
      maxRetriesPerRequest: 3,
      ...(isUpstash && {
        tls: {
          rejectUnauthorized: true,
        },
        family: 6, // Use IPv6 if needed
      }),
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
