import { IsInt, IsOptional, IsPositive, IsString } from 'class-validator';

export class AddItemDto {
  @IsOptional()
  @IsInt({ message: 'El id de presentación debe ser un número entero' })
  id_presentacion?: number;

  @IsOptional()
  @IsInt({ message: 'El id del decant debe ser un número entero' })
  id_decant?: number;

  @IsOptional()
  @IsString({ message: 'El tipo de decant debe ser una cadena' })
  tipo_decant?: string;

  @IsInt({ message: 'La cantidad debe ser un número entero' })
  @IsPositive({ message: 'La cantidad debe ser mayor a cero' })
  cantidad: number;
}
