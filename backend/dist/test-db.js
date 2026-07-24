"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const perfumes = await prisma.perfume.findMany({ include: { presentaciones: true, decant: true } });
    console.log(JSON.stringify(perfumes, null, 2));
}
main().finally(() => prisma.$disconnect());
//# sourceMappingURL=test-db.js.map