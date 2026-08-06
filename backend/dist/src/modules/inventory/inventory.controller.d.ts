import { InventoryService } from './inventory.service';
import { CreateIngresoDto } from './dto/create-ingreso.dto';
export declare class InventoryController {
    private readonly inventoryService;
    constructor(inventoryService: InventoryService);
    create(dto: CreateIngresoDto): Promise<{
        id: number;
        cantidad: number;
        id_presentacion: number;
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
                galeria: string[];
                marca: string;
                activo: boolean;
            };
        } & {
            id: number;
            id_perfume: number;
            tamanio: string;
            precio: import("@prisma/client-runtime-utils").Decimal;
            stock: number;
            costo: import("@prisma/client-runtime-utils").Decimal | null;
        };
    } & {
        id: number;
        cantidad: number;
        id_presentacion: number;
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
