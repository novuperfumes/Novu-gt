import { GiftCardsService } from './gift-cards.service';
export declare class GiftCardsController {
    private readonly giftCardsService;
    constructor(giftCardsService: GiftCardsService);
    createManual(data: {
        id_usuario: number;
        monto: number;
    }): Promise<{
        id: number;
        activa: boolean;
        id_usuario: number;
        codigo: string;
        monto: import("@prisma/client-runtime-utils").Decimal;
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
        monto: import("@prisma/client-runtime-utils").Decimal;
        es_bienvenida: boolean;
    })[]>;
    validate(code: string, req: any): Promise<{
        id: number;
        activa: boolean;
        id_usuario: number;
        codigo: string;
        monto: import("@prisma/client-runtime-utils").Decimal;
        es_bienvenida: boolean;
    }>;
}
