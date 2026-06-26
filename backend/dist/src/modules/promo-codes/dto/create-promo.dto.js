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
exports.CreatePromoDto = void 0;
const class_validator_1 = require("class-validator");
class CreatePromoDto {
    codigo;
    tipo_descuento;
    descuento;
    fecha_inicio;
    fecha_fin;
}
exports.CreatePromoDto = CreatePromoDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'El código del cupón es requerido' }),
    __metadata("design:type", String)
], CreatePromoDto.prototype, "codigo", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(['porcentaje', 'monto_fijo'], { message: 'El tipo de descuento debe ser porcentaje o monto_fijo' }),
    __metadata("design:type", String)
], CreatePromoDto.prototype, "tipo_descuento", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)({ message: 'El descuento debe ser mayor a cero' }),
    __metadata("design:type", Number)
], CreatePromoDto.prototype, "descuento", void 0);
__decorate([
    (0, class_validator_1.IsDateString)({}, { message: 'Fecha de inicio inválida' }),
    __metadata("design:type", String)
], CreatePromoDto.prototype, "fecha_inicio", void 0);
__decorate([
    (0, class_validator_1.IsDateString)({}, { message: 'Fecha de fin inválida' }),
    __metadata("design:type", String)
], CreatePromoDto.prototype, "fecha_fin", void 0);
//# sourceMappingURL=create-promo.dto.js.map