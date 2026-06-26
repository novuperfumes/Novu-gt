import { IsString, IsBoolean, IsOptional } from 'class-validator';

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
}
