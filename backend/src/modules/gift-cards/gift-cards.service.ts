import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class GiftCardsService {
  constructor(private prisma: PrismaService) {}

  async createManual(data: { id_usuario: number; monto: number }) {
    const user = await this.prisma.usuario.findUnique({
      where: { id: data.id_usuario },
    });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const codigo = `GIFT-M-${data.monto}-${randomSuffix}`;

    return this.prisma.giftCard.create({
      data: {
        id_usuario: data.id_usuario,
        codigo,
        monto: new Prisma.Decimal(data.monto),
        activa: true,
        es_bienvenida: false,
      },
    });
  }

  async findAll() {
    return this.prisma.giftCard.findMany({
      include: {
        usuario: {
          select: {
            id: true,
            nombre: true,
            apellido: true,
            correo: true,
          },
        },
      },
      orderBy: { id: 'desc' },
    });
  }

  async validate(codigo: string, userId: number) {
    const giftCard = await this.prisma.giftCard.findUnique({
      where: { codigo },
    });

    if (!giftCard) {
      throw new NotFoundException('Gift Card no encontrada.');
    }

    if (!giftCard.activa) {
      throw new BadRequestException(
        'Esta Gift Card ya fue utilizada o está inactiva.',
      );
    }

    if (giftCard.id_usuario !== userId) {
      throw new BadRequestException('Esta Gift Card pertenece a otro usuario.');
    }

    return giftCard;
  }
}
