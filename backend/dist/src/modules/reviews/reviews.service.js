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
exports.ReviewsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma/prisma.service");
let ReviewsService = class ReviewsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async canReview(userId, perfumeId) {
        const perfume = await this.prisma.perfume.findUnique({
            where: { id: perfumeId },
            include: { presentaciones: { select: { id: true } }, decant: { select: { id: true } } },
        });
        if (!perfume)
            throw new common_1.NotFoundException('Perfume no encontrado');
        const presIds = perfume.presentaciones.map((p) => p.id);
        const decantId = perfume.decant?.id;
        const confirmedOrder = await this.prisma.ordenCompra.findFirst({
            where: {
                id_usuario: userId,
                estado: 'CONFIRMADO',
                detalles: {
                    some: {
                        OR: [
                            ...(presIds.length > 0 ? [{ id_presentacion: { in: presIds } }] : []),
                            ...(decantId ? [{ id_decant: decantId }] : []),
                        ],
                    },
                },
            },
            include: {
                detalles: {
                    where: {
                        OR: [
                            ...(presIds.length > 0 ? [{ id_presentacion: { in: presIds } }] : []),
                            ...(decantId ? [{ id_decant: decantId }] : []),
                        ],
                    },
                    include: {
                        presentacion: { select: { tamanio: true } },
                    },
                    take: 1,
                },
            },
        });
        const existing = await this.prisma.reseniaPerfume.findUnique({
            where: { id_usuario_id_perfume: { id_usuario: userId, id_perfume: perfumeId } },
        });
        return {
            canReview: !!confirmedOrder,
            existing: existing ?? null,
            compra_label: this.buildCompraLabel(confirmedOrder),
        };
    }
    buildCompraLabel(order) {
        if (!order || !order.detalles || order.detalles.length === 0)
            return null;
        const detalle = order.detalles[0];
        if (detalle.presentacion) {
            const tamanio = detalle.presentacion.tamanio;
            const label = tamanio.toLowerCase().includes('ml') ? tamanio : `${tamanio} ml`;
            return `Botella ${label}`;
        }
        if (detalle.id_decant && detalle.tipo_decant) {
            return `Decant ${detalle.tipo_decant}`;
        }
        return null;
    }
    async upsert(userId, perfumeId, dto) {
        const perfume = await this.prisma.perfume.findUnique({
            where: { id: perfumeId },
            include: { presentaciones: { select: { id: true } }, decant: { select: { id: true } } },
        });
        if (!perfume)
            throw new common_1.NotFoundException('Perfume no encontrado');
        const presIds = perfume.presentaciones.map((p) => p.id);
        const decantId = perfume.decant?.id;
        const confirmedOrder = await this.prisma.ordenCompra.findFirst({
            where: {
                id_usuario: userId,
                estado: 'CONFIRMADO',
                detalles: {
                    some: {
                        OR: [
                            ...(presIds.length > 0 ? [{ id_presentacion: { in: presIds } }] : []),
                            ...(decantId ? [{ id_decant: decantId }] : []),
                        ],
                    },
                },
            },
            include: {
                detalles: {
                    where: {
                        OR: [
                            ...(presIds.length > 0 ? [{ id_presentacion: { in: presIds } }] : []),
                            ...(decantId ? [{ id_decant: decantId }] : []),
                        ],
                    },
                    include: { presentacion: { select: { tamanio: true } } },
                    take: 1,
                },
            },
        });
        if (!confirmedOrder) {
            throw new common_1.ForbiddenException('Solo puedes reseñar perfumes que hayas comprado y cuya orden haya sido confirmada.');
        }
        const compra_label = dto.compra_label ?? this.buildCompraLabel(confirmedOrder);
        return this.prisma.reseniaPerfume.upsert({
            where: { id_usuario_id_perfume: { id_usuario: userId, id_perfume: perfumeId } },
            create: {
                id_usuario: userId,
                id_perfume: perfumeId,
                calificacion: dto.calificacion,
                comentario: dto.comentario,
                compra_label,
            },
            update: {
                calificacion: dto.calificacion,
                comentario: dto.comentario,
                compra_label,
                fecha: new Date(),
            },
        });
    }
    async findByPerfume(perfumeId) {
        const perfume = await this.prisma.perfume.findUnique({ where: { id: perfumeId } });
        if (!perfume)
            throw new common_1.NotFoundException('Perfume no encontrado');
        const resenias = await this.prisma.reseniaPerfume.findMany({
            where: { id_perfume: perfumeId },
            include: {
                usuario: {
                    select: { nombre: true, apellido: true },
                },
            },
            orderBy: { fecha: 'desc' },
        });
        const total = resenias.length;
        const promedio = total > 0
            ? Math.round((resenias.reduce((acc, r) => acc + r.calificacion, 0) / total) * 10) / 10
            : 0;
        return { resenias, promedio, total };
    }
    async remove(userId, reviewId) {
        const review = await this.prisma.reseniaPerfume.findUnique({ where: { id: reviewId } });
        if (!review)
            throw new common_1.NotFoundException('Reseña no encontrada');
        if (review.id_usuario !== userId) {
            throw new common_1.ForbiddenException('No tienes permiso para borrar esta reseña');
        }
        return this.prisma.reseniaPerfume.delete({ where: { id: reviewId } });
    }
};
exports.ReviewsService = ReviewsService;
exports.ReviewsService = ReviewsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ReviewsService);
//# sourceMappingURL=reviews.service.js.map