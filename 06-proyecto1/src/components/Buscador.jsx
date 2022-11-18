import React from "react";
import { useState } from "react";

export const Buscador = ({ listadoState, setListadoState }) => {
  const [busqueda, setBusqueda] = useState("");
  const [noEncontrado, setNoEncontrado] = useState(false);

  const buscarPelicula = (e) => {
    // Crear estado y actualizarlo.
    setBusqueda(e.target.value);

    // Filtrarlo para buscar coincidencias.
    let peliculasEncontradas = listadoState.filter((pelicula) => {
      return pelicula.titulo.toLowerCase().includes(busqueda.toLowerCase());
    });

    // Comprobar si hay un resultado.
    if (busqueda.length <= 1 || peliculasEncontradas.length <= 0) {
      peliculasEncontradas = JSON.parse(localStorage.getItem("pelis"));
      setNoEncontrado(true);
    } else {
      setNoEncontrado(false);
    }

    // Actualizar el estado del listado principal con lo filtrado.
    setListadoState(peliculasEncontradas);
  };

  return (
    <div className="search">
      <h3 className="title">Buscador {busqueda}</h3>
      {noEncontrado && busqueda.length <= 1 && (
        <span className="no-encontrado">
          No se ha encontrado ninguna coincidencia.
        </span>
      )}
      <form>
        <input
          type="text"
          id="search_field"
          name="busqueda"
          autoComplete="off"
          onChange={buscarPelicula}
        />
        <button id="search">Buscar</button>
      </form>
    </div>
  );
};
