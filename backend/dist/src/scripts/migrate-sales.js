"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('Iniciando migración de ventas pasadas...');
    const detalles = await prisma.ordenDetalle.findMany({
        include: {
            orden: true,
            registroVentaAdmin: true,
            registroVentaDecantAdmin: true,
            presentacion: {
                include: {
                    perfume: true,
                    ingresos: {
                        orderBy: { fecha_ingreso: 'desc' },
                        take: 1
                    }
                }
            },
            decant: {
                include: {
                    perfume: true
                }
            }
        }
    });
    console.log(`Se encontraron ${detalles.length} items vendidos en el historial.`);
    let creados = 0;
    for (const item of detalles) {
        if (item.registroVentaAdmin || item.registroVentaDecantAdmin) {
            continue;
        }
        for (let i = 0; i < item.cantidad; i++) {
            if (item.id_presentacion && item.presentacion) {
                let costoCompra = 0;
                let costoTraida = 0;
                let tipoTraida = 'N/A';
                let costoTotal = 0;
                if (item.presentacion.ingresos && item.presentacion.ingresos.length > 0) {
                    const ingreso = item.presentacion.ingresos[0];
                    costoCompra = Number(ingreso.costo_compra);
                    costoTraida = Number(ingreso.costo_traida);
                    tipoTraida = ingreso.tipo_traida || 'N/A';
                    costoTotal = Number(ingreso.costo_total);
                }
                await prisma.registroVentaAdmin.create({
                    data: {
                        id_orden_detalle: i === 0 ? item.id : null,
                        perfume: item.presentacion.perfume?.nombre || 'Desconocido',
                        tipo: item.presentacion.perfume?.tipo || '',
                        genero: item.presentacion.perfume?.genero || '',
                        costo_compra: costoCompra,
                        costo_traida: costoTraida,
                        tipo_traida: tipoTraida,
                        costo_total: costoTotal,
                        total_cliente: Number(item.precio_unitario),
                        pago: item.orden.metodo_de_pago,
                        entregado: true,
                        fecha_venta: item.orden.fecha
                    }
                });
                creados++;
            }
            else if (item.id_decant && item.decant) {
                const is5ml = item.tipo_decant?.toLowerCase().trim() === '5 ml' || item.tipo_decant?.toLowerCase().trim() === '5ml';
                await prisma.registroVentaDecantAdmin.create({
                    data: {
                        id_orden_detalle: i === 0 ? item.id : null,
                        perfume: item.decant.perfume?.nombre || 'Decant',
                        tipo: item.decant.perfume?.tipo || '',
                        genero: item.decant.perfume?.genero || '',
                        ml_origen: item.decant.ml_origen,
                        costo_original: Number(item.decant.costo_original || 0),
                        costo_5ml: Number(item.decant.costo_5ml || 0),
                        costo_10ml: Number(item.decant.costo_10ml || 0),
                        precio_original: Number(item.decant.precio_original || 0),
                        precio_5ml: Number(item.decant.precio_5ml || 0),
                        precio_10ml: Number(item.decant.precio_10ml || 0),
                        tamano_vendido: is5ml ? '5 ml' : '10 ml',
                        total_cliente: Number(item.precio_unitario),
                        pago: item.orden.metodo_de_pago,
                        entregado: true,
                        fecha_venta: item.orden.fecha
                    }
                });
                creados++;
            }
        }
    }
    console.log(`Migración completada. Se crearon ${creados} nuevos registros contables a partir de las órdenes pasadas.`);
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=migrate-sales.js.map