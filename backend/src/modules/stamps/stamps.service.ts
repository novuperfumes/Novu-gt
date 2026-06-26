import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class StampsService {
  constructor(private prisma: PrismaService) {}

  async getUserStamps(userId: number) {
    let giftCard = await this.prisma.giftCard.findFirst({
      where: { id_usuario: userId },
    });

    if (!giftCard) {
      giftCard = await this.prisma.giftCard.create({
        data: { id_usuario: userId, sellos: 0 },
      });
    }

    const history = await this.prisma.historialSellos.findMany({
      where: { id_usuario: userId },
      orderBy: { fecha: 'desc' },
    });

    return {
      giftCardId: giftCard.id,
      userId: giftCard.id_usuario,
      stampsCount: giftCard.sellos,
      remainingForFreePerfume: Math.max(0, 8 - giftCard.sellos),
      history,
    };
  }
}
