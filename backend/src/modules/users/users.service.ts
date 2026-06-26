import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { Prisma, Usuario } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.UsuarioCreateInput): Promise<Usuario> {
    return this.prisma.usuario.create({
      data,
    });
  }

  async findOneByCorreo(correo: string): Promise<Usuario | null> {
    return this.prisma.usuario.findUnique({
      where: { correo },
    });
  }

  async findOneById(id: number): Promise<Omit<Usuario, 'contrasenia'> | null> {
    const user = await this.prisma.usuario.findUnique({
      where: { id },
    });
    if (user) {
      const { contrasenia, ...result } = user;
      return result as Omit<Usuario, 'contrasenia'>;
    }
    return null;
  }

  async updateProfile(id: number, data: Prisma.UsuarioUpdateInput): Promise<Omit<Usuario, 'contrasenia'>> {
    const user = await this.prisma.usuario.update({
      where: { id },
      data,
    });
    const { contrasenia, ...result } = user;
    return result as Omit<Usuario, 'contrasenia'>;
  }
}
