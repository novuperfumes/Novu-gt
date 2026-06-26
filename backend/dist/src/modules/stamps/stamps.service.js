"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StampsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma/prisma.service");
let StampsService = class StampsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getUserStamps(userId) {
        let giftCard = await this.prisma.giftCard.findFirst({
            where: { id_usuario: userId },
        });
        if (!giftCard) {
            giftCard = await this.prisma.giftCard.create({
                data: { id_usuario: userId, sellos: 0 },
            });
        }
        const history = await this.prisma.historialSellos.findMany({
            where: { id_usuario: userId },
            orderBy: { fecha: 'desc' },
        });
        return {
            giftCardId: giftCard.id,
            userId: giftCard.id_usuario,
            stampsCount: giftCard.sellos,
            remainingForFreePerfume: Math.max(0, 8 - giftCard.sellos),
            history,
        };
    }
};
exports.StampsService = StampsService;
exports.StampsService = StampsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], StampsService);
//# sourceMappingURL=stamps.service.js.map