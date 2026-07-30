import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getProfile(req: any): Promise<{
        giftCards: {
            id: number;
            id_usuario: number;
            codigo: string;
            monto: import("@prisma/client-runtime-utils").Decimal;
            activa: boolean;
            es_bienvenida: boolean;
        }[];
        id: number;
        correo: string;
        rol: string;
        nombre: string;
        apellido: string;
        telefono: string | null;
        genero: string | null;
        sellos: number;
    }>;
    updateProfile(req: any, dto: UpdateUserDto): Promise<Omit<{
        id: number;
        correo: string;
        contrasenia: string;
        rol: string;
        nombre: string;
        apellido: string;
        telefono: string | null;
        genero: string | null;
        sellos: number;
    }, "contrasenia">>;
    getAdminMetrics(req: any): Promise<{
        totalUsers: number;
        totalOrders: number;
        totalSales: number | import("@prisma/client-runtime-utils").Decimal;
        totalPerfumes: number;
    }>;
    searchUsers(req: any, q: string): Promise<{
        giftCards: {
            id: number;
            id_usuario: number;
            codigo: string;
            monto: import("@prisma/client-runtime-utils").Decimal;
            activa: boolean;
            es_bienvenida: boolean;
        }[];
        id: number;
        correo: string;
        rol: string;
        nombre: string;
        apellido: string;
        telefono: string | null;
        genero: string | null;
        sellos: number;
    }[]>;
    updateSellos(req: any, id: string, body: {
        sellos: number;
    }): Promise<{
        user: {
            giftCards: {
                id: number;
                id_usuario: number;
                codigo: string;
                monto: import("@prisma/client-runtime-utils").Decimal;
                activa: boolean;
                es_bienvenida: boolean;
            }[];
            id: number;
            correo: string;
            rol: string;
            nombre: string;
            apellido: string;
            telefono: string | null;
            genero: string | null;
            sellos: number;
        };
        giftCardCreated: any;
    }>;
}
