import React from "react";

export const Editar = ({
  peli,
  conseguirPeliculas,
  setEditar,
  setListadoState,
}) => {
  const tituloComponente = "Editar Película";

  const guardarEdicion = (e, id) => {
    e.preventDefault();

    // Conseguir el target del evento.
    let target = e.target;

    // Buscar el índice del objeto de la película a actualizar.
    const peliculasAlmacenadas = conseguirPeliculas();
    const indice = peliculasAlmacenadas.findIndex((peli) => peli.id === id); // Obtener el indice del array en donde esta ese objeto.

    // Crear objeto con ese índice.
    let peliculaActualizada = {
      id,
      titulo: target.titulo.value,
      descripcion: target.descripcion.value,
    };

    // Actualizar el elemento con ese índice.
    peliculasAlmacenadas[indice] = peliculaActualizada;

    // Guardar el nuevo Array de objetos en el LocalStorage.
    localStorage.setItem("pelis", JSON.stringify(peliculasAlmacenadas));

    // Y Actualizar estados.
    setListadoState(peliculasAlmacenadas);
    setEditar(0);
  };

  return (
    <div className="edit_form">
      <h3 className="title">{tituloComponente}</h3>
      <form onSubmit={(e) => guardarEdicion(e, peli.id)}>
        <input
          type="text"
          name="titulo"
          className="titulo_editado"
          defaultValue={peli.titulo}
        />
        <textarea
          name="descripcion"
          defaultValue={peli.descripcion}
          className="descripcion_editada"
        />
        <input type="submit" className="editar" value="Actualizar" />
      </form>
    </div>
  );
};
