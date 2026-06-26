import { Module } from '@nestjs/common';
import { StampsService } from './stamps.service';
import { StampsController } from './stamps.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [StampsService],
  controllers: [StampsController],
  exports: [StampsService],
})
export class StampsModule {}
