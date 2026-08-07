"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma/prisma.service");
const bcrypt = __importStar(require("bcrypt"));
let UsersService = class UsersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async onModuleInit() {
        const adminEmail = process.env.INITIAL_ADMIN_EMAIL || 'admin@novugt.com';
        const exists = await this.findOneByCorreo(adminEmail);
        if (!exists) {
            const defaultPassword = process.env.INITIAL_ADMIN_PASSWORD || 'NovuAdmin2026!SecurePass';
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(defaultPassword, salt);
            await this.prisma.usuario.create({
                data: {
                    correo: adminEmail,
                    contrasenia: hashedPassword,
                    nombre: 'Administrador',
                    apellido: 'Sistema',
                    rol: 'ADMIN',
                }
            });
            console.log('Usuario Administrador inicial creado de forma segura');
        }
    }
    async create(data) {
        return this.prisma.usuario.create({
            data,
        });
    }
    async findOneByCorreo(correo) {
        return this.prisma.usuario.findUnique({
            where: { correo },
        });
    }
    async findOneById(id) {
        const user = await this.prisma.usuario.findUnique({
            where: { id },
            include: {
                giftCards: {
                    where: { activa: true }
                }
            }
        });
        if (user) {
            const { contrasenia, ...result } = user;
            return result;
        }
        return null;
    }
    async updateProfile(id, data) {
        const user = await this.prisma.usuario.update({
            where: { id },
            data,
        });
        const { contrasenia, ...result } = user;
        return result;
    }
    async searchUsers(query) {
        const isNumber = !isNaN(Number(query));
        const users = await this.prisma.usuario.findMany({
            where: {
                OR: [
                    { correo: { contains: query } },
                    { nombre: { contains: query } },
                    { apellido: { contains: query } },
                    isNumber ? { id: Number(query) } : undefined,
                    {
                        giftCards: {
                            some: {
                                codigo: { contains: query }
                            }
                        }
                    }
                ].filter(Boolean)
            },
            include: {
                giftCards: true
            }
        });
        return users.map(user => {
            const { contrasenia, ...result } = user;
            return result;
        });
    }
    async updateSellos(id, sellos) {
        let finalSellos = Math.max(0, sellos);
        let giftCardCreated = null;
        if (finalSellos >= 6) {
            const redemptions = Math.floor(finalSellos / 6);
            finalSellos = finalSellos % 6;
            await this.prisma.historialSellos.create({
                data: {
                    id_usuario: id,
                    tipo_operacion: 'canjeado',
                    cantidad_sellos: -(redemptions * 6),
                },
            });
            for (let i = 0; i < redemptions; i++) {
                const codigo = 'GIFT-250-' + Math.floor(100000 + Math.random() * 900000);
                giftCardCreated = await this.prisma.giftCard.create({
                    data: {
                        id_usuario: id,
                        codigo,
                        monto: 250.00,
                        activa: true,
                        es_bienvenida: false
                    }
                });
            }
        }
        const user = await this.prisma.usuario.update({
            where: { id },
            data: { sellos: finalSellos },
            include: { giftCards: true }
        });
        const { contrasenia, ...result } = user;
        return { user: result, giftCardCreated };
    }
    async getAdminMetrics() {
        const totalUsers = await this.prisma.usuario.count({
            where: { rol: 'CLIENTE' }
        });
        const totalOrders = await this.prisma.ordenCompra.count();
        const salesAggregate = await this.prisma.ordenCompra.aggregate({
            _sum: { total: true },
            where: { estado: { not: 'CANCELADO' } }
        });
        const totalPerfumes = await this.prisma.perfume.count({
            where: { activo: true }
        });
        return {
            totalUsers,
            totalOrders,
            totalSales: salesAggregate._sum.total || 0,
            totalPerfumes
        };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map