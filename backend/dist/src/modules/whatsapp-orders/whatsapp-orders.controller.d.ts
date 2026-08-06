import { WhatsappOrdersService } from './whatsapp-orders.service';
export declare class WhatsappOrdersController {
    private readonly service;
    constructor(service: WhatsappOrdersService);
    createOrder(body: any): Promise<{
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
    getAdminOrders(): Promise<{
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
