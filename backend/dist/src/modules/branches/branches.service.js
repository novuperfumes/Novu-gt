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
exports.BranchesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma/prisma.service");
const redis_service_1 = require("../../common/cache/redis.service");
let BranchesService = class BranchesService {
    prisma;
    redisService;
    CACHE_KEY = 'branches:all';
    CACHE_TTL = 86400;
    constructor(prisma, redisService) {
        this.prisma = prisma;
        this.redisService = redisService;
    }
    async create(dto) {
        const branch = await this.prisma.sucursal.create({
            data: dto,
        });
        await this.invalidateCache();
        return branch;
    }
    async findAll() {
        const cached = await this.redisService.get(this.CACHE_KEY);
        if (cached)
            return JSON.parse(cached);
        const branches = await this.prisma.sucursal.findMany();
        await this.redisService.set(this.CACHE_KEY, JSON.stringify(branches), this.CACHE_TTL);
        return branches;
    }
    async invalidateCache() {
        await this.redisService.del(this.CACHE_KEY);
    }
};
exports.BranchesService = BranchesService;
exports.BranchesService = BranchesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        redis_service_1.RedisService])
], BranchesService);
//# sourceMappingURL=branches.service.js.map