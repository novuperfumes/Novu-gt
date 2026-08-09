import { Module } from '@nestjs/common';
import { SalesReportsService } from './sales-reports.service';
import { SalesReportsController } from './sales-reports.controller';

import { PrismaModule } from '../../common/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [SalesReportsService],
  controllers: [SalesReportsController],
})
export class SalesReportsModule {}
