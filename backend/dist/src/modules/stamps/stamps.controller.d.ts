import { StampsService } from './stamps.service';
export declare class StampsController {
    private readonly stampsService;
    constructor(stampsService: StampsService);
    getMyStamps(req: any): Promise<{
        userId: number;
        stampsCount: number;
        remainingForFreePerfume: number;
        history: {
            id: number;
            id_usuario: number;
            tipo_operacion: string;
            cantidad_sellos: number;
            fecha: Date;
            id_orden: number | null;
        }[];
    }>;
    getUserStampsForAdmin(userId: number): Promise<{
        userId: number;
        stampsCount: number;
        remainingForFreePerfume: number;
        history: {
            id: number;
            id_usuario: number;
            tipo_operacion: string;
            cantidad_sellos: number;
            fecha: Date;
            id_orden: number | null;
        }[];
    }>;
}
