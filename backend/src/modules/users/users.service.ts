import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { Prisma, Usuario } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(private prisma: PrismaService) {}

  async onModuleInit() {
    // Seed admin with secure password
    const adminEmail = process.env.INITIAL_ADMIN_EMAIL || 'admin@novugt.com';
    const exists = await this.findOneByCorreo(adminEmail);
    if (!exists) {
      const defaultPassword = process.env.INITIAL_ADMIN_PASSWORD || 'NovuAdmin2026!SecurePass';
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(defaultPassword, salt);
      await this.prisma.usuario.create({
        data: {
          correo: adminEmail,
          contrasenia: hashedPassword,
          nombre: 'Administrador',
          apellido: 'Sistema',
          rol: 'ADMIN',
        }
      });
      console.log('Usuario Administrador inicial creado de forma segura');
    }
  }

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

  async findOneById(id: number) {
    const user = await this.prisma.usuario.findUnique({
      where: { id },
      include: {
        giftCards: {
          where: { activa: true }
        }
      }
    });
    if (user) {
      const { contrasenia, ...result } = user;
      return result;
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

  async searchUsers(query: string) {
    const isNumber = !isNaN(Number(query));
    
    const users = await this.prisma.usuario.findMany({
      where: {
        OR: [
          { correo: { contains: query } },
          { nombre: { contains: query } },
          { apellido: { contains: query } },
          isNumber ? { id: Number(query) } : undefined,
          { 
            giftCards: {
              some: {
                codigo: { contains: query }
              }
            }
          }
        ].filter(Boolean) as any[]
      },
      include: {
        giftCards: true
      }
    });
    
    return users.map(user => {
      const { contrasenia, ...result } = user;
      return result;
    });
  }

  async updateSellos(id: number, sellos: number) {
    let finalSellos = Math.max(0, sellos);
    let giftCardCreated: any = null;

    // Check if we hit 6 stamps (or more, just in case)
    if (finalSellos >= 6) {
      const redemptions = Math.floor(finalSellos / 6);
      finalSellos = finalSellos % 6;

      // Log stamps redemption transaction
      await this.prisma.historialSellos.create({
        data: {
          id_usuario: id,
          tipo_operacion: 'canjeado',
          cantidad_sellos: -(redemptions * 6),
        },
      });

      // Create Gift Card
      for(let i = 0; i < redemptions; i++) {
        const codigo = 'GIFT-250-' + Math.floor(100000 + Math.random() * 900000);
        giftCardCreated = await this.prisma.giftCard.create({
          data: {
            id_usuario: id,
            codigo,
            monto: 250.00,
            activa: true,
            es_bienvenida: false
          }
        });
      }
    }

    const user = await this.prisma.usuario.update({
      where: { id },
      data: { sellos: finalSellos },
      include: { giftCards: true }
    });
    const { contrasenia, ...result } = user;
    return { user: result, giftCardCreated };
  }

  async getAdminMetrics() {
    const totalUsers = await this.prisma.usuario.count({
      where: { rol: 'CLIENTE' }
    });
    
    const totalOrders = await this.prisma.ordenCompra.count();
    
    const salesAggregate = await this.prisma.ordenCompra.aggregate({
      _sum: { total: true },
      where: { estado: { not: 'CANCELADO' } }
    });
    
    const totalPerfumes = await this.prisma.perfume.count({
      where: { activo: true }
    });
    
    return {
      totalUsers,
      totalOrders,
      totalSales: salesAggregate._sum.total || 0,
      totalPerfumes
    };
  }
}
