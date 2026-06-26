import { StampsService } from './stamps.service';
export declare class StampsController {
    private readonly stampsService;
    constructor(stampsService: StampsService);
    getMyStamps(req: any): Promise<{
        giftCardId: number;
        userId: number;
        stampsCount: number;
        remainingForFreePerfume: number;
        history: {
            id: number;
            id_usuario: number;
            fecha: Date;
            tipo_operacion: string;
            cantidad_sellos: number;
            id_orden: number | null;
        }[];
    }>;
    getUserStampsForAdmin(userId: number): Promise<{
        giftCardId: number;
        userId: number;
        stampsCount: number;
        remainingForFreePerfume: number;
        history: {
            id: number;
            id_usuario: number;
            fecha: Date;
            tipo_operacion: string;
            cantidad_sellos: number;
            id_orden: number | null;
        }[];
    }>;
}
