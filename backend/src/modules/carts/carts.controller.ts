import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { CartsService } from './carts.service';
import { AddItemDto } from './dto/add-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('carts')
@UseGuards(AuthGuard)
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Get()
  async getCart(@Req() req: any) {
    const userId = req.user.sub;
    return this.cartsService.getOrCreateCart(userId);
  }

  @Post('items')
  async addItem(@Req() req: any, @Body() dto: AddItemDto) {
    const userId = req.user.sub;
    return this.cartsService.addItem(userId, dto);
  }

  @Patch('items/:detailId')
  async updateItem(
    @Req() req: any,
    @Param('detailId', ParseIntPipe) detailId: number,
    @Body() dto: UpdateItemDto,
  ) {
    const userId = req.user.sub;
    return this.cartsService.updateItem(userId, detailId, dto);
  }

  @Delete('items/:detailId')
  async removeItem(
    @Req() req: any,
    @Param('detailId', ParseIntPipe) detailId: number,
  ) {
    const userId = req.user.sub;
    return this.cartsService.removeItem(userId, detailId);
  }

  @Delete()
  @HttpCode(HttpStatus.OK)
  async clearCart(@Req() req: any) {
    const userId = req.user.sub;
    return this.cartsService.clearCart(userId);
  }
}
