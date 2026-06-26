import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty({ message: 'El método de pago es requerido' })
  metodo_de_pago: string; // ej. 'tarjeta', 'transferencia', 'efectivo'

  @IsString()
  @IsNotEmpty({ message: 'El tipo de entrega es requerido' })
  tipo_entrega: string; // 'domicilio' o 'sucursal'

  @IsInt()
  @IsOptional()
  id_sucursal?: number;

  @IsInt()
  @IsOptional()
  id_codigo_promocion?: number;

  @IsString()
  @IsOptional()
  nombre_recibe?: string;

  @IsString()
  @IsOptional()
  telefono_contacto?: string;

  @IsString()
  @IsOptional()
  direccion_entrega?: string;

  @IsString()
  @IsOptional()
  departamento_entrega?: string;

  @IsString()
  @IsOptional()
  municipio_entrega?: string;

  @IsString()
  @IsOptional()
  referencias_entrega?: string;

  @IsString()
  @IsOptional()
  codigo_postal_entrega?: string;
}
