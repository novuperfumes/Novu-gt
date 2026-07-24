import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class WhatsappOrdersService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.ordenWhatsApp.create({
      data: {
        nombre_cliente: data.nombre_cliente,
        telefono: data.telefono,
        direccion: data.direccion || '',
        nit: data.nit || 'CF',
        total: data.total,
        carrito_json: data.carrito_json,
      },
    });
  }

  async findAll() {
    return this.prisma.ordenWhatsApp.findMany({
      orderBy: { fecha: 'desc' },
    });
  }

  async confirmOrder(id: number) {
    return this.prisma.$transaction(async (tx) => {
      const order = await tx.ordenWhatsApp.findUnique({ where: { id } });
      if (!order) throw new NotFoundException('Orden no encontrada');
      if (order.estado !== 'PENDIENTE') {
        throw new BadRequestException('La orden ya fue procesada');
      }

      const items = JSON.parse(order.carrito_json);

      for (const item of items) {
        // Buscar el perfume por su nombre exacto o aproximado
        // O nota: Podríamos usar item.brand y item.name
        const perfume = await tx.perfume.findFirst({
          where: { nombre: { equals: item.name, mode: 'insensitive' } },
          include: { presentaciones: true, decant: true },
        });

        if (!perfume) {
          // Si no existe, al menos saltamos para no crashear, pero idealmente lo creamos o avisamos
          console.warn(`Perfume no encontrado en BD: ${item.name}`);
          continue;
        }

        const isDecant = item.size && item.size.toLowerCase().includes('decant');
        let costoTotal = 0;
        let costoCompra = 0;
        let costoTraida = 0;
        let tipoTraida = 'N/A';

        if (isDecant) {
          const decant = perfume.decant?.[0]; // asumiendo 1 decant config por perfume
          if (decant) {
            const is5ml = item.size.includes('5');
            // Restar inventario decant
            if (is5ml) {
              await tx.decant.update({
                where: { id: decant.id },
                data: { stock_5ml: { decrement: item.quantity } }
              });
              costoCompra = Number(decant.costo_5ml);
            } else {
              await tx.decant.update({
                where: { id: decant.id },
                data: { stock_10ml: { decrement: item.quantity } }
              });
              costoCompra = Number(decant.costo_10ml);
            }

            costoTotal = costoCompra;

            // Registrar venta
            for (let i = 0; i < item.quantity; i++) {
              await tx.registroVentaDecantAdmin.create({
                data: {
                  perfume: perfume.nombre,
                  tipo: perfume.tipo,
                  genero: perfume.genero,
                  costo_original: decant.costo_botella,
                  costo_5ml: decant.costo_5ml,
                  costo_10ml: decant.costo_10ml,
                  precio_original: decant.precio_botella,
                  precio_5ml: decant.precio_5ml,
                  precio_10ml: decant.precio_10ml,
                  tamano_vendido: is5ml ? '5 ml' : '10 ml',
                  total_cliente: item.price,
                  entregado: false,
                }
              });
            }
          }
        } else {
          // Botella Completa
          const presentacion = perfume.presentaciones[0];
          if (presentacion) {
            await tx.presentacionPerfume.update({
              where: { id: presentacion.id },
              data: { stock: { decrement: item.quantity } }
            });

            // Buscar costo
            const ingresos = await tx.ingresoInventario.findMany({
              where: { id_presentacion: presentacion.id },
              orderBy: { fecha_ingreso: 'desc' },
              take: 1
            });
            if (ingresos.length > 0) {
              costoCompra = Number(ingresos[0].costo_compra);
              costoTraida = Number(ingresos[0].costo_traida);
              tipoTraida = ingresos[0].tipo_traida;
            } else {
              // fallback cost
              costoCompra = Number(presentacion.precio) * 0.5; 
            }
            costoTotal = costoCompra + costoTraida;

            // Registrar venta
            for (let i = 0; i < item.quantity; i++) {
              await tx.registroVentaAdmin.create({
                data: {
                  perfume: perfume.nombre,
                  tipo: perfume.tipo,
                  genero: perfume.genero,
                  costo_compra: costoCompra,
                  costo_traida: costoTraida,
                  tipo_traida: tipoTraida,
                  costo_total: costoTotal,
                  total_cliente: item.price,
                  pago: 'WhatsApp (Por Confirmar)',
                  entregado: false,
                }
              });
            }
          }
        }
      }

      // Marcar orden como confirmada
      return tx.ordenWhatsApp.update({
        where: { id },
        data: { estado: 'CONFIRMADA' },
      });
    });
  }
}
