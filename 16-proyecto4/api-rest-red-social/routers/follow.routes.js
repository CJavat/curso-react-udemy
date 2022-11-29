const express = require("express");
const router = express.Router();
const { pruebaFollow } = require("../controllers/follow.controller");

// Definir las rutas.
router.get("/prueba-follow", pruebaFollow);

// Exportar el ruter.
module.exports = router;
