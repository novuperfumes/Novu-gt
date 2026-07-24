import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { CreateIngresoDto } from './dto/create-ingreso.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('inventory')
@UseGuards(AuthGuard, RolesGuard)
@Roles('ADMIN')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post('ingresos')
  async create(@Body() dto: CreateIngresoDto) {
    return this.inventoryService.create(dto);
  }

  @Get('ingresos')
  async findAll() {
    return this.inventoryService.findAll();
  }

  @Get('stats')
  async getStats() {
    return this.inventoryService.getStats();
  }
}
