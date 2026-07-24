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
exports.ConfiguracionService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../common/prisma/prisma.service");
let ConfiguracionService = class ConfiguracionService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getConfiguracion() {
        let config = await this.prisma.configuracion.findUnique({
            where: { id: 1 },
        });
        if (!config) {
            config = await this.prisma.configuracion.create({
                data: { id: 1, modo_bazar: false },
            });
        }
        return config;
    }
    async setModoBazar(modo_bazar) {
        let config = await this.prisma.configuracion.findUnique({
            where: { id: 1 },
        });
        if (!config) {
            config = await this.prisma.configuracion.create({
                data: { id: 1, modo_bazar },
            });
        }
        else {
            config = await this.prisma.configuracion.update({
                where: { id: 1 },
                data: { modo_bazar },
            });
        }
        return config;
    }
};
exports.ConfiguracionService = ConfiguracionService;
exports.ConfiguracionService = ConfiguracionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ConfiguracionService);
//# sourceMappingURL=configuracion.service.js.map