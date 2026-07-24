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
exports.DecantsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma/prisma.service");
let DecantsService = class DecantsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const perfume = await this.prisma.perfume.findUnique({
            where: { id: dto.id_perfume },
        });
        if (!perfume) {
            throw new common_1.NotFoundException('Perfume no encontrado.');
        }
        const existing = await this.prisma.decant.findUnique({
            where: { id_perfume: dto.id_perfume },
        });
        if (existing) {
            throw new common_1.BadRequestException('Ya existe una configuración de decants para este perfume.');
        }
        return this.prisma.decant.create({
            data: {
                id_perfume: dto.id_perfume,
                ml_origen: dto.ml_origen,
                costo_original: dto.costo_original,
                precio_original: dto.precio_original,
                costo_5ml: dto.costo_5ml,
                precio_5ml: dto.precio_5ml,
                stock_5ml: dto.stock_5ml ?? 0,
                costo_10ml: dto.costo_10ml,
                precio_10ml: dto.precio_10ml,
                stock_10ml: dto.stock_10ml ?? 0,
            },
            include: {
                perfume: true,
            },
        });
    }
    async findAll() {
        return this.prisma.decant.findMany({
            include: {
                perfume: true,
            },
        });
    }
    async findOne(id) {
        const decant = await this.prisma.decant.findUnique({
            where: { id },
            include: { perfume: true },
        });
        if (!decant) {
            throw new common_1.NotFoundException('Configuración de decant no encontrada.');
        }
        return decant;
    }
    async findByPerfume(perfumeId) {
        const decant = await this.prisma.decant.findUnique({
            where: { id_perfume: perfumeId },
            include: { perfume: true },
        });
        if (!decant) {
            throw new common_1.NotFoundException('Configuración de decant no encontrada para este perfume.');
        }
        return decant;
    }
    async update(id, dto) {
        const decant = await this.prisma.decant.findUnique({
            where: { id },
        });
        if (!decant) {
            throw new common_1.NotFoundException('Configuración de decant no encontrada.');
        }
        return this.prisma.decant.update({
            where: { id },
            data: dto,
            include: {
                perfume: true,
            },
        });
    }
    async remove(id) {
        const decant = await this.prisma.decant.findUnique({
            where: { id },
        });
        if (!decant) {
            throw new common_1.NotFoundException('Configuración de decant no encontrada.');
        }
        await this.prisma.decant.delete({
            where: { id },
        });
        return { message: 'Configuración de decant eliminada exitosamente.' };
    }
};
exports.DecantsService = DecantsService;
exports.DecantsService = DecantsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DecantsService);
//# sourceMappingURL=decants.service.js.map