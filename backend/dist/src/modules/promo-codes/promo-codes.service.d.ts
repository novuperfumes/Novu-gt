import { PrismaService } from '../../common/prisma/prisma.service';
import { CreatePromoDto } from './dto/create-promo.dto';
export declare class PromoCodesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreatePromoDto): Promise<{
        id: number;
        descuento: import("@prisma/client-runtime-utils").Decimal;
        fecha_inicio: Date;
        fecha_fin: Date;
        estado: string;
        codigo: string;
        tipo_descuento: string;
    }>;
    validate(code: string): Promise<{
        id: number;
        descuento: import("@prisma/client-runtime-utils").Decimal;
        fecha_inicio: Date;
        fecha_fin: Date;
        estado: string;
        codigo: string;
        tipo_descuento: string;
    }>;
    findAll(): Promise<{
        id: number;
        descuento: import("@prisma/client-runtime-utils").Decimal;
        fecha_inicio: Date;
        fecha_fin: Date;
        estado: string;
        codigo: string;
        tipo_descuento: string;
    }[]>;
}
