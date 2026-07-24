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
                        presentacion: {
                            include: {
                                perfume: true,
                                ingresos: { orderBy: { fecha_ingreso: 'desc' }, take: 1 }
                            }
                        },
                        decant: {
                            include: { perfume: true }
                        },
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
                if (item.id_presentacion) {
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
                else if (item.id_decant && item.tipo_decant) {
                    const decant = await tx.decant.findUnique({
                        where: { id: item.id_decant },
                    });
                    if (!decant) {
                        throw new common_1.NotFoundException(`El decant ID ${item.id_decant} ya no existe.`);
                    }
                    const tipo = item.tipo_decant.toLowerCase().trim();
                    let stock = 0;
                    let precio = 0;
                    if (tipo.includes('5 ml') || tipo.includes('5ml')) {
                        stock = decant.stock_5ml;
                        precio = Number(decant.precio_5ml);
                    }
                    else if (tipo.includes('10 ml') || tipo.includes('10ml')) {
                        stock = decant.stock_10ml;
                        precio = Number(decant.precio_10ml);
                    }
                    else {
                        throw new common_1.BadRequestException(`Tipo de decant no válido: ${item.tipo_decant}`);
                    }
                    if (stock < item.cantidad) {
                        throw new common_1.BadRequestException(`Stock insuficiente para el decant "${item.tipo_decant}". Disponible: ${stock}, Solicitado: ${item.cantidad}`);
                    }
                    const dataToUpdate = {};
                    if (tipo.includes('5 ml') || tipo.includes('5ml')) {
                        dataToUpdate.stock_5ml = { decrement: item.cantidad };
                    }
                    else {
                        dataToUpdate.stock_10ml = { decrement: item.cantidad };
                    }
                    await tx.decant.update({
                        where: { id: item.id_decant },
                        data: dataToUpdate,
                    });
                    subtotal += precio * item.cantidad;
                }
            }
            let discountAmount = 0;
            let appliedPromoId = dto.id_codigo_promocion || null;
            let appliedGiftCardId = null;
            if (dto.codigo_descuento) {
                const giftCard = await tx.giftCard.findUnique({ where: { codigo: dto.codigo_descuento } });
                if (giftCard) {
                    if (!giftCard.activa)
                        throw new common_1.BadRequestException('Esta Gift Card ya fue utilizada.');
                    if (giftCard.id_usuario !== userId)
                        throw new common_1.BadRequestException('Esta Gift Card pertenece a otro usuario.');
                    discountAmount = Number(giftCard.monto);
                    appliedGiftCardId = giftCard.id;
                    await tx.giftCard.update({
                        where: { id: giftCard.id },
                        data: { activa: false }
                    });
                }
                else {
                    const promo = await tx.codigoPromocion.findUnique({ where: { codigo: dto.codigo_descuento } });
                    if (!promo || promo.estado !== 'ACTIVO') {
                        throw new common_1.BadRequestException('El código de descuento no es válido o está inactivo.');
                    }
                    const now = new Date();
                    if (now < promo.fecha_inicio || now > promo.fecha_fin) {
                        throw new common_1.BadRequestException('El cupón de descuento ha expirado o aún no está vigente.');
                    }
                    const existingUse = await tx.usoPromocion.findUnique({
                        where: { id_usuario_id_codigo_promocion: { id_usuario: userId, id_codigo_promocion: promo.id } }
                    });
                    if (existingUse) {
                        throw new common_1.BadRequestException('Ya has utilizado este código promocional anteriormente.');
                    }
                    if (promo.tipo_descuento === 'porcentaje') {
                        discountAmount = subtotal * (Number(promo.descuento) / 100);
                    }
                    else if (promo.tipo_descuento === 'monto_fijo') {
                        discountAmount = Number(promo.descuento);
                    }
                    appliedPromoId = promo.id;
                    await tx.usoPromocion.create({
                        data: { id_usuario: userId, id_codigo_promocion: promo.id }
                    });
                }
            }
            else if (dto.id_codigo_promocion) {
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
                appliedPromoId = promo.id;
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
                    id_codigo_promocion: appliedPromoId,
                    id_gift_card: appliedGiftCardId,
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
                let precioUnitario = 0;
                let perfumeNombre = '';
                let perfumeTipo = '';
                let perfumeGenero = '';
                let costoCompra = 0;
                let costoTraida = 0;
                let tipoTraida = '';
                let costoTotal = 0;
                if (item.id_presentacion && item.presentacion) {
                    precioUnitario = Number(item.presentacion.precio);
                    perfumeNombre = item.presentacion.perfume?.nombre || '';
                    perfumeTipo = item.presentacion.perfume?.tipo || '';
                    perfumeGenero = item.presentacion.perfume?.genero || '';
                    if (item.presentacion.ingresos && item.presentacion.ingresos.length > 0) {
                        const lastIngreso = item.presentacion.ingresos[0];
                        costoCompra = Number(lastIngreso.costo_compra);
                        costoTraida = Number(lastIngreso.costo_traida);
                        tipoTraida = lastIngreso.tipo_traida;
                        costoTotal = Number(lastIngreso.costo_total);
                    }
                }
                else if (item.id_decant && item.tipo_decant && item.decant) {
                    perfumeNombre = `${item.decant.perfume?.nombre || ''} (Decant ${item.tipo_decant})`;
                    perfumeTipo = item.decant.perfume?.tipo || '';
                    perfumeGenero = item.decant.perfume?.genero || '';
                    costoTraida = 0;
                    tipoTraida = 'N/A';
                    const tipo = item.tipo_decant.toLowerCase().trim();
                    if (tipo === '5 ml' || tipo === '5ml') {
                        precioUnitario = Number(item.decant.precio_5ml);
                        costoCompra = Number(item.decant.costo_5ml);
                    }
                    else {
                        precioUnitario = Number(item.decant.precio_10ml);
                        costoCompra = Number(item.decant.costo_10ml);
                    }
                    costoTotal = costoCompra;
                }
                const detalle = await tx.ordenDetalle.create({
                    data: {
                        id_orden: order.id,
                        id_presentacion: item.id_presentacion,
                        id_decant: item.id_decant,
                        tipo_decant: item.tipo_decant,
                        cantidad: item.cantidad,
                        precio_unitario: new client_1.Prisma.Decimal(precioUnitario),
                    },
                });
                for (let i = 0; i < item.cantidad; i++) {
                    if (item.id_presentacion) {
                        await tx.registroVentaAdmin.create({
                            data: {
                                id_orden_detalle: i === 0 ? detalle.id : null,
                                perfume: perfumeNombre,
                                tipo: perfumeTipo,
                                genero: perfumeGenero,
                                costo_compra: new client_1.Prisma.Decimal(costoCompra),
                                costo_traida: new client_1.Prisma.Decimal(costoTraida),
                                tipo_traida: tipoTraida,
                                costo_total: new client_1.Prisma.Decimal(costoTotal),
                                total_cliente: new client_1.Prisma.Decimal(precioUnitario),
                                pago: order.metodo_de_pago,
                                entregado: false,
                            }
                        });
                    }
                    else if (item.id_decant && item.decant) {
                        const is5ml = item.tipo_decant?.toLowerCase().trim() === '5 ml' || item.tipo_decant?.toLowerCase().trim() === '5ml';
                        await tx.registroVentaDecantAdmin.create({
                            data: {
                                id_orden_detalle: i === 0 ? detalle.id : null,
                                perfume: item.decant.perfume?.nombre || 'Decant',
                                tipo: perfumeTipo,
                                genero: perfumeGenero,
                                ml_origen: item.decant.ml_origen,
                                costo_original: new client_1.Prisma.Decimal(Number(item.decant.costo_original)),
                                costo_5ml: new client_1.Prisma.Decimal(Number(item.decant.costo_5ml)),
                                costo_10ml: new client_1.Prisma.Decimal(Number(item.decant.costo_10ml)),
                                precio_original: new client_1.Prisma.Decimal(Number(item.decant.precio_original)),
                                precio_5ml: new client_1.Prisma.Decimal(Number(item.decant.precio_5ml)),
                                precio_10ml: new client_1.Prisma.Decimal(Number(item.decant.precio_10ml)),
                                tamano_vendido: is5ml ? '5 ml' : '10 ml',
                                total_cliente: new client_1.Prisma.Decimal(precioUnitario),
                                pago: order.metodo_de_pago,
                                entregado: false,
                            }
                        });
                    }
                }
            }
            await tx.carritoDetalle.deleteMany({
                where: { id_carrito_maestro: cart.id },
            });
            const totalBottlesPurchased = cart.detalles.reduce((sum, d) => sum + d.cantidad, 0);
            const user = await tx.usuario.findUnique({ where: { id: userId } });
            const currentStamps = user?.sellos || 0;
            const newStampsCount = currentStamps + totalBottlesPurchased;
            await tx.historialSellos.create({
                data: {
                    id_usuario: userId,
                    id_orden: order.id,
                    tipo_operacion: 'acumulado',
                    cantidad_sellos: totalBottlesPurchased,
                },
            });
            let finalStamps = newStampsCount;
            const redemptions = Math.floor(newStampsCount / 8);
            if (newStampsCount >= 8) {
                finalStamps = newStampsCount % 8;
                await tx.historialSellos.create({
                    data: {
                        id_usuario: userId,
                        id_orden: order.id,
                        tipo_operacion: 'canjeado',
                        cantidad_sellos: -(redemptions * 8),
                    },
                });
                for (let i = 0; i < redemptions; i++) {
                    await tx.giftCard.create({
                        data: {
                            id_usuario: userId,
                            codigo: 'GIFT-150-' + Math.floor(100000 + Math.random() * 900000),
                            monto: 150.00,
                            activa: true,
                            es_bienvenida: false
                        }
                    });
                }
            }
            await tx.usuario.update({
                where: { id: userId },
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
                        decant: {
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
                        decant: {
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
    async findAllAdmin() {
        return this.prisma.ordenCompra.findMany({
            include: {
                usuario: true,
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
                codigoPromocion: true,
                giftCard: true,
            },
            orderBy: { fecha: 'desc' },
        });
    }
    async updateStatus(orderId, estado, costo_envio) {
        const order = await this.prisma.ordenCompra.findUnique({ where: { id: orderId } });
        if (!order)
            throw new common_1.NotFoundException('Orden no encontrada');
        const updateData = { estado };
        if (costo_envio !== undefined) {
            const currentEnvio = Number(order.costo_envio || 0);
            const originalTotal = Number(order.total) - currentEnvio;
            updateData.costo_envio = new client_1.Prisma.Decimal(costo_envio);
            updateData.total = new client_1.Prisma.Decimal(originalTotal + Number(costo_envio));
        }
        return this.prisma.ordenCompra.update({
            where: { id: orderId },
            data: updateData,
        });
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map