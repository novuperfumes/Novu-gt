import { WhatsappOrdersService } from './whatsapp-orders.service';
export declare class WhatsappOrdersController {
    private readonly service;
    constructor(service: WhatsappOrdersService);
    createOrder(body: any): Promise<{
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
    getAdminOrders(): Promise<{
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
