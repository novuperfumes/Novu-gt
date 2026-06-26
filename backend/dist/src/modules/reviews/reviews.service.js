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
    async create(userId, perfumeId, dto) {
        const perfume = await this.prisma.perfume.findUnique({ where: { id: perfumeId } });
        if (!perfume)
            throw new common_1.NotFoundException('Perfume no encontrado');
        return this.prisma.reseniaPerfume.create({
            data: {
                id_usuario: userId,
                id_perfume: perfumeId,
                calificacion: dto.calificacion,
                comentario: dto.comentario,
            },
        });
    }
    async findByPerfume(perfumeId) {
        const perfume = await this.prisma.perfume.findUnique({ where: { id: perfumeId } });
        if (!perfume)
            throw new common_1.NotFoundException('Perfume no encontrado');
        return this.prisma.reseniaPerfume.findMany({
            where: { id_perfume: perfumeId },
            include: {
                usuario: {
                    select: {
                        nombre: true,
                        apellido: true,
                    },
                },
            },
            orderBy: { fecha: 'desc' },
        });
    }
    async remove(userId, reviewId) {
        const review = await this.prisma.reseniaPerfume.findUnique({
            where: { id: reviewId },
        });
        if (!review)
            throw new common_1.NotFoundException('Reseña no encontrada');
        if (review.id_usuario !== userId) {
            throw new common_1.ForbiddenException('No tienes permiso para borrar esta reseña');
        }
        return this.prisma.reseniaPerfume.delete({
            where: { id: reviewId },
        });
    }
};
exports.ReviewsService = ReviewsService;
exports.ReviewsService = ReviewsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ReviewsService);
//# sourceMappingURL=reviews.service.js.map