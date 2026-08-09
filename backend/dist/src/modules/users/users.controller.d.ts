import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getProfile(req: any): Promise<{
        giftCards: {
            id: number;
            codigo: string;
            monto: import("@prisma/client-runtime-utils").Decimal;
            activa: boolean;
            es_bienvenida: boolean;
            id_usuario: number;
        }[];
        id: number;
        nombre: string;
        genero: string | null;
        correo: string;
        rol: string;
        apellido: string;
        telefono: string | null;
        sellos: number;
    }>;
    updateProfile(req: any, dto: UpdateUserDto): Promise<Omit<{
        id: number;
        nombre: string;
        genero: string | null;
        correo: string;
        contrasenia: string;
        rol: string;
        apellido: string;
        telefono: string | null;
        sellos: number;
    }, "contrasenia">>;
    getAdminMetrics(): Promise<{
        totalUsers: number;
        totalOrders: number;
        totalSales: number | import("@prisma/client-runtime-utils").Decimal;
        totalPerfumes: number;
    }>;
    searchUsers(q: string): Promise<{
        giftCards: {
            id: number;
            codigo: string;
            monto: import("@prisma/client-runtime-utils").Decimal;
            activa: boolean;
            es_bienvenida: boolean;
            id_usuario: number;
        }[];
        id: number;
        nombre: string;
        genero: string | null;
        correo: string;
        rol: string;
        apellido: string;
        telefono: string | null;
        sellos: number;
    }[]>;
    updateSellos(id: string, body: {
        sellos: number;
    }): Promise<{
        user: {
            giftCards: {
                id: number;
                codigo: string;
                monto: import("@prisma/client-runtime-utils").Decimal;
                activa: boolean;
                es_bienvenida: boolean;
                id_usuario: number;
            }[];
            id: number;
            nombre: string;
            genero: string | null;
            correo: string;
            rol: string;
            apellido: string;
            telefono: string | null;
            sellos: number;
        };
        giftCardCreated: any;
    }>;
}
