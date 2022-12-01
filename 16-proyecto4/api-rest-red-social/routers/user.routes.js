const express = require("express");
const router = express.Router();
const check = require("../middlewares/auth");
const multer = require("multer");

// Configuración de subida.
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/avatars");
  },
  filename: (req, file, cb) => {
    cb(null, "avatar-" + Date.now() + "-" + file.originalname);
  },
});

const uploads = multer({ storage });

const {
  pruebaUser,
  register,
  login,
  profile,
  list,
  update,
  upload,
  avatar,
  counters,
} = require("../controllers/user.controller");

// Definir las rutas.
router.get("/prueba-usuario", check.auth, pruebaUser);
router.post("/register", register);
router.post("/login", login);
router.get("/profile/:id", check.auth, profile);
router.get("/list/:page?", check.auth, list);
router.put("/update", check.auth, update);
router.post("/upload", [check.auth, uploads.single("file0")], upload);
router.get("/avatar/:file", avatar);
router.get("/counters/:id", check.auth, counters);

// Exportar el ruter.
module.exports = router;
