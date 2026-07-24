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
exports.CreateIngresoDto = void 0;
const class_validator_1 = require("class-validator");
class CreateIngresoDto {
    id_presentacion;
    cantidad;
    costo_compra;
    tipo_traida;
    costo_traida;
    costo_total;
}
exports.CreateIngresoDto = CreateIngresoDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'El id de la presentación es requerido' }),
    __metadata("design:type", Number)
], CreateIngresoDto.prototype, "id_presentacion", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1, { message: 'La cantidad debe ser al menos 1' }),
    __metadata("design:type", Number)
], CreateIngresoDto.prototype, "cantidad", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0, { message: 'El costo de compra no puede ser menor a 0' }),
    __metadata("design:type", Number)
], CreateIngresoDto.prototype, "costo_compra", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'El tipo de traída es requerido' }),
    __metadata("design:type", String)
], CreateIngresoDto.prototype, "tipo_traida", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0, { message: 'El costo de traída no puede ser menor a 0' }),
    __metadata("design:type", Number)
], CreateIngresoDto.prototype, "costo_traida", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0, { message: 'El costo total no puede ser menor a 0' }),
    __metadata("design:type", Number)
], CreateIngresoDto.prototype, "costo_total", void 0);
//# sourceMappingURL=create-ingreso.dto.js.map