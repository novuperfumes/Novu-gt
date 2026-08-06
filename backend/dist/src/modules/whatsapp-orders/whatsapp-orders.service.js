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
exports.WhatsappOrdersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma/prisma.service");
let WhatsappOrdersService = class WhatsappOrdersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return this.prisma.ordenWhatsApp.create({
            data: {
                nombre_cliente: data.nombre_cliente,
                telefono: data.telefono,
                direccion: data.direccion || '',
                nit: data.nit || 'CF',
                total: data.total,
                carrito_json: data.carrito_json,
            },
        });
    }
    async findAll() {
        return this.prisma.ordenWhatsApp.findMany({
            orderBy: { fecha: 'desc' },
        });
    }
    async confirmOrder(id) {
        return this.prisma.$transaction(async (tx) => {
            const order = await tx.ordenWhatsApp.findUnique({ where: { id } });
            if (!order)
                throw new common_1.NotFoundException('Orden no encontrada');
            if (order.estado !== 'PENDIENTE') {
                throw new common_1.BadRequestException('La orden ya fue procesada');
            }
            const items = JSON.parse(order.carrito_json);
            for (const item of items) {
                const perfume = await tx.perfume.findFirst({
                    where: { nombre: { equals: item.name } },
                    include: { presentaciones: true, decant: true },
                });
                if (!perfume) {
                    console.warn(`Perfume no encontrado en BD: ${item.name}`);
                    continue;
                }
                const isDecant = item.size && item.size.toLowerCase().includes('decant');
                let costoTotal = 0;
                let costoCompra = 0;
                let costoTraida = 0;
                let tipoTraida = 'N/A';
                if (isDecant) {
                    const decant = perfume.decant;
                    if (decant) {
                        const is5ml = item.size.includes('5');
                        if (is5ml) {
                            await tx.decant.update({
                                where: { id: decant.id },
                                data: { stock_5ml: { decrement: item.quantity } }
                            });
                            costoCompra = Number(decant.costo_5ml);
                        }
                        else {
                            await tx.decant.update({
                                where: { id: decant.id },
                                data: { stock_10ml: { decrement: item.quantity } }
                            });
                            costoCompra = Number(decant.costo_10ml);
                        }
                        costoTotal = costoCompra;
                        for (let i = 0; i < item.quantity; i++) {
                            await tx.registroVentaDecantAdmin.create({
                                data: {
                                    perfume: perfume.nombre,
                                    tipo: perfume.tipo,
                                    genero: perfume.genero,
                                    costo_original: decant.costo_original,
                                    costo_5ml: decant.costo_5ml,
                                    costo_10ml: decant.costo_10ml,
                                    precio_original: decant.precio_original,
                                    precio_5ml: decant.precio_5ml,
                                    precio_10ml: decant.precio_10ml,
                                    tamano_vendido: is5ml ? '5 ml' : '10 ml',
                                    total_cliente: item.price,
                                    entregado: false,
                                }
                            });
                        }
                    }
                }
                else {
                    const presentacion = perfume.presentaciones[0];
                    if (presentacion) {
                        await tx.presentacionPerfume.update({
                            where: { id: presentacion.id },
                            data: { stock: { decrement: item.quantity } }
                        });
                        const ingresos = await tx.ingresoInventario.findMany({
                            where: { id_presentacion: presentacion.id },
                            orderBy: { fecha_ingreso: 'desc' },
                            take: 1
                        });
                        if (ingresos.length > 0) {
                            costoCompra = Number(ingresos[0].costo_compra);
                            costoTraida = Number(ingresos[0].costo_traida);
                            tipoTraida = ingresos[0].tipo_traida;
                        }
                        else {
                            costoCompra = Number(presentacion.precio) * 0.5;
                        }
                        costoTotal = costoCompra + costoTraida;
                        for (let i = 0; i < item.quantity; i++) {
                            await tx.registroVentaAdmin.create({
                                data: {
                                    perfume: perfume.nombre,
                                    tipo: perfume.tipo,
                                    genero: perfume.genero,
                                    costo_compra: costoCompra,
                                    costo_traida: costoTraida,
                                    tipo_traida: tipoTraida,
                                    costo_total: costoTotal,
                                    total_cliente: item.price,
                                    pago: 'WhatsApp (Por Confirmar)',
                                    entregado: false,
                                }
                            });
                        }
                    }
                }
            }
            return tx.ordenWhatsApp.update({
                where: { id },
                data: { estado: 'CONFIRMADA' },
            });
        });
    }
};
exports.WhatsappOrdersService = WhatsappOrdersService;
exports.WhatsappOrdersService = WhatsappOrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WhatsappOrdersService);
//# sourceMappingURL=whatsapp-orders.service.js.map