import { Module } from '@nestjs/common';
import { WhatsappOrdersController } from './whatsapp-orders.controller';
import { WhatsappOrdersService } from './whatsapp-orders.service';
import { PrismaModule } from '../../common/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [WhatsappOrdersController],
  providers: [WhatsappOrdersService],
})
export class WhatsappOrdersModule {}
