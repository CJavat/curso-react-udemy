const express = require("express");
router = express.Router();

const {
  prueba,
  curso,
  crear,
  listar,
  uno,
  borrar,
  editar,
} = require("../controllers/articulo.controller");

// Ruta de prueba.
router.get("/ruta-de-prueba", prueba);
router.get("/curso", curso);

// Ruta util.
router.post("/crear", crear);
router.get("/articulos/:ultimos?", listar); // Se le pone un filtro opcional. Con la ? indicamos que es un parametro opcional.
router.get("/articulo/:id", uno); // Se le pone un filtro obligatorio. Sin la ? significa que es obligatorio el parámetro.
router.delete("/articulo/:id", borrar); // Ruta para eliminar un documento.
router.put("/articulo/:id", editar); // Ruta para actualizar un documento.

module.exports = router;
