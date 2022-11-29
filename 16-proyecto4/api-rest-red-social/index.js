// Importar dependencias.
const connection = require("./database/connection");
const express = require("express");
const cors = require("cors");

// Mensaje de bienvenida.
console.log("API NODE para RED SOCIAL arrancada");

// Conexión a DB.
connection();

// Crear servidor node.
const app = express();
const PORT = 3900;

// Configurar cors.
app.use(cors());

// Convertir los datos del body a objetos js.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cargar conf rutas.
const userRoutes = require("./routers/user.routes");
const publicationRoutes = require("./routers/publication.routes");
const followRoutes = require("./routers/follow.routes");

// End-Ponits.
app.use("/api/user", userRoutes);
app.use("/api/publication", publicationRoutes);
app.use("/api/follow", followRoutes);

// Ruta de prueba.
app.get("/ruta-prueba", (req, res) => {
  return res.status(200).json({
    id: 1,
    nombre: "Daniel",
    web: "javato.com",
  });
});

// Poner servidor a escuchar peticiones http.
app.listen(PORT, () => {
  console.log("Servidor escuchando en el puerto: " + PORT);
});
