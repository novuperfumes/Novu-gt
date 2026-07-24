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
exports.CartsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma/prisma.service");
let CartsService = class CartsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getOrCreateCart(userId) {
        let cart = await this.prisma.carritoMaestro.findUnique({
            where: { id_usuario: userId },
            include: {
                detalles: {
                    include: {
                        presentacion: {
                            include: {
                                perfume: true,
                            },
                        },
                        decant: {
                            include: {
                                perfume: true,
                            },
                        },
                    },
                },
            },
        });
        if (!cart) {
            cart = await this.prisma.carritoMaestro.create({
                data: { id_usuario: userId },
                include: {
                    detalles: {
                        include: {
                            presentacion: {
                                include: {
                                    perfume: true,
                                },
                            },
                            decant: {
                                include: {
                                    perfume: true,
                                },
                            },
                        },
                    },
                },
            });
        }
        return cart;
    }
    async addItem(userId, dto) {
        const cart = await this.getOrCreateCart(userId);
        if (!dto.id_presentacion && !dto.id_decant) {
            throw new common_1.BadRequestException('Debe proporcionar id_presentacion o id_decant.');
        }
        if (dto.id_decant && !dto.tipo_decant) {
            throw new common_1.BadRequestException('Debe especificar el tipo_decant para compras de decants.');
        }
        if (dto.id_presentacion) {
            const presentation = await this.prisma.presentacionPerfume.findUnique({
                where: { id: dto.id_presentacion },
            });
            if (!presentation) {
                throw new common_1.NotFoundException('Presentación de perfume no encontrada.');
            }
            if (presentation.stock < dto.cantidad) {
                throw new common_1.BadRequestException(`Stock insuficiente. Solo quedan ${presentation.stock} unidades de este tamaño.`);
            }
            const existingDetail = await this.prisma.carritoDetalle.findFirst({
                where: {
                    id_carrito_maestro: cart.id,
                    id_presentacion: dto.id_presentacion,
                },
            });
            if (existingDetail) {
                const newQuantity = existingDetail.cantidad + dto.cantidad;
                if (presentation.stock < newQuantity) {
                    throw new common_1.BadRequestException(`Stock insuficiente para aumentar la cantidad. Stock total: ${presentation.stock}, cantidad actual en carrito: ${existingDetail.cantidad}`);
                }
                return this.prisma.carritoDetalle.update({
                    where: { id: existingDetail.id },
                    data: { cantidad: newQuantity },
                });
            }
            return this.prisma.carritoDetalle.create({
                data: {
                    id_carrito_maestro: cart.id,
                    id_presentacion: dto.id_presentacion,
                    cantidad: dto.cantidad,
                },
            });
        }
        else {
            const decant = await this.prisma.decant.findUnique({
                where: { id: dto.id_decant },
            });
            if (!decant) {
                throw new common_1.NotFoundException('Decant no encontrado.');
            }
            const tipo = dto.tipo_decant.toLowerCase().trim();
            let stock = 0;
            if (tipo === '5 ml' || tipo === '5ml') {
                stock = decant.stock_5ml;
            }
            else if (tipo === '10 ml' || tipo === '10ml') {
                stock = decant.stock_10ml;
            }
            else {
                throw new common_1.BadRequestException('El tipo de decant debe ser "5 ml" o "10 ml".');
            }
            if (stock < dto.cantidad) {
                throw new common_1.BadRequestException(`Stock insuficiente para decant. Solo quedan ${stock} unidades de este tamaño.`);
            }
            const existingDetail = await this.prisma.carritoDetalle.findFirst({
                where: {
                    id_carrito_maestro: cart.id,
                    id_decant: dto.id_decant,
                    tipo_decant: dto.tipo_decant,
                },
            });
            if (existingDetail) {
                const newQuantity = existingDetail.cantidad + dto.cantidad;
                if (stock < newQuantity) {
                    throw new common_1.BadRequestException(`Stock insuficiente para aumentar la cantidad. Stock total: ${stock}, cantidad actual en carrito: ${existingDetail.cantidad}`);
                }
                return this.prisma.carritoDetalle.update({
                    where: { id: existingDetail.id },
                    data: { cantidad: newQuantity },
                });
            }
            return this.prisma.carritoDetalle.create({
                data: {
                    id_carrito_maestro: cart.id,
                    id_decant: dto.id_decant,
                    tipo_decant: dto.tipo_decant,
                    cantidad: dto.cantidad,
                },
            });
        }
    }
    async updateItem(userId, detailId, dto) {
        const cart = await this.getOrCreateCart(userId);
        const detail = await this.prisma.carritoDetalle.findUnique({
            where: { id: detailId },
            include: { presentacion: true, decant: true },
        });
        if (!detail || detail.id_carrito_maestro !== cart.id) {
            throw new common_1.NotFoundException('Elemento del carrito no encontrado.');
        }
        let stock = 0;
        if (detail.id_presentacion && detail.presentacion) {
            stock = detail.presentacion.stock;
        }
        else if (detail.id_decant && detail.decant && detail.tipo_decant) {
            const tipo = detail.tipo_decant.toLowerCase().trim();
            if (tipo === '5 ml' || tipo === '5ml') {
                stock = detail.decant.stock_5ml;
            }
            else if (tipo === '10 ml' || tipo === '10ml') {
                stock = detail.decant.stock_10ml;
            }
        }
        if (stock < dto.cantidad) {
            throw new common_1.BadRequestException(`Stock insuficiente. Solo quedan ${stock} unidades.`);
        }
        return this.prisma.carritoDetalle.update({
            where: { id: detailId },
            data: { cantidad: dto.cantidad },
        });
    }
    async removeItem(userId, detailId) {
        const cart = await this.getOrCreateCart(userId);
        const detail = await this.prisma.carritoDetalle.findUnique({
            where: { id: detailId },
        });
        if (!detail || detail.id_carrito_maestro !== cart.id) {
            throw new common_1.NotFoundException('Elemento del carrito no encontrado.');
        }
        await this.prisma.carritoDetalle.delete({
            where: { id: detailId },
        });
        return { message: 'Producto eliminado del carrito.' };
    }
    async clearCart(userId) {
        const cart = await this.getOrCreateCart(userId);
        await this.prisma.carritoDetalle.deleteMany({
            where: { id_carrito_maestro: cart.id },
        });
        return { message: 'Carrito vaciado.' };
    }
};
exports.CartsService = CartsService;
exports.CartsService = CartsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CartsService);
//# sourceMappingURL=carts.service.js.map