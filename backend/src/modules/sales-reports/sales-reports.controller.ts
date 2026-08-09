import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  ParseIntPipe,
  UseGuards,
  Query,
} from '@nestjs/common';
import { SalesReportsService } from './sales-reports.service';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@UseGuards(AuthGuard, RolesGuard)
@Controller('sales-reports')
export class SalesReportsController {
  constructor(private readonly salesReportsService: SalesReportsService) {}

  @Roles('ADMIN')
  @Get('dashboard-stats')
  getDashboardStats(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('gender') gender?: string,
  ) {
    return this.salesReportsService.getDashboardStats(
      startDate,
      endDate,
      gender,
    );
  }

  @Roles('ADMIN')
  @Get()
  findAll() {
    return this.salesReportsService.findAll();
  }

  @Roles('ADMIN')
  @Get('vendidos')
  getVendidosReport() {
    return this.salesReportsService.getVendidosReport();
  }

  @Roles('ADMIN')
  @Get('decants')
  findAllDecants() {
    return this.salesReportsService.findAllDecants();
  }

  @Roles('ADMIN')
  @Get('decants/:id')
  findOneDecant(@Param('id', ParseIntPipe) id: number) {
    return this.salesReportsService.findOneDecant(id);
  }

  @Roles('ADMIN')
  @Patch('decants/:id')
  updateDecant(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSaleDto: UpdateSaleDto,
  ) {
    return this.salesReportsService.updateDecant(id, updateSaleDto);
  }

  @Roles('ADMIN')
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.salesReportsService.findOne(id);
  }

  @Roles('ADMIN')
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSaleDto: UpdateSaleDto,
  ) {
    return this.salesReportsService.update(id, updateSaleDto);
  }
}
