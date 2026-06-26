import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getProfile(req: any): Promise<Omit<{
        nombre: string;
        id: number;
        correo: string;
        contrasenia: string;
        rol: string;
        apellido: string;
        telefono: string | null;
        genero: string | null;
    }, "contrasenia">>;
    updateProfile(req: any, dto: UpdateUserDto): Promise<Omit<{
        nombre: string;
        id: number;
        correo: string;
        contrasenia: string;
        rol: string;
        apellido: string;
        telefono: string | null;
        genero: string | null;
    }, "contrasenia">>;
}
