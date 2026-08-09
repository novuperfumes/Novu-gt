"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const client_1 = require("@prisma/client");
const adapter_mariadb_1 = require("@prisma/adapter-mariadb");
const bcrypt = __importStar(require("bcrypt"));
const adapter = new adapter_mariadb_1.PrismaMariaDb(process.env.DATABASE_URL || '');
const prisma = new client_1.PrismaClient({ adapter });
async function main() {
    console.log('Generating extra fake data...');
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash('password123', salt);
    const u1 = await prisma.usuario.create({
        data: { correo: 'maria@test.com', contrasenia: password, nombre: 'Maria', apellido: 'Gomez', telefono: '11112222', genero: 'femenino' }
    });
    const u2 = await prisma.usuario.create({
        data: { correo: 'carlos@test.com', contrasenia: password, nombre: 'Carlos', apellido: 'Ruiz', telefono: '33334444', genero: 'masculino', sellos: 5 }
    });
    await prisma.direccion.createMany({
        data: [
            { id_usuario: u1.id, direccion: 'Calle 123', departamento: 'Guatemala', municipio: 'Mixco', referencias: 'Casa verde' },
            { id_usuario: u2.id, direccion: 'Avenida 456', departamento: 'Sacatepequez', municipio: 'Antigua', codigo_postal: '03001' }
        ]
    });
    await prisma.giftCard.create({
        data: { id_usuario: u1.id, codigo: 'GIFT-MARIA-100', monto: 100.00, activa: true, es_bienvenida: false }
    });
    await prisma.mensajeContacto.createMany({
        data: [
            { nombre: 'Ana', correo: 'ana@ejemplo.com', asunto: 'Duda sobre envío', mensaje: 'Quería saber si hacen envíos a Petén' },
            { nombre: 'Luis', correo: 'luis@ejemplo.com', asunto: 'Perfume dañado', mensaje: 'Mi perfume llegó roto, necesito ayuda' }
        ]
    });
    const promo = await prisma.codigoPromocion.create({
        data: { codigo: 'VERANO2026', tipo_descuento: 'porcentaje', descuento: 20, fecha_inicio: new Date(), fecha_fin: new Date(new Date().setMonth(new Date().getMonth() + 1)) }
    });
    await prisma.ordenWhatsApp.create({
        data: { nombre_cliente: 'Pedro', telefono: '55555555', direccion: 'Zona 1', total: 500.00, carrito_json: '{"items": [{"id": 1, "qty": 1}]}', estado: 'PENDIENTE' }
    });
    const perfumes = await prisma.perfume.findMany({ take: 3 });
    if (perfumes.length > 0) {
        await prisma.favorito.createMany({
            data: [
                { id_usuario: u1.id, id_perfume: perfumes[0].id },
                { id_usuario: u2.id, id_perfume: perfumes[0].id },
            ]
        });
        for (const p of perfumes) {
            const existing = await prisma.reseniaPerfume.findUnique({ where: { id_usuario_id_perfume: { id_usuario: u1.id, id_perfume: p.id } } });
            if (!existing) {
                await prisma.reseniaPerfume.create({
                    data: { id_usuario: u1.id, id_perfume: p.id, calificacion: 4, comentario: 'Huele muy bien!', compra_label: 'Decant 10ml' }
                });
            }
        }
    }
    const pres = await prisma.presentacionPerfume.findFirst();
    if (pres) {
        const carrito = await prisma.carritoMaestro.create({
            data: { id_usuario: u2.id }
        });
        await prisma.carritoDetalle.create({
            data: { id_carrito_maestro: carrito.id, id_presentacion: pres.id, cantidad: 2 }
        });
    }
    console.log('Fake data injected successfully.');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=fake-data.js.map