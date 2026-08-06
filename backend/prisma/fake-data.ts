import 'dotenv/config';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Generating extra fake data...');

  // 1. Create a few more users
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash('password123', salt);

  const u1 = await prisma.usuario.create({
    data: { correo: 'maria@test.com', contrasenia: password, nombre: 'Maria', apellido: 'Gomez', telefono: '11112222', genero: 'femenino' }
  });
  const u2 = await prisma.usuario.create({
    data: { correo: 'carlos@test.com', contrasenia: password, nombre: 'Carlos', apellido: 'Ruiz', telefono: '33334444', genero: 'masculino', sellos: 5 }
  });

  // 2. Add Addresses
  await prisma.direccion.createMany({
    data: [
      { id_usuario: u1.id, direccion: 'Calle 123', departamento: 'Guatemala', municipio: 'Mixco', referencias: 'Casa verde' },
      { id_usuario: u2.id, direccion: 'Avenida 456', departamento: 'Sacatepequez', municipio: 'Antigua', codigo_postal: '03001' }
    ]
  });

  // 3. Gift Cards
  await prisma.giftCard.create({
    data: { id_usuario: u1.id, codigo: 'GIFT-MARIA-100', monto: 100.00, activa: true, es_bienvenida: false }
  });

  // 4. Contact Messages
  await prisma.mensajeContacto.createMany({
    data: [
      { nombre: 'Ana', correo: 'ana@ejemplo.com', asunto: 'Duda sobre envío', mensaje: 'Quería saber si hacen envíos a Petén' },
      { nombre: 'Luis', correo: 'luis@ejemplo.com', asunto: 'Perfume dañado', mensaje: 'Mi perfume llegó roto, necesito ayuda' }
    ]
  });

  // 5. Promo Code
  const promo = await prisma.codigoPromocion.create({
    data: { codigo: 'VERANO2026', tipo_descuento: 'porcentaje', descuento: 20, fecha_inicio: new Date(), fecha_fin: new Date(new Date().setMonth(new Date().getMonth() + 1)) }
  });

  // 6. WhatsApp Orders
  await prisma.ordenWhatsApp.create({
    data: { nombre_cliente: 'Pedro', telefono: '55555555', direccion: 'Zona 1', total: 500.00, carrito_json: '{"items": [{"id": 1, "qty": 1}]}', estado: 'PENDIENTE' }
  });

  // Fetch some perfumes to create favorites and reviews
  const perfumes = await prisma.perfume.findMany({ take: 3 });
  if (perfumes.length > 0) {
    // 7. Favorites
    await prisma.favorito.createMany({
      data: [
        { id_usuario: u1.id, id_perfume: perfumes[0].id },
        { id_usuario: u2.id, id_perfume: perfumes[0].id },
      ]
    });

    // 8. Reviews
    for (const p of perfumes) {
        // avoid unique constraint failure by checking
        const existing = await prisma.reseniaPerfume.findUnique({ where: { id_usuario_id_perfume: { id_usuario: u1.id, id_perfume: p.id } } });
        if (!existing) {
            await prisma.reseniaPerfume.create({
                data: { id_usuario: u1.id, id_perfume: p.id, calificacion: 4, comentario: 'Huele muy bien!', compra_label: 'Decant 10ml' }
            });
        }
    }
  }

  // 9. A Cart for u2
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
    await pool.end();
  });
