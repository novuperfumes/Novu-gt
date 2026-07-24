import { IsInt, IsNumber, IsOptional, Min } from 'class-validator';

export class UpdateDecantDto {
  @IsOptional()
  @IsInt()
  ml_origen?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  costo_original?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  precio_original?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  costo_5ml?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  precio_5ml?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  stock_5ml?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  costo_10ml?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  precio_10ml?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  stock_10ml?: number;
}
