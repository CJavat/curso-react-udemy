const mongoose = require("mongoose");

const connection = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/red-social");
    console.log("Conectado correctamente a BD: red-social");
  } catch (error) {
    console.log(error);
    throw new Error("No se ha podido conectar a la Base de Datos.");
  }
};

module.exports = connection;
