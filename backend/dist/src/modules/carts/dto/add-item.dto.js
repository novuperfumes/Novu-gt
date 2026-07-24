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
exports.AddItemDto = void 0;
const class_validator_1 = require("class-validator");
class AddItemDto {
    id_presentacion;
    id_decant;
    tipo_decant;
    cantidad;
}
exports.AddItemDto = AddItemDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)({ message: 'El id de presentación debe ser un número entero' }),
    __metadata("design:type", Number)
], AddItemDto.prototype, "id_presentacion", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)({ message: 'El id del decant debe ser un número entero' }),
    __metadata("design:type", Number)
], AddItemDto.prototype, "id_decant", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'El tipo de decant debe ser una cadena' }),
    __metadata("design:type", String)
], AddItemDto.prototype, "tipo_decant", void 0);
__decorate([
    (0, class_validator_1.IsInt)({ message: 'La cantidad debe ser un número entero' }),
    (0, class_validator_1.IsPositive)({ message: 'La cantidad debe ser mayor a cero' }),
    __metadata("design:type", Number)
], AddItemDto.prototype, "cantidad", void 0);
//# sourceMappingURL=add-item.dto.js.map