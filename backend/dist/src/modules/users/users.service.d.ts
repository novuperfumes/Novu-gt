import { OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { Prisma, Usuario } from '@prisma/client';
export declare class UsersService implements OnModuleInit {
    private prisma;
    constructor(prisma: PrismaService);
    onModuleInit(): Promise<void>;
    create(data: Prisma.UsuarioCreateInput): Promise<Usuario>;
    findOneByCorreo(correo: string): Promise<Usuario | null>;
    findOneById(id: number): Promise<{
        giftCards: {
            id: number;
            activa: boolean;
            id_usuario: number;
            codigo: string;
            monto: Prisma.Decimal;
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
    } | null>;
    updateProfile(id: number, data: Prisma.UsuarioUpdateInput): Promise<Omit<Usuario, 'contrasenia'>>;
    searchUsers(query: string): Promise<{
        giftCards: {
            id: number;
            activa: boolean;
            id_usuario: number;
            codigo: string;
            monto: Prisma.Decimal;
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
    updateSellos(id: number, sellos: number): Promise<{
        user: {
            giftCards: {
                id: number;
                activa: boolean;
                id_usuario: number;
                codigo: string;
                monto: Prisma.Decimal;
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
    getAdminMetrics(): Promise<{
        totalUsers: number;
        totalOrders: number;
        totalSales: number | Prisma.Decimal;
        totalPerfumes: number;
    }>;
}
