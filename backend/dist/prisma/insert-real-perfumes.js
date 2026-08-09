"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const client_1 = require("@prisma/client");
const adapter_mariadb_1 = require("@prisma/adapter-mariadb");
const adapter = new adapter_mariadb_1.PrismaMariaDb(process.env.DATABASE_URL || '');
const prisma = new client_1.PrismaClient({ adapter });
async function main() {
    console.log('Inyectando los perfumes realistas...');
    const baseUrl = '/images/perfumes/';
    const perfumes = [
        {
            nombre: 'Le Male Le Parfum',
            descripcion: 'Fragancia intensa y elegante, con notas de cardamomo, lavanda y vainilla. Una versión madura y sofisticada del clásico de Jean Paul Gaultier, como un capitán vestido de negro y oro.',
            categoria: 'diseñador', tipo: 'Eau de Parfum', genero: 'masculino',
            imagen: baseUrl + 'le_male_le_parfum_1786210230280.png', galeria: [], marca: 'Jean Paul Gaultier', activo: true,
            presentaciones: { create: [
                    { tamanio: '125 ml', precio: 1150.00, stock: 25, costo: 650.00 },
                    { tamanio: '200 ml', precio: 1450.00, stock: 10, costo: 850.00 }
                ] },
            decant: { create: { ml_origen: 125, costo_original: 650, precio_original: 1150, costo_5ml: 45, precio_5ml: 95, stock_5ml: 12, costo_10ml: 85, precio_10ml: 170, stock_10ml: 12 } }
        },
        {
            nombre: 'Sauvage',
            descripcion: 'El rey indiscutible de los cumplidos. Notas de bergamota de Calabria, pimienta y ambroxan. Un aroma fresco, salvaje y extremadamente versátil para cualquier ocasión.',
            categoria: 'diseñador', tipo: 'Eau de Parfum', genero: 'masculino',
            imagen: baseUrl + 'sauvage_1786210264772.png', galeria: [], marca: 'Dior', activo: true,
            presentaciones: { create: [
                    { tamanio: '100 ml', precio: 1350.00, stock: 40, costo: 750.00 }
                ] },
            decant: { create: { ml_origen: 100, costo_original: 750, precio_original: 1350, costo_5ml: 55, precio_5ml: 110, stock_5ml: 20, costo_10ml: 100, precio_10ml: 195, stock_10ml: 20 } }
        },
        {
            nombre: '1 Million',
            descripcion: 'Seductor, dulce y llamativo. Notas de canela, cuero, rosa y ámbar. El icónico lingote de oro de Paco Rabanne diseñado para destacar en la noche y llamar la atención.',
            categoria: 'diseñador', tipo: 'Eau de Toilette', genero: 'masculino',
            imagen: baseUrl + 'one_million_1786210273949.png', galeria: [], marca: 'Paco Rabanne', activo: true,
            presentaciones: { create: [
                    { tamanio: '100 ml', precio: 890.00, stock: 35, costo: 500.00 },
                    { tamanio: '200 ml', precio: 1250.00, stock: 15, costo: 700.00 }
                ] },
            decant: { create: { ml_origen: 100, costo_original: 500, precio_original: 890, costo_5ml: 40, precio_5ml: 85, stock_5ml: 15, costo_10ml: 75, precio_10ml: 150, stock_10ml: 15 } }
        },
        {
            nombre: 'Bleu de Chanel',
            descripcion: 'La elegancia embotellada. Un aroma cítrico, amaderado e inciensado. Representa al hombre moderno, limpio y profesional. Su tapón magnético es tan icónico como su aroma.',
            categoria: 'diseñador', tipo: 'Eau de Parfum', genero: 'masculino',
            imagen: baseUrl + 'bleu_de_chanel_1786210293440.png', galeria: [], marca: 'Chanel', activo: true,
            presentaciones: { create: [
                    { tamanio: '100 ml', precio: 1450.00, stock: 20, costo: 850.00 }
                ] },
            decant: { create: { ml_origen: 100, costo_original: 850, precio_original: 1450, costo_5ml: 65, precio_5ml: 125, stock_5ml: 10, costo_10ml: 115, precio_10ml: 220, stock_10ml: 10 } }
        },
        {
            nombre: 'Eros',
            descripcion: 'Inspirado en el dios del amor. Una explosión vibrante de menta, manzana verde, limón y haba tonka. Un perfume fiestero, dulce y muy juvenil.',
            categoria: 'diseñador', tipo: 'Eau de Toilette', genero: 'masculino',
            imagen: baseUrl + 'eros_1786210302677.png', galeria: [], marca: 'Versace', activo: true,
            presentaciones: { create: [
                    { tamanio: '100 ml', precio: 780.00, stock: 50, costo: 400.00 }
                ] },
            decant: { create: { ml_origen: 100, costo_original: 400, precio_original: 780, costo_5ml: 35, precio_5ml: 75, stock_5ml: 25, costo_10ml: 60, precio_10ml: 135, stock_10ml: 25 } }
        },
        {
            nombre: 'Y EDP',
            descripcion: 'El todoterreno definitivo. Salvia, manzana verde, jengibre y enebro. Dulce, fresco y con un rendimiento espectacular para usar en oficina, salidas o citas.',
            categoria: 'diseñador', tipo: 'Eau de Parfum', genero: 'masculino',
            imagen: baseUrl + 'ysl_y_1786210356976.png', galeria: [], marca: 'Yves Saint Laurent', activo: true,
            presentaciones: { create: [
                    { tamanio: '100 ml', precio: 1200.00, stock: 30, costo: 680.00 }
                ] },
            decant: { create: { ml_origen: 100, costo_original: 680, precio_original: 1200, costo_5ml: 55, precio_5ml: 110, stock_5ml: 15, costo_10ml: 95, precio_10ml: 190, stock_10ml: 15 } }
        },
        {
            nombre: 'Asad',
            descripcion: 'El clon más famoso de Sauvage Elixir. Una bestia especiada con vainilla, clavo, pimienta negra y café. Oscuro, maduro y con una duración sobresaliente a un precio increíble.',
            categoria: 'árabe', tipo: 'Eau de Parfum', genero: 'masculino',
            imagen: baseUrl + 'asad_1786210325362.png', galeria: [], marca: 'Lattafa', activo: true,
            presentaciones: { create: [
                    { tamanio: '100 ml', precio: 320.00, stock: 60, costo: 140.00 }
                ] },
            decant: { create: { ml_origen: 100, costo_original: 140, precio_original: 320, costo_5ml: 15, precio_5ml: 38, stock_5ml: 20, costo_10ml: 25, precio_10ml: 68, stock_10ml: 20 } }
        },
        {
            nombre: '9pm',
            descripcion: 'Alternativa fantástica a Ultra Male. Manzana, canela, vainilla y haba tonka. Un perfume dulce, juguetón y perfecto para salir de fiesta. Rendimiento bestial.',
            categoria: 'árabe', tipo: 'Eau de Parfum', genero: 'masculino',
            imagen: baseUrl + 'afnan_9pm_1786210336358.png', galeria: [], marca: 'Afnan', activo: true,
            presentaciones: { create: [
                    { tamanio: '100 ml', precio: 350.00, stock: 45, costo: 150.00 }
                ] },
            decant: { create: { ml_origen: 100, costo_original: 150, precio_original: 350, costo_5ml: 15, precio_5ml: 40, stock_5ml: 20, costo_10ml: 30, precio_10ml: 70, stock_10ml: 15 } }
        },
        {
            nombre: 'Club de Nuit Intense Man',
            descripcion: 'El indiscutible rey de los clones de Creed Aventus. Una salida cítrica punzante de limón y piña que seca en un ahumado amaderado de abedul espectacular. Proyección altísima.',
            categoria: 'árabe', tipo: 'Eau de Toilette', genero: 'masculino',
            imagen: baseUrl + 'club_de_nuit_1786210345978.png', galeria: [], marca: 'Armaf', activo: true,
            presentaciones: { create: [
                    { tamanio: '105 ml', precio: 329.00, stock: 80, costo: 130.00 }
                ] },
            decant: { create: { ml_origen: 105, costo_original: 130, precio_original: 329, costo_5ml: 15, precio_5ml: 35, stock_5ml: 30, costo_10ml: 25, precio_10ml: 65, stock_10ml: 30 } }
        },
        {
            nombre: 'Khamrah',
            descripcion: 'Un perfume gourmand que huele a postre lujoso. Dátiles, canela, praliné y vainilla bañados en coñac. Ideal para el clima frío y con una presentación impecable inspirada en Kilian.',
            categoria: 'árabe', tipo: 'Eau de Parfum', genero: 'unisex',
            imagen: baseUrl + 'khamrah_1786210394053.png', galeria: [], marca: 'Lattafa', activo: true,
            presentaciones: { create: [
                    { tamanio: '100 ml', precio: 390.00, stock: 55, costo: 180.00 }
                ] },
            decant: { create: { ml_origen: 100, costo_original: 180, precio_original: 390, costo_5ml: 20, precio_5ml: 45, stock_5ml: 20, costo_10ml: 35, precio_10ml: 80, stock_10ml: 20 } }
        },
        {
            nombre: 'Aventus',
            descripcion: 'El rey de la perfumería nicho. Piña jugosa asada sobre madera de abedul ahumada con toques de musgo de roble. Representa el éxito, el poder y la masculinidad pura.',
            categoria: 'nicho', tipo: 'Eau de Parfum', genero: 'masculino',
            imagen: baseUrl + 'aventus_1786210283945.png', galeria: [], marca: 'Creed', activo: true,
            presentaciones: { create: [
                    { tamanio: '100 ml', precio: 2950.00, stock: 10, costo: 1800.00 }
                ] },
            decant: { create: { ml_origen: 100, costo_original: 1800, precio_original: 2950, costo_5ml: 150, precio_5ml: 290, stock_5ml: 10, costo_10ml: 270, precio_10ml: 550, stock_10ml: 10 } }
        },
        {
            nombre: 'Oud Wood',
            descripcion: 'Una obra maestra maderosa. Madera de oud excepcionalmente fina, cardamomo, palo de rosa y sándalo. Huele a dinero viejo, a exclusividad y a buen gusto sin ser abrumador.',
            categoria: 'nicho', tipo: 'Eau de Parfum', genero: 'unisex',
            imagen: baseUrl + 'oud_wood_1786210365185.png', galeria: [], marca: 'Tom Ford', activo: true,
            presentaciones: { create: [
                    { tamanio: '50 ml', precio: 2200.00, stock: 5, costo: 1400.00 },
                    { tamanio: '100 ml', precio: 3300.00, stock: 3, costo: 2100.00 }
                ] },
            decant: { create: { ml_origen: 100, costo_original: 2100, precio_original: 3300, costo_5ml: 150, precio_5ml: 280, stock_5ml: 8, costo_10ml: 280, precio_10ml: 520, stock_10ml: 8 } }
        },
        {
            nombre: 'Layton',
            descripcion: 'La perfección nicho versátil. Una apertura brillante de manzana y lavanda que seca en una base sumamente seductora de vainilla y maderas cálidas. Simplemente adictivo.',
            categoria: 'nicho', tipo: 'Eau de Parfum', genero: 'unisex',
            imagen: baseUrl + 'layton_1786210404376.png', galeria: [], marca: 'Parfums de Marly', activo: true,
            presentaciones: { create: [
                    { tamanio: '125 ml', precio: 2450.00, stock: 12, costo: 1500.00 }
                ] },
            decant: { create: { ml_origen: 125, costo_original: 1500, precio_original: 2450, costo_5ml: 120, precio_5ml: 230, stock_5ml: 12, costo_10ml: 220, precio_10ml: 410, stock_10ml: 12 } }
        }
    ];
    for (const perf of perfumes) {
        await prisma.perfume.create({ data: perf });
        console.log(`✅ Agregado: ${perf.nombre}`);
    }
    console.log('Todos los 13 perfumes hiperrealistas han sido inyectados con éxito.');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=insert-real-perfumes.js.map