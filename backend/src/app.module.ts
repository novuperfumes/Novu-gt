import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from 'nestjs-pino';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './common/prisma/prisma.module';
import { RedisModule } from './common/cache/redis.module';
import { APP_GUARD } from '@nestjs/core';
import { RedisThrottlerGuard } from './common/guards/throttler.guard';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { PerfumesModule } from './modules/perfumes/perfumes.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { DecantsModule } from './modules/decants/decants.module';
import { CartsModule } from './modules/carts/carts.module';
import { OrdersModule } from './modules/orders/orders.module';
import { PromoCodesModule } from './modules/promo-codes/promo-codes.module';
import { BranchesModule } from './modules/branches/branches.module';
import { StampsModule } from './modules/stamps/stamps.module';
import { ContactModule } from './modules/contact/contact.module';
import { AddressesModule } from './modules/addresses/addresses.module';
import { FavoritesModule } from './modules/favorites/favorites.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { UploadsModule } from './modules/uploads/uploads.module';
import { SalesReportsModule } from './modules/sales-reports/sales-reports.module';
import { WhatsappOrdersModule } from './modules/whatsapp-orders/whatsapp-orders.module';
import { GiftCardsModule } from './modules/gift-cards/gift-cards.module';
import { CampaniasModule } from './modules/campanias/campanias.module';
import { BannersModule } from './modules/banners/banners.module';

@Module({
  imports: [
    // Load config globally
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // Async high-throughput pino logging
    LoggerModule.forRoot({
      pinoHttp: {
        transport: process.env.NODE_ENV !== 'production'
          ? { target: 'pino-pretty', options: { colorize: true, singleLine: true } }
          : undefined,
      },
    }),
    // Global database client module
    PrismaModule,
    // Global Redis caching module
    RedisModule,
    
    // Business modules
    UsersModule,
    AuthModule,
    PerfumesModule,
    InventoryModule,
    DecantsModule,
    CartsModule,
    OrdersModule,
    PromoCodesModule,
    BranchesModule,
    StampsModule,
    ContactModule,
    AddressesModule,
    FavoritesModule,
    ReviewsModule,
    UploadsModule,
    SalesReportsModule,
    WhatsappOrdersModule,
    GiftCardsModule,
    CampaniasModule,
    BannersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // Global Rate Limiting Guard
    {
      provide: APP_GUARD,
      useClass: RedisThrottlerGuard,
    },
  ],
})
export class AppModule {}
