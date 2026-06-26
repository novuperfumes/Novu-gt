import { PromoCodesService } from './promo-codes.service';
import { CreatePromoDto } from './dto/create-promo.dto';
export declare class PromoCodesController {
    private readonly promoCodesService;
    constructor(promoCodesService: PromoCodesService);
    create(dto: CreatePromoDto): Promise<{
        id: number;
        estado: string;
        codigo: string;
        tipo_descuento: string;
        descuento: import("@prisma/client-runtime-utils").Decimal;
        fecha_inicio: Date;
        fecha_fin: Date;
    }>;
    findAll(): Promise<{
        id: number;
        estado: string;
        codigo: string;
        tipo_descuento: string;
        descuento: import("@prisma/client-runtime-utils").Decimal;
        fecha_inicio: Date;
        fecha_fin: Date;
    }[]>;
    validate(code: string): Promise<{
        id: number;
        estado: string;
        codigo: string;
        tipo_descuento: string;
        descuento: import("@prisma/client-runtime-utils").Decimal;
        fecha_inicio: Date;
        fecha_fin: Date;
    }>;
}
