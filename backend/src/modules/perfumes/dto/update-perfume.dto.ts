import { IsString, IsBoolean, IsOptional, IsArray } from 'class-validator';

export class UpdatePerfumeDto {
  @IsString()
  @IsOptional()
  nombre?: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsString()
  @IsOptional()
  categoria?: string;

  @IsString()
  @IsOptional()
  imagen?: string;

  @IsString()
  @IsOptional()
  marca?: string;

  @IsBoolean()
  @IsOptional()
  activo?: boolean;

  @IsString()
  @IsOptional()
  tipo?: string;

  @IsString()
  @IsOptional()
  genero?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  galeria?: string[];

  @IsOptional()
  decant?: any;
}
