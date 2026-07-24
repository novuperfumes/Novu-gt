import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const perfumes = await prisma.perfume.findMany({ include: { presentaciones: true, decant: true } });
  console.log(JSON.stringify(perfumes, null, 2));
}
main().finally(() => prisma.$disconnect());
