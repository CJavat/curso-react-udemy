const express = require("express");
const router = express.Router();
const check = require("../middlewares/auth");
const multer = require("multer");

const {
  pruebaPublication,
  save,
  detail,
  remove,
  user,
  upload,
  media,
} = require("../controllers/publication.controller");

// Configuración de subida.
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/publications");
  },
  filename: (req, file, cb) => {
    cb(null, "pub-" + Date.now() + "-" + file.originalname);
  },
});
const uploads = multer({ storage });

// Definir las rutas.
router.get("/prueba-publication", pruebaPublication);
router.post("/save", check.auth, save);
router.get("/detail/:id", check.auth, detail);
router.delete("/remove/:id", check.auth, remove);
router.get("/user/:id/:page?", check.auth, user);
router.post("/upload/:id", [check.auth, uploads.single("file0")], upload);
router.get("/media/:file", check.auth, media);

// Exportar el ruter.
module.exports = router;
