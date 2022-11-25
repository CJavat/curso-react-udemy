const express = require("express");
const multer = require("multer");
const {
  prueba,
  curso,
  crear,
  listar,
  uno,
  borrar,
  editar,
  subir,
  imagen,
  buscador,
} = require("../controllers/articulo.controller");

router = express.Router();
const almacenamiento = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./imagenes/articulos/");
  },
  filename: function (req, file, cb) {
    cb(null, "articulo" + Date.now() + file.originalname);
  },
});

const subidas = multer({ storage: almacenamiento });

// Ruta de prueba.
router.get("/ruta-de-prueba", prueba);
router.get("/curso", curso);

// Ruta util.
router.post("/crear", crear);
router.get("/articulos/:ultimos?", listar); // Se le pone un filtro opcional. Con la ? indicamos que es un parametro opcional.
router.get("/articulo/:id", uno); // Se le pone un filtro obligatorio. Sin la ? significa que es obligatorio el parámetro.
router.delete("/articulo/:id", borrar); // Ruta para eliminar un documento.
router.put("/articulo/:id", editar); // Ruta para actualizar un documento.
router.post("/subir-imagen/:id", subidas.single("file0"), subir);
router.get("/imagen/:fichero", imagen);
router.get("/buscar/:busqueda", buscador);

module.exports = router;
