import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min } from 'class-validator';

export class CreatePresentacionDto {
  @IsString()
  @IsNotEmpty({ message: 'El tamaño es requerido' })
  tamanio: string; // ej. "100 ml", "50 ml"

  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'El precio debe ser un número decimal' })
  @IsPositive({ message: 'El precio debe ser mayor a cero' })
  precio: number;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  costo?: number;

  @IsNumber({}, { message: 'El stock debe ser un número entero' })
  @Min(0, { message: 'El stock mínimo es 0' })
  stock: number;
}
