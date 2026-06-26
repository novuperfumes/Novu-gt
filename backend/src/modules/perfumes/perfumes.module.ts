import { Module } from '@nestjs/common';
import { PerfumesService } from './perfumes.service';
import { PerfumesController } from './perfumes.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [PerfumesService],
  controllers: [PerfumesController],
  exports: [PerfumesService],
})
export class PerfumesModule {}
