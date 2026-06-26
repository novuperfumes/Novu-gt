import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Prisma } from '@prisma/client';
export declare class OrdersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: number, dto: CreateOrderDto): Promise<{
        order: {
            id: number;
            id_usuario: number;
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
    findAllByUser(userId: number): Promise<({
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
                precio: Prisma.Decimal;
                stock: number;
                id_perfume: number;
            };
        } & {
            id: number;
            id_orden: number;
            id_presentacion: number;
            cantidad: number;
            precio_unitario: Prisma.Decimal;
        })[];
    } & {
        id: number;
        id_usuario: number;
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
        id_sucursal: number | null;
        id_codigo_promocion: number | null;
    })[]>;
    findOne(userId: number, orderId: number): Promise<{
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
                precio: Prisma.Decimal;
                stock: number;
                id_perfume: number;
            };
        } & {
            id: number;
            id_orden: number;
            id_presentacion: number;
            cantidad: number;
            precio_unitario: Prisma.Decimal;
        })[];
    } & {
        id: number;
        id_usuario: number;
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
        id_sucursal: number | null;
        id_codigo_promocion: number | null;
    }>;
}
