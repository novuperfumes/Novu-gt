import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { GiftCardsService } from './gift-cards.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('gift-cards')
export class GiftCardsController {
  constructor(private readonly giftCardsService: GiftCardsService) {}

  @Post('manual')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('ADMIN')
  async createManual(@Body() data: { id_usuario: number; monto: number }) {
    return this.giftCardsService.createManual(data);
  }

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('ADMIN')
  async findAll() {
    return this.giftCardsService.findAll();
  }

  @Get('validate/:code')
  @UseGuards(AuthGuard)
  async validate(@Param('code') code: string, @Request() req) {
    const userId = req.user.sub;
    return this.giftCardsService.validate(code, userId);
  }
}
