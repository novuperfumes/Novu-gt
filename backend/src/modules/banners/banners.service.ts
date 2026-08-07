import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class BannersService {
  constructor(private prisma: PrismaService) {}

  async findAll(page?: string, includeInactive = false) {
    const where: any = {};
    if (page) {
      where.page = page;
    }
    if (!includeInactive) {
      where.activo = true;
    }
    
    return this.prisma.banner.findMany({
      where,
      orderBy: { orden: 'asc' },
    });
  }

  async create(data: any) {
    return this.prisma.banner.create({
      data: {
        page: data.page,
        bgImage: data.bgImage,
        tag: data.tag,
        title: data.title,
        desc: data.desc,
        link: data.link,
        btnText: data.btnText,
        activo: data.activo ?? true,
        orden: data.orden ? Number(data.orden) : 0,
      }
    });
  }

  async update(id: number, data: any) {
    const banner = await this.prisma.banner.findUnique({ where: { id } });
    if (!banner) throw new NotFoundException('Banner no encontrado');

    return this.prisma.banner.update({
      where: { id },
      data: {
        ...data,
        orden: data.orden !== undefined ? Number(data.orden) : undefined,
      }
    });
  }

  async delete(id: number) {
    const banner = await this.prisma.banner.findUnique({ where: { id } });
    if (!banner) throw new NotFoundException('Banner no encontrado');

    return this.prisma.banner.delete({ where: { id } });
  }
}
