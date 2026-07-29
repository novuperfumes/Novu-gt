import { WhatsappOrdersService } from './whatsapp-orders.service';
export declare class WhatsappOrdersController {
    private readonly service;
    constructor(service: WhatsappOrdersService);
    createOrder(body: any): Promise<{
        id: number;
        telefono: string;
        fecha: Date;
        total: import("@prisma/client-runtime-utils").Decimal;
        estado: string;
        direccion: string | null;
        codigo: string;
        nombre_cliente: string;
        nit: string | null;
        carrito_json: string;
    }>;
    getAdminOrders(): Promise<{
        id: number;
        telefono: string;
        fecha: Date;
        total: import("@prisma/client-runtime-utils").Decimal;
        estado: string;
        direccion: string | null;
        codigo: string;
        nombre_cliente: string;
        nit: string | null;
        carrito_json: string;
    }[]>;
    confirmOrder(id: number): Promise<{
        id: number;
        telefono: string;
        fecha: Date;
        total: import("@prisma/client-runtime-utils").Decimal;
        estado: string;
        direccion: string | null;
        codigo: string;
        nombre_cliente: string;
        nit: string | null;
        carrito_json: string;
    }>;
}
