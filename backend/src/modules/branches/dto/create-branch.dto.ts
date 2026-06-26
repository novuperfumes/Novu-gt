import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBranchDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre de la sucursal es requerido' })
  nombre_sucursal: string;

  @IsString()
  @IsNotEmpty({ message: 'La dirección es requerida' })
  direccion: string;

  @IsString()
  @IsNotEmpty({ message: 'El departamento es requerido' })
  departamento: string;

  @IsString()
  @IsNotEmpty({ message: 'El municipio es requerido' })
  municipio: string;

  @IsString()
  @IsOptional()
  telefono?: string;
}
