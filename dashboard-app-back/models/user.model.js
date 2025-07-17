const pool = require("../config/db");

const createUser = async (nombre, email, passwordHash, rol , verificado, codigo) => {
  const result = await pool.query(
    "INSERT INTO usuarios (nombre, email, password_hash, rol, verificado, codigo_verificacion) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [nombre, email, passwordHash, rol, verificado, codigo]
  );
  return result.rows[0];
};

const findByEmail = async (email) => {
  const result = await pool.query("SELECT * FROM usuarios WHERE email = $1", [
    email,
  ]);
  return result.rows[0];
};

const verificarCodigo = async (email) => {
  await pool.query(
    `UPDATE usuarios SET verificado = true, codigo_verificacion = NULL WHERE email = $1`,
    [email]
  );
};

module.exports = {
  createUser,
  findByEmail,
  verificarCodigo,
};
