import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Prisma } from '@prisma/client';
export declare class OrdersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: number, dto: CreateOrderDto): Promise<{
        order: {
            id: number;
            fecha: Date;
            total: Prisma.Decimal;
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
            costo_envio: Prisma.Decimal | null;
            id_usuario: number;
            id_sucursal: number | null;
            id_codigo_promocion: number | null;
            id_gift_card: number | null;
        };
    }>;
    findAllByUser(userId: number): Promise<({
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
                costo_original: Prisma.Decimal;
                precio_original: Prisma.Decimal;
                costo_5ml: Prisma.Decimal;
                precio_5ml: Prisma.Decimal;
                stock_5ml: number;
                costo_10ml: Prisma.Decimal;
                precio_10ml: Prisma.Decimal;
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
                precio: Prisma.Decimal;
                stock: number;
                costo: Prisma.Decimal | null;
                id_perfume: number;
            }) | null;
        } & {
            id: number;
            tipo_decant: string | null;
            cantidad: number;
            precio_unitario: Prisma.Decimal;
            id_presentacion: number | null;
            id_decant: number | null;
            id_orden: number;
        })[];
    } & {
        id: number;
        fecha: Date;
        total: Prisma.Decimal;
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
        costo_envio: Prisma.Decimal | null;
        id_usuario: number;
        id_sucursal: number | null;
        id_codigo_promocion: number | null;
        id_gift_card: number | null;
    })[]>;
    findOne(userId: number, orderId: number): Promise<{
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
                costo_original: Prisma.Decimal;
                precio_original: Prisma.Decimal;
                costo_5ml: Prisma.Decimal;
                precio_5ml: Prisma.Decimal;
                stock_5ml: number;
                costo_10ml: Prisma.Decimal;
                precio_10ml: Prisma.Decimal;
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
                precio: Prisma.Decimal;
                stock: number;
                costo: Prisma.Decimal | null;
                id_perfume: number;
            }) | null;
        } & {
            id: number;
            tipo_decant: string | null;
            cantidad: number;
            precio_unitario: Prisma.Decimal;
            id_presentacion: number | null;
            id_decant: number | null;
            id_orden: number;
        })[];
    } & {
        id: number;
        fecha: Date;
        total: Prisma.Decimal;
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
        costo_envio: Prisma.Decimal | null;
        id_usuario: number;
        id_sucursal: number | null;
        id_codigo_promocion: number | null;
        id_gift_card: number | null;
    }>;
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
        codigoPromocion: {
            id: number;
            descuento: Prisma.Decimal;
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
            monto: Prisma.Decimal;
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
                costo_original: Prisma.Decimal;
                precio_original: Prisma.Decimal;
                costo_5ml: Prisma.Decimal;
                precio_5ml: Prisma.Decimal;
                stock_5ml: number;
                costo_10ml: Prisma.Decimal;
                precio_10ml: Prisma.Decimal;
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
                precio: Prisma.Decimal;
                stock: number;
                costo: Prisma.Decimal | null;
                id_perfume: number;
            }) | null;
        } & {
            id: number;
            tipo_decant: string | null;
            cantidad: number;
            precio_unitario: Prisma.Decimal;
            id_presentacion: number | null;
            id_decant: number | null;
            id_orden: number;
        })[];
    } & {
        id: number;
        fecha: Date;
        total: Prisma.Decimal;
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
        costo_envio: Prisma.Decimal | null;
        id_usuario: number;
        id_sucursal: number | null;
        id_codigo_promocion: number | null;
        id_gift_card: number | null;
    })[]>;
    updateStatus(orderId: number, estado: string, costo_envio?: number): Promise<{
        id: number;
        fecha: Date;
        total: Prisma.Decimal;
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
        costo_envio: Prisma.Decimal | null;
        id_usuario: number;
        id_sucursal: number | null;
        id_codigo_promocion: number | null;
        id_gift_card: number | null;
    }>;
}
