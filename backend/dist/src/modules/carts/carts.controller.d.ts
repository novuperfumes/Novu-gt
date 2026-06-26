import { CartsService } from './carts.service';
import { AddItemDto } from './dto/add-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
export declare class CartsController {
    private readonly cartsService;
    constructor(cartsService: CartsService);
    getCart(req: any): Promise<{
        detalles: ({
            presentacion: {
                perfume: {
                    nombre: string;
                    descripcion: string;
                    categoria: string;
                    imagen: string;
                    marca: string;
                    activo: boolean;
                    id: number;
                };
            } & {
                id: number;
                tamanio: string;
                precio: import("@prisma/client-runtime-utils").Decimal;
                stock: number;
                id_perfume: number;
            };
        } & {
            id: number;
            id_presentacion: number;
            cantidad: number;
            id_carrito_maestro: number;
        })[];
    } & {
        id: number;
        id_usuario: number;
    }>;
    addItem(req: any, dto: AddItemDto): Promise<{
        id: number;
        id_presentacion: number;
        cantidad: number;
        id_carrito_maestro: number;
    }>;
    updateItem(req: any, detailId: number, dto: UpdateItemDto): Promise<{
        id: number;
        id_presentacion: number;
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
