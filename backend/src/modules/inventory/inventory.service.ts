import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { RedisService } from '../../common/cache/redis.service';
import { CreateIngresoDto } from './dto/create-ingreso.dto';

@Injectable()
export class InventoryService {
  private readonly CATALOG_CACHE_KEY = 'perfumes:active';

  constructor(
    private readonly prisma: PrismaService,
    private readonly redisService: RedisService,
  ) {}

  async create(dto: CreateIngresoDto) {
    // Execute a Prisma transaction to ensure stock update and log creation are atomic
    const result = await this.prisma.$transaction(async (tx) => {
      const presentation = await tx.presentacionPerfume.findUnique({
        where: { id: dto.id_presentacion },
        include: { perfume: true },
      });

      if (!presentation) {
        throw new NotFoundException('La presentación de perfume no existe.');
      }

      // 1. Create the inventory log entry
      const ingreso = await tx.ingresoInventario.create({
        data: {
          id_presentacion: dto.id_presentacion,
          cantidad: dto.cantidad,
          costo_compra: dto.costo_compra,
          tipo_traida: dto.tipo_traida,
          costo_traida: dto.costo_traida,
          costo_total: dto.costo_total,
        },
      });

      // 2. Increment the stock of the presentation
      await tx.presentacionPerfume.update({
        where: { id: dto.id_presentacion },
        data: {
          stock: { increment: dto.cantidad },
        },
      });

      return {
        ingreso,
        id_perfume: presentation.id_perfume,
      };
    });

    // 3. Invalidate Redis Caches
    await this.redisService.del(this.CATALOG_CACHE_KEY);
    await this.redisService.del(`perfume:${result.id_perfume}`);

    return result.ingreso;
  }

  async findAll() {
    return this.prisma.ingresoInventario.findMany({
      include: {
        presentacion: {
          include: {
            perfume: true,
          },
        },
      },
      orderBy: {
        fecha_ingreso: 'desc',
      },
    });
  }

  async getStats() {
    const ingresos = await this.prisma.ingresoInventario.findMany();

    let totalCantidad = 0;
    let totalInversion = 0;
    let totalCostoCompra = 0;
    let totalCostoTraida = 0;
    const traidaStats: Record<string, { cantidad: number; inversion: number }> =
      {};

    for (const ing of ingresos) {
      const cantidad = ing.cantidad;
      const costoCompra = Number(ing.costo_compra);
      const costoTraida = Number(ing.costo_traida);
      const costoTotal = Number(ing.costo_total);

      totalCantidad += cantidad;
      totalInversion += cantidad * costoTotal;
      totalCostoCompra += cantidad * costoCompra;
      totalCostoTraida += cantidad * costoTraida;

      // Group by shipping method
      const traida = ing.tipo_traida.toLowerCase().trim();
      if (!traidaStats[traida]) {
        traidaStats[traida] = { cantidad: 0, inversion: 0 };
      }
      traidaStats[traida].cantidad += cantidad;
      traidaStats[traida].inversion += cantidad * costoTotal;
    }

    return {
      resumen: {
        total_perfumes_ingresados: totalCantidad,
        inversion_total: totalInversion,
        inversion_solo_perfumes: totalCostoCompra,
        inversion_solo_traidas: totalCostoTraida,
        costo_promedio_unidad:
          totalCantidad > 0 ? totalInversion / totalCantidad : 0,
      },
      por_tipo_traida: Object.keys(traidaStats).map((tipo) => ({
        tipo_traida: tipo,
        cantidad_unidades: traidaStats[tipo].cantidad,
        inversion_total: traidaStats[tipo].inversion,
      })),
    };
  }
}
