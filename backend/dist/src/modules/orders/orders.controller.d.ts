import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    create(req: any, dto: CreateOrderDto): Promise<{
        order: {
            id: number;
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
            costo_envio: import("@prisma/client-runtime-utils").Decimal | null;
            id_usuario: number;
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
                    galeria: string[];
                    marca: string;
                    activo: boolean;
                };
            } & {
                id: number;
                ml_origen: number;
                costo_original: import("@prisma/client-runtime-utils").Decimal;
                precio_original: import("@prisma/client-runtime-utils").Decimal;
                costo_5ml: import("@prisma/client-runtime-utils").Decimal;
                precio_5ml: import("@prisma/client-runtime-utils").Decimal;
                stock_5ml: number;
                costo_10ml: import("@prisma/client-runtime-utils").Decimal;
                precio_10ml: import("@prisma/client-runtime-utils").Decimal;
                stock_10ml: number;
                id_perfume: number;
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
                tamanio: string;
                precio: import("@prisma/client-runtime-utils").Decimal;
                stock: number;
                costo: import("@prisma/client-runtime-utils").Decimal | null;
                id_perfume: number;
            }) | null;
        } & {
            id: number;
            tipo_decant: string | null;
            cantidad: number;
            precio_unitario: import("@prisma/client-runtime-utils").Decimal;
            id_presentacion: number | null;
            id_decant: number | null;
            id_orden: number;
        })[];
    } & {
        id: number;
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
        costo_envio: import("@prisma/client-runtime-utils").Decimal | null;
        id_usuario: number;
        id_sucursal: number | null;
        id_codigo_promocion: number | null;
        id_gift_card: number | null;
    })[]>;
    findAllAdmin(req: any): Promise<({
        usuario: {
            id: number;
            nombre: string;
            genero: string | null;
            correo: string;
            contrasenia: string;
            rol: string;
            apellido: string;
            telefono: string | null;
            sellos: number;
        };
        codigoPromocion: {
            id: number;
            descuento: import("@prisma/client-runtime-utils").Decimal;
            fecha_inicio: Date;
            fecha_fin: Date;
            estado: string;
            codigo: string;
            tipo_descuento: string;
        } | null;
        giftCard: {
            id: number;
            activa: boolean;
            id_usuario: number;
            codigo: string;
            monto: import("@prisma/client-runtime-utils").Decimal;
            es_bienvenida: boolean;
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
                    galeria: string[];
                    marca: string;
                    activo: boolean;
                };
            } & {
                id: number;
                ml_origen: number;
                costo_original: import("@prisma/client-runtime-utils").Decimal;
                precio_original: import("@prisma/client-runtime-utils").Decimal;
                costo_5ml: import("@prisma/client-runtime-utils").Decimal;
                precio_5ml: import("@prisma/client-runtime-utils").Decimal;
                stock_5ml: number;
                costo_10ml: import("@prisma/client-runtime-utils").Decimal;
                precio_10ml: import("@prisma/client-runtime-utils").Decimal;
                stock_10ml: number;
                id_perfume: number;
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
                tamanio: string;
                precio: import("@prisma/client-runtime-utils").Decimal;
                stock: number;
                costo: import("@prisma/client-runtime-utils").Decimal | null;
                id_perfume: number;
            }) | null;
        } & {
            id: number;
            tipo_decant: string | null;
            cantidad: number;
            precio_unitario: import("@prisma/client-runtime-utils").Decimal;
            id_presentacion: number | null;
            id_decant: number | null;
            id_orden: number;
        })[];
    } & {
        id: number;
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
        costo_envio: import("@prisma/client-runtime-utils").Decimal | null;
        id_usuario: number;
        id_sucursal: number | null;
        id_codigo_promocion: number | null;
        id_gift_card: number | null;
    })[]>;
    updateStatus(req: any, id: number, body: {
        estado: string;
        costo_envio?: number;
    }): Promise<{
        id: number;
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
        costo_envio: import("@prisma/client-runtime-utils").Decimal | null;
        id_usuario: number;
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
                    galeria: string[];
                    marca: string;
                    activo: boolean;
                };
            } & {
                id: number;
                ml_origen: number;
                costo_original: import("@prisma/client-runtime-utils").Decimal;
                precio_original: import("@prisma/client-runtime-utils").Decimal;
                costo_5ml: import("@prisma/client-runtime-utils").Decimal;
                precio_5ml: import("@prisma/client-runtime-utils").Decimal;
                stock_5ml: number;
                costo_10ml: import("@prisma/client-runtime-utils").Decimal;
                precio_10ml: import("@prisma/client-runtime-utils").Decimal;
                stock_10ml: number;
                id_perfume: number;
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
                tamanio: string;
                precio: import("@prisma/client-runtime-utils").Decimal;
                stock: number;
                costo: import("@prisma/client-runtime-utils").Decimal | null;
                id_perfume: number;
            }) | null;
        } & {
            id: number;
            tipo_decant: string | null;
            cantidad: number;
            precio_unitario: import("@prisma/client-runtime-utils").Decimal;
            id_presentacion: number | null;
            id_decant: number | null;
            id_orden: number;
        })[];
    } & {
        id: number;
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
        costo_envio: import("@prisma/client-runtime-utils").Decimal | null;
        id_usuario: number;
        id_sucursal: number | null;
        id_codigo_promocion: number | null;
        id_gift_card: number | null;
    }>;
}
