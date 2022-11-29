const { Schema, model } = require("mongoose");

// Definir el esquema de la base de datos.
const ArticuloSchema = Schema({
  titulo: {
    type: String,
    required: true,
  },
  contenido: {
    type: String,
    required: true,
  },
  fecha: {
    type: Date,
    default: Date.now(),
  },
  imagen: {
    type: String,
    default: "default.png",
  },
});

// Exportar el modelo:
module.exports = model("Articulo", ArticuloSchema, "articulos");
// Sintaxis: model("nombreDelModelo", nombreDelEsquema, (Opcional: nombreDeCollection));
