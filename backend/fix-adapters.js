const fs = require('fs');
const { execSync } = require('child_process');

// Find files containing the pool string
const files = execSync('grep -rl "const pool = mariadb.createPool(process.env.DATABASE_URL!);" .').toString().split('\n').filter(Boolean);

for (const file of files) {
  if (file.includes('node_modules') || file.includes('dist')) continue;
  console.log(`Reverting ${file}`);
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace the pool usage with just the connection string
  content = content.replace("const pool = mariadb.createPool(process.env.DATABASE_URL!);\nconst adapter = new PrismaMariaDb(pool);", "const adapter = new PrismaMariaDb(process.env.DATABASE_URL || '');");
  
  // Remove the mariadb import if we added it (only if it was added by us, which is near adapter-mariadb import)
  content = content.replace("import { PrismaMariaDb } from '@prisma/adapter-mariadb';\nimport * as mariadb from 'mariadb';", "import { PrismaMariaDb } from '@prisma/adapter-mariadb';");
  
  fs.writeFileSync(file, content);
}
console.log('Revert done!');
