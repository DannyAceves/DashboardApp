const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { createUser, findByEmail } = require("../models/user.model");

const register = async (req, res) => {
  const { nombre, email, password, rol } = req.body;

  try {
    const usuarioExistente = await findByEmail(email);
    if (usuarioExistente) {
      return res.status(400).json({ message: "Usuario ya registrado" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const nuevoUsuario = await createUser(nombre, email, passwordHash, rol);
    res.status(201).json({ message: "Usuario creado", usuario: nuevoUsuario });
  } catch (error) {
    res.status(500).json({ message: "Error al registrar", error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuario = await findByEmail(email);
    if (!usuario)
      return res.status(404).json({ message: "Usuario no encontrado" });

    const esValido = await bcrypt.compare(password, usuario.password_hash);
    if (!esValido)
      return res.status(401).json({ message: "Credenciales inválidas" });

    const token = jwt.sign(
      {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error al iniciar sesión", error });
  }
};

module.exports = { register, login };
