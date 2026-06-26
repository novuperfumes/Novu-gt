import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, dto: CreateOrderDto) {
    // 1. Get user cart details
    const cart = await this.prisma.carritoMaestro.findUnique({
      where: { id_usuario: userId },
      include: {
        detalles: {
          include: {
            presentacion: true,
          },
        },
      },
    });

    if (!cart || cart.detalles.length === 0) {
      throw new BadRequestException('El carrito de compras está vacío.');
    }

    // 2. Validate delivery type and details
    if (dto.tipo_entrega === 'sucursal') {
      if (!dto.id_sucursal) {
        throw new BadRequestException('Debe seleccionar una sucursal para el retiro en tienda.');
      }
      const sucursalExists = await this.prisma.sucursal.findUnique({ where: { id: dto.id_sucursal } });
      if (!sucursalExists) throw new NotFoundException('La sucursal seleccionada no existe.');
    } else if (dto.tipo_entrega === 'domicilio') {
      if (!dto.direccion_entrega || !dto.departamento_entrega || !dto.municipio_entrega || !dto.nombre_recibe || !dto.telefono_contacto) {
        throw new BadRequestException('Faltan campos obligatorios para el envío a domicilio.');
      }
    } else {
      throw new BadRequestException('Tipo de entrega no válido. Debe ser "domicilio" o "sucursal".');
    }

    // 3. Execute transactional order placement and stock deduction
    return this.prisma.$transaction(async (tx) => {
      let subtotal = 0;

      // Lock and check stock for each item in the cart
      for (const item of cart.detalles) {
        // Query presentation inside transaction (forces read locking in Postgres)
        const presentation = await tx.presentacionPerfume.findUnique({
          where: { id: item.id_presentacion },
        });

        if (!presentation) {
          throw new NotFoundException(`La presentación de perfume ID ${item.id_presentacion} ya no existe.`);
        }

        if (presentation.stock < item.cantidad) {
          throw new BadRequestException(
            `Stock insuficiente para el producto "${item.id_presentacion}". Disponible: ${presentation.stock}, Solicitado: ${item.cantidad}`,
          );
        }

        // Deduct stock
        await tx.presentacionPerfume.update({
          where: { id: item.id_presentacion },
          data: { stock: { decrement: item.cantidad } },
        });

        subtotal += Number(presentation.precio) * item.cantidad;
      }

      // 4. Validate and apply coupon discount
      let discountAmount = 0;
      if (dto.id_codigo_promocion) {
        const promo = await tx.codigoPromocion.findUnique({
          where: { id: dto.id_codigo_promocion },
        });

        if (!promo || promo.estado !== 'ACTIVO') {
          throw new BadRequestException('El cupón de descuento no es válido o está inactivo.');
        }

        const now = new Date();
        if (now < promo.fecha_inicio || now > promo.fecha_fin) {
          throw new BadRequestException('El cupón de descuento ha expirado o aún no está vigente.');
        }

        if (promo.tipo_descuento === 'porcentaje') {
          discountAmount = subtotal * (Number(promo.descuento) / 100);
        } else if (promo.tipo_descuento === 'monto_fijo') {
          discountAmount = Number(promo.descuento);
        }
      }

      const total = Math.max(0, subtotal - discountAmount);

      // 5. Create the Order
      const order = await tx.ordenCompra.create({
        data: {
          id_usuario: userId,
          total: new Prisma.Decimal(total),
          estado: 'PENDIENTE',
          metodo_de_pago: dto.metodo_de_pago,
          tipo_entrega: dto.tipo_entrega,
          id_sucursal: dto.tipo_entrega === 'sucursal' ? dto.id_sucursal : null,
          id_codigo_promocion: dto.id_codigo_promocion ?? null,
          
          // Shipping snapshotted address data
          nombre_recibe: dto.tipo_entrega === 'domicilio' ? dto.nombre_recibe! : 'Retiro en sucursal',
          telefono_contacto: dto.tipo_entrega === 'domicilio' ? dto.telefono_contacto! : '',
          direccion_entrega: dto.tipo_entrega === 'domicilio' ? dto.direccion_entrega! : 'Retiro en sucursal',
          departamento_entrega: dto.tipo_entrega === 'domicilio' ? dto.departamento_entrega! : '',
          municipio_entrega: dto.tipo_entrega === 'domicilio' ? dto.municipio_entrega! : '',
          referencias_entrega: dto.tipo_entrega === 'domicilio' ? dto.referencias_entrega : null,
          codigo_postal_entrega: dto.tipo_entrega === 'domicilio' ? dto.codigo_postal_entrega : null,
        },
      });

      // 6. Create Order Details freezing current prices
      for (const item of cart.detalles) {
        await tx.ordenDetalle.create({
          data: {
            id_orden: order.id,
            id_presentacion: item.id_presentacion,
            cantidad: item.cantidad,
            precio_unitario: item.presentacion.precio,
          },
        });
      }

      // 7. Clear cart details
      await tx.carritoDetalle.deleteMany({
        where: { id_carrito_maestro: cart.id },
      });

      // 8. Virtual Stamp Loyalty Cards System
      const totalBottlesPurchased = cart.detalles.reduce((sum, d) => sum + d.cantidad, 0);
      
      let giftCard = await tx.giftCard.findFirst({
        where: { id_usuario: userId },
      });

      if (!giftCard) {
        giftCard = await tx.giftCard.create({
          data: { id_usuario: userId, sellos: 0 },
        });
      }

      // Add earned stamps
      const newStampsCount = giftCard.sellos + totalBottlesPurchased;
      
      // Log stamps earning transaction
      await tx.historialSellos.create({
        data: {
          id_usuario: userId,
          id_orden: order.id,
          tipo_operacion: 'acumulado',
          cantidad_sellos: totalBottlesPurchased,
        },
      });

      // If they get 8 or more stamps, process loyalty redemptions (e.g. resets every 8 stamps)
      let finalStamps = newStampsCount;
      if (newStampsCount >= 8) {
        const redemptions = Math.floor(newStampsCount / 8);
        finalStamps = newStampsCount % 8;

        // Log stamps redemption transaction
        await tx.historialSellos.create({
          data: {
            id_usuario: userId,
            id_orden: order.id,
            tipo_operacion: 'canjeado',
            cantidad_sellos: -(redemptions * 8),
          },
        });
      }

      // Update the giftcard stamps
      await tx.giftCard.update({
        where: { id: giftCard.id },
        data: { sellos: finalStamps },
      });

      return {
        order,
        stampsSummary: {
          earned: totalBottlesPurchased,
          totalAccumulated: newStampsCount,
          finalStampsCount: finalStamps,
          freePresentsAwarded: Math.floor(newStampsCount / 8),
        },
      };
    });
  }

  async findAllByUser(userId: number) {
    return this.prisma.ordenCompra.findMany({
      where: { id_usuario: userId },
      include: {
        detalles: {
          include: {
            presentacion: {
              include: {
                perfume: true,
              },
            },
          },
        },
      },
      orderBy: { fecha: 'desc' },
    });
  }

  async findOne(userId: number, orderId: number) {
    const order = await this.prisma.ordenCompra.findUnique({
      where: { id: orderId },
      include: {
        detalles: {
          include: {
            presentacion: {
              include: {
                perfume: true,
              },
            },
          },
        },
      },
    });

    if (!order || order.id_usuario !== userId) {
      throw new NotFoundException('Orden de compra no encontrada.');
    }

    return order;
  }
}
