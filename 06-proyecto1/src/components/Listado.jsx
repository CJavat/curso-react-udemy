import React, { useEffect, useState } from "react";
import { Editar } from "./Editar";

export const Listado = ({ listadoState, setListadoState }) => {
  // HOOKS.
  // const [listadoState, setListadoState] = useState([]);

  const [editar, setEditar] = useState(0);

  useEffect(() => {
    conseguirPeliculas();
  }, []);

  // MÉTODOS.
  const conseguirPeliculas = () => {
    const peliculas = JSON.parse(localStorage.getItem("pelis"));
    setListadoState(peliculas);

    return peliculas;
  };

  const borrarPeli = (id) => {
    // Conseguir peliculas almacenadas.
    let pelisAlmacenadas = conseguirPeliculas();

    // Filtrar esas peliculas para que elimine del array la que no quiero.
    let nuevoArrayPeliculas = pelisAlmacenadas.filter(
      (peli) => peli.id !== parseInt(id)
    );

    // Actualizar estado del listado.
    setListadoState(nuevoArrayPeliculas);

    // Actualizar los datos en el LocalStorage.
    localStorage.setItem("pelis", JSON.stringify(nuevoArrayPeliculas));
  };

  return (
    <>
      {listadoState !== null ? (
        listadoState.length > 0 ? (
          listadoState.map((peli) => {
            return (
              <article key={peli.id} className="peli-item">
                <h3 className="title">{peli.titulo}</h3>
                <p className="description">{peli.descripcion}</p>

                <button
                  className="edit"
                  onClick={() => {
                    setEditar(peli.id);
                  }}
                >
                  Editar
                </button>
                <button className="delete" onClick={() => borrarPeli(peli.id)}>
                  Borrar
                </button>

                {/* Aparece formulario de editar. */}
                {editar === peli.id && (
                  <Editar
                    peli={peli}
                    conseguirPeliculas={conseguirPeliculas}
                    setEditar={setEditar}
                    setListadoState={setListadoState}
                  />
                )}
              </article>
            );
          })
        ) : (
          <h1>No hay Peliculas</h1>
        )
      ) : (
        <h1>No hay Peliculas</h1>
      )}
    </>
  );
};
