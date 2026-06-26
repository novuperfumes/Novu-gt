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
exports.RedisThrottlerGuard = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const redis_service_1 = require("../cache/redis.service");
let RedisThrottlerGuard = class RedisThrottlerGuard {
    redisService;
    configService;
    constructor(redisService, configService) {
        this.redisService = redisService;
        this.configService = configService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const ip = request.ip || request.headers['x-forwarded-for'] || '127.0.0.1';
        const path = request.routerPath || request.url;
        if (this.configService.get('NODE_ENV') === 'test') {
            return true;
        }
        const key = `throttler:${ip}:${path}`;
        const limit = 100;
        const ttlSeconds = 60;
        const redis = this.redisService.getClient();
        const pipeline = redis.pipeline();
        pipeline.incr(key);
        pipeline.ttl(key);
        const results = await pipeline.exec();
        if (!results)
            return true;
        const currentRequests = results[0][1];
        const currentTtl = results[1][1];
        if (currentRequests === 1 || currentTtl === -1) {
            await redis.expire(key, ttlSeconds);
        }
        if (currentRequests > limit) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.TOO_MANY_REQUESTS,
                error: 'Too Many Requests',
                message: 'Has realizado demasiadas solicitudes en poco tiempo. Por favor, espera un minuto.',
            }, common_1.HttpStatus.TOO_MANY_REQUESTS);
        }
        return true;
    }
};
exports.RedisThrottlerGuard = RedisThrottlerGuard;
exports.RedisThrottlerGuard = RedisThrottlerGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [redis_service_1.RedisService,
        config_1.ConfigService])
], RedisThrottlerGuard);
//# sourceMappingURL=throttler.guard.js.map