import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateDecantDto } from './dto/create-decant.dto';
import { UpdateDecantDto } from './dto/update-decant.dto';
export declare class DecantsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateDecantDto): Promise<{
        perfume: {
            id: number;
            nombre: string;
            genero: string | null;
            activo: boolean;
            descripcion: string;
            categoria: string;
            tipo: string | null;
            imagen: string;
            galeria: string[];
            marca: string;
        };
    } & {
        id: number;
        id_perfume: number;
        ml_origen: number;
        costo_original: import("@prisma/client-runtime-utils").Decimal;
        precio_original: import("@prisma/client-runtime-utils").Decimal;
        costo_5ml: import("@prisma/client-runtime-utils").Decimal;
        precio_5ml: import("@prisma/client-runtime-utils").Decimal;
        stock_5ml: number;
        costo_10ml: import("@prisma/client-runtime-utils").Decimal;
        precio_10ml: import("@prisma/client-runtime-utils").Decimal;
        stock_10ml: number;
    }>;
    findAll(): Promise<({
        perfume: {
            id: number;
            nombre: string;
            genero: string | null;
            activo: boolean;
            descripcion: string;
            categoria: string;
            tipo: string | null;
            imagen: string;
            galeria: string[];
            marca: string;
        };
    } & {
        id: number;
        id_perfume: number;
        ml_origen: number;
        costo_original: import("@prisma/client-runtime-utils").Decimal;
        precio_original: import("@prisma/client-runtime-utils").Decimal;
        costo_5ml: import("@prisma/client-runtime-utils").Decimal;
        precio_5ml: import("@prisma/client-runtime-utils").Decimal;
        stock_5ml: number;
        costo_10ml: import("@prisma/client-runtime-utils").Decimal;
        precio_10ml: import("@prisma/client-runtime-utils").Decimal;
        stock_10ml: number;
    })[]>;
    findOne(id: number): Promise<{
        perfume: {
            id: number;
            nombre: string;
            genero: string | null;
            activo: boolean;
            descripcion: string;
            categoria: string;
            tipo: string | null;
            imagen: string;
            galeria: string[];
            marca: string;
        };
    } & {
        id: number;
        id_perfume: number;
        ml_origen: number;
        costo_original: import("@prisma/client-runtime-utils").Decimal;
        precio_original: import("@prisma/client-runtime-utils").Decimal;
        costo_5ml: import("@prisma/client-runtime-utils").Decimal;
        precio_5ml: import("@prisma/client-runtime-utils").Decimal;
        stock_5ml: number;
        costo_10ml: import("@prisma/client-runtime-utils").Decimal;
        precio_10ml: import("@prisma/client-runtime-utils").Decimal;
        stock_10ml: number;
    }>;
    findByPerfume(perfumeId: number): Promise<{
        perfume: {
            id: number;
            nombre: string;
            genero: string | null;
            activo: boolean;
            descripcion: string;
            categoria: string;
            tipo: string | null;
            imagen: string;
            galeria: string[];
            marca: string;
        };
    } & {
        id: number;
        id_perfume: number;
        ml_origen: number;
        costo_original: import("@prisma/client-runtime-utils").Decimal;
        precio_original: import("@prisma/client-runtime-utils").Decimal;
        costo_5ml: import("@prisma/client-runtime-utils").Decimal;
        precio_5ml: import("@prisma/client-runtime-utils").Decimal;
        stock_5ml: number;
        costo_10ml: import("@prisma/client-runtime-utils").Decimal;
        precio_10ml: import("@prisma/client-runtime-utils").Decimal;
        stock_10ml: number;
    }>;
    update(id: number, dto: UpdateDecantDto): Promise<{
        perfume: {
            id: number;
            nombre: string;
            genero: string | null;
            activo: boolean;
            descripcion: string;
            categoria: string;
            tipo: string | null;
            imagen: string;
            galeria: string[];
            marca: string;
        };
    } & {
        id: number;
        id_perfume: number;
        ml_origen: number;
        costo_original: import("@prisma/client-runtime-utils").Decimal;
        precio_original: import("@prisma/client-runtime-utils").Decimal;
        costo_5ml: import("@prisma/client-runtime-utils").Decimal;
        precio_5ml: import("@prisma/client-runtime-utils").Decimal;
        stock_5ml: number;
        costo_10ml: import("@prisma/client-runtime-utils").Decimal;
        precio_10ml: import("@prisma/client-runtime-utils").Decimal;
        stock_10ml: number;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
