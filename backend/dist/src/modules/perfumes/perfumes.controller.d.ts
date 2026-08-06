import { PerfumesService } from './perfumes.service';
import { CreatePerfumeDto } from './dto/create-perfume.dto';
import { CreatePresentacionDto } from './dto/create-presentacion.dto';
import { UpdatePerfumeDto } from './dto/update-perfume.dto';
export declare class PerfumesController {
    private readonly perfumesService;
    constructor(perfumesService: PerfumesService);
    findAll(): Promise<any>;
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
        genero: string | null;
        activo: boolean;
        descripcion: string;
        categoria: string;
        tipo: string | null;
        imagen: string;
        galeria: string[];
        marca: string;
    })[]>;
    getBestSellers(): Promise<{
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
        genero: string | null;
        activo: boolean;
        descripcion: string;
        categoria: string;
        tipo: string | null;
        imagen: string;
        galeria: string[];
        marca: string;
    }[]>;
    findOne(id: number): Promise<any>;
    create(dto: CreatePerfumeDto): Promise<{
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
    }>;
    addPresentacion(id: number, dto: CreatePresentacionDto): Promise<{
        id: number;
        id_perfume: number;
        tamanio: string;
        precio: import("@prisma/client-runtime-utils").Decimal;
        stock: number;
        costo: import("@prisma/client-runtime-utils").Decimal | null;
    }>;
    updatePresentacion(presId: number, dto: {
        tamanio?: string;
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
    update(id: number, dto: UpdatePerfumeDto): Promise<{
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
    }>;
    remove(id: number): Promise<{
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
    }>;
}
