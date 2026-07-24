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
exports.InventoryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma/prisma.service");
const redis_service_1 = require("../../common/cache/redis.service");
let InventoryService = class InventoryService {
    prisma;
    redisService;
    CATALOG_CACHE_KEY = 'perfumes:active';
    constructor(prisma, redisService) {
        this.prisma = prisma;
        this.redisService = redisService;
    }
    async create(dto) {
        const result = await this.prisma.$transaction(async (tx) => {
            const presentation = await tx.presentacionPerfume.findUnique({
                where: { id: dto.id_presentacion },
                include: { perfume: true },
            });
            if (!presentation) {
                throw new common_1.NotFoundException('La presentación de perfume no existe.');
            }
            const ingreso = await tx.ingresoInventario.create({
                data: {
                    id_presentacion: dto.id_presentacion,
                    cantidad: dto.cantidad,
                    costo_compra: dto.costo_compra,
                    tipo_traida: dto.tipo_traida,
                    costo_traida: dto.costo_traida,
                    costo_total: dto.costo_total,
                },
            });
            await tx.presentacionPerfume.update({
                where: { id: dto.id_presentacion },
                data: {
                    stock: { increment: dto.cantidad },
                },
            });
            return {
                ingreso,
                id_perfume: presentation.id_perfume,
            };
        });
        await this.redisService.del(this.CATALOG_CACHE_KEY);
        await this.redisService.del(`perfume:${result.id_perfume}`);
        return result.ingreso;
    }
    async findAll() {
        return this.prisma.ingresoInventario.findMany({
            include: {
                presentacion: {
                    include: {
                        perfume: true,
                    },
                },
            },
            orderBy: {
                fecha_ingreso: 'desc',
            },
        });
    }
    async getStats() {
        const ingresos = await this.prisma.ingresoInventario.findMany();
        let totalCantidad = 0;
        let totalInversion = 0;
        let totalCostoCompra = 0;
        let totalCostoTraida = 0;
        const traidaStats = {};
        for (const ing of ingresos) {
            const cantidad = ing.cantidad;
            const costoCompra = Number(ing.costo_compra);
            const costoTraida = Number(ing.costo_traida);
            const costoTotal = Number(ing.costo_total);
            totalCantidad += cantidad;
            totalInversion += cantidad * costoTotal;
            totalCostoCompra += cantidad * costoCompra;
            totalCostoTraida += cantidad * costoTraida;
            const traida = ing.tipo_traida.toLowerCase().trim();
            if (!traidaStats[traida]) {
                traidaStats[traida] = { cantidad: 0, inversion: 0 };
            }
            traidaStats[traida].cantidad += cantidad;
            traidaStats[traida].inversion += cantidad * costoTotal;
        }
        return {
            resumen: {
                total_perfumes_ingresados: totalCantidad,
                inversion_total: totalInversion,
                inversion_solo_perfumes: totalCostoCompra,
                inversion_solo_traidas: totalCostoTraida,
                costo_promedio_unidad: totalCantidad > 0 ? totalInversion / totalCantidad : 0,
            },
            por_tipo_traida: Object.keys(traidaStats).map((tipo) => ({
                tipo_traida: tipo,
                cantidad_unidades: traidaStats[tipo].cantidad,
                inversion_total: traidaStats[tipo].inversion,
            })),
        };
    }
};
exports.InventoryService = InventoryService;
exports.InventoryService = InventoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        redis_service_1.RedisService])
], InventoryService);
//# sourceMappingURL=inventory.service.js.map