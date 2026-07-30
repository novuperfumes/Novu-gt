import { PrismaService } from '../../common/prisma/prisma.service';
export declare class WhatsappOrdersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: any): Promise<{
        direccion: string | null;
        id: number;
        telefono: string;
        codigo: string;
        fecha: Date;
        total: import("@prisma/client-runtime-utils").Decimal;
        estado: string;
        nombre_cliente: string;
        nit: string | null;
        carrito_json: string;
    }>;
    findAll(): Promise<{
        direccion: string | null;
        id: number;
        telefono: string;
        codigo: string;
        fecha: Date;
        total: import("@prisma/client-runtime-utils").Decimal;
        estado: string;
        nombre_cliente: string;
        nit: string | null;
        carrito_json: string;
    }[]>;
    confirmOrder(id: number): Promise<{
        direccion: string | null;
        id: number;
        telefono: string;
        codigo: string;
        fecha: Date;
        total: import("@prisma/client-runtime-utils").Decimal;
        estado: string;
        nombre_cliente: string;
        nit: string | null;
        carrito_json: string;
    }>;
}
