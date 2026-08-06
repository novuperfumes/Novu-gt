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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const client_1 = require("@prisma/client");
const adapter_mariadb_1 = require("@prisma/adapter-mariadb");
const bcrypt = __importStar(require("bcrypt"));
const adapter = new adapter_mariadb_1.PrismaMariaDb(process.env.DATABASE_URL);
const prisma = new client_1.PrismaClient({ adapter });
async function main() {
    console.log('🌱 Iniciando la siembra de datos de prueba (Seed)...');
    const salt = await bcrypt.genSalt(10);
    const adminPassword = await bcrypt.hash('admin123', salt);
    const clientePassword = await bcrypt.hash('cliente123', salt);
    const admin = await prisma.usuario.upsert({
        where: { correo: 'admin@novugt.com' },
        update: {
            telefono: '+502 3313 5816',
            rol: 'ADMIN',
            contrasenia: adminPassword,
        },
        create: {
            correo: 'admin@novugt.com',
            contrasenia: adminPassword,
            nombre: 'Administrador',
            apellido: 'NOVU GT',
            telefono: '+502 3313 5816',
            genero: 'Masculino',
            rol: 'ADMIN',
            sellos: 8,
        },
    });
    console.log('✅ Usuario Admin listo:', admin.correo, '| Pass: admin123 | Tel:', admin.telefono);
    const comprador = await prisma.usuario.upsert({
        where: { correo: 'comprador@novugt.com' },
        update: {
            telefono: '+502 3313 5816',
            contrasenia: clientePassword,
        },
        create: {
            correo: 'comprador@novugt.com',
            contrasenia: clientePassword,
            nombre: 'Carlos',
            apellido: 'García',
            telefono: '+502 3313 5816',
            genero: 'Masculino',
            rol: 'CLIENTE',
            sellos: 4,
        },
    });
    console.log('✅ Usuario Comprador listo:', comprador.correo, '| Pass: cliente123 | Tel:', comprador.telefono);
    const dirExistente = await prisma.direccion.findFirst({
        where: { id_usuario: comprador.id },
    });
    if (!dirExistente) {
        await prisma.direccion.create({
            data: {
                id_usuario: comprador.id,
                direccion: 'Avenida Las Américas 15-20, Zona 13, Edificio Reforma Apt 5B',
                departamento: 'Guatemala',
                municipio: 'Guatemala',
                referencias: 'Frente al monumento, portón negro',
                codigo_postal: '01013',
            },
        });
    }
    await prisma.presentacionPerfume.deleteMany({});
    await prisma.decant.deleteMany({});
    await prisma.perfume.deleteMany({});
    const perfumesData = [
        {
            nombre: 'Khamrah',
            marca: 'Lattafa',
            categoria: 'arabe',
            tipo: 'Árabe',
            genero: 'Unisex',
            descripcion: 'Fragancia gourmet cálida especiada con notas de canela, moscada, praliné, vainilla y haba tonka.',
            imagen: '/imagenes/khamrah.png',
            presentaciones: [
                { tamanio: '30 ml', precio: 190.00, stock: 25 },
                { tamanio: '50 ml', precio: 290.00, stock: 20 },
                { tamanio: '100 ml', precio: 520.00, stock: 15 },
                { tamanio: '200 ml', precio: 890.00, stock: 10 }
            ],
            decant: {
                ml_origen: 100,
                costo_original: 320.00,
                precio_original: 520.00,
                costo_5ml: 25.00,
                precio_5ml: 50.00,
                stock_5ml: 10,
                costo_10ml: 45.00,
                precio_10ml: 90.00,
                stock_10ml: 8,
            }
        },
        {
            nombre: 'Club de Nuit Intense Man',
            marca: 'Armaf',
            categoria: 'arabe',
            tipo: 'Árabe',
            genero: 'Masculino',
            descripcion: 'Icono masculino con apertura cítrica de limón y piña sobre un fondo ahumado de abedul y almizcle.',
            imagen: '/imagenes/clubdenuit.png',
            presentaciones: [
                { tamanio: '50 ml', precio: 260.00, stock: 25 },
                { tamanio: '105 ml', precio: 450.00, stock: 20 },
                { tamanio: '200 ml', precio: 780.00, stock: 12 }
            ],
            decant: {
                ml_origen: 105,
                costo_original: 280.00,
                precio_original: 450.00,
                costo_5ml: 20.00,
                precio_5ml: 45.00,
                stock_5ml: 12,
                costo_10ml: 38.00,
                precio_10ml: 80.00,
                stock_10ml: 10,
            }
        },
        {
            nombre: 'Asad',
            marca: 'Lattafa',
            categoria: 'arabe',
            tipo: 'Árabe',
            genero: 'Masculino',
            descripcion: 'Notas intensas de pimienta negra, piña, tabaco, café, pachulí y ámbar.',
            imagen: '/imagenes/asad.png',
            presentaciones: [
                { tamanio: '50 ml', precio: 220.00, stock: 30 },
                { tamanio: '100 ml', precio: 380.00, stock: 18 }
            ],
            decant: {
                ml_origen: 100,
                costo_original: 230.00,
                precio_original: 380.00,
                costo_5ml: 18.00,
                precio_5ml: 40.00,
                stock_5ml: 15,
                costo_10ml: 32.00,
                precio_10ml: 70.00,
                stock_10ml: 12,
            }
        },
        {
            nombre: 'Yara',
            marca: 'Lattafa',
            categoria: 'arabe',
            tipo: 'Árabe',
            genero: 'Femenino',
            descripcion: 'Divertida y dulce fragancia con acordes orquídea, heliotropo, frutas tropicales y notas atalcadas de vainilla.',
            imagen: '/imagenes/yara.png',
            presentaciones: [
                { tamanio: '30 ml', precio: 150.00, stock: 20 },
                { tamanio: '50 ml', precio: 230.00, stock: 25 },
                { tamanio: '100 ml', precio: 380.00, stock: 14 }
            ],
            decant: {
                ml_origen: 100,
                costo_original: 230.00,
                precio_original: 380.00,
                costo_5ml: 18.00,
                precio_5ml: 40.00,
                stock_5ml: 10,
                costo_10ml: 32.00,
                precio_10ml: 70.00,
                stock_10ml: 10,
            }
        },
        {
            nombre: 'Sauvage EDP',
            marca: 'Dior',
            categoria: 'disenador',
            tipo: 'Diseñador',
            genero: 'Masculino',
            descripcion: 'Fragancia fresca y misteriosa con pimienta de Sichuan, bergamota de Calabria y absoluto de vainilla de Papúa.',
            imagen: '/imagenes/sauvage.jpg',
            presentaciones: [
                { tamanio: '60 ml', precio: 850.00, stock: 15 },
                { tamanio: '100 ml', precio: 1250.00, stock: 12 },
                { tamanio: '200 ml', precio: 1850.00, stock: 8 }
            ],
            decant: {
                ml_origen: 100,
                costo_original: 800.00,
                precio_original: 1250.00,
                costo_5ml: 50.00,
                precio_5ml: 95.00,
                stock_5ml: 10,
                costo_10ml: 90.00,
                precio_10ml: 175.00,
                stock_10ml: 8,
            }
        },
        {
            nombre: 'Bleu de Chanel EDP',
            marca: 'Chanel',
            categoria: 'disenador',
            tipo: 'Diseñador',
            genero: 'Masculino',
            descripcion: 'Aroma aromático leñoso con notas de pomelo, menta, incienso, jengibre y sándalo de Nueva Caledonia.',
            imagen: '/imagenes/bleu.jpg',
            presentaciones: [
                { tamanio: '50 ml', precio: 920.00, stock: 14 },
                { tamanio: '100 ml', precio: 1350.00, stock: 10 },
                { tamanio: '150 ml', precio: 1720.00, stock: 6 }
            ],
            decant: {
                ml_origen: 100,
                costo_original: 880.00,
                precio_original: 1350.00,
                costo_5ml: 55.00,
                precio_5ml: 105.00,
                stock_5ml: 8,
                costo_10ml: 100.00,
                precio_10ml: 195.00,
                stock_10ml: 6,
            }
        },
        {
            nombre: 'Aventus',
            marca: 'Creed',
            categoria: 'nicho',
            tipo: 'Nicho',
            genero: 'Masculino',
            descripcion: 'Obra maestra sensual y audaz que combina grosellas negras, abedul italiano, pachulí y musgo de roble.',
            imagen: '/imagenes/aventus.jpg',
            presentaciones: [
                { tamanio: '50 ml', precio: 1650.00, stock: 8 },
                { tamanio: '100 ml', precio: 2850.00, stock: 5 }
            ],
            decant: {
                ml_origen: 100,
                costo_original: 1900.00,
                precio_original: 2850.00,
                costo_5ml: 115.00,
                precio_5ml: 210.00,
                stock_5ml: 6,
                costo_10ml: 210.00,
                precio_10ml: 390.00,
                stock_10ml: 4,
            }
        },
        {
            nombre: 'Layton',
            marca: 'Parfums de Marly',
            categoria: 'nicho',
            tipo: 'Nicho',
            genero: 'Masculino',
            descripcion: 'Fragancia seductora oriental floral con manzana, lavanda, bergamota, jazmín, violeta y vainilla bourbon.',
            imagen: '/imagenes/layton.jpg',
            presentaciones: [
                { tamanio: '75 ml', precio: 1550.00, stock: 10 },
                { tamanio: '125 ml', precio: 2200.00, stock: 7 }
            ],
            decant: {
                ml_origen: 125,
                costo_original: 1450.00,
                precio_original: 2200.00,
                costo_5ml: 90.00,
                precio_5ml: 175.00,
                stock_5ml: 8,
                costo_10ml: 165.00,
                precio_10ml: 320.00,
                stock_10ml: 5,
            }
        }
    ];
    for (const item of perfumesData) {
        const perfExistente = await prisma.perfume.findFirst({
            where: { nombre: item.nombre },
        });
        if (!perfExistente) {
            const p = await prisma.perfume.create({
                data: {
                    nombre: item.nombre,
                    marca: item.marca,
                    categoria: item.categoria,
                    tipo: item.tipo,
                    genero: item.genero,
                    descripcion: item.descripcion,
                    imagen: item.imagen,
                    activo: true,
                    presentaciones: {
                        create: item.presentaciones,
                    },
                    decant: {
                        create: item.decant,
                    },
                },
            });
            console.log(`🌸 Perfume creado: ${p.nombre} (${p.marca})`);
        }
    }
    const ordenWa1 = await prisma.ordenWhatsApp.findFirst({
        where: { telefono: '+502 3313 5816', estado: 'PENDIENTE' },
    });
    if (!ordenWa1) {
        await prisma.ordenWhatsApp.create({
            data: {
                nombre_cliente: 'Carlos García',
                telefono: '+502 3313 5816',
                direccion: '15 Avenida 12-45, Zona 10, Ciudad de Guatemala',
                nit: '10928374-5',
                total: 1340.00,
                estado: 'PENDIENTE',
                carrito_json: JSON.stringify([
                    { brand: 'Dior', name: 'Sauvage EDP', size: '100 ml', price: 1250.00, quantity: 1 },
                    { brand: 'Lattafa', name: 'Khamrah', size: 'Decant 10 ml', price: 90.00, quantity: 1 }
                ]),
            },
        });
        console.log('📱 Orden WhatsApp PENDIENTE creada para +502 3313 5816');
    }
    const ordenWa2 = await prisma.ordenWhatsApp.findFirst({
        where: { telefono: '+502 3313 5816', estado: 'CONFIRMADA' },
    });
    if (!ordenWa2) {
        await prisma.ordenWhatsApp.create({
            data: {
                nombre_cliente: 'Carlos García',
                telefono: '+502 3313 5816',
                direccion: 'Avenida Las Américas 15-20, Zona 13, Guatemala',
                nit: 'CF',
                total: 450.00,
                estado: 'CONFIRMADA',
                carrito_json: JSON.stringify([
                    { brand: 'Armaf', name: 'Club de Nuit Intense Man', size: '105 ml', price: 450.00, quantity: 1 }
                ]),
            },
        });
        console.log('📱 Orden WhatsApp CONFIRMADA creada para +502 3313 5816');
    }
    await prisma.codigoPromocion.upsert({
        where: { codigo: 'NOVU10' },
        update: {},
        create: {
            codigo: 'NOVU10',
            tipo_descuento: 'porcentaje',
            descuento: 10.00,
            fecha_inicio: new Date(),
            fecha_fin: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
            estado: 'ACTIVO',
        },
    });
    const sucursalCount = await prisma.sucursal.count();
    if (sucursalCount === 0) {
        await prisma.sucursal.create({
            data: {
                nombre_sucursal: 'Novu Boutique Zona 10',
                direccion: 'Plaza Fontabella, Local 102, Zona 10',
                departamento: 'Guatemala',
                municipio: 'Guatemala',
                telefono: '+502 3313 5816',
            },
        });
    }
    const ventasCount = await prisma.registroVentaAdmin.count();
    if (ventasCount === 0) {
        await prisma.registroVentaAdmin.createMany({
            data: [
                {
                    perfume: 'Sauvage EDP',
                    tipo: 'Diseñador',
                    genero: 'Masculino',
                    costo_compra: 800.00,
                    costo_traida: 50.00,
                    costo_total: 850.00,
                    total_cliente: 1250.00,
                    pago: 'Tarjeta de Crédito',
                    entregado: true,
                    total: 1250.00,
                    fecha_venta: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
                },
                {
                    perfume: 'Club de Nuit Intense Man',
                    tipo: 'Árabe',
                    genero: 'Masculino',
                    costo_compra: 280.00,
                    costo_traida: 30.00,
                    costo_total: 310.00,
                    total_cliente: 450.00,
                    pago: 'Transferencia',
                    entregado: true,
                    total: 450.00,
                    fecha_venta: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
                },
                {
                    perfume: 'Khamrah',
                    tipo: 'Árabe',
                    genero: 'Unisex',
                    costo_compra: 320.00,
                    costo_traida: 35.00,
                    costo_total: 355.00,
                    total_cliente: 520.00,
                    pago: 'Efectivo',
                    entregado: true,
                    total: 520.00,
                    fecha_venta: new Date(),
                }
            ]
        });
        console.log('📊 Registros de ventas BI inicializados');
    }
    console.log('\n✨ ¡Siembra de datos (Seed) completada con éxito!');
}
main()
    .catch((e) => {
    console.error('❌ Error ejecutando seed:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed-data.js.map