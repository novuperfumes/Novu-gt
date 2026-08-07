"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const nestjs_pino_1 = require("nestjs-pino");
const config_1 = require("@nestjs/config");
const prisma_module_1 = require("./common/prisma/prisma.module");
const redis_module_1 = require("./common/cache/redis.module");
const core_1 = require("@nestjs/core");
const throttler_guard_1 = require("./common/guards/throttler.guard");
const users_module_1 = require("./modules/users/users.module");
const auth_module_1 = require("./modules/auth/auth.module");
const perfumes_module_1 = require("./modules/perfumes/perfumes.module");
const inventory_module_1 = require("./modules/inventory/inventory.module");
const decants_module_1 = require("./modules/decants/decants.module");
const carts_module_1 = require("./modules/carts/carts.module");
const orders_module_1 = require("./modules/orders/orders.module");
const promo_codes_module_1 = require("./modules/promo-codes/promo-codes.module");
const branches_module_1 = require("./modules/branches/branches.module");
const stamps_module_1 = require("./modules/stamps/stamps.module");
const contact_module_1 = require("./modules/contact/contact.module");
const addresses_module_1 = require("./modules/addresses/addresses.module");
const favorites_module_1 = require("./modules/favorites/favorites.module");
const reviews_module_1 = require("./modules/reviews/reviews.module");
const uploads_module_1 = require("./modules/uploads/uploads.module");
const sales_reports_module_1 = require("./modules/sales-reports/sales-reports.module");
const whatsapp_orders_module_1 = require("./modules/whatsapp-orders/whatsapp-orders.module");
const gift_cards_module_1 = require("./modules/gift-cards/gift-cards.module");
const campanias_module_1 = require("./modules/campanias/campanias.module");
const banners_module_1 = require("./modules/banners/banners.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            nestjs_pino_1.LoggerModule.forRoot({
                pinoHttp: {
                    transport: process.env.NODE_ENV !== 'production'
                        ? { target: 'pino-pretty', options: { colorize: true, singleLine: true } }
                        : undefined,
                },
            }),
            prisma_module_1.PrismaModule,
            redis_module_1.RedisModule,
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            perfumes_module_1.PerfumesModule,
            inventory_module_1.InventoryModule,
            decants_module_1.DecantsModule,
            carts_module_1.CartsModule,
            orders_module_1.OrdersModule,
            promo_codes_module_1.PromoCodesModule,
            branches_module_1.BranchesModule,
            stamps_module_1.StampsModule,
            contact_module_1.ContactModule,
            addresses_module_1.AddressesModule,
            favorites_module_1.FavoritesModule,
            reviews_module_1.ReviewsModule,
            uploads_module_1.UploadsModule,
            sales_reports_module_1.SalesReportsModule,
            whatsapp_orders_module_1.WhatsappOrdersModule,
            gift_cards_module_1.GiftCardsModule,
            campanias_module_1.CampaniasModule,
            banners_module_1.BannersModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_guard_1.RedisThrottlerGuard,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map