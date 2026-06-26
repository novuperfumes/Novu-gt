import 'dotenv/config';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  // Clear database to prevent unique constraints issues
  await prisma.presentacionPerfume.deleteMany();
  await prisma.perfume.deleteMany();
  await prisma.sucursal.deleteMany();
  await prisma.usuario.deleteMany();

  // Create physical pickup branches
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

  // Create perfumes with sizes/presentations
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
