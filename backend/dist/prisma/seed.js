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
const pg_1 = require("pg");
const adapter_pg_1 = require("@prisma/adapter-pg");
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcrypt"));
const pool = new pg_1.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new adapter_pg_1.PrismaPg(pool);
const prisma = new client_1.PrismaClient({ adapter });
async function main() {
    await prisma.presentacionPerfume.deleteMany();
    await prisma.perfume.deleteMany();
    await prisma.sucursal.deleteMany();
    await prisma.usuario.deleteMany();
    const salt = await bcrypt.genSalt(10);
    const adminPassword = await bcrypt.hash('admin123', salt);
    const clientePassword = await bcrypt.hash('cliente123', salt);
    await prisma.usuario.createMany({
        data: [
            {
                correo: 'admin@novugt.com',
                contrasenia: adminPassword,
                rol: 'ADMIN',
                nombre: 'Admin',
                apellido: 'Novu',
            },
            {
                correo: 'cliente@novugt.com',
                contrasenia: clientePassword,
                rol: 'CLIENTE',
                nombre: 'Juan',
                apellido: 'Pérez',
            }
        ]
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
    await prisma.perfume.create({
        data: {
            nombre: 'Yara (Pink Edition)',
            descripcion: 'Perfume árabe dulce y creoomoso con notas de heliotropo, orquídea, mandarina y vainilla.',
            categoria: 'Árabe',
            imagen: 'imagenes/yara.png',
            marca: 'LATTAFA',
            activo: true,
            presentaciones: {
                create: [
                    { tamanio: '100 ml', precio: 299.00, stock: 150 },
                    { tamanio: '50 ml', precio: 179.00, stock: 80 },
                ],
            },
        },
    });
    await prisma.perfume.create({
        data: {
            nombre: 'Club de Nuit Intense Man',
            descripcion: 'Fragancia cítrica y amaderada masculina muy popular.',
            categoria: 'Diseñador',
            imagen: 'imagenes/clubdenuit.png',
            marca: 'ARMAF',
            activo: true,
            presentaciones: {
                create: [
                    { tamanio: '100 ml', precio: 329.00, stock: 200 },
                ],
            },
        },
    });
    console.log('Semillero (seed) ejecutado con éxito.');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
});
//# sourceMappingURL=seed.js.map