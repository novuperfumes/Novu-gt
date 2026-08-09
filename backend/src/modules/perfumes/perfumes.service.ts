import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { RedisService } from '../../common/cache/redis.service';
import { CreatePerfumeDto } from './dto/create-perfume.dto';
import { CreatePresentacionDto } from './dto/create-presentacion.dto';
import { UpdatePerfumeDto } from './dto/update-perfume.dto';

@Injectable()
export class PerfumesService {
  private readonly CACHE_TTL = 3600; // 1 hour in seconds
  private readonly CATALOG_CACHE_KEY = 'perfumes:active';

  constructor(
    private prisma: PrismaService,
    private redisService: RedisService,
  ) {}

  async create(dto: CreatePerfumeDto) {
    const perfume = await this.prisma.perfume.create({
      data: dto,
    });
    await this.invalidateCatalogCache();
    return perfume;
  }

  async addPresentacion(perfumeId: number, dto: CreatePresentacionDto) {
    const perfume = await this.prisma.perfume.findUnique({
      where: { id: perfumeId },
    });
    if (!perfume) throw new NotFoundException('Perfume no encontrado.');

    const presentacion = await this.prisma.presentacionPerfume.create({
      data: {
        id_perfume: perfumeId,
        tamanio: dto.tamanio,
        costo: dto.costo ?? 0,
        precio: dto.precio,
        stock: dto.stock,
      },
    });

    await this.invalidateCatalogCache();
    await this.invalidatePerfumeCache(perfumeId);
    return presentacion;
  }

  async updatePresentacion(
    presId: number,
    dto: { tamanio?: string; costo?: number; precio?: number; stock?: number },
  ) {
    const pres = await this.prisma.presentacionPerfume.findUnique({
      where: { id: presId },
    });
    if (!pres) throw new NotFoundException('Presentación no encontrada.');

    const updated = await this.prisma.presentacionPerfume.update({
      where: { id: presId },
      data: dto,
    });

    await this.invalidateCatalogCache();
    await this.invalidatePerfumeCache(pres.id_perfume);
    return updated;
  }

  async removePresentacion(presId: number) {
    const pres = await this.prisma.presentacionPerfume.findUnique({
      where: { id: presId },
    });
    if (!pres) throw new NotFoundException('Presentación no encontrada.');

    const deleted = await this.prisma.presentacionPerfume.delete({
      where: { id: presId },
    });

    await this.invalidateCatalogCache();
    await this.invalidatePerfumeCache(pres.id_perfume);
    return deleted;
  }

  async findAllActive() {
    // Check Redis Cache
    const cached = await this.redisService.get(this.CATALOG_CACHE_KEY);
    if (cached) {
      return JSON.parse(cached);
    }

    // Hit DB
    const perfumes = await this.prisma.perfume.findMany({
      where: { activo: true },
      include: {
        presentaciones: true,
        decant: true,
      },
    });

    // Write Cache
    await this.redisService.set(
      this.CATALOG_CACHE_KEY,
      JSON.stringify(perfumes),
      this.CACHE_TTL,
    );
    return perfumes;
  }

  async getBestSellers(limit: number = 8) {
    const perfumes = await this.prisma.perfume.findMany({
      where: { activo: true },
      include: {
        presentaciones: { include: { ordenDetalles: true } },
        decant: { include: { ordenDetalles: true } },
      },
    });

    const withSales = perfumes.map((p) => {
      let salesCount = 0;
      p.presentaciones.forEach((pres) => {
        pres.ordenDetalles.forEach((od) => {
          salesCount += od.cantidad;
        });
      });
      if (p.decant) {
        p.decant.ordenDetalles.forEach((od) => {
          salesCount += od.cantidad;
        });
      }
      return { ...p, salesCount };
    });

    withSales.sort((a, b) => b.salesCount - a.salesCount);

    const cleaned = withSales.map((p) => {
      const { salesCount, presentaciones, decant, ...rest } = p;
      return {
        ...rest,
        presentaciones: presentaciones.map((pr) => {
          const { ordenDetalles, ...prRest } = pr;
          return prRest;
        }),
        decant: decant
          ? (() => {
              const { ordenDetalles, ...dRest } = decant;
              return dRest;
            })()
          : null,
      };
    });

    return cleaned.slice(0, limit);
  }

  async findAllAdmin() {
    return this.prisma.perfume.findMany({
      include: {
        presentaciones: true,
        decant: true,
      },
      orderBy: { id: 'desc' },
    });
  }

  async findOne(id: number) {
    const cacheKey = `perfume:${id}`;

    // Check Redis Cache
    const cached = await this.redisService.get(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }

    // Hit DB
    const perfume = await this.prisma.perfume.findUnique({
      where: { id },
      include: {
        presentaciones: true,
        decant: true,
      },
    });

    if (!perfume) {
      throw new NotFoundException('Perfume no encontrado.');
    }

    // Write Cache
    await this.redisService.set(
      cacheKey,
      JSON.stringify(perfume),
      this.CACHE_TTL,
    );
    return perfume;
  }

  async update(id: number, dto: any) {
    const existing = await this.prisma.perfume.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Perfume no encontrado.');

    // Separate decant data from basic perfume data
    const { decant, ...perfumeData } = dto;

    const updated = await this.prisma.perfume.update({
      where: { id },
      data: perfumeData,
    });

    if (decant) {
      const existingDecant = await this.prisma.decant.findFirst({
        where: { id_perfume: id },
      });
      if (existingDecant) {
        await this.prisma.decant.update({
          where: { id: existingDecant.id },
          data: {
            precio_5ml: decant.precio_5ml,
            stock_5ml: decant.stock_5ml,
            precio_10ml: decant.precio_10ml,
            stock_10ml: decant.stock_10ml,
          },
        });
      } else {
        await this.prisma.decant.create({
          data: {
            id_perfume: id,
            ml_origen: 100, // default
            costo_original: 0,
            precio_original: 0,
            costo_5ml: 0,
            costo_10ml: 0,
            precio_5ml: decant.precio_5ml,
            stock_5ml: decant.stock_5ml,
            precio_10ml: decant.precio_10ml,
            stock_10ml: decant.stock_10ml,
          },
        });
      }
    }

    await this.invalidateCatalogCache();
    await this.invalidatePerfumeCache(id);
    return updated;
  }

  async remove(id: number) {
    const existing = await this.prisma.perfume.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Perfume no encontrado.');

    // Soft delete (setting active to false) to preserve order history integrity
    const deleted = await this.prisma.perfume.update({
      where: { id },
      data: { activo: false },
    });

    await this.invalidateCatalogCache();
    await this.invalidatePerfumeCache(id);
    return deleted;
  }

  // Cache invalidation helpers
  private async invalidateCatalogCache() {
    await this.redisService.del(this.CATALOG_CACHE_KEY);
  }

  private async invalidatePerfumeCache(id: number) {
    await this.redisService.del(`perfume:${id}`);
  }
}
