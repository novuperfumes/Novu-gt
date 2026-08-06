import { PrismaService } from '../../common/prisma/prisma.service';
export declare class WhatsappOrdersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: any): Promise<{
        id: number;
        telefono: string;
        codigo: string;
        estado: string;
        nombre_cliente: string;
        direccion: string | null;
        nit: string | null;
        total: import("@prisma/client-runtime-utils").Decimal;
        carrito_json: string;
        fecha: Date;
    }>;
    findAll(): Promise<{
        id: number;
        telefono: string;
        codigo: string;
        estado: string;
        nombre_cliente: string;
        direccion: string | null;
        nit: string | null;
        total: import("@prisma/client-runtime-utils").Decimal;
        carrito_json: string;
        fecha: Date;
    }[]>;
    confirmOrder(id: number): Promise<{
        id: number;
        telefono: string;
        codigo: string;
        estado: string;
        nombre_cliente: string;
        direccion: string | null;
        nit: string | null;
        total: import("@prisma/client-runtime-utils").Decimal;
        carrito_json: string;
        fecha: Date;
    }>;
}
