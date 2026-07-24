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
exports.GiftCardsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma/prisma.service");
const client_1 = require("@prisma/client");
let GiftCardsService = class GiftCardsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createManual(data) {
        const user = await this.prisma.usuario.findUnique({ where: { id: data.id_usuario } });
        if (!user) {
            throw new common_1.NotFoundException('Usuario no encontrado');
        }
        const randomSuffix = Math.floor(100000 + Math.random() * 900000);
        const codigo = `GIFT-M-${data.monto}-${randomSuffix}`;
        return this.prisma.giftCard.create({
            data: {
                id_usuario: data.id_usuario,
                codigo,
                monto: new client_1.Prisma.Decimal(data.monto),
                activa: true,
                es_bienvenida: false,
            }
        });
    }
    async findAll() {
        return this.prisma.giftCard.findMany({
            include: {
                usuario: {
                    select: {
                        id: true,
                        nombre: true,
                        apellido: true,
                        correo: true,
                    }
                }
            },
            orderBy: { id: 'desc' }
        });
    }
    async validate(codigo, userId) {
        const giftCard = await this.prisma.giftCard.findUnique({
            where: { codigo }
        });
        if (!giftCard) {
            throw new common_1.NotFoundException('Gift Card no encontrada.');
        }
        if (!giftCard.activa) {
            throw new common_1.BadRequestException('Esta Gift Card ya fue utilizada o está inactiva.');
        }
        if (giftCard.id_usuario !== userId) {
            throw new common_1.BadRequestException('Esta Gift Card pertenece a otro usuario.');
        }
        return giftCard;
    }
};
exports.GiftCardsService = GiftCardsService;
exports.GiftCardsService = GiftCardsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], GiftCardsService);
//# sourceMappingURL=gift-cards.service.js.map