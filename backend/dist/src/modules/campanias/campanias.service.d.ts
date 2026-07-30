import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateCampaniaDto } from './dto/create-campania.dto';
export declare class CampaniasService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        id: number;
        nombre: string;
        tipo: string;
        imagen: string | null;
        activa: boolean;
        descuento: import("@prisma/client-runtime-utils").Decimal;
        categorias: string | null;
        perfume_ids: string | null;
        fecha_inicio: Date | null;
        fecha_fin: Date | null;
        creado_en: Date;
    }[]>;
    findActiva(): Promise<{
        id: number;
        nombre: string;
        tipo: string;
        imagen: string | null;
        activa: boolean;
        descuento: import("@prisma/client-runtime-utils").Decimal;
        categorias: string | null;
        perfume_ids: string | null;
        fecha_inicio: Date | null;
        fecha_fin: Date | null;
        creado_en: Date;
    }[]>;
    create(dto: CreateCampaniaDto): Promise<{
        id: number;
        nombre: string;
        tipo: string;
        imagen: string | null;
        activa: boolean;
        descuento: import("@prisma/client-runtime-utils").Decimal;
        categorias: string | null;
        perfume_ids: string | null;
        fecha_inicio: Date | null;
        fecha_fin: Date | null;
        creado_en: Date;
    }>;
    update(id: number, data: Partial<CreateCampaniaDto> & {
        activa?: boolean;
    }): Promise<{
        id: number;
        nombre: string;
        tipo: string;
        imagen: string | null;
        activa: boolean;
        descuento: import("@prisma/client-runtime-utils").Decimal;
        categorias: string | null;
        perfume_ids: string | null;
        fecha_inicio: Date | null;
        fecha_fin: Date | null;
        creado_en: Date;
    }>;
    toggleActiva(id: number): Promise<{
        id: number;
        nombre: string;
        tipo: string;
        imagen: string | null;
        activa: boolean;
        descuento: import("@prisma/client-runtime-utils").Decimal;
        categorias: string | null;
        perfume_ids: string | null;
        fecha_inicio: Date | null;
        fecha_fin: Date | null;
        creado_en: Date;
    }>;
    remove(id: number): Promise<{
        id: number;
        nombre: string;
        tipo: string;
        imagen: string | null;
        activa: boolean;
        descuento: import("@prisma/client-runtime-utils").Decimal;
        categorias: string | null;
        perfume_ids: string | null;
        fecha_inicio: Date | null;
        fecha_fin: Date | null;
        creado_en: Date;
    }>;
}
