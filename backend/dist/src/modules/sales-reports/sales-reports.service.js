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
    async getDashboardStats(startDate, endDate, genderFilter) {
        const whereClause = {};
        if (startDate || endDate) {
            whereClause.fecha_venta = {};
            if (startDate) {
                const start = new Date(startDate);
                start.setHours(0, 0, 0, 0);
                whereClause.fecha_venta.gte = start;
            }
            if (endDate) {
                const end = new Date(endDate);
                end.setHours(23, 59, 59, 999);
                whereClause.fecha_venta.lte = end;
            }
        }
        if (genderFilter && genderFilter !== 'todos') {
            whereClause.genero = genderFilter;
        }
        const ventasPerfumes = await this.prisma.registroVentaAdmin.findMany({ where: whereClause });
        const ventasDecants = await this.prisma.registroVentaDecantAdmin.findMany({ where: whereClause });
        let totalVendido = 0;
        let totalIngresos = 0;
        let totalGanancias = 0;
        const summaryByCategory = {
            Arabe: { cantidad: 0, ingresos: 0, ganancias: 0 },
            Diseñador: { cantidad: 0, ingresos: 0, ganancias: 0 },
            Nicho: { cantidad: 0, ingresos: 0, ganancias: 0 },
        };
        const summaryByGender = {
            Hombre: 0,
            Mujer: 0,
            Unisex: 0
        };
        const monthlyData = {};
        const procesarVenta = (v) => {
            const tipoLower = (v.tipo || 'Desconocido').toLowerCase();
            const tipo = tipoLower.includes('arabe') || tipoLower.includes('árabe') ? 'Arabe' :
                tipoLower.includes('nicho') ? 'Nicho' :
                    tipoLower.includes('diseñador') || tipoLower.includes('disenador') ? 'Diseñador' : 'Otro';
            const generoLower = (v.genero || 'unisex').toLowerCase();
            const gen = generoLower === 'el' || generoLower === 'hombre' ? 'Hombre' :
                generoLower === 'ella' || generoLower === 'mujer' ? 'Mujer' : 'Unisex';
            const ingresos = Number(v.total_cliente || 0);
            const costo = Number(v.costo_total || 0);
            const ganancia = ingresos - costo;
            const cantidad = 1;
            totalVendido += cantidad;
            totalIngresos += ingresos;
            totalGanancias += ganancia;
            if (summaryByCategory[tipo]) {
                summaryByCategory[tipo].cantidad += cantidad;
                summaryByCategory[tipo].ingresos += ingresos;
                summaryByCategory[tipo].ganancias += ganancia;
            }
            summaryByGender[gen] += cantidad;
            const dateObj = new Date(v.fecha_venta);
            const monthStr = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}`;
            if (!monthlyData[monthStr]) {
                monthlyData[monthStr] = {
                    month: monthStr,
                    categorias: {
                        Arabe: { cantidad: 0, ingresos: 0, ganancias: 0 },
                        Diseñador: { cantidad: 0, ingresos: 0, ganancias: 0 },
                        Nicho: { cantidad: 0, ingresos: 0, ganancias: 0 },
                    },
                    generos: { Hombre: 0, Mujer: 0, Unisex: 0 }
                };
            }
            if (monthlyData[monthStr].categorias[tipo]) {
                monthlyData[monthStr].categorias[tipo].cantidad += cantidad;
                monthlyData[monthStr].categorias[tipo].ingresos += ingresos;
                monthlyData[monthStr].categorias[tipo].ganancias += ganancia;
            }
            monthlyData[monthStr].generos[gen] += cantidad;
        };
        ventasPerfumes.forEach(procesarVenta);
        ventasDecants.forEach(procesarVenta);
        const [pendientes, procesadas, entregadas, canceladas] = await Promise.all([
            this.prisma.ordenCompra.count({ where: { estado: 'PENDIENTE' } }),
            this.prisma.ordenCompra.count({ where: { estado: 'PROCESADO' } }),
            this.prisma.ordenCompra.count({ where: { estado: 'ENTREGADO' } }),
            this.prisma.ordenCompra.count({ where: { estado: 'CANCELADO' } }),
        ]);
        const topVendidosRaw = await this.prisma.ordenDetalle.groupBy({
            by: ['id_presentacion'],
            where: {
                id_presentacion: { not: null },
                orden: { estado: { in: ['PROCESADO', 'ENTREGADO'] } },
            },
            _sum: { cantidad: true },
            orderBy: { _sum: { cantidad: 'desc' } },
            take: 5,
        });
        const topVendidos = await Promise.all(topVendidosRaw.map(async (row) => {
            const pres = await this.prisma.presentacionPerfume.findUnique({
                where: { id: row.id_presentacion },
                include: { perfume: true },
            });
            return {
                nombre: pres?.perfume?.nombre || 'Desconocido',
                marca: pres?.perfume?.marca || '',
                imagen: pres?.perfume?.imagen || '',
                tamanio: pres?.tamanio || '',
                totalVendido: row._sum.cantidad || 0,
            };
        }));
        return {
            kpis: {
                totalVendido,
                totalIngresos,
                totalGanancias
            },
            summaryByCategory,
            summaryByGender,
            monthlyData: Object.values(monthlyData).sort((a, b) => a.month.localeCompare(b.month)),
            orderStatusCounts: {
                pendientes,
                procesadas,
                entregadas,
                canceladas,
            },
            topVendidos,
        };
    }
};
exports.SalesReportsService = SalesReportsService;
exports.SalesReportsService = SalesReportsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SalesReportsService);
//# sourceMappingURL=sales-reports.service.js.map