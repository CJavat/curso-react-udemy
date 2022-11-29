// Importar dependencias y módulos.
const bcrypt = require("bcrypt");
const User = require("../models/user.model");

// Acciones de prueba.
const pruebaUser = (req, res) => {
  return res.status(200).send({
    message: "Mensaje enviado desde: controllers/user.js",
  });
};

// Registro de usuarios.
const register = (req, res) => {
  // Recoger datos de la petición.
  let params = req.body;

  // Comprobar que me llegan bien. (+ validación)
  if (!params.name || !params.email || !params.password || !params.nick) {
    return res.status(400).json({
      status: "error",
      message: "Faltan datos por enviar.",
    });
  }

  // Control de usuarios duplicados.
  User.find({
    $or: [{ email: params.email }, { nick: params.nick }],
  }).exec(async (error, users) => {
    if (error) {
      return res.status(500).json({
        status: "error",
        message: "Error en la consulta de usuarios.",
      });
    }

    if (users && users.length >= 1) {
      return res.status(200).send({
        status: "success",
        message: "El usuario ya existe",
      });
    }
    // Cifrar la contraseña.
    let pass = await bcrypt.hash(params.password, 10);
    params.password = pass;

    // Crear objeto de usuarios.
    let userToSave = new User(params);

    // Guardar usuario en la DB.
    userToSave.save((error, userStored) => {
      // Con éste método de Mongoose, en automatico te guarda los datos.
      if (error || !userStored) {
        return res
          .status(500)
          .send({ status: "error", message: "Error al guardar el usuario." });
      }

      // Devolver resultado.
      return res.status(200).json({
        status: "success",
        message: "Usuario registrado correctamente.",
        user: userStored,
      });
    });
  });
};

const login = (req, res) => {
  // Recoger los parametros body.
  let params = req.body;

  if (!params.email || !params.password) {
    return res.status(404).send({
      status: "error",
      message: "Faltan datos por enviar.",
    });
  }

  // Buscar en la DB si existe.
  User.findOne({ email: params.email })
    // .select({ password: 0 })
    .exec((error, user) => {
      if (error || !user) {
        return res.status(404).send({
          status: "error",
          message: "No existe el usuario",
        });
      }

      // Comprobar su contraseña.
      const pass = bcrypt.compareSync(params.password, user.password);
      console.log(pass);
      if (!pass) {
        return res.status(400).json({
          status: "error",
          message: "No te has identificado correctamente",
        });
      }
      // Conseguir Token.
      const token = false;

      // Devolver Datos del usuario.
      return res.status(200).json({
        status: "success",
        message: "Acción de login",
        user: {
          id: user._id,
          name: user.name,
          nick: user.nick,
        },
        token,
      });
    });
};

// Exportar acciones.
module.exports = {
  pruebaUser,
  register,
  login,
};
