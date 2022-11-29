const express = require("express");
const router = express.Router();
const { pruebaPublication } = require("../controllers/publication.controller");

// Definir las rutas.
router.get("/prueba-publication", pruebaPublication);

// Exportar el ruter.
module.exports = router;
