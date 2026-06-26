import * as fastify from 'fastify';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<{
        nombre: string;
        id: number;
        correo: string;
        rol: string;
        apellido: string;
        telefono: string | null;
        genero: string | null;
    }>;
    login(dto: LoginDto, response: fastify.FastifyReply): Promise<{
        user: {
            nombre: string;
            id: number;
            correo: string;
            rol: string;
            apellido: string;
            telefono: string | null;
            genero: string | null;
        };
    }>;
    logout(response: fastify.FastifyReply): Promise<{
        message: string;
    }>;
    me(request: any): Promise<any>;
}
