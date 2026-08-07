import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { BannersService } from './banners.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('banners')
export class BannersController {
  constructor(private readonly bannersService: BannersService) {}

  @Get()
  async findAll(
    @Query('page') page?: string, 
    @Query('admin') admin?: string
  ) {
    // If admin=true is passed, fetch all including inactive. 
    // In a real app, you might want to protect this with an Admin guard.
    const includeInactive = admin === 'true'; 
    return this.bannersService.findAll(page, includeInactive);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('ADMIN', 'EMPLEADO')
  @Post()
  async create(@Body() data: any) {
    return this.bannersService.create(data);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('ADMIN', 'EMPLEADO')
  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: any) {
    return this.bannersService.update(+id, data);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('ADMIN', 'EMPLEADO')
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.bannersService.delete(+id);
  }
}
