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
exports.CampaniasService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma/prisma.service");
let CampaniasService = class CampaniasService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        return this.prisma.campaniaDescuento.findMany({
            orderBy: { creado_en: 'desc' },
        });
    }
    async findActiva() {
        const campania = await this.prisma.campaniaDescuento.findFirst({
            where: { activa: true },
        });
        return campania || null;
    }
    async create(dto) {
        return this.prisma.campaniaDescuento.create({
            data: {
                nombre: dto.nombre,
                tipo: dto.tipo,
                descuento: dto.descuento,
                categorias: dto.categorias ?? null,
                perfume_ids: dto.perfume_ids ?? null,
                fecha_inicio: dto.fecha_inicio ? new Date(dto.fecha_inicio) : null,
                fecha_fin: dto.fecha_fin ? new Date(dto.fecha_fin) : null,
                activa: false,
            },
        });
    }
    async update(id, data) {
        const existing = await this.prisma.campaniaDescuento.findUnique({ where: { id } });
        if (!existing)
            throw new common_1.NotFoundException(`Campaña #${id} no encontrada`);
        if (data.activa === true) {
            await this.prisma.campaniaDescuento.updateMany({
                where: { id: { not: id } },
                data: { activa: false },
            });
        }
        return this.prisma.campaniaDescuento.update({
            where: { id },
            data: {
                ...(data.nombre !== undefined && { nombre: data.nombre }),
                ...(data.tipo !== undefined && { tipo: data.tipo }),
                ...(data.descuento !== undefined && { descuento: data.descuento }),
                ...(data.categorias !== undefined && { categorias: data.categorias }),
                ...(data.perfume_ids !== undefined && { perfume_ids: data.perfume_ids }),
                ...(data.fecha_inicio !== undefined && { fecha_inicio: data.fecha_inicio ? new Date(data.fecha_inicio) : null }),
                ...(data.fecha_fin !== undefined && { fecha_fin: data.fecha_fin ? new Date(data.fecha_fin) : null }),
                ...(data.activa !== undefined && { activa: data.activa }),
            },
        });
    }
    async toggleActiva(id) {
        const existing = await this.prisma.campaniaDescuento.findUnique({ where: { id } });
        if (!existing)
            throw new common_1.NotFoundException(`Campaña #${id} no encontrada`);
        if (!existing.activa) {
            await this.prisma.campaniaDescuento.updateMany({
                where: { id: { not: id } },
                data: { activa: false },
            });
        }
        return this.prisma.campaniaDescuento.update({
            where: { id },
            data: { activa: !existing.activa },
        });
    }
    async remove(id) {
        const existing = await this.prisma.campaniaDescuento.findUnique({ where: { id } });
        if (!existing)
            throw new common_1.NotFoundException(`Campaña #${id} no encontrada`);
        return this.prisma.campaniaDescuento.delete({ where: { id } });
    }
};
exports.CampaniasService = CampaniasService;
exports.CampaniasService = CampaniasService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CampaniasService);
//# sourceMappingURL=campanias.service.js.map