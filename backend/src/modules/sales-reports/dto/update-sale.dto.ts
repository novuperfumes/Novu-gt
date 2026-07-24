import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateSaleDto {
  @IsOptional()
  @IsString()
  pago?: string;

  @IsOptional()
  @IsNumber()
  total_recibido?: number;

  @IsOptional()
  @IsNumber()
  recibido_en_cuenta?: number;

  @IsOptional()
  @IsBoolean()
  entregado?: boolean;

  @IsOptional()
  @IsString()
  envio_ce?: string;

  @IsOptional()
  @IsNumber()
  total?: number;
}
