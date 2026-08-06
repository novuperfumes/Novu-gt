"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const adapter_mariadb_1 = require("@prisma/adapter-mariadb");
const adapter = new adapter_mariadb_1.PrismaMariaDb(process.env.DATABASE_URL);
const prisma = new client_1.PrismaClient({ adapter });
async function main() {
    const perfumes = await prisma.perfume.findMany({ include: { presentaciones: true, decant: true } });
    console.log(JSON.stringify(perfumes, null, 2));
}
main().finally(() => prisma.$disconnect());
//# sourceMappingURL=test-db.js.map