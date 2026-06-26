import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    register(dto: RegisterDto): Promise<{
        nombre: string;
        id: number;
        correo: string;
        rol: string;
        apellido: string;
        telefono: string | null;
        genero: string | null;
    }>;
    login(dto: LoginDto): Promise<{
        user: {
            nombre: string;
            id: number;
            correo: string;
            rol: string;
            apellido: string;
            telefono: string | null;
            genero: string | null;
        };
        token: string;
    }>;
}
