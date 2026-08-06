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
const adapter = new adapter_mariadb_1.PrismaMariaDb(process.env.DATABASE_URL || 'mysql://root:secret_password@localhost:3306/novu_db');
const prisma = new client_1.PrismaClient({ adapter });
async function main() {
    await prisma.reseniaPerfume.deleteMany();
    await prisma.favorito.deleteMany();
    await prisma.ordenDetalle.deleteMany();
    await prisma.ordenCompra.deleteMany();
    await prisma.carritoDetalle.deleteMany();
    await prisma.carritoMaestro.deleteMany();
    await prisma.decant.deleteMany();
    await prisma.presentacionPerfume.deleteMany();
    await prisma.perfume.deleteMany();
    await prisma.sucursal.deleteMany();
    await prisma.usuario.deleteMany();
    await prisma.campaniaDescuento.deleteMany();
    const salt = await bcrypt.genSalt(10);
    const adminPassword = await bcrypt.hash('admin123', salt);
    const clientePassword = await bcrypt.hash('cliente123', salt);
    const admin = await prisma.usuario.create({
        data: {
            correo: 'admin@novugt.com',
            contrasenia: adminPassword,
            rol: 'ADMIN',
            nombre: 'Admin',
            apellido: 'Novu',
        }
    });
    const cliente = await prisma.usuario.create({
        data: {
            correo: 'cliente@novugt.com',
            contrasenia: clientePassword,
            rol: 'CLIENTE',
            nombre: 'Juan',
            apellido: 'Pérez',
        }
    });
    await prisma.sucursal.createMany({
        data: [
            {
                nombre_sucursal: 'Boutique Cayalá',
                direccion: 'CC Cardales de Cayalá, Local 12',
                departamento: 'Guatemala',
                municipio: 'Guatemala',
                telefono: '2233-4455',
            },
            {
                nombre_sucursal: 'Boutique Zona 10',
                direccion: 'Avenida Las Américas 15-00, Local 42',
                departamento: 'Guatemala',
                municipio: 'Guatemala',
                telefono: '2233-4456',
            },
        ],
    });
    const imgPerfume1 = 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=800&auto=format&fit=crop';
    const imgPerfume2 = 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=800&auto=format&fit=crop';
    const imgPerfume3 = 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=800&auto=format&fit=crop';
    const imgPerfume4 = 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?q=80&w=800&auto=format&fit=crop';
    const imgPerfume5 = 'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?q=80&w=800&auto=format&fit=crop';
    const p1 = await prisma.perfume.create({
        data: {
            nombre: 'Yara Pink Edition',
            descripcion: 'Perfume árabe dulce y cremoso con notas de heliotropo, orquídea, mandarina y vainilla gourmand.',
            categoria: 'árabe',
            tipo: 'Eau de Parfum',
            genero: 'femenino',
            imagen: imgPerfume1,
            galeria: [imgPerfume2, imgPerfume3],
            marca: 'Lattafa',
            activo: true,
            presentaciones: {
                create: [
                    { tamanio: '100 ml', precio: 299.00, stock: 45, costo: 150.00 },
                    { tamanio: '50 ml', precio: 179.00, stock: 30, costo: 90.00 },
                ],
            },
            decant: {
                create: {
                    ml_origen: 100,
                    costo_original: 150,
                    precio_original: 299,
                    costo_5ml: 15,
                    precio_5ml: 35,
                    stock_5ml: 20,
                    costo_10ml: 25,
                    precio_10ml: 65,
                    stock_10ml: 20,
                }
            }
        },
    });
    const p2 = await prisma.perfume.create({
        data: {
            nombre: 'Khamrah Qahwa',
            descripcion: 'Fragancia cálida especiada con notas de café, canela, nuez moscada, praliné y haba tonka.',
            categoria: 'árabe',
            tipo: 'Eau de Parfum',
            genero: 'unisex',
            imagen: imgPerfume2,
            galeria: [imgPerfume1],
            marca: 'Lattafa',
            activo: true,
            presentaciones: {
                create: [
                    { tamanio: '100 ml', precio: 349.00, stock: 50, costo: 180.00 },
                ],
            },
            decant: {
                create: {
                    ml_origen: 100,
                    costo_original: 180,
                    precio_original: 349,
                    costo_5ml: 18,
                    precio_5ml: 45,
                    stock_5ml: 15,
                    costo_10ml: 30,
                    precio_10ml: 80,
                    stock_10ml: 15,
                }
            }
        },
    });
    const p3 = await prisma.perfume.create({
        data: {
            nombre: 'Club de Nuit Intense Man',
            descripcion: 'Aroma amaderado especiado con notas altas de limón, piña, bergamota y abedul.',
            categoria: 'árabe',
            tipo: 'Eau de Parfum',
            genero: 'masculino',
            imagen: imgPerfume3,
            marca: 'Armaf',
            activo: true,
            presentaciones: {
                create: [
                    { tamanio: '105 ml', precio: 329.00, stock: 60, costo: 160.00 },
                    { tamanio: '200 ml', precio: 499.00, stock: 25, costo: 250.00 },
                ],
            },
        },
    });
    const p4 = await prisma.perfume.create({
        data: {
            nombre: 'Bleu de Chanel',
            descripcion: 'Aroma amaderado aromático para hombres que desafían las convenciones.',
            categoria: 'diseñador',
            tipo: 'Parfum',
            genero: 'masculino',
            imagen: imgPerfume4,
            galeria: [imgPerfume5],
            marca: 'Chanel',
            activo: true,
            presentaciones: {
                create: [
                    { tamanio: '100 ml', precio: 1250.00, stock: 20, costo: 800.00 },
                    { tamanio: '50 ml', precio: 850.00, stock: 15, costo: 500.00 },
                ],
            },
            decant: {
                create: {
                    ml_origen: 100,
                    costo_original: 800,
                    precio_original: 1250,
                    costo_5ml: 60,
                    precio_5ml: 120,
                    stock_5ml: 10,
                    costo_10ml: 100,
                    precio_10ml: 210,
                    stock_10ml: 10,
                }
            }
        },
    });
    const p5 = await prisma.perfume.create({
        data: {
            nombre: 'Sauvage Elixir',
            descripcion: 'Una fragancia concentrada impregnada de la frescura emblemática de Sauvage con un corazón de especias.',
            categoria: 'diseñador',
            tipo: 'Elixir',
            genero: 'masculino',
            imagen: imgPerfume5,
            marca: 'Dior',
            activo: true,
            presentaciones: {
                create: [
                    { tamanio: '60 ml', precio: 1450.00, stock: 18, costo: 950.00 },
                    { tamanio: '100 ml', precio: 1890.00, stock: 12, costo: 1200.00 },
                ],
            },
        },
    });
    const p6 = await prisma.perfume.create({
        data: {
            nombre: 'Black Opium',
            descripcion: 'Sedductora fragancia con notas intensas de café negro, flor de azahar y vainilla sensual.',
            categoria: 'diseñador',
            tipo: 'Eau de Parfum',
            genero: 'femenino',
            imagen: imgPerfume1,
            marca: 'Yves Saint Laurent',
            activo: true,
            presentaciones: {
                create: [
                    { tamanio: '90 ml', precio: 1150.00, stock: 22, costo: 700.00 },
                ],
            },
        },
    });
    const p7 = await prisma.perfume.create({
        data: {
            nombre: 'Baccarat Rouge 540',
            descripcion: 'Obra maestra ambarina floral con azafrán, jazmín, ámbar gris y cedro recién cortado.',
            categoria: 'nicho',
            tipo: 'Extrait de Parfum',
            genero: 'unisex',
            imagen: imgPerfume2,
            galeria: [imgPerfume3, imgPerfume4],
            marca: 'Maison Francis Kurkdjian',
            activo: true,
            presentaciones: {
                create: [
                    { tamanio: '70 ml', precio: 3250.00, stock: 8, costo: 2100.00 },
                ],
            },
            decant: {
                create: {
                    ml_origen: 70,
                    costo_original: 2100,
                    precio_original: 3250,
                    costo_5ml: 180,
                    precio_5ml: 320,
                    stock_5ml: 8,
                    costo_10ml: 320,
                    precio_10ml: 580,
                    stock_10ml: 8,
                }
            }
        },
    });
    const p8 = await prisma.perfume.create({
        data: {
            nombre: 'Aventus',
            descripcion: 'Iconica fragancia nicho inspirada en la vida dramática de un emperador histórico.',
            categoria: 'nicho',
            tipo: 'Eau de Parfum',
            genero: 'masculino',
            imagen: imgPerfume3,
            marca: 'Creed',
            activo: true,
            presentaciones: {
                create: [
                    { tamanio: '100 ml', precio: 2950.00, stock: 10, costo: 1800.00 },
                ],
            },
        },
    });
    const p9 = await prisma.perfume.create({
        data: {
            nombre: 'Layton',
            descripcion: 'Elegante y seductor aroma oriental floral con bergamota, lavanda, manzana y vainilla.',
            categoria: 'nicho',
            tipo: 'Eau de Parfum',
            genero: 'unisex',
            imagen: imgPerfume4,
            marca: 'Parfums de Marly',
            activo: true,
            presentaciones: {
                create: [
                    { tamanio: '125 ml', precio: 2450.00, stock: 12, costo: 1500.00 },
                ],
            },
        },
    });
    await prisma.campaniaDescuento.create({
        data: {
            nombre: 'Oferta Especial de Apertura',
            activa: true,
            tipo: 'GLOBAL',
            descuento: 15,
            imagen: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=1200&auto=format&fit=crop',
        }
    });
    const pres1 = await prisma.presentacionPerfume.findFirst({ where: { id_perfume: p1.id } });
    if (pres1) {
        const orden = await prisma.ordenCompra.create({
            data: {
                id_usuario: cliente.id,
                total: 299.00,
                estado: 'CONFIRMADO',
                metodo_de_pago: 'efectivo',
                tipo_entrega: 'domicilio',
                nombre_recibe: 'Juan Pérez',
                telefono_contacto: '5544-3322',
                direccion_entrega: 'Zone 10, Ciudad de Guatemala',
                departamento_entrega: 'Guatemala',
                municipio_entrega: 'Guatemala',
                detalles: {
                    create: [
                        {
                            id_presentacion: pres1.id,
                            cantidad: 1,
                            precio_unitario: 299.00
                        }
                    ]
                }
            }
        });
        await prisma.reseniaPerfume.create({
            data: {
                id_usuario: cliente.id,
                id_perfume: p1.id,
                calificacion: 5,
                comentario: '¡Excelente perfume! La fijación dura todo el día y el aroma es exquisito. Llegó muy rápido.',
                compra_label: 'Botella 100 ml'
            }
        });
    }
    console.log('✅ Base de datos poblada exitosamente con productos de todas las categorías.');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map