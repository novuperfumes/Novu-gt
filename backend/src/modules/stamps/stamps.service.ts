import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class StampsService {
  constructor(private prisma: PrismaService) {}

  async getUserStamps(userId: number) {
    const user = await this.prisma.usuario.findUnique({
      where: { id: userId },
      include: { giftCards: true }
    });

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    const history = await this.prisma.historialSellos.findMany({
      where: { id_usuario: userId },
      orderBy: { fecha: 'desc' },
    });

    return {
      userId: user.id,
      stampsCount: user.sellos,
      remainingForFreePerfume: Math.max(0, 8 - user.sellos),
      history,
    };
  }
}
