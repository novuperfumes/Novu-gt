import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreatePromoDto } from './dto/create-promo.dto';

@Injectable()
export class PromoCodesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreatePromoDto) {
    const existing = await this.prisma.codigoPromocion.findUnique({
      where: { codigo: dto.codigo.toUpperCase() },
    });

    if (existing) {
      throw new BadRequestException('El código de promoción ya existe.');
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

  async validate(code: string) {
    const promo = await this.prisma.codigoPromocion.findUnique({
      where: { codigo: code.toUpperCase() },
    });

    if (!promo || promo.estado !== 'ACTIVO') {
      throw new NotFoundException('Cupón de descuento no válido o inactivo.');
    }

    const now = new Date();
    if (now < promo.fecha_inicio || now > promo.fecha_fin) {
      throw new BadRequestException('El cupón de descuento ha expirado o no está vigente.');
    }

    return promo;
  }

  async findAll() {
    return this.prisma.codigoPromocion.findMany();
  }

  async toggleStatus(id: number) {
    const promo = await this.prisma.codigoPromocion.findUnique({ where: { id } });
    if (!promo) throw new NotFoundException('Código no encontrado');
    
    const newStatus = promo.estado === 'ACTIVO' ? 'INACTIVO' : 'ACTIVO';
    
    return this.prisma.codigoPromocion.update({
      where: { id },
      data: { estado: newStatus }
    });
  }
}
