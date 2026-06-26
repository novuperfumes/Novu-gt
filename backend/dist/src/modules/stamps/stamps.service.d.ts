import { PrismaService } from '../../common/prisma/prisma.service';
export declare class StampsService {
    private prisma;
    constructor(prisma: PrismaService);
    getUserStamps(userId: number): Promise<{
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
