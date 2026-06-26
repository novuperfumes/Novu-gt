import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, perfumeId: number, dto: CreateReviewDto) {
    const perfume = await this.prisma.perfume.findUnique({ where: { id: perfumeId } });
    if (!perfume) throw new NotFoundException('Perfume no encontrado');

    return this.prisma.reseniaPerfume.create({
      data: {
        id_usuario: userId,
        id_perfume: perfumeId,
        calificacion: dto.calificacion,
        comentario: dto.comentario,
      },
    });
  }

  async findByPerfume(perfumeId: number) {
    const perfume = await this.prisma.perfume.findUnique({ where: { id: perfumeId } });
    if (!perfume) throw new NotFoundException('Perfume no encontrado');

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

  async remove(userId: number, reviewId: number) {
    const review = await this.prisma.reseniaPerfume.findUnique({
      where: { id: reviewId },
    });

    if (!review) throw new NotFoundException('Reseña no encontrada');

    // Users can only delete their own reviews. Admins might be able to as well, but for simplicity:
    if (review.id_usuario !== userId) {
      throw new ForbiddenException('No tienes permiso para borrar esta reseña');
    }

    return this.prisma.reseniaPerfume.delete({
      where: { id: reviewId },
    });
  }
}
