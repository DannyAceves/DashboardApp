const pool = require("./config/db");

(async () => {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("Conexión exitosa a la base de datos:", res.rows[0]);
    process.exit(0);
  } catch (err) {
    console.error("Error al conectar a la base de datos:", err);
    process.exit(1);
  }
})();
