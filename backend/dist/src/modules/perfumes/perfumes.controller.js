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
exports.PerfumesController = void 0;
const common_1 = require("@nestjs/common");
const perfumes_service_1 = require("./perfumes.service");
const create_perfume_dto_1 = require("./dto/create-perfume.dto");
const create_presentacion_dto_1 = require("./dto/create-presentacion.dto");
const update_perfume_dto_1 = require("./dto/update-perfume.dto");
const auth_guard_1 = require("../auth/guards/auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
let PerfumesController = class PerfumesController {
    perfumesService;
    constructor(perfumesService) {
        this.perfumesService = perfumesService;
    }
    async findAll() {
        return this.perfumesService.findAllActive();
    }
    async findAllAdmin() {
        return this.perfumesService.findAllAdmin();
    }
    async findOne(id) {
        return this.perfumesService.findOne(id);
    }
    async create(dto) {
        return this.perfumesService.create(dto);
    }
    async addPresentacion(id, dto) {
        return this.perfumesService.addPresentacion(id, dto);
    }
    async updatePresentacion(presId, dto) {
        return this.perfumesService.updatePresentacion(presId, dto);
    }
    async removePresentacion(presId) {
        return this.perfumesService.removePresentacion(presId);
    }
    async update(id, dto) {
        return this.perfumesService.update(id, dto);
    }
    async remove(id) {
        return this.perfumesService.remove(id);
    }
};
exports.PerfumesController = PerfumesController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PerfumesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('admin/all'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PerfumesController.prototype, "findAllAdmin", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PerfumesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_perfume_dto_1.CreatePerfumeDto]),
    __metadata("design:returntype", Promise)
], PerfumesController.prototype, "create", null);
__decorate([
    (0, common_1.Post)(':id/presentaciones'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_presentacion_dto_1.CreatePresentacionDto]),
    __metadata("design:returntype", Promise)
], PerfumesController.prototype, "addPresentacion", null);
__decorate([
    (0, common_1.Patch)('presentaciones/:presId'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    __param(0, (0, common_1.Param)('presId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], PerfumesController.prototype, "updatePresentacion", null);
__decorate([
    (0, common_1.Delete)('presentaciones/:presId'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    __param(0, (0, common_1.Param)('presId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PerfumesController.prototype, "removePresentacion", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_perfume_dto_1.UpdatePerfumeDto]),
    __metadata("design:returntype", Promise)
], PerfumesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PerfumesController.prototype, "remove", null);
exports.PerfumesController = PerfumesController = __decorate([
    (0, common_1.Controller)('perfumes'),
    __metadata("design:paramtypes", [perfumes_service_1.PerfumesService])
], PerfumesController);
//# sourceMappingURL=perfumes.controller.js.map