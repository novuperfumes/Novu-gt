import { IsInt, IsPositive } from 'class-validator';

export class UpdateItemDto {
  @IsInt({ message: 'La cantidad debe ser un número entero' })
  @IsPositive({ message: 'La cantidad debe ser mayor a cero' })
  cantidad: number;
}
