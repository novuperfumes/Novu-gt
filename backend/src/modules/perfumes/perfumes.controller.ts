import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { PerfumesService } from './perfumes.service';
import { CreatePerfumeDto } from './dto/create-perfume.dto';
import { CreatePresentacionDto } from './dto/create-presentacion.dto';
import { UpdatePerfumeDto } from './dto/update-perfume.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('perfumes')
export class PerfumesController {
  constructor(private readonly perfumesService: PerfumesService) {}

  @Get()
  async findAll() {
    return this.perfumesService.findAllActive();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.perfumesService.findOne(id);
  }

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('ADMIN')
  async create(@Body() dto: CreatePerfumeDto) {
    return this.perfumesService.create(dto);
  }

  @Post(':id/presentaciones')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('ADMIN')
  async addPresentacion(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreatePresentacionDto,
  ) {
    return this.perfumesService.addPresentacion(id, dto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('ADMIN')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePerfumeDto,
  ) {
    return this.perfumesService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('ADMIN')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.perfumesService.remove(id);
  }
}
