import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { CampaniasService } from './campanias.service';
import { CreateCampaniaDto } from './dto/create-campania.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('campanias')
export class CampaniasController {
  constructor(private readonly campaniasService: CampaniasService) {}

  /** Público: devuelve la campaña activa (o null) para el frontend */
  @Get('activa')
  findActiva() {
    return this.campaniasService.findActiva();
  }

  /** Admin: lista todas las campañas */
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Get()
  findAll() {
    return this.campaniasService.findAll();
  }

  /** Admin: crear campaña */
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Post()
  create(@Body() dto: CreateCampaniaDto) {
    return this.campaniasService.create(dto);
  }

  /** Admin: editar campaña */
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    return this.campaniasService.update(id, body);
  }

  /** Admin: activar/desactivar una campaña (toggle) */
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Patch(':id/toggle')
  toggle(@Param('id', ParseIntPipe) id: number) {
    return this.campaniasService.toggleActiva(id);
  }

  /** Admin: eliminar campaña */
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.campaniasService.remove(id);
  }
}
