import React from "react";

export const SegundoComponente = () => {
  const libros = ["Harry Poter", "Juego de tronos", "Clean Code"];
  // const libros = [];

  return (
    <div className="segundo-componente">
      <h1>Listado de libros</h1>
      {libros.length >= 1 ? (
        <ul>
          {libros.map((libro, indice) => {
            return <li key={indice}>{libro}</li>;
          })}
        </ul>
      ) : (
        <p>NO HAY LIBROS</p>
      )}
    </div>
  );
};
