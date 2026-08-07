import { Controller, Get, Post, Param, Body, UseGuards } from '@nestjs/common';
import { PromoCodesService } from './promo-codes.service';
import { CreatePromoDto } from './dto/create-promo.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('promo-codes')
export class PromoCodesController {
  constructor(private readonly promoCodesService: PromoCodesService) {}

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('ADMIN')
  async create(@Body() dto: CreatePromoDto) {
    return this.promoCodesService.create(dto);
  }

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('ADMIN')
  async findAll() {
    return this.promoCodesService.findAll();
  }

  @Get('validate/:code')
  @UseGuards(AuthGuard)
  async validate(@Param('code') code: string) {
    return this.promoCodesService.validate(code);
  }

  @Post(':id/toggle')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('ADMIN')
  async toggleStatus(@Param('id') id: string) {
    return this.promoCodesService.toggleStatus(+id);
  }
}
