import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength, Matches } from 'class-validator';

export class RegisterDto {
  @IsEmail({}, { message: 'Correo electrónico inválido' })
  @IsNotEmpty({ message: 'El correo electrónico es requerido' })
  correo: string;

  @IsString()
  @IsNotEmpty({ message: 'La contraseña es requerida' })
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)/, { message: 'La contraseña debe incluir al menos una letra y un número' })
  contrasenia: string;

  @IsString()
  @IsNotEmpty({ message: 'El nombre es requerido' })
  nombre: string;

  @IsString()
  @IsNotEmpty({ message: 'El apellido es requerido' })
  apellido: string;

  @IsString()
  @IsOptional()
  telefono?: string;

  @IsString()
  @IsOptional()
  genero?: string;
}
