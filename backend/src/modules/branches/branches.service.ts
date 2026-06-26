import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { RedisService } from '../../common/cache/redis.service';
import { CreateBranchDto } from './dto/create-branch.dto';

@Injectable()
export class BranchesService {
  private readonly CACHE_KEY = 'branches:all';
  private readonly CACHE_TTL = 86400; // 24 hours in seconds

  constructor(
    private prisma: PrismaService,
    private redisService: RedisService,
  ) {}

  async create(dto: CreateBranchDto) {
    const branch = await this.prisma.sucursal.create({
      data: dto,
    });
    await this.invalidateCache();
    return branch;
  }

  async findAll() {
    const cached = await this.redisService.get(this.CACHE_KEY);
    if (cached) return JSON.parse(cached);

    const branches = await this.prisma.sucursal.findMany();
    await this.redisService.set(this.CACHE_KEY, JSON.stringify(branches), this.CACHE_TTL);
    return branches;
  }

  private async invalidateCache() {
    await this.redisService.del(this.CACHE_KEY);
  }
}
