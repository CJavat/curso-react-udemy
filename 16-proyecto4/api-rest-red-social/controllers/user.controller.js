// Importar dependencias y módulos.
const bcrypt = require("bcrypt");
const mongoosePagination = require("mongoose-pagination");
const fs = require("fs");
const path = require("path");

// Importar modelos.
const User = require("../models/user.model");

// Importar servicios.
const jwt = require("../services/jwt");
const followService = require("../services/followService");

// Acciones de prueba.
const pruebaUser = (req, res) => {
  return res.status(200).send({
    message: "Mensaje enviado desde: controllers/user.js",
    usuario: req.user,
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

// Logearse con email y contraseña.
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
      const token = jwt.createToken(user);

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

// Mostrar el perfil de usuario.
const profile = (req, res) => {
  // Recibir el parametro del ID de usuario por la URL.
  const id = req.params.id;

  // Hacer una consulta par a sacar los datos del usuario.
  User.findById(id)
    .select({ password: 0, role: 0 })
    .exec(async (error, userProfile) => {
      if (error || !userProfile) {
        res.status(404).send({
          status: "error",
          message: "El usuario no existe o hay un error.",
        });
      }

      // Info de seguimiento.
      const followInfo = await followService.followThisUser(req.user.id, id);

      // Posteriormente: devolver informacion de follows.
      res.status(200).send({
        status: "success",
        message: "Datos guardados exitosamente.",
        user: userProfile,
        following: followInfo.following,
        follower: followInfo.follower,
      });
    });
};

// Listar usuarios.
const list = (req, res) => {
  // Controlar en que pagina estamos.
  let page = 1;

  if (req.params.page) {
    page = req.params.page;
  }
  page = parseInt(page);

  // Hacer la consulta con Mongoose Paginate.
  let itemsPerPage = 5;

  User.find()
    .sort("_id")
    .paginate(page, itemsPerPage, (error, users, total) => {
      if (error || !users) {
        res.status(404).send({
          status: "error",
          message: "No hay usuarios disponibles.",
          error,
        });
      }

      // Devolver resultado. (Posteriormente: info de follows)
      res.status(200).send({
        status: "success",
        users,
        page,
        itemsPerPage,
        total,
        pages: Math.ceil(total / itemsPerPage),
      });
    });
};

// Actualizar datos.
const update = (req, res) => {
  // Recoger info del usuario a actualizar.
  let userIdentity = req.user;
  let userToUpdate = req.body;

  // Eliminar campos sobrantes.
  delete userIdentity.iat;
  delete userIdentity.exp;
  delete userIdentity.role;
  delete userIdentity.image;

  // Comprobar si el usuario ya existe.
  User.find({
    $or: [{ email: userToUpdate.email }, { nick: userToUpdate.nick }],
  }).exec(async (error, users) => {
    if (error) {
      return res.status(500).json({
        status: "error",
        message: "Error en la consulta de usuarios.",
      });
    }

    let userIsset = false;
    users.forEach((user) => {
      if (user && user._id != userIdentity.id) {
        userIsset = true;
      }
    });

    if (userIsset) {
      return res.status(200).send({
        status: "success",
        message: "El usuario ya existe",
      });
    }

    // Cifrar la contraseña.
    if (userToUpdate.password) {
      let pass = await bcrypt.hash(userToUpdate.password, 10);
      userToUpdate.password = pass;
    }

    // Buscar y actualizar.
    try {
      let userUpdate = await User.findByIdAndUpdate(
        { _id: userIdentity.id },
        userToUpdate,
        { new: true }
      );

      if (!userUpdate) {
        return res.status(500).send({
          status: "error",
          message: "Error al actualizar usuario.",
        });
      }
      // Devolver respuesta.
      return res.status(200).send({
        status: "success",
        message: "Metodo de actualizar usuario.",
        userToUpdate,
        userIdentity,
        user: userUpdate,
      });
    } catch (error) {
      return res.status(404).send({
        status: "error",
        message: "Error al actualizar.",
      });
    }
  });
};

// Subir imagen a la DB.
const upload = (req, res) => {
  // Recoger el fichero de imagen y comprobar que existe.
  if (!req.file) {
    return res.status(404).send({
      status: "error",
      message: "Petición no incluye la imagen.",
    });
  }

  // Nombre del archivo.
  let image = req.file.originalname;

  // Sacar extensión del archivo.
  const imageSplit = image.split("."); // Sacar extensión del archivo. Devuelve un array. ([0] -> Nombre de la imagen | [1] -> extension de la imagen.)
  const extension = imageSplit[1]; // Asignar la extensión a otra constante.

  // Comprobar extensión.
  if (
    extension != "png" &&
    extension != "jpg" &&
    extension != "jpeg" &&
    extension != "gif"
  ) {
    // Borrar archivo subido.
    const filePath = req.file.path; // Obtener la ruta física de donde se guardo la imagen, para despues borrarla.
    const fileDelete = fs.unlinkSync(filePath); // Método asíncrono del unlink.

    // Devolver respuesta negativa.
    return res.status(400).send({
      status: "error",
      message: "La extensión del fichero es invalida.",
      fileDelete,
    });
  }

  // Si sí es correcta, guardar imagen en DB.
  User.findOneAndUpdate(
    { _id: req.user.id },
    { image: req.file.filename },
    { new: true },
    (error, userUpdate) => {
      if (error || !userUpdate) {
        return res.status(500).send({
          status: "error",
          message: "Error en la subida del avatar.",
        });
      }

      // Devolver respuesta.
      return res.status(200).send({
        status: "success",
        user: userUpdate,
        file: req.file,
      });
    }
  );
};

// Obtener el avatar del usuario.
const avatar = (req, res) => {
  // Sacar el parámetro de la URL.
  const file = req.params.file;

  // Montar el Path real de la imágen.
  const filePath = "./uploads/avatars/" + file;

  // Comprobar que existe.
  fs.stat(filePath, (error, exists) => {
    if (!exists) {
      return res.status(404).send({
        status: "error",
        message: "No existe la imágen.",
      });
    }

    // Si existe, devolver un file.
    return res.status(200).sendFile(path.resolve(filePath)); // Se neceista agregar el "path.resolve()" porque se require una ruta absoluta, y al pasarle el parametro de la ruta fisica, el resolve lo conveierte en absoluta
  });
};

// Exportar acciones.
module.exports = {
  pruebaUser,
  register,
  login,
  profile,
  list,
  update,
  upload,
  avatar,
};
