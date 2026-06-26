import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { AddItemDto } from './dto/add-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class CartsService {
  constructor(private prisma: PrismaService) {}

  async getOrCreateCart(userId: number) {
    let cart = await this.prisma.carritoMaestro.findUnique({
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
    });

    if (!cart) {
      cart = await this.prisma.carritoMaestro.create({
        data: { id_usuario: userId },
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
    }

    return cart;
  }

  async addItem(userId: number, dto: AddItemDto) {
    const cart = await this.getOrCreateCart(userId);

    // Verify presentation and stock
    const presentation = await this.prisma.presentacionPerfume.findUnique({
      where: { id: dto.id_presentacion },
    });

    if (!presentation) {
      throw new NotFoundException('Presentación de perfume no encontrada.');
    }

    if (presentation.stock < dto.cantidad) {
      throw new BadRequestException(`Stock insuficiente. Solo quedan ${presentation.stock} unidades de este tamaño.`);
    }

    // Check if item already in cart
    const existingDetail = await this.prisma.carritoDetalle.findFirst({
      where: {
        id_carrito_maestro: cart.id,
        id_presentacion: dto.id_presentacion,
      },
    });

    if (existingDetail) {
      const newQuantity = existingDetail.cantidad + dto.cantidad;
      if (presentation.stock < newQuantity) {
        throw new BadRequestException(
          `Stock insuficiente para aumentar la cantidad. Stock total: ${presentation.stock}, cantidad actual en carrito: ${existingDetail.cantidad}`,
        );
      }

      return this.prisma.carritoDetalle.update({
        where: { id: existingDetail.id },
        data: { cantidad: newQuantity },
      });
    }

    // Create new detail line
    return this.prisma.carritoDetalle.create({
      data: {
        id_carrito_maestro: cart.id,
        id_presentacion: dto.id_presentacion,
        cantidad: dto.cantidad,
      },
    });
  }

  async updateItem(userId: number, detailId: number, dto: UpdateItemDto) {
    const cart = await this.getOrCreateCart(userId);

    const detail = await this.prisma.carritoDetalle.findUnique({
      where: { id: detailId },
      include: { presentacion: true },
    });

    if (!detail || detail.id_carrito_maestro !== cart.id) {
      throw new NotFoundException('Elemento del carrito no encontrado.');
    }

    if (detail.presentacion.stock < dto.cantidad) {
      throw new BadRequestException(
        `Stock insuficiente. Solo quedan ${detail.presentacion.stock} unidades.`,
      );
    }

    return this.prisma.carritoDetalle.update({
      where: { id: detailId },
      data: { cantidad: dto.cantidad },
    });
  }

  async removeItem(userId: number, detailId: number) {
    const cart = await this.getOrCreateCart(userId);

    const detail = await this.prisma.carritoDetalle.findUnique({
      where: { id: detailId },
    });

    if (!detail || detail.id_carrito_maestro !== cart.id) {
      throw new NotFoundException('Elemento del carrito no encontrado.');
    }

    await this.prisma.carritoDetalle.delete({
      where: { id: detailId },
    });

    return { message: 'Producto eliminado del carrito.' };
  }

  async clearCart(userId: number) {
    const cart = await this.getOrCreateCart(userId);
    await this.prisma.carritoDetalle.deleteMany({
      where: { id_carrito_maestro: cart.id },
    });

    return { message: 'Carrito vaciado.' };
  }
}
