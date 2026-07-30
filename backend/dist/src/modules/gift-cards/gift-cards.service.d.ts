import { PrismaService } from '../../common/prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class GiftCardsService {
    private prisma;
    constructor(prisma: PrismaService);
    createManual(data: {
        id_usuario: number;
        monto: number;
    }): Promise<{
        id: number;
        activa: boolean;
        id_usuario: number;
        codigo: string;
        monto: Prisma.Decimal;
        es_bienvenida: boolean;
    }>;
    findAll(): Promise<({
        usuario: {
            id: number;
            nombre: string;
            correo: string;
            apellido: string;
        };
    } & {
        id: number;
        activa: boolean;
        id_usuario: number;
        codigo: string;
        monto: Prisma.Decimal;
        es_bienvenida: boolean;
    })[]>;
    validate(codigo: string, userId: number): Promise<{
        id: number;
        activa: boolean;
        id_usuario: number;
        codigo: string;
        monto: Prisma.Decimal;
        es_bienvenida: boolean;
    }>;
}
