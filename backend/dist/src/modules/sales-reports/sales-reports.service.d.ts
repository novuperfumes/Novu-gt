import { PrismaService } from '../../common/prisma/prisma.service';
import { UpdateSaleDto } from './dto/update-sale.dto';
export declare class SalesReportsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<({
        ordenDetalle: ({
            orden: {
                usuario: {
                    nombre: string;
                    correo: string;
                    apellido: string;
                    telefono: string | null;
                };
            } & {
                id: number;
                id_usuario: number;
                fecha: Date;
                total: import("@prisma/client-runtime-utils").Decimal;
                costo_envio: import("@prisma/client-runtime-utils").Decimal | null;
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
                id_gift_card: number | null;
            };
        } & {
            id: number;
            id_orden: number;
            cantidad: number;
            id_presentacion: number | null;
            id_decant: number | null;
            tipo_decant: string | null;
            precio_unitario: import("@prisma/client-runtime-utils").Decimal;
        }) | null;
    } & {
        perfume: string;
        id: number;
        tipo: string | null;
        genero: string | null;
        costo: import("@prisma/client-runtime-utils").Decimal | null;
        total: import("@prisma/client-runtime-utils").Decimal | null;
        costo_compra: import("@prisma/client-runtime-utils").Decimal;
        tipo_traida: string | null;
        costo_traida: import("@prisma/client-runtime-utils").Decimal;
        costo_total: import("@prisma/client-runtime-utils").Decimal;
        fecha_venta: Date;
        costo_perfume: import("@prisma/client-runtime-utils").Decimal | null;
        pago: string | null;
        total_cliente: import("@prisma/client-runtime-utils").Decimal;
        total_recibido: import("@prisma/client-runtime-utils").Decimal | null;
        recibido_en_cuenta: import("@prisma/client-runtime-utils").Decimal | null;
        entregado: boolean;
        envio_ce: string | null;
        id_orden_detalle: number | null;
    })[]>;
    findOne(id: number): Promise<{
        ordenDetalle: ({
            orden: {
                id: number;
                id_usuario: number;
                fecha: Date;
                total: import("@prisma/client-runtime-utils").Decimal;
                costo_envio: import("@prisma/client-runtime-utils").Decimal | null;
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
                id_gift_card: number | null;
            };
        } & {
            id: number;
            id_orden: number;
            cantidad: number;
            id_presentacion: number | null;
            id_decant: number | null;
            tipo_decant: string | null;
            precio_unitario: import("@prisma/client-runtime-utils").Decimal;
        }) | null;
    } & {
        perfume: string;
        id: number;
        tipo: string | null;
        genero: string | null;
        costo: import("@prisma/client-runtime-utils").Decimal | null;
        total: import("@prisma/client-runtime-utils").Decimal | null;
        costo_compra: import("@prisma/client-runtime-utils").Decimal;
        tipo_traida: string | null;
        costo_traida: import("@prisma/client-runtime-utils").Decimal;
        costo_total: import("@prisma/client-runtime-utils").Decimal;
        fecha_venta: Date;
        costo_perfume: import("@prisma/client-runtime-utils").Decimal | null;
        pago: string | null;
        total_cliente: import("@prisma/client-runtime-utils").Decimal;
        total_recibido: import("@prisma/client-runtime-utils").Decimal | null;
        recibido_en_cuenta: import("@prisma/client-runtime-utils").Decimal | null;
        entregado: boolean;
        envio_ce: string | null;
        id_orden_detalle: number | null;
    }>;
    update(id: number, dto: UpdateSaleDto): Promise<{
        perfume: string;
        id: number;
        tipo: string | null;
        genero: string | null;
        costo: import("@prisma/client-runtime-utils").Decimal | null;
        total: import("@prisma/client-runtime-utils").Decimal | null;
        costo_compra: import("@prisma/client-runtime-utils").Decimal;
        tipo_traida: string | null;
        costo_traida: import("@prisma/client-runtime-utils").Decimal;
        costo_total: import("@prisma/client-runtime-utils").Decimal;
        fecha_venta: Date;
        costo_perfume: import("@prisma/client-runtime-utils").Decimal | null;
        pago: string | null;
        total_cliente: import("@prisma/client-runtime-utils").Decimal;
        total_recibido: import("@prisma/client-runtime-utils").Decimal | null;
        recibido_en_cuenta: import("@prisma/client-runtime-utils").Decimal | null;
        entregado: boolean;
        envio_ce: string | null;
        id_orden_detalle: number | null;
    }>;
    findAllDecants(): Promise<({
        ordenDetalle: ({
            orden: {
                usuario: {
                    nombre: string;
                    correo: string;
                    apellido: string;
                    telefono: string | null;
                };
            } & {
                id: number;
                id_usuario: number;
                fecha: Date;
                total: import("@prisma/client-runtime-utils").Decimal;
                costo_envio: import("@prisma/client-runtime-utils").Decimal | null;
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
                id_gift_card: number | null;
            };
        } & {
            id: number;
            id_orden: number;
            cantidad: number;
            id_presentacion: number | null;
            id_decant: number | null;
            tipo_decant: string | null;
            precio_unitario: import("@prisma/client-runtime-utils").Decimal;
        }) | null;
    } & {
        perfume: string;
        id: number;
        tipo: string | null;
        genero: string | null;
        total: import("@prisma/client-runtime-utils").Decimal | null;
        ml_origen: number | null;
        costo_original: import("@prisma/client-runtime-utils").Decimal | null;
        precio_original: import("@prisma/client-runtime-utils").Decimal | null;
        costo_5ml: import("@prisma/client-runtime-utils").Decimal | null;
        precio_5ml: import("@prisma/client-runtime-utils").Decimal | null;
        costo_10ml: import("@prisma/client-runtime-utils").Decimal | null;
        precio_10ml: import("@prisma/client-runtime-utils").Decimal | null;
        fecha_venta: Date;
        pago: string | null;
        total_cliente: import("@prisma/client-runtime-utils").Decimal;
        total_recibido: import("@prisma/client-runtime-utils").Decimal | null;
        recibido_en_cuenta: import("@prisma/client-runtime-utils").Decimal | null;
        entregado: boolean;
        envio_ce: string | null;
        id_orden_detalle: number | null;
        tamano_vendido: string | null;
    })[]>;
    findOneDecant(id: number): Promise<{
        ordenDetalle: ({
            orden: {
                id: number;
                id_usuario: number;
                fecha: Date;
                total: import("@prisma/client-runtime-utils").Decimal;
                costo_envio: import("@prisma/client-runtime-utils").Decimal | null;
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
                id_gift_card: number | null;
            };
        } & {
            id: number;
            id_orden: number;
            cantidad: number;
            id_presentacion: number | null;
            id_decant: number | null;
            tipo_decant: string | null;
            precio_unitario: import("@prisma/client-runtime-utils").Decimal;
        }) | null;
    } & {
        perfume: string;
        id: number;
        tipo: string | null;
        genero: string | null;
        total: import("@prisma/client-runtime-utils").Decimal | null;
        ml_origen: number | null;
        costo_original: import("@prisma/client-runtime-utils").Decimal | null;
        precio_original: import("@prisma/client-runtime-utils").Decimal | null;
        costo_5ml: import("@prisma/client-runtime-utils").Decimal | null;
        precio_5ml: import("@prisma/client-runtime-utils").Decimal | null;
        costo_10ml: import("@prisma/client-runtime-utils").Decimal | null;
        precio_10ml: import("@prisma/client-runtime-utils").Decimal | null;
        fecha_venta: Date;
        pago: string | null;
        total_cliente: import("@prisma/client-runtime-utils").Decimal;
        total_recibido: import("@prisma/client-runtime-utils").Decimal | null;
        recibido_en_cuenta: import("@prisma/client-runtime-utils").Decimal | null;
        entregado: boolean;
        envio_ce: string | null;
        id_orden_detalle: number | null;
        tamano_vendido: string | null;
    }>;
    updateDecant(id: number, dto: UpdateSaleDto): Promise<{
        perfume: string;
        id: number;
        tipo: string | null;
        genero: string | null;
        total: import("@prisma/client-runtime-utils").Decimal | null;
        ml_origen: number | null;
        costo_original: import("@prisma/client-runtime-utils").Decimal | null;
        precio_original: import("@prisma/client-runtime-utils").Decimal | null;
        costo_5ml: import("@prisma/client-runtime-utils").Decimal | null;
        precio_5ml: import("@prisma/client-runtime-utils").Decimal | null;
        costo_10ml: import("@prisma/client-runtime-utils").Decimal | null;
        precio_10ml: import("@prisma/client-runtime-utils").Decimal | null;
        fecha_venta: Date;
        pago: string | null;
        total_cliente: import("@prisma/client-runtime-utils").Decimal;
        total_recibido: import("@prisma/client-runtime-utils").Decimal | null;
        recibido_en_cuenta: import("@prisma/client-runtime-utils").Decimal | null;
        entregado: boolean;
        envio_ce: string | null;
        id_orden_detalle: number | null;
        tamano_vendido: string | null;
    }>;
    getVendidosReport(): Promise<{
        id: string;
        fecha_ingreso: Date | null;
        fecha_venta: Date;
        tipo: string | null;
        genero: string | null;
        perfume: string;
        tamano_presentacion: string;
        costo_compra: number;
        costo_traida: number;
        tipo_traida: string | null;
        costo_total: number;
        total_cliente: number;
    }[]>;
}
