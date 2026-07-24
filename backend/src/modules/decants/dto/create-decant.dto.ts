import { IsInt, IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateDecantDto {
  @IsInt()
  @IsNotEmpty({ message: 'El id del perfume es requerido' })
  id_perfume: number;

  @IsInt()
  @Min(1)
  ml_origen: number;

  @IsNumber()
  @Min(0)
  costo_original: number;

  @IsNumber()
  @Min(0)
  precio_original: number;

  @IsNumber()
  @Min(0)
  costo_5ml: number;

  @IsNumber()
  @Min(0)
  precio_5ml: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  stock_5ml?: number;

  @IsNumber()
  @Min(0)
  costo_10ml: number;

  @IsNumber()
  @Min(0)
  precio_10ml: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  stock_10ml?: number;
}
