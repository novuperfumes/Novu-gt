import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  /**
   * Checks if the user can review this perfume (i.e., has a CONFIRMED order containing it).
   * Returns { canReview, existing } where existing is the user's current review if any.
   */
  async canReview(userId: number, perfumeId: number) {
    const perfume = await this.prisma.perfume.findUnique({
      where: { id: perfumeId },
      include: { presentaciones: { select: { id: true } }, decant: { select: { id: true } } },
    });
    if (!perfume) throw new NotFoundException('Perfume no encontrado');

    // Get all presentation and decant IDs for this perfume
    const presIds = perfume.presentaciones.map((p) => p.id);
    const decantId = perfume.decant?.id;

    // Look for at least one CONFIRMED order containing this perfume
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

    // Check if user already has a review for this perfume
    const existing = await this.prisma.reseniaPerfume.findUnique({
      where: { id_usuario_id_perfume: { id_usuario: userId, id_perfume: perfumeId } },
    });

    return {
      canReview: !!confirmedOrder,
      existing: existing ?? null,
      compra_label: this.buildCompraLabel(confirmedOrder),
    };
  }

  private buildCompraLabel(order: any): string | null {
    if (!order || !order.detalles || order.detalles.length === 0) return null;
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

  /**
   * Create or update (upsert) a review. Enforces that user has a confirmed purchase.
   */
  async upsert(userId: number, perfumeId: number, dto: CreateReviewDto) {
    const perfume = await this.prisma.perfume.findUnique({
      where: { id: perfumeId },
      include: { presentaciones: { select: { id: true } }, decant: { select: { id: true } } },
    });
    if (!perfume) throw new NotFoundException('Perfume no encontrado');

    const presIds = perfume.presentaciones.map((p) => p.id);
    const decantId = perfume.decant?.id;

    // Verify confirmed purchase
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
      throw new ForbiddenException(
        'Solo puedes reseñar perfumes que hayas comprado y cuya orden haya sido confirmada.',
      );
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

  async findByPerfume(perfumeId: number) {
    const perfume = await this.prisma.perfume.findUnique({ where: { id: perfumeId } });
    if (!perfume) throw new NotFoundException('Perfume no encontrado');

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
    const promedio =
      total > 0
        ? Math.round((resenias.reduce((acc, r) => acc + r.calificacion, 0) / total) * 10) / 10
        : 0;

    return { resenias, promedio, total };
  }

  async remove(userId: number, reviewId: number) {
    const review = await this.prisma.reseniaPerfume.findUnique({ where: { id: reviewId } });
    if (!review) throw new NotFoundException('Reseña no encontrada');
    if (review.id_usuario !== userId) {
      throw new ForbiddenException('No tienes permiso para borrar esta reseña');
    }
    return this.prisma.reseniaPerfume.delete({ where: { id: reviewId } });
  }
}
