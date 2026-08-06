import 'dotenv/config';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Creando nuevas cuentas admin y cliente...');

  const salt = await bcrypt.genSalt(10);
  const passwordAdmin = await bcrypt.hash('admin123', salt);
  const passwordCliente = await bcrypt.hash('cliente123', salt);

  // Intentamos crear la cuenta admin
  const admin = await prisma.usuario.upsert({
    where: { correo: 'nuevoadmin@novugt.com' },
    update: {},
    create: {
      correo: 'nuevoadmin@novugt.com',
      contrasenia: passwordAdmin,
      rol: 'ADMIN',
      nombre: 'Admin',
      apellido: 'Principal'
    }
  });

  // Intentamos crear la cuenta cliente
  const cliente = await prisma.usuario.upsert({
    where: { correo: 'nuevocliente@novugt.com' },
    update: {},
    create: {
      correo: 'nuevocliente@novugt.com',
      contrasenia: passwordCliente,
      rol: 'CLIENTE',
      nombre: 'Cliente',
      apellido: 'Frecuente'
    }
  });

  console.log('Cuentas creadas exitosamente:');
  console.log(`Admin: ${admin.correo} / Contraseña: admin123`);
  console.log(`Cliente: ${cliente.correo} / Contraseña: cliente123`);
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
