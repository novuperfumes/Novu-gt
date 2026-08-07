import { PrismaService } from '../../common/prisma/prisma.service';
import { CreatePromoDto } from './dto/create-promo.dto';
export declare class PromoCodesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreatePromoDto): Promise<{
        codigo: string;
        tipo_descuento: string;
        descuento: import("@prisma/client-runtime-utils").Decimal;
        fecha_inicio: Date;
        fecha_fin: Date;
        estado: string;
        id: number;
    }>;
    validate(code: string): Promise<{
        codigo: string;
        tipo_descuento: string;
        descuento: import("@prisma/client-runtime-utils").Decimal;
        fecha_inicio: Date;
        fecha_fin: Date;
        estado: string;
        id: number;
    }>;
    findAll(): Promise<{
        codigo: string;
        tipo_descuento: string;
        descuento: import("@prisma/client-runtime-utils").Decimal;
        fecha_inicio: Date;
        fecha_fin: Date;
        estado: string;
        id: number;
    }[]>;
    toggleStatus(id: number): Promise<{
        codigo: string;
        tipo_descuento: string;
        descuento: import("@prisma/client-runtime-utils").Decimal;
        fecha_inicio: Date;
        fecha_fin: Date;
        estado: string;
        id: number;
    }>;
}
