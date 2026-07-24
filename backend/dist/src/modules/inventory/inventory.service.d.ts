import { PrismaService } from '../../common/prisma/prisma.service';
import { RedisService } from '../../common/cache/redis.service';
import { CreateIngresoDto } from './dto/create-ingreso.dto';
export declare class InventoryService {
    private readonly prisma;
    private readonly redisService;
    private readonly CATALOG_CACHE_KEY;
    constructor(prisma: PrismaService, redisService: RedisService);
    create(dto: CreateIngresoDto): Promise<{
        id: number;
        id_presentacion: number;
        cantidad: number;
        costo_compra: import("@prisma/client-runtime-utils").Decimal;
        tipo_traida: string;
        costo_traida: import("@prisma/client-runtime-utils").Decimal;
        costo_total: import("@prisma/client-runtime-utils").Decimal;
        fecha_ingreso: Date;
    }>;
    findAll(): Promise<({
        presentacion: {
            perfume: {
                id: number;
                nombre: string;
                descripcion: string;
                categoria: string;
                tipo: string | null;
                genero: string | null;
                imagen: string;
                marca: string;
                activo: boolean;
            };
        } & {
            id: number;
            tamanio: string;
            costo: import("@prisma/client-runtime-utils").Decimal | null;
            precio: import("@prisma/client-runtime-utils").Decimal;
            stock: number;
            id_perfume: number;
        };
    } & {
        id: number;
        id_presentacion: number;
        cantidad: number;
        costo_compra: import("@prisma/client-runtime-utils").Decimal;
        tipo_traida: string;
        costo_traida: import("@prisma/client-runtime-utils").Decimal;
        costo_total: import("@prisma/client-runtime-utils").Decimal;
        fecha_ingreso: Date;
    })[]>;
    getStats(): Promise<{
        resumen: {
            total_perfumes_ingresados: number;
            inversion_total: number;
            inversion_solo_perfumes: number;
            inversion_solo_traidas: number;
            costo_promedio_unidad: number;
        };
        por_tipo_traida: {
            tipo_traida: string;
            cantidad_unidades: number;
            inversion_total: number;
        }[];
    }>;
}
