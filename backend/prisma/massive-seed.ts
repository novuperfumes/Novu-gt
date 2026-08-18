import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando el massive seed...');
  
  // Limpiar DB
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

  // Create Users
  const salt = await bcrypt.genSalt(10);
  const adminPassword = await bcrypt.hash('admin123', salt);
  const clientePassword = await bcrypt.hash('cliente123', salt);

  await prisma.usuario.create({
    data: {
      correo: 'admin@novugt.com',
      contrasenia: adminPassword,
      rol: 'ADMIN',
      nombre: 'Admin',
      apellido: 'Novu',
    }
  });

  await prisma.usuario.create({
    data: {
      correo: 'cliente@novugt.com',
      contrasenia: clientePassword,
      rol: 'CLIENTE',
      nombre: 'Juan',
      apellido: 'Pérez',
    }
  });

  const baseUrl = '/images/perfumes/';
  
  const perfumes = [
    // DIOR SAUVAGE LINE
    {
      nombre: 'Sauvage Eau de Toilette',
      descripcion: 'La versión original fresca y salvaje. Notas de bergamota, pimienta y ambroxan.',
      categoria: 'diseñador', tipo: 'Eau de Toilette', genero: 'masculino',
      imagen: baseUrl + 'sauvage_1786210264772.png', galeria: [], marca: 'Dior', activo: true,
      presentaciones: { create: [
        { tamanio: '100 ml', precio: 1150.00, stock: 30, costo: 650.00 },
        { tamanio: '200 ml', precio: 1650.00, stock: 10, costo: 900.00 }
      ]},
      decant: { create: { ml_origen: 100, costo_original: 650, precio_original: 1150, costo_5ml: 45, precio_5ml: 95, stock_5ml: 20, costo_10ml: 80, precio_10ml: 170, stock_10ml: 20 } }
    },
    {
      nombre: 'Sauvage Eau de Parfum',
      descripcion: 'Más profundo y misterioso, añadiendo vainilla absoluta para mayor duración.',
      categoria: 'diseñador', tipo: 'Eau de Parfum', genero: 'masculino',
      imagen: baseUrl + 'sauvage_1786210264772.png', galeria: [], marca: 'Dior', activo: true,
      presentaciones: { create: [
        { tamanio: '100 ml', precio: 1350.00, stock: 40, costo: 750.00 }
      ]},
      decant: { create: { ml_origen: 100, costo_original: 750, precio_original: 1350, costo_5ml: 55, precio_5ml: 110, stock_5ml: 20, costo_10ml: 100, precio_10ml: 195, stock_10ml: 20 } }
    },
    {
      nombre: 'Sauvage Parfum',
      descripcion: 'Con un frescor extremo teñido de tonos cálidos y amaderados.',
      categoria: 'diseñador', tipo: 'Parfum', genero: 'masculino',
      imagen: baseUrl + 'sauvage_1786210264772.png', galeria: [], marca: 'Dior', activo: true,
      presentaciones: { create: [
        { tamanio: '100 ml', precio: 1550.00, stock: 15, costo: 900.00 }
      ]},
      decant: { create: { ml_origen: 100, costo_original: 900, precio_original: 1550, costo_5ml: 65, precio_5ml: 125, stock_5ml: 10, costo_10ml: 120, precio_10ml: 230, stock_10ml: 10 } }
    },
    {
      nombre: 'Sauvage Elixir',
      descripcion: 'Una fragancia concentrada y especiada con un corazón de lavanda y maderas ricas.',
      categoria: 'diseñador', tipo: 'Elixir', genero: 'masculino',
      imagen: baseUrl + 'sauvage_1786210264772.png', galeria: [], marca: 'Dior', activo: true,
      presentaciones: { create: [
        { tamanio: '60 ml', precio: 1850.00, stock: 10, costo: 1100.00 }
      ]},
      decant: { create: { ml_origen: 60, costo_original: 1100, precio_original: 1850, costo_5ml: 100, precio_5ml: 180, stock_5ml: 8, costo_10ml: 190, precio_10ml: 350, stock_10ml: 8 } }
    },

    // YSL Y LINE
    {
      nombre: 'Y Eau de Toilette',
      descripcion: 'Fresco y limpio con notas de bergamota, jengibre y manzana verde.',
      categoria: 'diseñador', tipo: 'Eau de Toilette', genero: 'masculino',
      imagen: baseUrl + 'ysl_y_1786210356976.png', galeria: [], marca: 'Yves Saint Laurent', activo: true,
      presentaciones: { create: [
        { tamanio: '100 ml', precio: 1050.00, stock: 25, costo: 600.00 }
      ]},
      decant: { create: { ml_origen: 100, costo_original: 600, precio_original: 1050, costo_5ml: 45, precio_5ml: 95, stock_5ml: 15, costo_10ml: 85, precio_10ml: 175, stock_10ml: 15 } }
    },
    {
      nombre: 'Y Eau de Parfum',
      descripcion: 'El todoterreno definitivo. Salvia, manzana verde, jengibre y maderas oscuras.',
      categoria: 'diseñador', tipo: 'Eau de Parfum', genero: 'masculino',
      imagen: baseUrl + 'ysl_y_1786210356976.png', galeria: [], marca: 'Yves Saint Laurent', activo: true,
      presentaciones: { create: [
        { tamanio: '100 ml', precio: 1200.00, stock: 30, costo: 680.00 }
      ]},
      decant: { create: { ml_origen: 100, costo_original: 680, precio_original: 1200, costo_5ml: 55, precio_5ml: 110, stock_5ml: 15, costo_10ml: 95, precio_10ml: 190, stock_10ml: 15 } }
    },
    {
      nombre: 'Y Le Parfum',
      descripcion: 'Una versión más oscura, rica e intensa con lavanda francesa y madera de cedro.',
      categoria: 'diseñador', tipo: 'Parfum', genero: 'masculino',
      imagen: baseUrl + 'ysl_y_1786210356976.png', galeria: [], marca: 'Yves Saint Laurent', activo: true,
      presentaciones: { create: [
        { tamanio: '100 ml', precio: 1450.00, stock: 20, costo: 850.00 }
      ]},
      decant: { create: { ml_origen: 100, costo_original: 850, precio_original: 1450, costo_5ml: 65, precio_5ml: 125, stock_5ml: 10, costo_10ml: 120, precio_10ml: 235, stock_10ml: 10 } }
    },

    // CHANEL BLEU LINE
    {
      nombre: 'Bleu de Chanel Eau de Toilette',
      descripcion: 'Cítrico e inciensado, muy brillante y fresco.',
      categoria: 'diseñador', tipo: 'Eau de Toilette', genero: 'masculino',
      imagen: baseUrl + 'bleu_de_chanel_1786210293440.png', galeria: [], marca: 'Chanel', activo: true,
      presentaciones: { create: [
        { tamanio: '100 ml', precio: 1250.00, stock: 25, costo: 750.00 }
      ]},
      decant: { create: { ml_origen: 100, costo_original: 750, precio_original: 1250, costo_5ml: 55, precio_5ml: 110, stock_5ml: 15, costo_10ml: 105, precio_10ml: 200, stock_10ml: 15 } }
    },
    {
      nombre: 'Bleu de Chanel Eau de Parfum',
      descripcion: 'La elegancia embotellada. Maderas de sándalo e incienso con un toque ambarino.',
      categoria: 'diseñador', tipo: 'Eau de Parfum', genero: 'masculino',
      imagen: baseUrl + 'bleu_de_chanel_1786210293440.png', galeria: [], marca: 'Chanel', activo: true,
      presentaciones: { create: [
        { tamanio: '100 ml', precio: 1450.00, stock: 20, costo: 850.00 }
      ]},
      decant: { create: { ml_origen: 100, costo_original: 850, precio_original: 1450, costo_5ml: 65, precio_5ml: 125, stock_5ml: 10, costo_10ml: 115, precio_10ml: 220, stock_10ml: 10 } }
    },
    {
      nombre: 'Bleu de Chanel Parfum',
      descripcion: 'La versión más pura, densa y cremosa de la línea Bleu. Pura sofisticación.',
      categoria: 'diseñador', tipo: 'Parfum', genero: 'masculino',
      imagen: baseUrl + 'bleu_de_chanel_1786210293440.png', galeria: [], marca: 'Chanel', activo: true,
      presentaciones: { create: [
        { tamanio: '100 ml', precio: 1650.00, stock: 15, costo: 1000.00 }
      ]},
      decant: { create: { ml_origen: 100, costo_original: 1000, precio_original: 1650, costo_5ml: 80, precio_5ml: 145, stock_5ml: 8, costo_10ml: 140, precio_10ml: 270, stock_10ml: 8 } }
    },

    // PACO RABANNE 1 MILLION LINE
    {
      nombre: '1 Million',
      descripcion: 'Seductor, dulce y llamativo. Notas de canela, cuero, rosa y ámbar.',
      categoria: 'diseñador', tipo: 'Eau de Toilette', genero: 'masculino',
      imagen: baseUrl + 'one_million_1786210273949.png', galeria: [], marca: 'Paco Rabanne', activo: true,
      presentaciones: { create: [
        { tamanio: '100 ml', precio: 890.00, stock: 35, costo: 500.00 },
        { tamanio: '200 ml', precio: 1250.00, stock: 15, costo: 700.00 }
      ]},
      decant: { create: { ml_origen: 100, costo_original: 500, precio_original: 890, costo_5ml: 40, precio_5ml: 85, stock_5ml: 15, costo_10ml: 75, precio_10ml: 150, stock_10ml: 15 } }
    },
    {
      nombre: '1 Million Elixir',
      descripcion: 'Dulzura amaderada e intensa con vainilla, rosa de Damasco y osmanto.',
      categoria: 'diseñador', tipo: 'Parfum Intense', genero: 'masculino',
      imagen: baseUrl + 'one_million_1786210273949.png', galeria: [], marca: 'Paco Rabanne', activo: true,
      presentaciones: { create: [
        { tamanio: '100 ml', precio: 1050.00, stock: 20, costo: 550.00 }
      ]},
      decant: { create: { ml_origen: 100, costo_original: 550, precio_original: 1050, costo_5ml: 45, precio_5ml: 90, stock_5ml: 12, costo_10ml: 80, precio_10ml: 160, stock_10ml: 12 } }
    },
    {
      nombre: '1 Million Royal',
      descripcion: 'Una explosión de lavanda, cardamomo y maderas cremosas, elegante y majestuoso.',
      categoria: 'diseñador', tipo: 'Parfum', genero: 'masculino',
      imagen: baseUrl + 'one_million_1786210273949.png', galeria: [], marca: 'Paco Rabanne', activo: true,
      presentaciones: { create: [
        { tamanio: '100 ml', precio: 1100.00, stock: 15, costo: 600.00 }
      ]},
      decant: { create: { ml_origen: 100, costo_original: 600, precio_original: 1100, costo_5ml: 50, precio_5ml: 95, stock_5ml: 10, costo_10ml: 85, precio_10ml: 170, stock_10ml: 10 } }
    },
    
    // CREED AVENTUS
    {
      nombre: 'Aventus',
      descripcion: 'El rey de la perfumería nicho. Piña jugosa asada sobre madera de abedul ahumada con toques de musgo de roble.',
      categoria: 'nicho', tipo: 'Eau de Parfum', genero: 'masculino',
      imagen: baseUrl + 'aventus_1786210283945.png', galeria: [], marca: 'Creed', activo: true,
      presentaciones: { create: [
        { tamanio: '100 ml', precio: 2950.00, stock: 10, costo: 1800.00 }
      ]},
      decant: { create: { ml_origen: 100, costo_original: 1800, precio_original: 2950, costo_5ml: 150, precio_5ml: 290, stock_5ml: 10, costo_10ml: 270, precio_10ml: 550, stock_10ml: 10 } }
    },
    {
      nombre: 'Aventus Cologne',
      descripcion: 'Versión más fresca, cítrica y almizclada del clásico Aventus. Ideal para el verano.',
      categoria: 'nicho', tipo: 'Eau de Cologne', genero: 'masculino',
      imagen: baseUrl + 'aventus_1786210283945.png', galeria: [], marca: 'Creed', activo: true,
      presentaciones: { create: [
        { tamanio: '100 ml', precio: 2800.00, stock: 5, costo: 1700.00 }
      ]},
      decant: { create: { ml_origen: 100, costo_original: 1700, precio_original: 2800, costo_5ml: 140, precio_5ml: 275, stock_5ml: 6, costo_10ml: 260, precio_10ml: 520, stock_10ml: 6 } }
    },

    // ARMAF CLUB DE NUIT LINE
    {
      nombre: 'Club de Nuit Intense Man EDT',
      descripcion: 'El indiscutible rey de los clones de Creed Aventus. Una salida cítrica punzante de limón que seca en abedul.',
      categoria: 'árabe', tipo: 'Eau de Toilette', genero: 'masculino',
      imagen: baseUrl + 'club_de_nuit_1786210345978.png', galeria: [], marca: 'Armaf', activo: true,
      presentaciones: { create: [
        { tamanio: '105 ml', precio: 329.00, stock: 80, costo: 130.00 }
      ]},
      decant: { create: { ml_origen: 105, costo_original: 130, precio_original: 329, costo_5ml: 15, precio_5ml: 35, stock_5ml: 30, costo_10ml: 25, precio_10ml: 65, stock_10ml: 30 } }
    },
    {
      nombre: 'Club de Nuit Intense Man EDP',
      descripcion: 'Una versión más redondeada, suave y con mejor fijación que el EDT. Menos punzante en la salida.',
      categoria: 'árabe', tipo: 'Eau de Parfum', genero: 'masculino',
      imagen: baseUrl + 'club_de_nuit_1786210345978.png', galeria: [], marca: 'Armaf', activo: true,
      presentaciones: { create: [
        { tamanio: '200 ml', precio: 550.00, stock: 40, costo: 250.00 }
      ]},
      decant: { create: { ml_origen: 200, costo_original: 250, precio_original: 550, costo_5ml: 15, precio_5ml: 35, stock_5ml: 20, costo_10ml: 25, precio_10ml: 65, stock_10ml: 20 } }
    },
    {
      nombre: 'Club de Nuit Intense Man Parfum',
      descripcion: 'La versión definitiva en Parfum de edición especial. Máxima calidad de ingredientes y duración nuclear.',
      categoria: 'árabe', tipo: 'Parfum', genero: 'masculino',
      imagen: baseUrl + 'club_de_nuit_1786210345978.png', galeria: [], marca: 'Armaf', activo: true,
      presentaciones: { create: [
        { tamanio: '150 ml', precio: 650.00, stock: 25, costo: 320.00 }
      ]},
      decant: { create: { ml_origen: 150, costo_original: 320, precio_original: 650, costo_5ml: 20, precio_5ml: 45, stock_5ml: 15, costo_10ml: 35, precio_10ml: 80, stock_10ml: 15 } }
    },

    // VERSACE EROS
    {
      nombre: 'Eros Eau de Toilette',
      descripcion: 'Inspirado en el dios del amor. Explosión vibrante de menta, manzana verde, limón y haba tonka.',
      categoria: 'diseñador', tipo: 'Eau de Toilette', genero: 'masculino',
      imagen: baseUrl + 'eros_1786210302677.png', galeria: [], marca: 'Versace', activo: true,
      presentaciones: { create: [
        { tamanio: '100 ml', precio: 780.00, stock: 50, costo: 400.00 },
        { tamanio: '200 ml', precio: 1050.00, stock: 15, costo: 600.00 }
      ]},
      decant: { create: { ml_origen: 100, costo_original: 400, precio_original: 780, costo_5ml: 35, precio_5ml: 75, stock_5ml: 25, costo_10ml: 60, precio_10ml: 135, stock_10ml: 25 } }
    },
    {
      nombre: 'Eros Eau de Parfum',
      descripcion: 'Más amaderado y con una nota de cuero sutil que le da mayor profundidad y madurez.',
      categoria: 'diseñador', tipo: 'Eau de Parfum', genero: 'masculino',
      imagen: baseUrl + 'eros_1786210302677.png', galeria: [], marca: 'Versace', activo: true,
      presentaciones: { create: [
        { tamanio: '100 ml', precio: 950.00, stock: 35, costo: 500.00 }
      ]},
      decant: { create: { ml_origen: 100, costo_original: 500, precio_original: 950, costo_5ml: 40, precio_5ml: 85, stock_5ml: 15, costo_10ml: 70, precio_10ml: 155, stock_10ml: 15 } }
    },
    {
      nombre: 'Eros Parfum',
      descripcion: 'Concentración suprema. Mucho más intenso, rico, con un secado dulce y muy elegante.',
      categoria: 'diseñador', tipo: 'Parfum', genero: 'masculino',
      imagen: baseUrl + 'eros_1786210302677.png', galeria: [], marca: 'Versace', activo: true,
      presentaciones: { create: [
        { tamanio: '100 ml', precio: 1150.00, stock: 20, costo: 650.00 }
      ]},
      decant: { create: { ml_origen: 100, costo_original: 650, precio_original: 1150, costo_5ml: 50, precio_5ml: 100, stock_5ml: 10, costo_10ml: 85, precio_10ml: 185, stock_10ml: 10 } }
    },

    // LATTAFA ASAD
    {
      nombre: 'Asad',
      descripcion: 'El clon más famoso de Sauvage Elixir. Una bestia especiada con vainilla, clavo y pimienta negra.',
      categoria: 'árabe', tipo: 'Eau de Parfum', genero: 'masculino',
      imagen: baseUrl + 'asad_1786210325362.png', galeria: [], marca: 'Lattafa', activo: true,
      presentaciones: { create: [
        { tamanio: '100 ml', precio: 320.00, stock: 60, costo: 140.00 }
      ]},
      decant: { create: { ml_origen: 100, costo_original: 140, precio_original: 320, costo_5ml: 15, precio_5ml: 38, stock_5ml: 20, costo_10ml: 25, precio_10ml: 68, stock_10ml: 20 } }
    },

    // LATTAFA KHAMRAH
    {
      nombre: 'Khamrah',
      descripcion: 'Un perfume gourmand que huele a postre lujoso. Dátiles, canela, praliné y vainilla bañados en coñac.',
      categoria: 'árabe', tipo: 'Eau de Parfum', genero: 'unisex',
      imagen: baseUrl + 'khamrah_1786210394053.png', galeria: [], marca: 'Lattafa', activo: true,
      presentaciones: { create: [
        { tamanio: '100 ml', precio: 390.00, stock: 55, costo: 180.00 }
      ]},
      decant: { create: { ml_origen: 100, costo_original: 180, precio_original: 390, costo_5ml: 20, precio_5ml: 45, stock_5ml: 20, costo_10ml: 35, precio_10ml: 80, stock_10ml: 20 } }
    },
    {
      nombre: 'Khamrah Qahwa',
      descripcion: 'La maravillosa adición de café tostado a la dulzura de Khamrah original. Aún más seductor.',
      categoria: 'árabe', tipo: 'Eau de Parfum', genero: 'unisex',
      imagen: baseUrl + 'khamrah_1786210394053.png', galeria: [], marca: 'Lattafa', activo: true,
      presentaciones: { create: [
        { tamanio: '100 ml', precio: 450.00, stock: 45, costo: 220.00 }
      ]},
      decant: { create: { ml_origen: 100, costo_original: 220, precio_original: 450, costo_5ml: 25, precio_5ml: 55, stock_5ml: 15, costo_10ml: 40, precio_10ml: 95, stock_10ml: 15 } }
    },

    // TOM FORD OUD WOOD
    {
      nombre: 'Oud Wood',
      descripcion: 'Madera de oud fina, cardamomo y sándalo. Huele a dinero viejo y exclusividad.',
      categoria: 'nicho', tipo: 'Eau de Parfum', genero: 'unisex',
      imagen: baseUrl + 'oud_wood_1786210365185.png', galeria: [], marca: 'Tom Ford', activo: true,
      presentaciones: { create: [
        { tamanio: '50 ml', precio: 2200.00, stock: 15, costo: 1400.00 },
        { tamanio: '100 ml', precio: 3300.00, stock: 5, costo: 2100.00 }
      ]},
      decant: { create: { ml_origen: 100, costo_original: 2100, precio_original: 3300, costo_5ml: 150, precio_5ml: 280, stock_5ml: 8, costo_10ml: 280, precio_10ml: 520, stock_10ml: 8 } }
    },
    {
      nombre: 'Oud Wood Intense',
      descripcion: 'Una versión mucho más rica en cuero, castóreo y maderas ahumadas.',
      categoria: 'nicho', tipo: 'Parfum', genero: 'unisex',
      imagen: baseUrl + 'oud_wood_1786210365185.png', galeria: [], marca: 'Tom Ford', activo: true,
      presentaciones: { create: [
        { tamanio: '50 ml', precio: 2800.00, stock: 8, costo: 1800.00 }
      ]},
      decant: { create: { ml_origen: 50, costo_original: 1800, precio_original: 2800, costo_5ml: 200, precio_5ml: 350, stock_5ml: 5, costo_10ml: 380, precio_10ml: 650, stock_10ml: 5 } }
    },

    // PDM LAYTON
    {
      nombre: 'Layton',
      descripcion: 'Manzana, lavanda y vainilla. La perfección versátil de la perfumería nicho.',
      categoria: 'nicho', tipo: 'Eau de Parfum', genero: 'unisex',
      imagen: baseUrl + 'layton_1786210404376.png', galeria: [], marca: 'Parfums de Marly', activo: true,
      presentaciones: { create: [
        { tamanio: '125 ml', precio: 2450.00, stock: 15, costo: 1500.00 }
      ]},
      decant: { create: { ml_origen: 125, costo_original: 1500, precio_original: 2450, costo_5ml: 120, precio_5ml: 230, stock_5ml: 12, costo_10ml: 220, precio_10ml: 410, stock_10ml: 12 } }
    },
    {
      nombre: 'Layton Exclusif',
      descripcion: 'La versión más oscura y bestial de Layton, con oud, almendras amargas y café.',
      categoria: 'nicho', tipo: 'Parfum', genero: 'unisex',
      imagen: baseUrl + 'layton_1786210404376.png', galeria: [], marca: 'Parfums de Marly', activo: true,
      presentaciones: { create: [
        { tamanio: '125 ml', precio: 2850.00, stock: 8, costo: 1800.00 }
      ]},
      decant: { create: { ml_origen: 125, costo_original: 1800, precio_original: 2850, costo_5ml: 150, precio_5ml: 280, stock_5ml: 8, costo_10ml: 280, precio_10ml: 520, stock_10ml: 8 } }
    },

    // AFNAN 9PM
    {
      nombre: '9pm',
      descripcion: 'Alternativa fantástica a Ultra Male. Manzana, canela, vainilla y haba tonka.',
      categoria: 'árabe', tipo: 'Eau de Parfum', genero: 'masculino',
      imagen: baseUrl + 'afnan_9pm_1786210336358.png', galeria: [], marca: 'Afnan', activo: true,
      presentaciones: { create: [
        { tamanio: '100 ml', precio: 350.00, stock: 65, costo: 150.00 }
      ]},
      decant: { create: { ml_origen: 100, costo_original: 150, precio_original: 350, costo_5ml: 15, precio_5ml: 40, stock_5ml: 25, costo_10ml: 30, precio_10ml: 70, stock_10ml: 25 } }
    },

    // JEAN PAUL GAULTIER LE MALE
    {
      nombre: 'Le Male Le Parfum',
      descripcion: 'Cardamomo, lavanda y vainilla en un perfil elegante. Representa a un capitán seguro de sí mismo.',
      categoria: 'diseñador', tipo: 'Eau de Parfum', genero: 'masculino',
      imagen: baseUrl + 'le_male_le_parfum_1786210230280.png', galeria: [], marca: 'Jean Paul Gaultier', activo: true,
      presentaciones: { create: [
        { tamanio: '125 ml', precio: 1150.00, stock: 25, costo: 650.00 },
        { tamanio: '200 ml', precio: 1450.00, stock: 15, costo: 850.00 }
      ]},
      decant: { create: { ml_origen: 125, costo_original: 650, precio_original: 1150, costo_5ml: 45, precio_5ml: 95, stock_5ml: 12, costo_10ml: 85, precio_10ml: 170, stock_10ml: 12 } }
    },
    {
      nombre: 'Le Male Elixir',
      descripcion: 'Extremadamente dulce y cálido. Haba tonka, miel y lavanda llevados a la intensidad máxima.',
      categoria: 'diseñador', tipo: 'Elixir', genero: 'masculino',
      imagen: baseUrl + 'le_male_le_parfum_1786210230280.png', galeria: [], marca: 'Jean Paul Gaultier', activo: true,
      presentaciones: { create: [
        { tamanio: '75 ml', precio: 1050.00, stock: 20, costo: 600.00 },
        { tamanio: '125 ml', precio: 1350.00, stock: 35, costo: 750.00 }
      ]},
      decant: { create: { ml_origen: 125, costo_original: 750, precio_original: 1350, costo_5ml: 55, precio_5ml: 110, stock_5ml: 15, costo_10ml: 100, precio_10ml: 200, stock_10ml: 15 } }
    }
  ];

  let added = 0;
  for (const perf of perfumes) {
    try {
      await prisma.perfume.create({ data: perf });
      console.log(`✅ Creado: ${perf.nombre}`);
      added++;
    } catch(e) {
      console.error(`❌ Error creando ${perf.nombre}:`, e);
    }
  }

  console.log(`🚀 Script finalizado con éxito. Se insertaron ${added} perfumes correctamente.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
