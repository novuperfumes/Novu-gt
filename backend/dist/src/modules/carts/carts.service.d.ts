import { PrismaService } from '../../common/prisma/prisma.service';
import { AddItemDto } from './dto/add-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
export declare class CartsService {
    private prisma;
    constructor(prisma: PrismaService);
    getOrCreateCart(userId: number): Promise<{
        detalles: ({
            decant: ({
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
                ml_origen: number;
                costo_original: import("@prisma/client-runtime-utils").Decimal;
                precio_original: import("@prisma/client-runtime-utils").Decimal;
                costo_5ml: import("@prisma/client-runtime-utils").Decimal;
                precio_5ml: import("@prisma/client-runtime-utils").Decimal;
                stock_5ml: number;
                costo_10ml: import("@prisma/client-runtime-utils").Decimal;
                precio_10ml: import("@prisma/client-runtime-utils").Decimal;
                stock_10ml: number;
            }) | null;
            presentacion: ({
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
            }) | null;
        } & {
            id: number;
            tipo_decant: string | null;
            cantidad: number;
            id_carrito_maestro: number;
            id_presentacion: number | null;
            id_decant: number | null;
        })[];
    } & {
        id: number;
        id_usuario: number;
    }>;
    addItem(userId: number, dto: AddItemDto): Promise<{
        id: number;
        tipo_decant: string | null;
        cantidad: number;
        id_carrito_maestro: number;
        id_presentacion: number | null;
        id_decant: number | null;
    }>;
    updateItem(userId: number, detailId: number, dto: UpdateItemDto): Promise<{
        id: number;
        tipo_decant: string | null;
        cantidad: number;
        id_carrito_maestro: number;
        id_presentacion: number | null;
        id_decant: number | null;
    }>;
    removeItem(userId: number, detailId: number): Promise<{
        message: string;
    }>;
    clearCart(userId: number): Promise<{
        message: string;
    }>;
}
