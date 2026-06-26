import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class ContactService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateMessageDto) {
    return this.prisma.mensajeContacto.create({
      data: dto,
    });
  }

  async findAll() {
    return this.prisma.mensajeContacto.findMany({
      orderBy: { fecha_creacion: 'desc' },
    });
  }

  async markAsRead(id: number) {
    const existing = await this.prisma.mensajeContacto.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Mensaje no encontrado.');

    return this.prisma.mensajeContacto.update({
      where: { id },
      data: { leido: true },
    });
  }
}
