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
exports.GiftCardsController = void 0;
const common_1 = require("@nestjs/common");
const gift_cards_service_1 = require("./gift-cards.service");
const auth_guard_1 = require("../auth/guards/auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
let GiftCardsController = class GiftCardsController {
    giftCardsService;
    constructor(giftCardsService) {
        this.giftCardsService = giftCardsService;
    }
    async createManual(data) {
        return this.giftCardsService.createManual(data);
    }
    async findAll() {
        return this.giftCardsService.findAll();
    }
    async validate(code, req) {
        const userId = req.user.sub;
        return this.giftCardsService.validate(code, userId);
    }
};
exports.GiftCardsController = GiftCardsController;
__decorate([
    (0, common_1.Post)('manual'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GiftCardsController.prototype, "createManual", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GiftCardsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('validate/:code'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Param)('code')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], GiftCardsController.prototype, "validate", null);
exports.GiftCardsController = GiftCardsController = __decorate([
    (0, common_1.Controller)('gift-cards'),
    __metadata("design:paramtypes", [gift_cards_service_1.GiftCardsService])
], GiftCardsController);
//# sourceMappingURL=gift-cards.controller.js.map