import { IsNotEmpty, IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreatePerfumeDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre es requerido' })
  nombre: string;

  @IsString()
  @IsNotEmpty({ message: 'La descripción es requerida' })
  descripcion: string;

  @IsString()
  @IsNotEmpty({ message: 'La categoría es requerida' })
  categoria: string;

  @IsString()
  @IsNotEmpty({ message: 'La imagen es requerida' })
  imagen: string;

  @IsString()
  @IsNotEmpty({ message: 'La marca es requerida' })
  marca: string;

  @IsBoolean()
  @IsOptional()
  activo?: boolean;
}
