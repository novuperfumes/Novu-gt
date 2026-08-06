import { PrismaService } from '../../common/prisma/prisma.service';
import { RedisService } from '../../common/cache/redis.service';
import { CreatePerfumeDto } from './dto/create-perfume.dto';
import { CreatePresentacionDto } from './dto/create-presentacion.dto';
export declare class PerfumesService {
    private prisma;
    private redisService;
    private readonly CACHE_TTL;
    private readonly CATALOG_CACHE_KEY;
    constructor(prisma: PrismaService, redisService: RedisService);
    create(dto: CreatePerfumeDto): Promise<{
        id: number;
        nombre: string;
        descripcion: string;
        categoria: string;
        tipo: string | null;
        genero: string | null;
        imagen: string;
        galeria: import("@prisma/client/runtime/client").JsonValue;
        marca: string;
        activo: boolean;
    }>;
    addPresentacion(perfumeId: number, dto: CreatePresentacionDto): Promise<{
        id: number;
        id_perfume: number;
        tamanio: string;
        precio: import("@prisma/client-runtime-utils").Decimal;
        stock: number;
        costo: import("@prisma/client-runtime-utils").Decimal | null;
    }>;
    updatePresentacion(presId: number, dto: {
        tamanio?: string;
        costo?: number;
        precio?: number;
        stock?: number;
    }): Promise<{
        id: number;
        id_perfume: number;
        tamanio: string;
        precio: import("@prisma/client-runtime-utils").Decimal;
        stock: number;
        costo: import("@prisma/client-runtime-utils").Decimal | null;
    }>;
    removePresentacion(presId: number): Promise<{
        id: number;
        id_perfume: number;
        tamanio: string;
        precio: import("@prisma/client-runtime-utils").Decimal;
        stock: number;
        costo: import("@prisma/client-runtime-utils").Decimal | null;
    }>;
    findAllActive(): Promise<any>;
    getBestSellers(limit?: number): Promise<{
        presentaciones: {
            id: number;
            id_perfume: number;
            tamanio: string;
            precio: import("@prisma/client-runtime-utils").Decimal;
            stock: number;
            costo: import("@prisma/client-runtime-utils").Decimal | null;
        }[];
        decant: {
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
        } | null;
        id: number;
        nombre: string;
        descripcion: string;
        categoria: string;
        tipo: string | null;
        genero: string | null;
        imagen: string;
        galeria: import("@prisma/client/runtime/client").JsonValue;
        marca: string;
        activo: boolean;
    }[]>;
    findAllAdmin(): Promise<({
        decant: {
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
        } | null;
        presentaciones: {
            id: number;
            id_perfume: number;
            tamanio: string;
            precio: import("@prisma/client-runtime-utils").Decimal;
            stock: number;
            costo: import("@prisma/client-runtime-utils").Decimal | null;
        }[];
    } & {
        id: number;
        nombre: string;
        descripcion: string;
        categoria: string;
        tipo: string | null;
        genero: string | null;
        imagen: string;
        galeria: import("@prisma/client/runtime/client").JsonValue;
        marca: string;
        activo: boolean;
    })[]>;
    findOne(id: number): Promise<any>;
    update(id: number, dto: any): Promise<{
        id: number;
        nombre: string;
        descripcion: string;
        categoria: string;
        tipo: string | null;
        genero: string | null;
        imagen: string;
        galeria: import("@prisma/client/runtime/client").JsonValue;
        marca: string;
        activo: boolean;
    }>;
    remove(id: number): Promise<{
        id: number;
        nombre: string;
        descripcion: string;
        categoria: string;
        tipo: string | null;
        genero: string | null;
        imagen: string;
        galeria: import("@prisma/client/runtime/client").JsonValue;
        marca: string;
        activo: boolean;
    }>;
    private invalidateCatalogCache;
    private invalidatePerfumeCache;
}
