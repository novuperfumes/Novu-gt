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
exports.CartsController = void 0;
const common_1 = require("@nestjs/common");
const carts_service_1 = require("./carts.service");
const add_item_dto_1 = require("./dto/add-item.dto");
const update_item_dto_1 = require("./dto/update-item.dto");
const auth_guard_1 = require("../auth/guards/auth.guard");
let CartsController = class CartsController {
    cartsService;
    constructor(cartsService) {
        this.cartsService = cartsService;
    }
    async getCart(req) {
        const userId = req.user.sub;
        return this.cartsService.getOrCreateCart(userId);
    }
    async addItem(req, dto) {
        const userId = req.user.sub;
        return this.cartsService.addItem(userId, dto);
    }
    async updateItem(req, detailId, dto) {
        const userId = req.user.sub;
        return this.cartsService.updateItem(userId, detailId, dto);
    }
    async removeItem(req, detailId) {
        const userId = req.user.sub;
        return this.cartsService.removeItem(userId, detailId);
    }
    async clearCart(req) {
        const userId = req.user.sub;
        return this.cartsService.clearCart(userId);
    }
};
exports.CartsController = CartsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CartsController.prototype, "getCart", null);
__decorate([
    (0, common_1.Post)('items'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, add_item_dto_1.AddItemDto]),
    __metadata("design:returntype", Promise)
], CartsController.prototype, "addItem", null);
__decorate([
    (0, common_1.Patch)('items/:detailId'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('detailId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, update_item_dto_1.UpdateItemDto]),
    __metadata("design:returntype", Promise)
], CartsController.prototype, "updateItem", null);
__decorate([
    (0, common_1.Delete)('items/:detailId'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('detailId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], CartsController.prototype, "removeItem", null);
__decorate([
    (0, common_1.Delete)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CartsController.prototype, "clearCart", null);
exports.CartsController = CartsController = __decorate([
    (0, common_1.Controller)('carts'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __metadata("design:paramtypes", [carts_service_1.CartsService])
], CartsController);
//# sourceMappingURL=carts.controller.js.map