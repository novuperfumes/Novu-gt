const fs = require('fs');
const glob = require('glob'); // Assuming glob is not installed, wait I'll just use standard node modules

const { execSync } = require('child_process');

// Find files containing the string
const files = execSync('grep -rl "new PrismaMariaDb(process.env.DATABASE_URL!)" .').toString().split('\n').filter(Boolean);

for (const file of files) {
  if (file.includes('node_modules') || file.includes('dist')) continue;
  console.log(`Fixing ${file}`);
  let content = fs.readFileSync(file, 'utf8');
  
  if (!content.includes("import * as mariadb from 'mariadb'")) {
    content = content.replace("import { PrismaMariaDb } from '@prisma/adapter-mariadb';", "import { PrismaMariaDb } from '@prisma/adapter-mariadb';\nimport * as mariadb from 'mariadb';");
  }
  
  content = content.replace("const pool = mariadb.createPool(process.env.DATABASE_URL!);
const adapter = new PrismaMariaDb(pool);", "const pool = mariadb.createPool(process.env.DATABASE_URL!);\nconst adapter = new PrismaMariaDb(pool);");
  
  fs.writeFileSync(file, content);
}
console.log('Done!');
