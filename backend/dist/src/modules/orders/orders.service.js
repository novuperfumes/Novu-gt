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
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma/prisma.service");
const client_1 = require("@prisma/client");
let OrdersService = class OrdersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, dto) {
        const cart = await this.prisma.carritoMaestro.findUnique({
            where: { id_usuario: userId },
            include: {
                detalles: {
                    include: {
                        presentacion: true,
                    },
                },
            },
        });
        if (!cart || cart.detalles.length === 0) {
            throw new common_1.BadRequestException('El carrito de compras está vacío.');
        }
        if (dto.tipo_entrega === 'sucursal') {
            if (!dto.id_sucursal) {
                throw new common_1.BadRequestException('Debe seleccionar una sucursal para el retiro en tienda.');
            }
            const sucursalExists = await this.prisma.sucursal.findUnique({ where: { id: dto.id_sucursal } });
            if (!sucursalExists)
                throw new common_1.NotFoundException('La sucursal seleccionada no existe.');
        }
        else if (dto.tipo_entrega === 'domicilio') {
            if (!dto.direccion_entrega || !dto.departamento_entrega || !dto.municipio_entrega || !dto.nombre_recibe || !dto.telefono_contacto) {
                throw new common_1.BadRequestException('Faltan campos obligatorios para el envío a domicilio.');
            }
        }
        else {
            throw new common_1.BadRequestException('Tipo de entrega no válido. Debe ser "domicilio" o "sucursal".');
        }
        return this.prisma.$transaction(async (tx) => {
            let subtotal = 0;
            for (const item of cart.detalles) {
                const presentation = await tx.presentacionPerfume.findUnique({
                    where: { id: item.id_presentacion },
                });
                if (!presentation) {
                    throw new common_1.NotFoundException(`La presentación de perfume ID ${item.id_presentacion} ya no existe.`);
                }
                if (presentation.stock < item.cantidad) {
                    throw new common_1.BadRequestException(`Stock insuficiente para el producto "${item.id_presentacion}". Disponible: ${presentation.stock}, Solicitado: ${item.cantidad}`);
                }
                await tx.presentacionPerfume.update({
                    where: { id: item.id_presentacion },
                    data: { stock: { decrement: item.cantidad } },
                });
                subtotal += Number(presentation.precio) * item.cantidad;
            }
            let discountAmount = 0;
            if (dto.id_codigo_promocion) {
                const promo = await tx.codigoPromocion.findUnique({
                    where: { id: dto.id_codigo_promocion },
                });
                if (!promo || promo.estado !== 'ACTIVO') {
                    throw new common_1.BadRequestException('El cupón de descuento no es válido o está inactivo.');
                }
                const now = new Date();
                if (now < promo.fecha_inicio || now > promo.fecha_fin) {
                    throw new common_1.BadRequestException('El cupón de descuento ha expirado o aún no está vigente.');
                }
                if (promo.tipo_descuento === 'porcentaje') {
                    discountAmount = subtotal * (Number(promo.descuento) / 100);
                }
                else if (promo.tipo_descuento === 'monto_fijo') {
                    discountAmount = Number(promo.descuento);
                }
            }
            const total = Math.max(0, subtotal - discountAmount);
            const order = await tx.ordenCompra.create({
                data: {
                    id_usuario: userId,
                    total: new client_1.Prisma.Decimal(total),
                    estado: 'PENDIENTE',
                    metodo_de_pago: dto.metodo_de_pago,
                    tipo_entrega: dto.tipo_entrega,
                    id_sucursal: dto.tipo_entrega === 'sucursal' ? dto.id_sucursal : null,
                    id_codigo_promocion: dto.id_codigo_promocion ?? null,
                    nombre_recibe: dto.tipo_entrega === 'domicilio' ? dto.nombre_recibe : 'Retiro en sucursal',
                    telefono_contacto: dto.tipo_entrega === 'domicilio' ? dto.telefono_contacto : '',
                    direccion_entrega: dto.tipo_entrega === 'domicilio' ? dto.direccion_entrega : 'Retiro en sucursal',
                    departamento_entrega: dto.tipo_entrega === 'domicilio' ? dto.departamento_entrega : '',
                    municipio_entrega: dto.tipo_entrega === 'domicilio' ? dto.municipio_entrega : '',
                    referencias_entrega: dto.tipo_entrega === 'domicilio' ? dto.referencias_entrega : null,
                    codigo_postal_entrega: dto.tipo_entrega === 'domicilio' ? dto.codigo_postal_entrega : null,
                },
            });
            for (const item of cart.detalles) {
                await tx.ordenDetalle.create({
                    data: {
                        id_orden: order.id,
                        id_presentacion: item.id_presentacion,
                        cantidad: item.cantidad,
                        precio_unitario: item.presentacion.precio,
                    },
                });
            }
            await tx.carritoDetalle.deleteMany({
                where: { id_carrito_maestro: cart.id },
            });
            const totalBottlesPurchased = cart.detalles.reduce((sum, d) => sum + d.cantidad, 0);
            let giftCard = await tx.giftCard.findFirst({
                where: { id_usuario: userId },
            });
            if (!giftCard) {
                giftCard = await tx.giftCard.create({
                    data: { id_usuario: userId, sellos: 0 },
                });
            }
            const newStampsCount = giftCard.sellos + totalBottlesPurchased;
            await tx.historialSellos.create({
                data: {
                    id_usuario: userId,
                    id_orden: order.id,
                    tipo_operacion: 'acumulado',
                    cantidad_sellos: totalBottlesPurchased,
                },
            });
            let finalStamps = newStampsCount;
            if (newStampsCount >= 8) {
                const redemptions = Math.floor(newStampsCount / 8);
                finalStamps = newStampsCount % 8;
                await tx.historialSellos.create({
                    data: {
                        id_usuario: userId,
                        id_orden: order.id,
                        tipo_operacion: 'canjeado',
                        cantidad_sellos: -(redemptions * 8),
                    },
                });
            }
            await tx.giftCard.update({
                where: { id: giftCard.id },
                data: { sellos: finalStamps },
            });
            return {
                order,
                stampsSummary: {
                    earned: totalBottlesPurchased,
                    totalAccumulated: newStampsCount,
                    finalStampsCount: finalStamps,
                    freePresentsAwarded: Math.floor(newStampsCount / 8),
                },
            };
        });
    }
    async findAllByUser(userId) {
        return this.prisma.ordenCompra.findMany({
            where: { id_usuario: userId },
            include: {
                detalles: {
                    include: {
                        presentacion: {
                            include: {
                                perfume: true,
                            },
                        },
                    },
                },
            },
            orderBy: { fecha: 'desc' },
        });
    }
    async findOne(userId, orderId) {
        const order = await this.prisma.ordenCompra.findUnique({
            where: { id: orderId },
            include: {
                detalles: {
                    include: {
                        presentacion: {
                            include: {
                                perfume: true,
                            },
                        },
                    },
                },
            },
        });
        if (!order || order.id_usuario !== userId) {
            throw new common_1.NotFoundException('Orden de compra no encontrada.');
        }
        return order;
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map