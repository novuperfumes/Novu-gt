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
    const perfume = await this.prisma.perfume.findUnique({ where: { id: perfumeId } });
    if (!perfume) throw new NotFoundException('Perfume no encontrado.');

    const presentacion = await this.prisma.presentacionPerfume.create({
      data: {
        id_perfume: perfumeId,
        tamanio: dto.tamanio,
        precio: dto.precio,
        stock: dto.stock,
      },
    });

    await this.invalidateCatalogCache();
    await this.invalidatePerfumeCache(perfumeId);
    return presentacion;
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
      },
    });

    // Write Cache
    await this.redisService.set(this.CATALOG_CACHE_KEY, JSON.stringify(perfumes), this.CACHE_TTL);
    return perfumes;
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
      },
    });

    if (!perfume) {
      throw new NotFoundException('Perfume no encontrado.');
    }

    // Write Cache
    await this.redisService.set(cacheKey, JSON.stringify(perfume), this.CACHE_TTL);
    return perfume;
  }

  async update(id: number, dto: UpdatePerfumeDto) {
    const existing = await this.prisma.perfume.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Perfume no encontrado.');

    const updated = await this.prisma.perfume.update({
      where: { id },
      data: dto,
    });

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
