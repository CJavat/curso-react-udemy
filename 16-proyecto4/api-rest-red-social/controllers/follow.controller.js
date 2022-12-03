// Importar modelo.
const Follow = require("../models/follow.model");
const User = require("../models/user.model");

// Importar servicio.
const followService = require("../services/followService");

// Importar dependencias.
const mongoosePaginate = require("mongoose-pagination");

// Acciones de prueba.
const pruebaFollow = (req, res) => {
  return res.status(200).send({
    message: "Mensaje enviado desde: controllers/follow.js",
  });
};

// Acción de guardar un follow (acción de seguir).
const save = (req, res) => {
  // Conseguir datos por body.
  const params = req.body;

  // Sacar id del usuario identificado.
  const identity = req.user;

  // Crear objeto con modelo follow.
  let userToFollow = new Follow({
    user: identity.id,
    followed: params.followed,
  });

  // Guardar objeto en DB.
  userToFollow.save((error, followStored) => {
    if (error) {
      return res.status(500).send({
        status: "error",
        message: "No se ha podido seguir al usuario.",
      });
    }

    return res.status(200).send({
      status: "success",
      message: "Follow guardado correctamente.",
      params,
      follow: followStored,
    });
  });
};

// Acción de borrar un follow (acción dejar de seguir).
const unfollow = (req, res) => {
  // Recoger el id del usuario identificado.
  const userId = req.user.id;

  // Recoger el id del usuario que sigo y quiero dejar de seguir.
  const followedId = req.params.id;

  // Find de las coincidencias y hacer remove(Para borrar).
  Follow.find({
    user: userId,
    followed: followedId,
  }).remove((error, followDeleted) => {
    if (error || !followDeleted) {
      return res.status(500).send({
        status: "error",
        message: "No has dejado de seguir a nadie.",
      });
    }

    return res.status(200).send({
      status: "success",
      message: "Follow eliminado correctamente.",
    });
  });
};
// Acción listado de usuarios que cualquier usuario está siguiendo. (Todos a los que estoy siguiendo)
const following = (req, res) => {
  // Sacar el id del usuario identificado.
  let userId = req.user.id;

  // Comprobar si me llega el id por parametro en la url.
  if (req.params.id) userId = req.params.id;

  // Comprobar si me llega la página, sino llega sera la página 1.
  let page = 1;

  if (req.params.page) page = req.params.page;

  // Usuarios por pagina quiero mostrar.
  const itemsPerPage = 5;

  // Find a follow, popular datos de los usuarios, paginar con mongoose pagination.
  Follow.find({ user: userId })
    .populate("user followed", "-password -role -__v -email") // El primer parámetro indica lo que quieres filtar, y el segundo parametro los campos que no quieres que se vean
    .paginate(page, itemsPerPage, async (error, follows, total) => {
      // Listado de usuarios de trinity, y soy Daniel.
      // Array de IDs de usuarios que me siguen y los que sigo como Daniel.
      let followUserIds = await followService.followUserIds(req.user.id);

      return res.status(200).send({
        status: "success",
        message: "Listado de usuarios que estoy siguiendo.",
        follows,
        total,
        pages: Math.ceil(total / itemsPerPage),
        user_following: followUserIds.following,
        user_follow_me: followUserIds.followers,
      });
    });
};

// Acción listado de usuarios que siguen a cualquier otro usuario. (Todos los que me están siguiendo | seguidores)
const followers = (req, res) => {
  // Sacar el id del usuario identificado.
  let userId = req.user.id;

  // Comprobar si me llega el id por parametro en la url.
  if (req.params.id) userId = req.params.id;

  // Comprobar si me llega la página, sino llega sera la página 1.
  let page = 1;

  if (req.params.page) page = req.params.page;

  // Usuarios por pagina quiero mostrar.
  const itemsPerPage = 5;

  // Find a follow, popular datos de los usuarios, paginar con mongoose pagination.
  Follow.find({ followed: userId })
    .populate("user", "-password -role -__v -email") // El primer parámetro indica lo que quieres filtar, y el segundo parametro los campos que no quieres que se vean
    .paginate(page, itemsPerPage, async (error, follows, total) => {
      let followUserIds = await followService.followUserIds(req.user.id);

      return res.status(200).send({
        status: "success",
        message: "Listado de usuarios que me siguen.",
        follows,
        total,
        pages: Math.ceil(total / itemsPerPage),
        user_following: followUserIds.following,
        user_follow_me: followUserIds.followers,
      });
    });
};

// Exportar acciones.
module.exports = {
  pruebaFollow,
  save,
  unfollow,
  followers,
  following,
};
