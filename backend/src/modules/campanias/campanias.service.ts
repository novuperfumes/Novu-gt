import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateCampaniaDto } from './dto/create-campania.dto';

@Injectable()
export class CampaniasService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.campaniaDescuento.findMany({
      orderBy: { creado_en: 'desc' },
    });
  }

  async findActiva() {
    const campania = await this.prisma.campaniaDescuento.findFirst({
      where: { activa: true },
    });
    return campania || null;
  }

  async create(dto: CreateCampaniaDto) {
    return this.prisma.campaniaDescuento.create({
      data: {
        nombre: dto.nombre,
        tipo: dto.tipo,
        descuento: dto.descuento,
        categorias: dto.categorias ?? null,
        perfume_ids: dto.perfume_ids ?? null,
        fecha_inicio: dto.fecha_inicio ? new Date(dto.fecha_inicio) : null,
        fecha_fin: dto.fecha_fin ? new Date(dto.fecha_fin) : null,
        activa: false,
      },
    });
  }

  async update(id: number, data: Partial<CreateCampaniaDto> & { activa?: boolean }) {
    const existing = await this.prisma.campaniaDescuento.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException(`Campaña #${id} no encontrada`);

    // Si se activa esta campaña, desactivar todas las demás
    if (data.activa === true) {
      await this.prisma.campaniaDescuento.updateMany({
        where: { id: { not: id } },
        data: { activa: false },
      });
    }

    return this.prisma.campaniaDescuento.update({
      where: { id },
      data: {
        ...(data.nombre !== undefined && { nombre: data.nombre }),
        ...(data.tipo !== undefined && { tipo: data.tipo }),
        ...(data.descuento !== undefined && { descuento: data.descuento }),
        ...(data.categorias !== undefined && { categorias: data.categorias }),
        ...(data.perfume_ids !== undefined && { perfume_ids: data.perfume_ids }),
        ...(data.fecha_inicio !== undefined && { fecha_inicio: data.fecha_inicio ? new Date(data.fecha_inicio) : null }),
        ...(data.fecha_fin !== undefined && { fecha_fin: data.fecha_fin ? new Date(data.fecha_fin) : null }),
        ...(data.activa !== undefined && { activa: data.activa }),
      },
    });
  }

  async toggleActiva(id: number) {
    const existing = await this.prisma.campaniaDescuento.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException(`Campaña #${id} no encontrada`);

    if (!existing.activa) {
      // Activar esta, desactivar todas las demás
      await this.prisma.campaniaDescuento.updateMany({
        where: { id: { not: id } },
        data: { activa: false },
      });
    }

    return this.prisma.campaniaDescuento.update({
      where: { id },
      data: { activa: !existing.activa },
    });
  }

  async remove(id: number) {
    const existing = await this.prisma.campaniaDescuento.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException(`Campaña #${id} no encontrada`);
    return this.prisma.campaniaDescuento.delete({ where: { id } });
  }
}
