import { PromoCodesService } from './promo-codes.service';
import { CreatePromoDto } from './dto/create-promo.dto';
export declare class PromoCodesController {
    private readonly promoCodesService;
    constructor(promoCodesService: PromoCodesService);
    create(dto: CreatePromoDto): Promise<{
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
    validate(code: string): Promise<{
        codigo: string;
        tipo_descuento: string;
        descuento: import("@prisma/client-runtime-utils").Decimal;
        fecha_inicio: Date;
        fecha_fin: Date;
        estado: string;
        id: number;
    }>;
    toggleStatus(id: string): Promise<{
        codigo: string;
        tipo_descuento: string;
        descuento: import("@prisma/client-runtime-utils").Decimal;
        fecha_inicio: Date;
        fecha_fin: Date;
        estado: string;
        id: number;
    }>;
}
