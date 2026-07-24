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
exports.SalesReportsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma/prisma.service");
let SalesReportsService = class SalesReportsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        return this.prisma.registroVentaAdmin.findMany({
            orderBy: { fecha_venta: 'desc' },
            include: {
                ordenDetalle: {
                    include: {
                        orden: {
                            include: {
                                usuario: {
                                    select: {
                                        nombre: true,
                                        apellido: true,
                                        correo: true,
                                        telefono: true,
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
    }
    async findOne(id) {
        const sale = await this.prisma.registroVentaAdmin.findUnique({
            where: { id },
            include: {
                ordenDetalle: {
                    include: {
                        orden: true
                    }
                }
            }
        });
        if (!sale) {
            throw new common_1.NotFoundException(`Registro de venta #${id} no encontrado.`);
        }
        return sale;
    }
    async update(id, dto) {
        await this.findOne(id);
        return this.prisma.registroVentaAdmin.update({
            where: { id },
            data: dto,
        });
    }
    async findAllDecants() {
        return this.prisma.registroVentaDecantAdmin.findMany({
            orderBy: { fecha_venta: 'desc' },
            include: {
                ordenDetalle: {
                    include: {
                        orden: {
                            include: {
                                usuario: {
                                    select: {
                                        nombre: true,
                                        apellido: true,
                                        correo: true,
                                        telefono: true,
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
    }
    async findOneDecant(id) {
        const sale = await this.prisma.registroVentaDecantAdmin.findUnique({
            where: { id },
            include: {
                ordenDetalle: {
                    include: {
                        orden: true
                    }
                }
            }
        });
        if (!sale) {
            throw new common_1.NotFoundException(`Registro de venta decant #${id} no encontrado.`);
        }
        return sale;
    }
    async updateDecant(id, dto) {
        await this.findOneDecant(id);
        return this.prisma.registroVentaDecantAdmin.update({
            where: { id },
            data: dto,
        });
    }
    async getVendidosReport() {
        const perfumes = await this.prisma.registroVentaAdmin.findMany({
            include: {
                ordenDetalle: {
                    include: {
                        presentacion: {
                            include: {
                                ingresos: {
                                    orderBy: { fecha_ingreso: 'desc' },
                                    take: 1
                                }
                            }
                        }
                    }
                }
            }
        });
        const decants = await this.prisma.registroVentaDecantAdmin.findMany({
            include: {
                ordenDetalle: true
            }
        });
        const reportPerfumes = perfumes.map(p => {
            let fechaIngreso = null;
            if (p.ordenDetalle?.presentacion?.ingresos && p.ordenDetalle.presentacion.ingresos.length > 0) {
                fechaIngreso = p.ordenDetalle.presentacion.ingresos[0].fecha_ingreso;
            }
            return {
                id: `perfume_${p.id}`,
                fecha_ingreso: fechaIngreso,
                fecha_venta: p.fecha_venta,
                tipo: p.tipo,
                genero: p.genero,
                perfume: p.perfume,
                tamano_presentacion: 'Botella Completa',
                costo_compra: Number(p.costo_compra),
                costo_traida: Number(p.costo_traida),
                tipo_traida: p.tipo_traida,
                costo_total: Number(p.costo_total),
                total_cliente: Number(p.total_cliente)
            };
        });
        const reportDecants = decants.map(d => {
            return {
                id: `decant_${d.id}`,
                fecha_ingreso: null,
                fecha_venta: d.fecha_venta,
                tipo: d.tipo,
                genero: d.genero,
                perfume: d.perfume,
                tamano_presentacion: `Decant ${d.tamano_vendido || ''}`.trim(),
                costo_compra: Number(d.tamano_vendido === '5 ml' || d.tamano_vendido === '5ml' ? d.costo_5ml : d.costo_10ml),
                costo_traida: 0,
                tipo_traida: 'N/A',
                costo_total: Number(d.tamano_vendido === '5 ml' || d.tamano_vendido === '5ml' ? d.costo_5ml : d.costo_10ml),
                total_cliente: Number(d.total_cliente)
            };
        });
        const combinado = [...reportPerfumes, ...reportDecants].sort((a, b) => {
            return new Date(b.fecha_venta).getTime() - new Date(a.fecha_venta).getTime();
        });
        return combinado;
    }
};
exports.SalesReportsService = SalesReportsService;
exports.SalesReportsService = SalesReportsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SalesReportsService);
//# sourceMappingURL=sales-reports.service.js.map