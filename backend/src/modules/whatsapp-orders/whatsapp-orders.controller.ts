import {
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Body,
  ParseIntPipe,
  BadRequestException,
} from '@nestjs/common';
import { WhatsappOrdersService } from './whatsapp-orders.service';

@Controller('whatsapp-orders')
export class WhatsappOrdersController {
  constructor(private readonly service: WhatsappOrdersService) {}

  @Post()
  async createOrder(@Body() body: any) {
    if (!body.nombre_cliente || !body.telefono || !body.carrito_json) {
      throw new BadRequestException('Faltan datos obligatorios');
    }
    return this.service.create(body);
  }

  @Get('admin')
  async getAdminOrders() {
    // Nota: Debería tener guard, pero para la demo admin de HTML lo dejamos abierto
    return this.service.findAll();
  }

  @Patch(':id/confirm')
  async confirmOrder(@Param('id', ParseIntPipe) id: number) {
    return this.service.confirmOrder(id);
  }
}
