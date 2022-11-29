const express = require("express");
const router = express.Router();
const {
  pruebaUser,
  register,
  login,
} = require("../controllers/user.controller");

// Definir las rutas.
router.get("/prueba-usuario", pruebaUser);
router.post("/register", register);
router.post("/login", login);

// Exportar el ruter.
module.exports = router;
