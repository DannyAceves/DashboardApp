const pool = require("../config/db");

const createUser = async (nombre, email, passwordHash, rol) => {
  const result = await pool.query(
    "INSERT INTO usuarios (nombre, email, password_hash, rol) VALUES ($1, $2, $3, $4) RETURNING *",
    [nombre, email, passwordHash, rol]
  );
  return result.rows[0];
};

const findByEmail = async (email) => {
  const result = await pool.query("SELECT * FROM usuarios WHERE email = $1", [
    email,
  ]);
  return result.rows[0];
};

module.exports = {
  createUser,
  findByEmail,
};
