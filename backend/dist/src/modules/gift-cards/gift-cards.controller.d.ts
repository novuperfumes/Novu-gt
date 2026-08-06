import { GiftCardsService } from './gift-cards.service';
export declare class GiftCardsController {
    private readonly giftCardsService;
    constructor(giftCardsService: GiftCardsService);
    createManual(data: {
        id_usuario: number;
        monto: number;
    }): Promise<{
        id: number;
        codigo: string;
        monto: import("@prisma/client-runtime-utils").Decimal;
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
        monto: import("@prisma/client-runtime-utils").Decimal;
        activa: boolean;
        es_bienvenida: boolean;
        id_usuario: number;
    })[]>;
    validate(code: string, req: any): Promise<{
        id: number;
        codigo: string;
        monto: import("@prisma/client-runtime-utils").Decimal;
        activa: boolean;
        es_bienvenida: boolean;
        id_usuario: number;
    }>;
}
