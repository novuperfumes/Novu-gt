import { CampaniasService } from './campanias.service';
import { CreateCampaniaDto } from './dto/create-campania.dto';
export declare class CampaniasController {
    private readonly campaniasService;
    constructor(campaniasService: CampaniasService);
    findActiva(): Promise<{
        id: number;
        nombre: string;
        tipo: string;
        imagen: string | null;
        activa: boolean;
        descuento: import("@prisma/client-runtime-utils").Decimal;
        fecha_inicio: Date | null;
        fecha_fin: Date | null;
        categorias: string | null;
        perfume_ids: string | null;
        creado_en: Date;
    }[]>;
    findAll(): Promise<{
        id: number;
        nombre: string;
        tipo: string;
        imagen: string | null;
        activa: boolean;
        descuento: import("@prisma/client-runtime-utils").Decimal;
        fecha_inicio: Date | null;
        fecha_fin: Date | null;
        categorias: string | null;
        perfume_ids: string | null;
        creado_en: Date;
    }[]>;
    create(dto: CreateCampaniaDto): Promise<{
        id: number;
        nombre: string;
        tipo: string;
        imagen: string | null;
        activa: boolean;
        descuento: import("@prisma/client-runtime-utils").Decimal;
        fecha_inicio: Date | null;
        fecha_fin: Date | null;
        categorias: string | null;
        perfume_ids: string | null;
        creado_en: Date;
    }>;
    update(id: number, body: any): Promise<{
        id: number;
        nombre: string;
        tipo: string;
        imagen: string | null;
        activa: boolean;
        descuento: import("@prisma/client-runtime-utils").Decimal;
        fecha_inicio: Date | null;
        fecha_fin: Date | null;
        categorias: string | null;
        perfume_ids: string | null;
        creado_en: Date;
    }>;
    toggle(id: number): Promise<{
        id: number;
        nombre: string;
        tipo: string;
        imagen: string | null;
        activa: boolean;
        descuento: import("@prisma/client-runtime-utils").Decimal;
        fecha_inicio: Date | null;
        fecha_fin: Date | null;
        categorias: string | null;
        perfume_ids: string | null;
        creado_en: Date;
    }>;
    remove(id: number): Promise<{
        id: number;
        nombre: string;
        tipo: string;
        imagen: string | null;
        activa: boolean;
        descuento: import("@prisma/client-runtime-utils").Decimal;
        fecha_inicio: Date | null;
        fecha_fin: Date | null;
        categorias: string | null;
        perfume_ids: string | null;
        creado_en: Date;
    }>;
}
