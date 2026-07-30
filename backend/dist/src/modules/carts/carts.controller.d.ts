import { CartsService } from './carts.service';
import { AddItemDto } from './dto/add-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
export declare class CartsController {
    private readonly cartsService;
    constructor(cartsService: CartsService);
    getCart(req: any): Promise<{
        detalles: ({
            decant: ({
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
            }) | null;
            presentacion: ({
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
                tamanio: string;
                precio: import("@prisma/client-runtime-utils").Decimal;
                stock: number;
                costo: import("@prisma/client-runtime-utils").Decimal | null;
            }) | null;
        } & {
            id: number;
            id_presentacion: number | null;
            id_decant: number | null;
            tipo_decant: string | null;
            cantidad: number;
            id_carrito_maestro: number;
        })[];
    } & {
        id: number;
        id_usuario: number;
    }>;
    addItem(req: any, dto: AddItemDto): Promise<{
        id: number;
        id_presentacion: number | null;
        id_decant: number | null;
        tipo_decant: string | null;
        cantidad: number;
        id_carrito_maestro: number;
    }>;
    updateItem(req: any, detailId: number, dto: UpdateItemDto): Promise<{
        id: number;
        id_presentacion: number | null;
        id_decant: number | null;
        tipo_decant: string | null;
        cantidad: number;
        id_carrito_maestro: number;
    }>;
    removeItem(req: any, detailId: number): Promise<{
        message: string;
    }>;
    clearCart(req: any): Promise<{
        message: string;
    }>;
}
