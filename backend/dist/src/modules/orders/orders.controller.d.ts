import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    create(req: any, dto: CreateOrderDto): Promise<{
        order: {
            id: number;
            id_usuario: number;
            estado: string;
            total: import("@prisma/client-runtime-utils").Decimal;
            fecha: Date;
            metodo_de_pago: string;
            tipo_entrega: string;
            nombre_recibe: string;
            telefono_contacto: string;
            direccion_entrega: string;
            departamento_entrega: string;
            municipio_entrega: string;
            referencias_entrega: string | null;
            codigo_postal_entrega: string | null;
            costo_envio: import("@prisma/client-runtime-utils").Decimal | null;
            id_sucursal: number | null;
            id_codigo_promocion: number | null;
            id_gift_card: number | null;
        };
    }>;
    findAll(req: any): Promise<({
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
                    galeria: import("@prisma/client/runtime/client").JsonValue;
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
                    galeria: import("@prisma/client/runtime/client").JsonValue;
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
            id_presentacion: number | null;
            id_decant: number | null;
            precio_unitario: import("@prisma/client-runtime-utils").Decimal;
            id_orden: number;
        })[];
    } & {
        id: number;
        id_usuario: number;
        estado: string;
        total: import("@prisma/client-runtime-utils").Decimal;
        fecha: Date;
        metodo_de_pago: string;
        tipo_entrega: string;
        nombre_recibe: string;
        telefono_contacto: string;
        direccion_entrega: string;
        departamento_entrega: string;
        municipio_entrega: string;
        referencias_entrega: string | null;
        codigo_postal_entrega: string | null;
        costo_envio: import("@prisma/client-runtime-utils").Decimal | null;
        id_sucursal: number | null;
        id_codigo_promocion: number | null;
        id_gift_card: number | null;
    })[]>;
    findAllAdmin(): Promise<({
        usuario: {
            id: number;
            nombre: string;
            genero: string | null;
            correo: string;
            rol: string;
            apellido: string;
            telefono: string | null;
            sellos: number;
        };
        giftCard: {
            id: number;
            codigo: string;
            monto: import("@prisma/client-runtime-utils").Decimal;
            activa: boolean;
            es_bienvenida: boolean;
            id_usuario: number;
        } | null;
        codigoPromocion: {
            id: number;
            codigo: string;
            tipo_descuento: string;
            descuento: import("@prisma/client-runtime-utils").Decimal;
            fecha_inicio: Date;
            fecha_fin: Date;
            estado: string;
        } | null;
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
                    galeria: import("@prisma/client/runtime/client").JsonValue;
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
                    galeria: import("@prisma/client/runtime/client").JsonValue;
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
            id_presentacion: number | null;
            id_decant: number | null;
            precio_unitario: import("@prisma/client-runtime-utils").Decimal;
            id_orden: number;
        })[];
    } & {
        id: number;
        id_usuario: number;
        estado: string;
        total: import("@prisma/client-runtime-utils").Decimal;
        fecha: Date;
        metodo_de_pago: string;
        tipo_entrega: string;
        nombre_recibe: string;
        telefono_contacto: string;
        direccion_entrega: string;
        departamento_entrega: string;
        municipio_entrega: string;
        referencias_entrega: string | null;
        codigo_postal_entrega: string | null;
        costo_envio: import("@prisma/client-runtime-utils").Decimal | null;
        id_sucursal: number | null;
        id_codigo_promocion: number | null;
        id_gift_card: number | null;
    })[]>;
    updateStatus(id: number, body: {
        estado: string;
        costo_envio?: number;
    }): Promise<{
        id: number;
        id_usuario: number;
        estado: string;
        total: import("@prisma/client-runtime-utils").Decimal;
        fecha: Date;
        metodo_de_pago: string;
        tipo_entrega: string;
        nombre_recibe: string;
        telefono_contacto: string;
        direccion_entrega: string;
        departamento_entrega: string;
        municipio_entrega: string;
        referencias_entrega: string | null;
        codigo_postal_entrega: string | null;
        costo_envio: import("@prisma/client-runtime-utils").Decimal | null;
        id_sucursal: number | null;
        id_codigo_promocion: number | null;
        id_gift_card: number | null;
    }>;
    findOne(req: any, id: number): Promise<{
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
                    galeria: import("@prisma/client/runtime/client").JsonValue;
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
                    galeria: import("@prisma/client/runtime/client").JsonValue;
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
            id_presentacion: number | null;
            id_decant: number | null;
            precio_unitario: import("@prisma/client-runtime-utils").Decimal;
            id_orden: number;
        })[];
    } & {
        id: number;
        id_usuario: number;
        estado: string;
        total: import("@prisma/client-runtime-utils").Decimal;
        fecha: Date;
        metodo_de_pago: string;
        tipo_entrega: string;
        nombre_recibe: string;
        telefono_contacto: string;
        direccion_entrega: string;
        departamento_entrega: string;
        municipio_entrega: string;
        referencias_entrega: string | null;
        codigo_postal_entrega: string | null;
        costo_envio: import("@prisma/client-runtime-utils").Decimal | null;
        id_sucursal: number | null;
        id_codigo_promocion: number | null;
        id_gift_card: number | null;
    }>;
}
