import React, { useState, useEffect } from "react";
import { Global } from "../../helpers/Global";

export const Articulos = () => {
  const [articulos, setArticulos] = useState([]);

  useEffect(() => {
    conseguirArticulos();
    // setArticulos(articulos);
  }, []);

  const conseguirArticulos = async () => {
    const url = Global.url + "articulos";
    const peticion = await fetch(url, {
      method: "GET",
    });
    const datos = await peticion.json();

    if (datos.status === "Success") {
      setArticulos(datos.articulos);
    }
  };

  return (
    <>
      {/* aqui van las película */}
      {articulos.length >= 1 ? (
        articulos.map((articulo) => {
          return (
            <article key={articulo._id} className="articulo-item">
              <div className="mascara">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/800px-Unofficial_JavaScript_logo_2.svg.png"
                  alt="imagen de prueba"
                />
              </div>
              <div className="datos">
                <h3 className="title">{articulo.titulo}</h3>
                <p className="description">{articulo.contenido}</p>
                <button className="edit">Editar</button>
                <button className="delete">Borrar</button>
              </div>
            </article>
          );
        })
      ) : (
        <h1>No hay artículos que mostrar</h1>
      )}
    </>
  );
};
