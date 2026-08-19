const mariadb = require('mariadb');

async function main() {
  const pool = mariadb.createPool({
    host: 'yamabiko.proxy.rlwy.net',
    port: 18635,
    user: 'root',
    password: 'aEkJpGQvmHyiefdeBvcaUGarcLlPfCjo',
    database: 'railway',
    connectionLimit: 1,
    ssl: { rejectUnauthorized: false }
  });
  try {
    const conn = await pool.getConnection();
    const rows = await conn.query('SELECT COUNT(*) as count FROM Perfume');
    console.log("Perfumes en BD:", rows[0].count);
    conn.release();
  } catch (err) {
    console.error("Error:", err.message);
  } finally {
    pool.end();
  }
}
main();
