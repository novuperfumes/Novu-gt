import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { DecantsService } from './decants.service';
import { CreateDecantDto } from './dto/create-decant.dto';
import { UpdateDecantDto } from './dto/update-decant.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('decants')
@UseGuards(AuthGuard, RolesGuard)
@Roles('ADMIN')
export class DecantsController {
  constructor(private readonly decantsService: DecantsService) {}

  @Post()
  async create(@Body() dto: CreateDecantDto) {
    return this.decantsService.create(dto);
  }

  @Get()
  async findAll() {
    return this.decantsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.decantsService.findOne(id);
  }

  @Get('perfume/:perfumeId')
  async findByPerfume(@Param('perfumeId', ParseIntPipe) perfumeId: number) {
    return this.decantsService.findByPerfume(perfumeId);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateDecantDto,
  ) {
    return this.decantsService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.decantsService.remove(id);
  }
}
