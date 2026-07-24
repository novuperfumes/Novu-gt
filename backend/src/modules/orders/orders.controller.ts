import { Controller, Post, Get, Param, Body, UseGuards, Req, ParseIntPipe, Patch, NotFoundException } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('orders')
@UseGuards(AuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(@Req() req: any, @Body() dto: CreateOrderDto) {
    const userId = req.user.sub;
    return this.ordersService.create(userId, dto);
  }

  @Get()
  async findAll(@Req() req: any) {
    const userId = req.user.sub;
    return this.ordersService.findAllByUser(userId);
  }

  @Get('admin/all')
  async findAllAdmin(@Req() req: any) {
    if (req.user.role !== 'ADMIN') throw new NotFoundException('No autorizado');
    return this.ordersService.findAllAdmin();
  }

  @Patch('admin/:id/status')
  async updateStatus(
    @Req() req: any, 
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { estado: string; costo_envio?: number }
  ) {
    if (req.user.role !== 'ADMIN') throw new NotFoundException('No autorizado');
    return this.ordersService.updateStatus(id, body.estado, body.costo_envio);
  }

  @Get(':id')
  async findOne(@Req() req: any, @Param('id', ParseIntPipe) id: number) {
    const userId = req.user.sub;
    return this.ordersService.findOne(userId, id);
  }
}
