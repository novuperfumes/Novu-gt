import { IsInt, IsPositive } from 'class-validator';

export class AddItemDto {
  @IsInt({ message: 'El id de presentación debe ser un número entero' })
  id_presentacion: number;

  @IsInt({ message: 'La cantidad debe ser un número entero' })
  @IsPositive({ message: 'La cantidad debe ser mayor a cero' })
  cantidad: number;
}
