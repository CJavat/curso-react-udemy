const express = require("express");
const router = express.Router();
const {
  pruebaFollow,
  save,
  unfollow,
  followers,
  following,
} = require("../controllers/follow.controller");
const check = require("../middlewares/auth");

// Definir las rutas.
router.get("/prueba-follow", pruebaFollow);
router.post("/save", check.auth, save);
router.delete("/unfollow/:id", check.auth, unfollow);
router.get("/followers/:id?/:page?", check.auth, followers);
router.get("/following/:id?/:page?", check.auth, following);

// Exportar el ruter.
module.exports = router;
