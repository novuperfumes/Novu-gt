import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  async addFavorite(userId: number, perfumeId: number) {
    const perfume = await this.prisma.perfume.findUnique({ where: { id: perfumeId } });
    if (!perfume) throw new NotFoundException('Perfume no encontrado');

    const existingFavorite = await this.prisma.favorito.findFirst({
      where: {
        id_usuario: userId,
        id_perfume: perfumeId,
      },
    });

    if (existingFavorite) {
      return existingFavorite; // Already in favorites
    }

    return this.prisma.favorito.create({
      data: {
        id_usuario: userId,
        id_perfume: perfumeId,
      },
      include: {
        perfume: true,
      },
    });
  }

  async removeFavorite(userId: number, perfumeId: number) {
    const favorite = await this.prisma.favorito.findFirst({
      where: {
        id_usuario: userId,
        id_perfume: perfumeId,
      },
    });

    if (!favorite) throw new NotFoundException('No está en tus favoritos');

    return this.prisma.favorito.delete({
      where: { id: favorite.id },
    });
  }

  async getUserFavorites(userId: number) {
    return this.prisma.favorito.findMany({
      where: { id_usuario: userId },
      include: {
        perfume: true,
      },
      orderBy: { fecha_agregado: 'desc' },
    });
  }
}
