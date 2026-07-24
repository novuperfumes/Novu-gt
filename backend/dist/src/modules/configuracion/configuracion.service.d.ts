import { PrismaService } from '../../common/prisma/prisma.service';
export declare class ConfiguracionService {
    private prisma;
    constructor(prisma: PrismaService);
    getConfiguracion(): Promise<{
        id: number;
        modo_bazar: boolean;
    }>;
    setModoBazar(modo_bazar: boolean): Promise<{
        id: number;
        modo_bazar: boolean;
    }>;
}
