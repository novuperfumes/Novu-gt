import { PrismaService } from '../../common/prisma/prisma.service';
export declare class StampsService {
    private prisma;
    constructor(prisma: PrismaService);
    getUserStamps(userId: number): Promise<{
        userId: number;
        stampsCount: number;
        remainingForFreePerfume: number;
        history: {
            id: number;
            fecha: Date;
            id_usuario: number;
            tipo_operacion: string;
            cantidad_sellos: number;
            id_orden: number | null;
        }[];
    }>;
}
