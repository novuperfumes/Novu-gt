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
exports.PromoCodesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma/prisma.service");
let PromoCodesService = class PromoCodesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const existing = await this.prisma.codigoPromocion.findUnique({
            where: { codigo: dto.codigo.toUpperCase() },
        });
        if (existing) {
            throw new common_1.BadRequestException('El código de promoción ya existe.');
        }
        return this.prisma.codigoPromocion.create({
            data: {
                codigo: dto.codigo.toUpperCase(),
                tipo_descuento: dto.tipo_descuento,
                descuento: dto.descuento,
                fecha_inicio: new Date(dto.fecha_inicio),
                fecha_fin: new Date(dto.fecha_fin),
                estado: 'ACTIVO',
            },
        });
    }
    async validate(code) {
        const promo = await this.prisma.codigoPromocion.findUnique({
            where: { codigo: code.toUpperCase() },
        });
        if (!promo || promo.estado !== 'ACTIVO') {
            throw new common_1.NotFoundException('Cupón de descuento no válido o inactivo.');
        }
        const now = new Date();
        if (now < promo.fecha_inicio || now > promo.fecha_fin) {
            throw new common_1.BadRequestException('El cupón de descuento ha expirado o no está vigente.');
        }
        return promo;
    }
    async findAll() {
        return this.prisma.codigoPromocion.findMany();
    }
    async toggleStatus(id) {
        const promo = await this.prisma.codigoPromocion.findUnique({ where: { id } });
        if (!promo)
            throw new common_1.NotFoundException('Código no encontrado');
        const newStatus = promo.estado === 'ACTIVO' ? 'INACTIVO' : 'ACTIVO';
        return this.prisma.codigoPromocion.update({
            where: { id },
            data: { estado: newStatus }
        });
    }
};
exports.PromoCodesService = PromoCodesService;
exports.PromoCodesService = PromoCodesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PromoCodesService);
//# sourceMappingURL=promo-codes.service.js.map