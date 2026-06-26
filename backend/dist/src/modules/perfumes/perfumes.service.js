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
exports.PerfumesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma/prisma.service");
const redis_service_1 = require("../../common/cache/redis.service");
let PerfumesService = class PerfumesService {
    prisma;
    redisService;
    CACHE_TTL = 3600;
    CATALOG_CACHE_KEY = 'perfumes:active';
    constructor(prisma, redisService) {
        this.prisma = prisma;
        this.redisService = redisService;
    }
    async create(dto) {
        const perfume = await this.prisma.perfume.create({
            data: dto,
        });
        await this.invalidateCatalogCache();
        return perfume;
    }
    async addPresentacion(perfumeId, dto) {
        const perfume = await this.prisma.perfume.findUnique({ where: { id: perfumeId } });
        if (!perfume)
            throw new common_1.NotFoundException('Perfume no encontrado.');
        const presentacion = await this.prisma.presentacionPerfume.create({
            data: {
                id_perfume: perfumeId,
                tamanio: dto.tamanio,
                precio: dto.precio,
                stock: dto.stock,
            },
        });
        await this.invalidateCatalogCache();
        await this.invalidatePerfumeCache(perfumeId);
        return presentacion;
    }
    async findAllActive() {
        const cached = await this.redisService.get(this.CATALOG_CACHE_KEY);
        if (cached) {
            return JSON.parse(cached);
        }
        const perfumes = await this.prisma.perfume.findMany({
            where: { activo: true },
            include: {
                presentaciones: true,
            },
        });
        await this.redisService.set(this.CATALOG_CACHE_KEY, JSON.stringify(perfumes), this.CACHE_TTL);
        return perfumes;
    }
    async findOne(id) {
        const cacheKey = `perfume:${id}`;
        const cached = await this.redisService.get(cacheKey);
        if (cached) {
            return JSON.parse(cached);
        }
        const perfume = await this.prisma.perfume.findUnique({
            where: { id },
            include: {
                presentaciones: true,
            },
        });
        if (!perfume) {
            throw new common_1.NotFoundException('Perfume no encontrado.');
        }
        await this.redisService.set(cacheKey, JSON.stringify(perfume), this.CACHE_TTL);
        return perfume;
    }
    async update(id, dto) {
        const existing = await this.prisma.perfume.findUnique({ where: { id } });
        if (!existing)
            throw new common_1.NotFoundException('Perfume no encontrado.');
        const updated = await this.prisma.perfume.update({
            where: { id },
            data: dto,
        });
        await this.invalidateCatalogCache();
        await this.invalidatePerfumeCache(id);
        return updated;
    }
    async remove(id) {
        const existing = await this.prisma.perfume.findUnique({ where: { id } });
        if (!existing)
            throw new common_1.NotFoundException('Perfume no encontrado.');
        const deleted = await this.prisma.perfume.update({
            where: { id },
            data: { activo: false },
        });
        await this.invalidateCatalogCache();
        await this.invalidatePerfumeCache(id);
        return deleted;
    }
    async invalidateCatalogCache() {
        await this.redisService.del(this.CATALOG_CACHE_KEY);
    }
    async invalidatePerfumeCache(id) {
        await this.redisService.del(`perfume:${id}`);
    }
};
exports.PerfumesService = PerfumesService;
exports.PerfumesService = PerfumesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        redis_service_1.RedisService])
], PerfumesService);
//# sourceMappingURL=perfumes.service.js.map