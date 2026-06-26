import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  @IsNotEmpty()
  direccion: string;

  @IsString()
  @IsNotEmpty()
  departamento: string;

  @IsString()
  @IsNotEmpty()
  municipio: string;

  @IsString()
  @IsOptional()
  referencias?: string;

  @IsString()
  @IsOptional()
  codigo_postal?: string;
}
