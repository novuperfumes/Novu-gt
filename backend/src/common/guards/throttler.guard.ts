import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisService } from '../cache/redis.service';

@Injectable()
export class RedisThrottlerGuard implements CanActivate {
  constructor(
    private redisService: RedisService,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    
    // In Fastify, client IP is accessible through request.ip
    const ip = request.ip || request.headers['x-forwarded-for'] || '127.0.0.1';
    const path = request.routerPath || request.url;

    // Bypass rate limiting in testing environments
    if (this.configService.get('NODE_ENV') === 'test') {
      return true;
    }

    // Key unique per IP and request path
    const key = `throttler:${ip}:${path}`;
    const limit = 100; // max 100 requests
    const ttlSeconds = 60; // per 1 minute window

    const redis = this.redisService.getClient();
    
    // Execute atomic operations to prevent race conditions under load
    const pipeline = redis.pipeline();
    pipeline.incr(key);
    pipeline.ttl(key);
    
    const results = await pipeline.exec();
    if (!results) return true;

    const currentRequests = results[0][1] as number;
    const currentTtl = results[1][1] as number;

    // Set TTL on the first request of this window
    if (currentRequests === 1 || currentTtl === -1) {
      await redis.expire(key, ttlSeconds);
    }

    // Deny access if limit exceeded
    if (currentRequests > limit) {
      throw new HttpException(
        {
          statusCode: HttpStatus.TOO_MANY_REQUESTS,
          error: 'Too Many Requests',
          message: 'Has realizado demasiadas solicitudes en poco tiempo. Por favor, espera un minuto.',
        },
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    return true;
  }
}
