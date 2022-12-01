// Importar modulos.
const fs = require("fs");
const path = require("path");

// Importar modelos.
const Publication = require("../models/publication.model");

// Importar servicios.
const followService = require("../services/followService");

// Acciones de prueba.
const pruebaPublication = (req, res) => {
  return res.status(200).send({
    message: "Mensaje enviado desde: controllers/publication.js",
  });
};

// Guardar publicación.
const save = (req, res) => {
  // Recoger datos del body.
  const params = req.body;

  // Si no llegan, dar respuesta negativa.
  if (!params.text) {
    return res.status(400).send({
      status: "error",
      message: "Debes enviar el texto de la publicación.",
    });
  }

  // Crear y rellenar el objeto del modelo.
  let newPublication = new Publication(params);
  newPublication.user = req.user.id;

  // Guardar objeto en DB.
  newPublication.save((error, publicationStored) => {
    if (error || !publicationStored) {
      return res.status(400).send({
        status: "error",
        message: "No se ha guardado la publicación.",
      });
    }

    return res.status(200).send({
      status: "success",
      message: "Publicación guardada.",
      publicationStored,
    });
  });
};

// Sacar una sola publicación.
const detail = (req, res) => {
  // Sacar id de la publicación de la url.
  const publicationId = req.params.id;

  // Find con la condición del id.
  Publication.findById(publicationId, (error, publicationStored) => {
    if (error || !publicationStored) {
      return res.status(404).send({
        status: "error",
        message: "No existe la publicación",
      });
    }

    // Devolver respuesta.
    return res.status(200).send({
      status: "success",
      message: "Mostrar publicación",
      publication: publicationStored,
    });
  });
};

// Eliminar Publicaciones.
const remove = (req, res) => {
  // Sacar el id de la publicación a eliminar.
  const publicationId = req.params.id;

  // Find y luego un Remove.
  Publication.find({ user: req.user.id, _id: publicationId }).remove(
    (error) => {
      if (error) {
        return res.status(500).send({
          status: "error",
          message: "No se ha podido eliminar publicación",
        });
      }

      // Devolver respuesta.
      return res.status(200).send({
        status: "success",
        message: "Eliminar publicación",
        publication: publicationId,
      });
    }
  );
};

// Listar publicaciones de un usuario.
const user = (req, res) => {
  // Sacar id del usuario.
  const userId = req.params.id;

  // Controlar la página.
  let page = 1;

  if (req.params.page) {
    page = req.params.page;
  }

  const itemsPerPage = 5;

  // Find, populate, ordenar, paginar.
  Publication.find({ user: userId })
    .sort("-create_at")
    .populate("user", "-password -__v -role -email")
    .paginate(page, itemsPerPage, (error, publications, total) => {
      if (error || !publications || publications.length <= 0) {
        return res.status(404).send({
          status: "error",
          message: "No hay publicaciones para mostrar.",
        });
      }

      // Devolver respuesta.
      return res.status(200).send({
        status: "success",
        message: "Publicaciones del perfil de un usuario.",
        page,
        total,
        pages: Math.ceil(total / itemsPerPage),
        publications,
      });
    });
};

// Subir ficheros.
const upload = (req, res) => {
  // Sacar publicationID.
  const publicationId = req.params.id;

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
  Publication.findOneAndUpdate(
    { user: req.user.id, _id: publicationId },
    { file: req.file.filename },
    { new: true },
    (error, publicationUpdate) => {
      if (error || !publicationUpdate) {
        return res.status(500).send({
          status: "error",
          message: "Error en la subida de la publicación.",
        });
      }

      // Devolver respuesta.
      return res.status(200).send({
        status: "success",
        publication: publicationUpdate,
        file: req.file,
      });
    }
  );
};

// Devolver archivos multimedia (imagenes).
const media = (req, res) => {
  // Sacar el parámetro de la URL.
  const file = req.params.file;

  // Montar el Path real de la imágen.
  const filePath = "./uploads/publications/" + file;

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

// Listar todas las publicaciones. (FEED)
const feed = async (req, res) => {
  // Sacar página actual.
  let page = 1;

  if (req.params.page) page = req.params.page;

  // Establecer número de elementos por página.
  let itemsPerPage = 5;

  // Sacar un array de identificadores de usuarios que yo sigo como usuarios logeado.
  try {
    const myFollows = await followService.followUserIds(req.user.id);

    // Fin a publicaciones in, ordenar, popular, paginar.
    const publications = Publication.find({
      user: myFollows.following, // <-- Es lo mismo que hacer lo de abajo.
      // user: { $in: myFollows.following },
    })
      .populate("user", "-password -role -__v -email")
      .sort("-create_at")
      .paginate(page, itemsPerPage, (error, publications, total) => {
        if (error || !publications) {
          return res.status(500).send({
            status: "error",
            message: "No hay publicaciones para mostrar.",
          });
        }

        // Devolver respuesta.
        return res.status(200).send({
          status: "success",
          message: "Feed de publicaciones",
          myFollows: myFollows.following,
          total,
          page,
          pages: Math.ceil(total / itemsPerPage),
          publications,
        });
      });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: "No se han listado las publicaciones del feed",
    });
  }
};

// Exportar acciones.
module.exports = {
  pruebaPublication,
  save,
  detail,
  remove,
  user,
  upload,
  media,
  feed,
};
