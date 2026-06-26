import { PrismaService } from '../../common/prisma/prisma.service';
import { RedisService } from '../../common/cache/redis.service';
import { CreatePerfumeDto } from './dto/create-perfume.dto';
import { CreatePresentacionDto } from './dto/create-presentacion.dto';
import { UpdatePerfumeDto } from './dto/update-perfume.dto';
export declare class PerfumesService {
    private prisma;
    private redisService;
    private readonly CACHE_TTL;
    private readonly CATALOG_CACHE_KEY;
    constructor(prisma: PrismaService, redisService: RedisService);
    create(dto: CreatePerfumeDto): Promise<{
        nombre: string;
        descripcion: string;
        categoria: string;
        imagen: string;
        marca: string;
        activo: boolean;
        id: number;
    }>;
    addPresentacion(perfumeId: number, dto: CreatePresentacionDto): Promise<{
        id: number;
        tamanio: string;
        precio: import("@prisma/client-runtime-utils").Decimal;
        stock: number;
        id_perfume: number;
    }>;
    findAllActive(): Promise<any>;
    findOne(id: number): Promise<any>;
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
    private invalidateCatalogCache;
    private invalidatePerfumeCache;
}
