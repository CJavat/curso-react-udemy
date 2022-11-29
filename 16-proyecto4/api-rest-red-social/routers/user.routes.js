const express = require("express");
const router = express.Router();
const check = require("../middlewares/auth");
const {
  pruebaUser,
  register,
  login,
  profile,
  list,
} = require("../controllers/user.controller");

// Definir las rutas.
router.get("/prueba-usuario", check.auth, pruebaUser);
router.post("/register", register);
router.post("/login", login);
router.get("/profile/:id", check.auth, profile);
router.get("/list/:page?", check.auth, list);

// Exportar el ruter.
module.exports = router;
