const fs = require('fs');
const mariadb = require('mariadb');
require('dotenv').config();

async function main() {
  const pool = mariadb.createPool({
    host: 'yamabiko.proxy.rlwy.net',
    port: 18635,
    user: 'root',
    password: 'aEkJpGQvmHyiefdeBvcaUGarcLlPfCjo',
    database: 'railway',
    connectionLimit: 5,
    ssl: { rejectUnauthorized: false }
  });

  let conn;
  try {
    conn = await pool.getConnection();
    console.log("Conectado a la base de datos remotamente...");

    const sqlContent = fs.readFileSync('prisma/seed.sql', 'utf8');
    
    // Split by semicolons, but ensure we don't split inside string literals if possible.
    // The seed.sql is clean enough that simple splitting by ; works if we filter out empty ones.
    const statements = sqlContent.split(';').map(s => s.trim()).filter(s => s.length > 0);
    
    for (const stmt of statements) {
      if (stmt.startsWith('--')) continue; // skip pure comment lines if they got separated
      console.log(`Ejecutando statement...`);
      await conn.query(stmt);
    }
    
    console.log("¡Todos los statements ejecutados con éxito!");

  } catch (err) {
    console.error("Error ejecutando SQL:", err);
  } finally {
    if (conn) conn.release();
    await pool.end();
  }
}

main();
