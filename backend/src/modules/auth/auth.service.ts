import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.usersService.findOneByCorreo(dto.correo);
    if (existing) {
      throw new ConflictException('El correo electrónico ya está registrado.');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(dto.contrasenia, salt);

    const user = await this.usersService.create({
      correo: dto.correo,
      contrasenia: hashedPassword,
      nombre: dto.nombre,
      apellido: dto.apellido,
      telefono: dto.telefono,
      genero: dto.genero,
      sellos: 1, // Sello de bienvenida
      giftCards: {
        create: [
          {
            codigo: 'GIFT-WELCOME-' + Math.floor(1000 + Math.random() * 9000),
            monto: 50.0,
            activa: true,
            es_bienvenida: true,
          },
        ],
      },
    });

    const { contrasenia, ...result } = user;
    return result;
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findOneByCorreo(dto.correo);
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas.');
    }

    const validPassword = await bcrypt.compare(
      dto.contrasenia,
      user.contrasenia,
    );
    if (!validPassword) {
      throw new UnauthorizedException('Credenciales inválidas.');
    }

    const payload = { sub: user.id, email: user.correo, role: user.rol };
    const token = await this.jwtService.signAsync(payload);

    const { contrasenia, ...result } = user;
    return { user: result, token };
  }
}
