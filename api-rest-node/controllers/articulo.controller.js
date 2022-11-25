const { validarArticulo } = require("../helpers/validar");
const Articulo = require("../models/Articulo");

const prueba = (req, res) => {
  return res.status(200).json({
    mensaje: "Soy una acción de prueba en mi controlador de artículos.",
  });
};

const curso = (req, res) => {
  console.log("Se ha ejecutado el endpoint PROBANDO");

  return res.status(200).json([
    {
      curso: "Master en React",
      autor: "CJavat",
      url: "daniel.com",
    },
    {
      curso: "Master en React",
      autor: "CJavat",
      url: "daniel.com",
    },
  ]);
};

const crear = (req, res) => {
  // Recoger los parámetros por POST a guardar.
  let parametros = req.body;
  console.log(parametros);

  // Válidar los datos.
  try {
    validarArticulo(parametros);
  } catch (error) {
    return res.status(400).json({
      status: error,
      mensaje: "Faltan datos por envíar.",
    });
  }

  // Crear el objeto a guardar.
  const articulo = new Articulo(parametros);

  // Asignar valores a objeto basado en el módelo. (Manual o Automático)

  // (Manual)
  // articulo.titulo = parametros.titulo;
  // articulo.contenido = parametros.contenido;

  // (Automático)
  // Al crear el objeto meterle de parametro la variable que tienene la "req.body".

  // Guardar artículo en la DB.
  articulo.save((error, articuloGuardado) => {
    if (error || !articuloGuardado) {
      return res.status(400).json({
        status: error,
        mensaje: "No se ha guardado el artículo.",
      });
    }

    //Devolver el resultado.
    return res.status(200).json({
      status: "Success.",
      articulo: articuloGuardado,
      mensaje: "Artículo guardado con éxito.",
    });
  });
};

const listar = (req, res) => {
  let consulta = Articulo.find({});

  if (req.params.ultimos) {
    // Comprobamos que sí nos llegó ese parametro, entonces, ponemos un límite a la consulta.
    consulta.limit(req.params.ultimos);
  }

  consulta.sort({ fecha: -1 }).exec((error, articulos) => {
    if (error || !articulos) {
      return res.status(404).json({
        status: error,
        mensaje: "No se han encontrado artículos.",
      });
    }

    return res.status(200).json({
      status: "Success",
      parametro: req.params.ultimos,
      contador: articulos.length,
      articulos,
    });
  });
};

const uno = (req, res) => {
  // Recoger un id por la url.
  let id = req.params.id;

  // Buscar el artículo.
  Articulo.findById(id, (error, articulo) => {
    // Si no existe, devolver error.
    if (error || !articulo) {
      return res.status(404).json({
        status: error,
        mensaje: "No se han encontrado el artículo.",
      });
    }

    // Devolver resultado.
    return res.status(200).json({
      status: "Success",
      articulo,
    });
  });
};

const borrar = (req, res) => {
  let articulo_id = req.params.id;

  Articulo.findOneAndDelete({ _id: articulo_id }, (error, articuloBorrado) => {
    if (error || !articuloBorrado) {
      return res.status(500).json({
        status: "error",
        mensaje: "Error al borrar el artículo.",
      });
    }

    return res.status(200).json({
      status: "Success",
      articulo: articuloBorrado,
      mensaje: "Método de borrar",
    });
  });
};

const editar = (req, res) => {
  // Recoger id articulo a editar.
  let articuloId = req.params.id;

  // Recoger datos del body.
  let parametros = req.body;

  // Válidar datos.
  try {
    validarArticulo(parametros);
  } catch (error) {
    return res.status(400).json({
      status: error,
      mensaje: "Faltan datos por envíar.",
    });
  }
  // Buscar y actualizar artículo.
  Articulo.findOneAndUpdate(
    { _id: articuloId },
    parametros,
    { new: true },
    (error, articuloActualizado) => {
      if (error || !articuloActualizado) {
        return res
          .status(500)
          .json({ status: "error", mensaje: "Error al actualizar" });
      }

      // Devolver respuesta.
      return res
        .status(200)
        .json({ status: "success", articulo: articuloActualizado });
    }
  );
};

module.exports = {
  prueba,
  curso,
  crear,
  listar,
  uno,
  borrar,
  editar,
};
