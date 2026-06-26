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
exports.AddressesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma/prisma.service");
let AddressesService = class AddressesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, dto) {
        return this.prisma.direccion.create({
            data: {
                ...dto,
                id_usuario: userId,
            },
        });
    }
    async findAllByUser(userId) {
        return this.prisma.direccion.findMany({
            where: { id_usuario: userId },
        });
    }
    async findOne(userId, addressId) {
        const address = await this.prisma.direccion.findUnique({
            where: { id: addressId },
        });
        if (!address) {
            throw new common_1.NotFoundException('Dirección no encontrada');
        }
        if (address.id_usuario !== userId) {
            throw new common_1.ForbiddenException('No tienes permiso para ver esta dirección');
        }
        return address;
    }
    async update(userId, addressId, dto) {
        await this.findOne(userId, addressId);
        return this.prisma.direccion.update({
            where: { id: addressId },
            data: dto,
        });
    }
    async remove(userId, addressId) {
        await this.findOne(userId, addressId);
        return this.prisma.direccion.delete({
            where: { id: addressId },
        });
    }
};
exports.AddressesService = AddressesService;
exports.AddressesService = AddressesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AddressesService);
//# sourceMappingURL=addresses.service.js.map