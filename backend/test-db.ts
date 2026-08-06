import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
const adapter = new PrismaMariaDb(process.env.DATABASE_URL!);
const prisma = new PrismaClient({ adapter });
async function main() {
  const perfumes = await prisma.perfume.findMany({ include: { presentaciones: true, decant: true } });
  console.log(JSON.stringify(perfumes, null, 2));
}
main().finally(() => prisma.$disconnect());
