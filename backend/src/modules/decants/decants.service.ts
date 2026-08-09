import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateDecantDto } from './dto/create-decant.dto';
import { UpdateDecantDto } from './dto/update-decant.dto';

@Injectable()
export class DecantsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateDecantDto) {
    // 1. Check if perfume exists
    const perfume = await this.prisma.perfume.findUnique({
      where: { id: dto.id_perfume },
    });

    if (!perfume) {
      throw new NotFoundException('Perfume no encontrado.');
    }

    // 2. Check if decant configuration already exists for this perfume
    const existing = await this.prisma.decant.findUnique({
      where: { id_perfume: dto.id_perfume },
    });

    if (existing) {
      throw new BadRequestException(
        'Ya existe una configuración de decants para este perfume.',
      );
    }

    // 3. Create the decant
    return this.prisma.decant.create({
      data: {
        id_perfume: dto.id_perfume,
        ml_origen: dto.ml_origen,
        costo_original: dto.costo_original,
        precio_original: dto.precio_original,
        costo_5ml: dto.costo_5ml,
        precio_5ml: dto.precio_5ml,
        stock_5ml: dto.stock_5ml ?? 0,
        costo_10ml: dto.costo_10ml,
        precio_10ml: dto.precio_10ml,
        stock_10ml: dto.stock_10ml ?? 0,
      },
      include: {
        perfume: true,
      },
    });
  }

  async findAll() {
    return this.prisma.decant.findMany({
      include: {
        perfume: true,
      },
    });
  }

  async findOne(id: number) {
    const decant = await this.prisma.decant.findUnique({
      where: { id },
      include: { perfume: true },
    });

    if (!decant) {
      throw new NotFoundException('Configuración de decant no encontrada.');
    }

    return decant;
  }

  async findByPerfume(perfumeId: number) {
    const decant = await this.prisma.decant.findUnique({
      where: { id_perfume: perfumeId },
      include: { perfume: true },
    });

    if (!decant) {
      throw new NotFoundException(
        'Configuración de decant no encontrada para este perfume.',
      );
    }

    return decant;
  }

  async update(id: number, dto: UpdateDecantDto) {
    const decant = await this.prisma.decant.findUnique({
      where: { id },
    });

    if (!decant) {
      throw new NotFoundException('Configuración de decant no encontrada.');
    }

    return this.prisma.decant.update({
      where: { id },
      data: dto,
      include: {
        perfume: true,
      },
    });
  }

  async remove(id: number) {
    const decant = await this.prisma.decant.findUnique({
      where: { id },
    });

    if (!decant) {
      throw new NotFoundException('Configuración de decant no encontrada.');
    }

    await this.prisma.decant.delete({
      where: { id },
    });

    return { message: 'Configuración de decant eliminada exitosamente.' };
  }
}
