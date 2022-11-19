import React from "react";
import { Link } from "react-router-dom";

export const Error404 = () => {
  return (
    <>
      <h1>
        ERROR 404: <strong>Not Found</strong>
      </h1>
      <p>PÁGINA NO ENCONTRADA</p>
      <Link to="/Inicio">Volver al inicio</Link>{" "}
      {/* Carga otra ruta sin cargar la pagina de nuevo. */}
    </>
  );
};
