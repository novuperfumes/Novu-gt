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

  async getDashboardStats(startDate?: string, endDate?: string, genderFilter?: string) {
    const whereClause: any = {};
    
    if (startDate || endDate) {
      whereClause.fecha_venta = {};
      if (startDate) {
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);
        whereClause.fecha_venta.gte = start;
      }
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        whereClause.fecha_venta.lte = end;
      }
    }
    
    if (genderFilter && genderFilter !== 'todos') {
      whereClause.genero = genderFilter;
    }

    const ventasPerfumes = await this.prisma.registroVentaAdmin.findMany({ where: whereClause });
    const ventasDecants = await this.prisma.registroVentaDecantAdmin.findMany({ where: whereClause });

    let totalVendido = 0;
    let totalIngresos = 0;
    let totalGanancias = 0;

    // Resúmenes para gráficos de barras
    const summaryByCategory: Record<string, any> = {
      Arabe: { cantidad: 0, ingresos: 0, ganancias: 0 },
      Diseñador: { cantidad: 0, ingresos: 0, ganancias: 0 },
      Nicho: { cantidad: 0, ingresos: 0, ganancias: 0 },
    };

    // Resúmenes para gráfico de pastel (pie chart)
    const summaryByGender: Record<string, number> = {
      Hombre: 0,
      Mujer: 0,
      Unisex: 0
    };

    // Resumen por mes para las tablas
    const monthlyData: Record<string, any> = {};

    const procesarVenta = (v: any) => {
      const tipoLower = (v.tipo || 'Desconocido').toLowerCase();
      const tipo = tipoLower.includes('arabe') || tipoLower.includes('árabe') ? 'Arabe' :
                   tipoLower.includes('nicho') ? 'Nicho' : 
                   tipoLower.includes('diseñador') || tipoLower.includes('disenador') ? 'Diseñador' : 'Otro';

      // Filtrar "Otro" para no ensuciar los gráficos A, D, N si no queremos, o incluirlo si es necesario.
      // Los screenshots solo muestran A, D, N. Si es otro lo ignoraremos de los contadores A,D,N.

      const generoLower = (v.genero || 'unisex').toLowerCase();
      const gen = generoLower === 'el' || generoLower === 'hombre' ? 'Hombre' :
                  generoLower === 'ella' || generoLower === 'mujer' ? 'Mujer' : 'Unisex';

      const ingresos = Number(v.total_cliente || 0);
      const costo = Number(v.costo_total || 0);
      const ganancia = ingresos - costo;
      const cantidad = 1; // 1 item per record

      totalVendido += cantidad;
      totalIngresos += ingresos;
      totalGanancias += ganancia;

      if (summaryByCategory[tipo]) {
        summaryByCategory[tipo].cantidad += cantidad;
        summaryByCategory[tipo].ingresos += ingresos;
        summaryByCategory[tipo].ganancias += ganancia;
      }

      summaryByGender[gen] += cantidad;

      const dateObj = new Date(v.fecha_venta);
      const monthStr = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}`; // YYYY-MM
      
      if (!monthlyData[monthStr]) {
        monthlyData[monthStr] = {
          month: monthStr,
          categorias: {
            Arabe: { cantidad: 0, ingresos: 0, ganancias: 0 },
            Diseñador: { cantidad: 0, ingresos: 0, ganancias: 0 },
            Nicho: { cantidad: 0, ingresos: 0, ganancias: 0 },
          },
          generos: { Hombre: 0, Mujer: 0, Unisex: 0 }
        };
      }

      if (monthlyData[monthStr].categorias[tipo]) {
        monthlyData[monthStr].categorias[tipo].cantidad += cantidad;
        monthlyData[monthStr].categorias[tipo].ingresos += ingresos;
        monthlyData[monthStr].categorias[tipo].ganancias += ganancia;
      }
      monthlyData[monthStr].generos[gen] += cantidad;
    };

    ventasPerfumes.forEach(procesarVenta);
    ventasDecants.forEach(procesarVenta);

    // Order status counts (all time, not filtered by date)
    const [pendientes, procesadas, entregadas, canceladas] = await Promise.all([
      this.prisma.ordenCompra.count({ where: { estado: 'PENDIENTE' } }),
      this.prisma.ordenCompra.count({ where: { estado: 'PROCESADO' } }),
      this.prisma.ordenCompra.count({ where: { estado: 'ENTREGADO' } }),
      this.prisma.ordenCompra.count({ where: { estado: 'CANCELADO' } }),
    ]);

    // Top best-selling perfumes by actual confirmed order lines
    const topVendidosRaw = await this.prisma.ordenDetalle.groupBy({
      by: ['id_presentacion'],
      where: {
        id_presentacion: { not: null },
        orden: { estado: { in: ['PROCESADO', 'ENTREGADO'] } },
      },
      _sum: { cantidad: true },
      orderBy: { _sum: { cantidad: 'desc' } },
      take: 5,
    });

    const topVendidos = await Promise.all(
      topVendidosRaw.map(async (row) => {
        const pres = await this.prisma.presentacionPerfume.findUnique({
          where: { id: row.id_presentacion! },
          include: { perfume: true },
        });
        return {
          nombre: pres?.perfume?.nombre || 'Desconocido',
          marca: pres?.perfume?.marca || '',
          imagen: pres?.perfume?.imagen || '',
          tamanio: pres?.tamanio || '',
          totalVendido: row._sum.cantidad || 0,
        };
      })
    );

    return {
      kpis: {
        totalVendido,
        totalIngresos,
        totalGanancias
      },
      summaryByCategory,
      summaryByGender,
      monthlyData: Object.values(monthlyData).sort((a: any, b: any) => a.month.localeCompare(b.month)),
      orderStatusCounts: {
        pendientes,
        procesadas,
        entregadas,
        canceladas,
      },
      topVendidos,
    };
  }
}
