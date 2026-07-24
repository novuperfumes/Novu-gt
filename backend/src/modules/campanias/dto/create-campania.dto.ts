import { IsString, IsNumber, IsOptional, IsDateString, Min, Max, IsIn } from 'class-validator';

export class CreateCampaniaDto {
  @IsString()
  nombre: string;

  @IsIn(['GLOBAL', 'CATEGORIA', 'SELECCION'])
  tipo: string;

  @IsNumber()
  @Min(0)
  @Max(100)
  descuento: number;

  @IsOptional()
  @IsString()
  categorias?: string; // JSON array string: '["arabe","nicho"]'

  @IsOptional()
  @IsString()
  perfume_ids?: string; // JSON array string: '[1,2,3]'

  @IsOptional()
  @IsDateString()
  fecha_inicio?: string;

  @IsOptional()
  @IsDateString()
  fecha_fin?: string;
}
