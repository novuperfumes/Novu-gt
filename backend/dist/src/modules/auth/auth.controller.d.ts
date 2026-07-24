import * as fastify from 'fastify';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<{
        id: number;
        nombre: string;
        genero: string | null;
        correo: string;
        rol: string;
        apellido: string;
        telefono: string | null;
        sellos: number;
    }>;
    login(dto: LoginDto, response: fastify.FastifyReply): Promise<{
        user: {
            id: number;
            nombre: string;
            genero: string | null;
            correo: string;
            rol: string;
            apellido: string;
            telefono: string | null;
            sellos: number;
        };
    }>;
    logout(response: fastify.FastifyReply): Promise<{
        message: string;
    }>;
    me(request: any): Promise<any>;
}
