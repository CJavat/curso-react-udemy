const { conexion } = require("./database/conexion");
const express = require("express");
const cors = require("cors");

// Inicializar app.
console.log("App de node arrancada");

// Conectar a la DB.
conexion();

// Crear servidor Node.
const app = express();
const PORT = 3900;

// Configurar CORs.
app.use(cors());

// Convertir body a objeto JS.
app.use(express.json()); // Recibir datos con Content-Type application/json.
app.use(express.urlencoded({ extended: true })); // Recibir datos que vienen en form-urlencoded. y los convierte a JSON con el extended.

// Cargar rutas.
const rutas_articulo = require("./routes/articulo.routes");
app.use("/api", rutas_articulo);

// Rutas prueba hardcoreadas.
app.get("/probando", (req, res) => {
  console.log("Se ha ejecutado el endpoint PROBANDO");

  return res.status(200).json([
    {
      curso: "Master en React",
      autor: "CJavat",
      url: "daniel.com",
    },
    {
      curso: "Master en React",
      autor: "CJavat",
      url: "daniel.com",
    },
  ]);
});

app.get("/", (req, res) => {
  return res
    .status(200)
    .send("<h1> Empezando a crear una api rest con node </h1>");
});

// Crear y escuchar peticiones http.
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto: ${PORT}`);
});
