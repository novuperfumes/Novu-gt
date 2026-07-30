import { GiftCardsService } from './gift-cards.service';
export declare class GiftCardsController {
    private readonly giftCardsService;
    constructor(giftCardsService: GiftCardsService);
    createManual(data: {
        id_usuario: number;
        monto: number;
    }): Promise<{
        id: number;
        id_usuario: number;
        codigo: string;
        monto: import("@prisma/client-runtime-utils").Decimal;
        activa: boolean;
        es_bienvenida: boolean;
    }>;
    findAll(): Promise<({
        usuario: {
            id: number;
            correo: string;
            nombre: string;
            apellido: string;
        };
    } & {
        id: number;
        id_usuario: number;
        codigo: string;
        monto: import("@prisma/client-runtime-utils").Decimal;
        activa: boolean;
        es_bienvenida: boolean;
    })[]>;
    validate(code: string, req: any): Promise<{
        id: number;
        id_usuario: number;
        codigo: string;
        monto: import("@prisma/client-runtime-utils").Decimal;
        activa: boolean;
        es_bienvenida: boolean;
    }>;
}
