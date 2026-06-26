import { PrismaService } from '../../common/prisma/prisma.service';
import { AddItemDto } from './dto/add-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
export declare class CartsService {
    private prisma;
    constructor(prisma: PrismaService);
    getOrCreateCart(userId: number): Promise<{
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
    addItem(userId: number, dto: AddItemDto): Promise<{
        id: number;
        id_presentacion: number;
        cantidad: number;
        id_carrito_maestro: number;
    }>;
    updateItem(userId: number, detailId: number, dto: UpdateItemDto): Promise<{
        id: number;
        id_presentacion: number;
        cantidad: number;
        id_carrito_maestro: number;
    }>;
    removeItem(userId: number, detailId: number): Promise<{
        message: string;
    }>;
    clearCart(userId: number): Promise<{
        message: string;
    }>;
}
