"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const client_1 = require("@prisma/client");
const adapter_mariadb_1 = require("@prisma/adapter-mariadb");
const adapter = new adapter_mariadb_1.PrismaMariaDb(process.env.DATABASE_URL || '');
const prisma = new client_1.PrismaClient({ adapter });
async function main() {
    console.log('Inyectando más perfumes...');
    const imgPerfume1 = 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=800&auto=format&fit=crop';
    const imgPerfume2 = 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=800&auto=format&fit=crop';
    const imgPerfume3 = 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=800&auto=format&fit=crop';
    const imgPerfume4 = 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?q=80&w=800&auto=format&fit=crop';
    const imgPerfume5 = 'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?q=80&w=800&auto=format&fit=crop';
    const nuevosPerfumes = [
        {
            nombre: '9pm',
            descripcion: 'Fragancia dulce, afrutada y especiada, ideal para la noche. Excelente alternativa a Ultra Male.',
            categoria: 'árabe', tipo: 'Eau de Parfum', genero: 'masculino',
            imagen: imgPerfume2, galeria: [imgPerfume4], marca: 'Afnan', activo: true,
            presentaciones: { create: [
                    { tamanio: '100 ml', precio: 350.00, stock: 40, costo: 150.00 }
                ] },
            decant: { create: { ml_origen: 100, costo_original: 150, precio_original: 350, costo_5ml: 15, precio_5ml: 40, stock_5ml: 20, costo_10ml: 30, precio_10ml: 70, stock_10ml: 15 } }
        },
        {
            nombre: 'Hawas for Him',
            descripcion: 'Fresco, acuático y afrutado con ciruela y canela. Bestia en duración.',
            categoria: 'árabe', tipo: 'Eau de Parfum', genero: 'masculino',
            imagen: imgPerfume3, galeria: [imgPerfume1], marca: 'Rasasi', activo: true,
            presentaciones: { create: [
                    { tamanio: '100 ml', precio: 550.00, stock: 25, costo: 250.00 }
                ] },
            decant: { create: { ml_origen: 100, costo_original: 250, precio_original: 550, costo_5ml: 25, precio_5ml: 65, stock_5ml: 15, costo_10ml: 45, precio_10ml: 115, stock_10ml: 10 } }
        },
        {
            nombre: 'Supremacy Not Only Intense',
            descripcion: 'Ahumado, afrutado y oscuro con musgo de roble y grosellas negras.',
            categoria: 'árabe', tipo: 'Extrait de Parfum', genero: 'masculino',
            imagen: imgPerfume4, galeria: [imgPerfume5], marca: 'Afnan', activo: true,
            presentaciones: { create: [
                    { tamanio: '100 ml', precio: 620.00, stock: 15, costo: 320.00 },
                    { tamanio: '150 ml', precio: 850.00, stock: 5, costo: 450.00 }
                ] },
            decant: { create: { ml_origen: 100, costo_original: 320, precio_original: 620, costo_5ml: 32, precio_5ml: 75, stock_5ml: 10, costo_10ml: 60, precio_10ml: 130, stock_10ml: 10 } }
        },
        {
            nombre: 'Acqua di Giò Profumo',
            descripcion: 'Clásico marino combinado con incienso profundo y pachulí.',
            categoria: 'diseñador', tipo: 'Parfum', genero: 'masculino',
            imagen: imgPerfume1, galeria: [imgPerfume2], marca: 'Giorgio Armani', activo: true,
            presentaciones: { create: [
                    { tamanio: '75 ml', precio: 1100.00, stock: 12, costo: 650.00 },
                    { tamanio: '125 ml', precio: 1450.00, stock: 8, costo: 850.00 },
                    { tamanio: '180 ml', precio: 1800.00, stock: 3, costo: 1100.00 }
                ] },
            decant: { create: { ml_origen: 125, costo_original: 850, precio_original: 1450, costo_5ml: 60, precio_5ml: 110, stock_5ml: 10, costo_10ml: 110, precio_10ml: 200, stock_10ml: 10 } }
        },
        {
            nombre: '1 Million Elixir',
            descripcion: 'Dulzura amaderada e intensa con vainilla, rosa de Damasco y osmanto.',
            categoria: 'diseñador', tipo: 'Parfum Intense', genero: 'masculino',
            imagen: imgPerfume5, galeria: [imgPerfume3], marca: 'Paco Rabanne', activo: true,
            presentaciones: { create: [
                    { tamanio: '50 ml', precio: 750.00, stock: 10, costo: 400.00 },
                    { tamanio: '100 ml', precio: 1050.00, stock: 20, costo: 550.00 },
                    { tamanio: '200 ml', precio: 1550.00, stock: 6, costo: 850.00 }
                ] },
            decant: { create: { ml_origen: 100, costo_original: 550, precio_original: 1050, costo_5ml: 45, precio_5ml: 90, stock_5ml: 12, costo_10ml: 80, precio_10ml: 160, stock_10ml: 12 } }
        },
        {
            nombre: 'Y Eau de Parfum',
            descripcion: 'Versatilidad total. Manzana fresca, salvia, jengibre y maderas oscuras.',
            categoria: 'diseñador', tipo: 'Eau de Parfum', genero: 'masculino',
            imagen: imgPerfume4, galeria: [imgPerfume1], marca: 'Yves Saint Laurent', activo: true,
            presentaciones: { create: [
                    { tamanio: '60 ml', precio: 890.00, stock: 15, costo: 500.00 },
                    { tamanio: '100 ml', precio: 1250.00, stock: 25, costo: 700.00 }
                ] },
            decant: { create: { ml_origen: 100, costo_original: 700, precio_original: 1250, costo_5ml: 55, precio_5ml: 115, stock_5ml: 8, costo_10ml: 100, precio_10ml: 210, stock_10ml: 8 } }
        },
        {
            nombre: 'Eros',
            descripcion: 'Menta vibrante, manzana verde y haba tonka juguetona. Un rey de la fiesta.',
            categoria: 'diseñador', tipo: 'Eau de Toilette', genero: 'masculino',
            imagen: imgPerfume2, galeria: [], marca: 'Versace', activo: true,
            presentaciones: { create: [
                    { tamanio: '100 ml', precio: 800.00, stock: 30, costo: 400.00 },
                    { tamanio: '200 ml', precio: 1150.00, stock: 10, costo: 650.00 }
                ] },
            decant: { create: { ml_origen: 100, costo_original: 400, precio_original: 800, costo_5ml: 35, precio_5ml: 75, stock_5ml: 15, costo_10ml: 60, precio_10ml: 135, stock_10ml: 15 } }
        },
        {
            nombre: 'Le Male Le Parfum',
            descripcion: 'Cardamomo, lavanda y vainilla en un perfil elegante de capitán.',
            categoria: 'diseñador', tipo: 'Eau de Parfum', genero: 'masculino',
            imagen: imgPerfume3, galeria: [imgPerfume5], marca: 'Jean Paul Gaultier', activo: true,
            presentaciones: { create: [
                    { tamanio: '75 ml', precio: 820.00, stock: 10, costo: 450.00 },
                    { tamanio: '125 ml', precio: 1150.00, stock: 20, costo: 650.00 },
                    { tamanio: '200 ml', precio: 1450.00, stock: 5, costo: 850.00 }
                ] },
            decant: { create: { ml_origen: 125, costo_original: 650, precio_original: 1150, costo_5ml: 45, precio_5ml: 95, stock_5ml: 12, costo_10ml: 85, precio_10ml: 170, stock_10ml: 12 } }
        },
        {
            nombre: 'Oud Wood',
            descripcion: 'Maderas raras, palo de rosa, cardamomo y un toque ahumado de oud.',
            categoria: 'nicho', tipo: 'Eau de Parfum', genero: 'unisex',
            imagen: imgPerfume5, galeria: [imgPerfume2], marca: 'Tom Ford', activo: true,
            presentaciones: { create: [
                    { tamanio: '50 ml', precio: 2200.00, stock: 5, costo: 1400.00 },
                    { tamanio: '100 ml', precio: 3300.00, stock: 3, costo: 2100.00 }
                ] },
            decant: { create: { ml_origen: 100, costo_original: 2100, precio_original: 3300, costo_5ml: 150, precio_5ml: 280, stock_5ml: 5, costo_10ml: 280, precio_10ml: 520, stock_10ml: 5 } }
        },
        {
            nombre: 'Cedrat Boise',
            descripcion: 'Frutal cítrico vibrante con madera de cedro, cuero y vainilla jugosa.',
            categoria: 'nicho', tipo: 'Eau de Parfum', genero: 'masculino',
            imagen: imgPerfume1, galeria: [], marca: 'Mancera', activo: true,
            presentaciones: { create: [
                    { tamanio: '120 ml', precio: 1450.00, stock: 18, costo: 850.00 }
                ] },
            decant: { create: { ml_origen: 120, costo_original: 850, precio_original: 1450, costo_5ml: 65, precio_5ml: 125, stock_5ml: 15, costo_10ml: 115, precio_10ml: 225, stock_10ml: 15 } }
        },
        {
            nombre: 'Naxos',
            descripcion: 'Miel brillante, tabaco fino, lavanda y cítricos sicilianos. Rico y opulento.',
            categoria: 'nicho', tipo: 'Eau de Parfum', genero: 'unisex',
            imagen: imgPerfume3, galeria: [imgPerfume4], marca: 'Xerjoff', activo: true,
            presentaciones: { create: [
                    { tamanio: '100 ml', precio: 2400.00, stock: 8, costo: 1500.00 }
                ] },
            decant: { create: { ml_origen: 100, costo_original: 1500, precio_original: 2400, costo_5ml: 110, precio_5ml: 220, stock_5ml: 8, costo_10ml: 200, precio_10ml: 390, stock_10ml: 8 } }
        },
        {
            nombre: 'Green Irish Tweed',
            descripcion: 'Paseo matutino por el campo. Hierba luisa, hojas de violeta, ámbar gris y sándalo.',
            categoria: 'nicho', tipo: 'Eau de Parfum', genero: 'masculino',
            imagen: imgPerfume2, galeria: [imgPerfume1], marca: 'Creed', activo: true,
            presentaciones: { create: [
                    { tamanio: '100 ml', precio: 2800.00, stock: 5, costo: 1750.00 }
                ] },
            decant: { create: { ml_origen: 100, costo_original: 1750, precio_original: 2800, costo_5ml: 130, precio_5ml: 250, stock_5ml: 6, costo_10ml: 230, precio_10ml: 450, stock_10ml: 6 } }
        },
        {
            nombre: 'La Vie Est Belle',
            descripcion: 'Iris pálido, pachulí vibrante y vainilla adictiva.',
            categoria: 'diseñador', tipo: 'Eau de Parfum', genero: 'femenino',
            imagen: imgPerfume4, galeria: [], marca: 'Lancôme', activo: true,
            presentaciones: { create: [
                    { tamanio: '50 ml', precio: 950.00, stock: 15, costo: 550.00 },
                    { tamanio: '100 ml', precio: 1350.00, stock: 25, costo: 750.00 }
                ] },
            decant: { create: { ml_origen: 100, costo_original: 750, precio_original: 1350, costo_5ml: 55, precio_5ml: 110, stock_5ml: 10, costo_10ml: 95, precio_10ml: 195, stock_10ml: 10 } }
        },
        {
            nombre: 'Good Girl',
            descripcion: 'Almendras, café, jazmín sambac y haba tonka en su icónico frasco.',
            categoria: 'diseñador', tipo: 'Eau de Parfum', genero: 'femenino',
            imagen: imgPerfume5, galeria: [imgPerfume2], marca: 'Carolina Herrera', activo: true,
            presentaciones: { create: [
                    { tamanio: '50 ml', precio: 1050.00, stock: 12, costo: 600.00 },
                    { tamanio: '80 ml', precio: 1400.00, stock: 18, costo: 800.00 }
                ] },
            decant: { create: { ml_origen: 80, costo_original: 800, precio_original: 1400, costo_5ml: 75, precio_5ml: 140, stock_5ml: 8, costo_10ml: 130, precio_10ml: 260, stock_10ml: 8 } }
        }
    ];
    for (const perf of nuevosPerfumes) {
        await prisma.perfume.create({ data: perf });
    }
    console.log('Se agregaron ' + nuevosPerfumes.length + ' perfumes adicionales con éxito.');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=more-perfumes.js.map