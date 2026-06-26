import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    create(req: any, dto: CreateOrderDto): Promise<{
        order: {
            id: number;
            id_usuario: number;
            fecha: Date;
            total: import("@prisma/client-runtime-utils").Decimal;
            estado: string;
            metodo_de_pago: string;
            tipo_entrega: string;
            nombre_recibe: string;
            telefono_contacto: string;
            direccion_entrega: string;
            departamento_entrega: string;
            municipio_entrega: string;
            referencias_entrega: string | null;
            codigo_postal_entrega: string | null;
            id_sucursal: number | null;
            id_codigo_promocion: number | null;
        };
        stampsSummary: {
            earned: number;
            totalAccumulated: number;
            finalStampsCount: number;
            freePresentsAwarded: number;
        };
    }>;
    findAll(req: any): Promise<({
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
            id_orden: number;
            id_presentacion: number;
            cantidad: number;
            precio_unitario: import("@prisma/client-runtime-utils").Decimal;
        })[];
    } & {
        id: number;
        id_usuario: number;
        fecha: Date;
        total: import("@prisma/client-runtime-utils").Decimal;
        estado: string;
        metodo_de_pago: string;
        tipo_entrega: string;
        nombre_recibe: string;
        telefono_contacto: string;
        direccion_entrega: string;
        departamento_entrega: string;
        municipio_entrega: string;
        referencias_entrega: string | null;
        codigo_postal_entrega: string | null;
        id_sucursal: number | null;
        id_codigo_promocion: number | null;
    })[]>;
    findOne(req: any, id: number): Promise<{
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
            id_orden: number;
            id_presentacion: number;
            cantidad: number;
            precio_unitario: import("@prisma/client-runtime-utils").Decimal;
        })[];
    } & {
        id: number;
        id_usuario: number;
        fecha: Date;
        total: import("@prisma/client-runtime-utils").Decimal;
        estado: string;
        metodo_de_pago: string;
        tipo_entrega: string;
        nombre_recibe: string;
        telefono_contacto: string;
        direccion_entrega: string;
        departamento_entrega: string;
        municipio_entrega: string;
        referencias_entrega: string | null;
        codigo_postal_entrega: string | null;
        id_sucursal: number | null;
        id_codigo_promocion: number | null;
    }>;
}
