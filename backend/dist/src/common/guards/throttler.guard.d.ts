import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisService } from '../cache/redis.service';
export declare class RedisThrottlerGuard implements CanActivate {
    private redisService;
    private configService;
    constructor(redisService: RedisService, configService: ConfigService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
