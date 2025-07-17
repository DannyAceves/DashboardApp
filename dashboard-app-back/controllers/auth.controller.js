require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const enviarCodigoVerificacion = require("../utils/verificacion");
const { createUser, findByEmail, verificarCodigo } = require("../models/user.model");

const generarCodigo = () => Math.floor(100000 + Math.random() * 900000).toString(); // Código de 6 dígitos

const register = async (req, res) => { // Ruta para registrar un nuevo usuario
  const { nombre, email, password, rol } = req.body;

  try {
    const usuarioExistente = await findByEmail(email);
    if (usuarioExistente) {
      return res.status(400).json({ message: "Usuario ya registrado" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const codigo = generarCodigo();
    const nuevoUsuario = await createUser(nombre, email, passwordHash, rol, false, codigo );
    await enviarCodigoVerificacion(email, codigo);

    res.status(201).json({ message: "Usuario creado. Revisa tu correo para verificar tu cuenta.",usuario: nuevoUsuario});
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).json({ message: "Error al registrar", error });
  }
};


const login = async (req, res) => { // Ruta para iniciar sesión
  const { email, password } = req.body;

  try {
    const usuario = await findByEmail(email);
    if (!usuario)
      return res.status(404).json({ message: "Usuario no encontrado" });

    if (!usuario.verificado) {
      return res.status(403).json({ message: "Debes verificar tu cuenta primero" });
    }

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



const verifyEmail = async (req, res) => { // Ruta para verificar el código de verificación del usuario
  const { email, codigo } = req.body;

  try {
    const usuario = await findByEmail(email);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (usuario.verificado) {
      return res.status(400).json({ message: "Usuario ya verificado" });
    }

    if (usuario.codigo_verificacion !== codigo) {
      return res.status(400).json({ message: "Código incorrecto" });
    }

    await verificarCodigo(email);
    res.json({ message: "Cuenta verificada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al verificar código", error });
  }
};


module.exports = { register, login , verifyEmail};
