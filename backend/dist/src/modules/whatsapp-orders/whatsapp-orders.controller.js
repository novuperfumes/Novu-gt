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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsappOrdersController = void 0;
const common_1 = require("@nestjs/common");
const whatsapp_orders_service_1 = require("./whatsapp-orders.service");
let WhatsappOrdersController = class WhatsappOrdersController {
    service;
    constructor(service) {
        this.service = service;
    }
    async createOrder(body) {
        if (!body.nombre_cliente || !body.telefono || !body.carrito_json) {
            throw new common_1.BadRequestException('Faltan datos obligatorios');
        }
        return this.service.create(body);
    }
    async getAdminOrders() {
        return this.service.findAll();
    }
    async confirmOrder(id) {
        return this.service.confirmOrder(id);
    }
};
exports.WhatsappOrdersController = WhatsappOrdersController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WhatsappOrdersController.prototype, "createOrder", null);
__decorate([
    (0, common_1.Get)('admin'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WhatsappOrdersController.prototype, "getAdminOrders", null);
__decorate([
    (0, common_1.Patch)(':id/confirm'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], WhatsappOrdersController.prototype, "confirmOrder", null);
exports.WhatsappOrdersController = WhatsappOrdersController = __decorate([
    (0, common_1.Controller)('whatsapp-orders'),
    __metadata("design:paramtypes", [whatsapp_orders_service_1.WhatsappOrdersService])
], WhatsappOrdersController);
//# sourceMappingURL=whatsapp-orders.controller.js.map