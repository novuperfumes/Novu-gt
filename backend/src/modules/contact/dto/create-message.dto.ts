import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre es requerido' })
  nombre: string;

  @IsEmail({}, { message: 'El correo electrónico es inválido' })
  @IsNotEmpty({ message: 'El correo electrónico es requerido' })
  correo: string;

  @IsString()
  @IsNotEmpty({ message: 'El asunto es requerido' })
  asunto: string;

  @IsString()
  @IsNotEmpty({ message: 'El mensaje es requerido' })
  mensaje: string;
}
