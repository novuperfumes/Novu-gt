import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { UpdateSaleDto } from './dto/update-sale.dto';

@Injectable()
export class SalesReportsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.registroVentaAdmin.findMany({
      orderBy: { fecha_venta: 'desc' },
      include: {
        ordenDetalle: {
          include: {
            orden: {
              include: {
                usuario: {
                  select: {
                    nombre: true,
                    apellido: true,
                    correo: true,
                    telefono: true,
                  }
                }
              }
            }
          }
        }
      }
    });
  }

  async findOne(id: number) {
    const sale = await this.prisma.registroVentaAdmin.findUnique({
      where: { id },
      include: {
        ordenDetalle: {
          include: {
            orden: true
          }
        }
      }
    });

    if (!sale) {
      throw new NotFoundException(`Registro de venta #${id} no encontrado.`);
    }

    return sale;
  }

  async update(id: number, dto: UpdateSaleDto) {
    await this.findOne(id); // Ensure exists
    
    return this.prisma.registroVentaAdmin.update({
      where: { id },
      data: dto,
    });
  }

  async findAllDecants() {
    return this.prisma.registroVentaDecantAdmin.findMany({
      orderBy: { fecha_venta: 'desc' },
      include: {
        ordenDetalle: {
          include: {
            orden: {
              include: {
                usuario: {
                  select: {
                    nombre: true,
                    apellido: true,
                    correo: true,
                    telefono: true,
                  }
                }
              }
            }
          }
        }
      }
    });
  }

  async findOneDecant(id: number) {
    const sale = await this.prisma.registroVentaDecantAdmin.findUnique({
      where: { id },
      include: {
        ordenDetalle: {
          include: {
            orden: true
          }
        }
      }
    });

    if (!sale) {
      throw new NotFoundException(`Registro de venta decant #${id} no encontrado.`);
    }

    return sale;
  }

  async updateDecant(id: number, dto: UpdateSaleDto) {
    await this.findOneDecant(id); // Ensure exists
    
    return this.prisma.registroVentaDecantAdmin.update({
      where: { id },
      data: dto,
    });
  }

  async getVendidosReport() {
    // Obtener perfumes enteros
    const perfumes = await this.prisma.registroVentaAdmin.findMany({
      include: {
        ordenDetalle: {
          include: {
            presentacion: {
              include: {
                ingresos: {
                  orderBy: { fecha_ingreso: 'desc' },
                  take: 1
                }
              }
            }
          }
        }
      }
    });

    // Obtener decants
    const decants = await this.prisma.registroVentaDecantAdmin.findMany({
      include: {
        ordenDetalle: true
      }
    });

    // Mapear y combinar
    const reportPerfumes = perfumes.map(p => {
      let fechaIngreso: Date | null = null;
      if (p.ordenDetalle?.presentacion?.ingresos && p.ordenDetalle.presentacion.ingresos.length > 0) {
        fechaIngreso = p.ordenDetalle.presentacion.ingresos[0].fecha_ingreso;
      }
      return {
        id: `perfume_${p.id}`,
        fecha_ingreso: fechaIngreso,
        fecha_venta: p.fecha_venta,
        tipo: p.tipo,
        genero: p.genero,
        perfume: p.perfume,
        tamano_presentacion: 'Botella Completa',
        costo_compra: Number(p.costo_compra),
        costo_traida: Number(p.costo_traida),
        tipo_traida: p.tipo_traida,
        costo_total: Number(p.costo_total),
        total_cliente: Number(p.total_cliente)
      };
    });

    const reportDecants = decants.map(d => {
      // Los decants no guardan la fecha de ingreso en un historial separado por ahora, 
      // o se podría buscar la fecha de creación del decant si se requiere.
      // Por simplicidad para el reporte contable, usaremos la fecha de venta o null si no aplica.
      return {
        id: `decant_${d.id}`,
        fecha_ingreso: null, // Si se necesita, habría que rastrear el ingreso del frasco original
        fecha_venta: d.fecha_venta,
        tipo: d.tipo,
        genero: d.genero,
        perfume: d.perfume,
        tamano_presentacion: `Decant ${d.tamano_vendido || ''}`.trim(),
        costo_compra: Number(d.tamano_vendido === '5 ml' || d.tamano_vendido === '5ml' ? d.costo_5ml : d.costo_10ml),
        costo_traida: 0, // No aplica
        tipo_traida: 'N/A',
        costo_total: Number(d.tamano_vendido === '5 ml' || d.tamano_vendido === '5ml' ? d.costo_5ml : d.costo_10ml),
        total_cliente: Number(d.total_cliente)
      };
    });

    // Unir ambos arreglos y ordenar por fecha de venta descendente
    const combinado = [...reportPerfumes, ...reportDecants].sort((a, b) => {
      return new Date(b.fecha_venta).getTime() - new Date(a.fecha_venta).getTime();
    });

    return combinado;
  }
}
