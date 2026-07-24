import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateIngresoDto {
  @IsNumber()
  @IsNotEmpty({ message: 'El id de la presentación es requerido' })
  id_presentacion: number;

  @IsNumber()
  @Min(1, { message: 'La cantidad debe ser al menos 1' })
  cantidad: number;

  @IsNumber()
  @Min(0, { message: 'El costo de compra no puede ser menor a 0' })
  costo_compra: number;

  @IsString()
  @IsNotEmpty({ message: 'El tipo de traída es requerido' })
  tipo_traida: string;

  @IsNumber()
  @Min(0, { message: 'El costo de traída no puede ser menor a 0' })
  costo_traida: number;

  @IsNumber()
  @Min(0, { message: 'El costo total no puede ser menor a 0' })
  costo_total: number;
}
