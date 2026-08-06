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
        codigo: string;
        monto: Prisma.Decimal;
        activa: boolean;
        es_bienvenida: boolean;
        id_usuario: number;
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
        codigo: string;
        monto: Prisma.Decimal;
        activa: boolean;
        es_bienvenida: boolean;
        id_usuario: number;
    })[]>;
    validate(codigo: string, userId: number): Promise<{
        id: number;
        codigo: string;
        monto: Prisma.Decimal;
        activa: boolean;
        es_bienvenida: boolean;
        id_usuario: number;
    }>;
}
