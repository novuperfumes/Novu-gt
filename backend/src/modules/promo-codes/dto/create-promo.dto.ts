import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreatePromoDto {
  @IsString()
  @IsNotEmpty({ message: 'El código del cupón es requerido' })
  codigo: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(['porcentaje', 'monto_fijo'], {
    message: 'El tipo de descuento debe ser porcentaje o monto_fijo',
  })
  tipo_descuento: string;

  @IsNumber()
  @IsPositive({ message: 'El descuento debe ser mayor a cero' })
  descuento: number;

  @IsDateString({}, { message: 'Fecha de inicio inválida' })
  fecha_inicio: string;

  @IsDateString({}, { message: 'Fecha de fin inválida' })
  fecha_fin: string;
}
