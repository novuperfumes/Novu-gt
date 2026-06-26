import { PerfumesService } from './perfumes.service';
import { CreatePerfumeDto } from './dto/create-perfume.dto';
import { CreatePresentacionDto } from './dto/create-presentacion.dto';
import { UpdatePerfumeDto } from './dto/update-perfume.dto';
export declare class PerfumesController {
    private readonly perfumesService;
    constructor(perfumesService: PerfumesService);
    findAll(): Promise<any>;
    findOne(id: number): Promise<any>;
    create(dto: CreatePerfumeDto): Promise<{
        nombre: string;
        descripcion: string;
        categoria: string;
        imagen: string;
        marca: string;
        activo: boolean;
        id: number;
    }>;
    addPresentacion(id: number, dto: CreatePresentacionDto): Promise<{
        id: number;
        tamanio: string;
        precio: import("@prisma/client-runtime-utils").Decimal;
        stock: number;
        id_perfume: number;
    }>;
    update(id: number, dto: UpdatePerfumeDto): Promise<{
        nombre: string;
        descripcion: string;
        categoria: string;
        imagen: string;
        marca: string;
        activo: boolean;
        id: number;
    }>;
    remove(id: number): Promise<{
        nombre: string;
        descripcion: string;
        categoria: string;
        imagen: string;
        marca: string;
        activo: boolean;
        id: number;
    }>;
}
