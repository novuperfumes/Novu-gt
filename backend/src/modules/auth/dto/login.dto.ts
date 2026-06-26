import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Correo electrónico inválido' })
  @IsNotEmpty({ message: 'El correo electrónico es requerido' })
  correo: string;

  @IsString()
  @IsNotEmpty({ message: 'La contraseña es requerida' })
  contrasenia: string;
}
