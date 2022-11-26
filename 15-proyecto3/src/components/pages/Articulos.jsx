import React, { useState, useEffect } from "react";
import { Peticion } from "../../helpers/Peticion";
import { Global } from "../../helpers/Global";
import { Listado } from "./Listado";

export const Articulos = () => {
  const [articulos, setArticulos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    conseguirArticulos();
  }, []);

  const conseguirArticulos = async () => {
    const { datos, cargando } = await Peticion(Global.url + "articulos", "GET");

    if (datos.status === "Success") {
      setArticulos(datos.articulos);
      setCargando(false);
    }
  };

  return (
    <>
      {/* aqui van las película */}
      {cargando ? (
        "Cargando.."
      ) : articulos.length >= 1 ? (
        <Listado articulos={articulos} setArticulos={setArticulos} />
      ) : (
        <h1>No hay artículos que mostrar</h1>
      )}
    </>
  );
};
