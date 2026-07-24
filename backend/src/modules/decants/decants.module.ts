import { Module } from '@nestjs/common';
import { DecantsService } from './decants.service';
import { DecantsController } from './decants.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [DecantsService],
  controllers: [DecantsController],
  exports: [DecantsService],
})
export class DecantsModule {}
