import React, { useState } from "react";
import { useForm } from "../../hooks/useForm";

export const Crear = () => {
  const { formulario, enviado, cambiado } = useForm({});

  const guardarArticulo = (e) => {
    e.preventDefault();

    // Recoger datos formulario.
    let nuevoArticulo = JSON.stringify(formulario);

    // Guardar articulo en el backend.
  };

  return (
    <div className="jumbo">
      <h1>Crear Articulo</h1>
      <p>Formulario para crear un articulo</p>
      <pre>{JSON.stringify(formulario)}</pre>

      {/* Montar formulario */}
      <form className="formulario" onSubmit={guardarArticulo}>
        <div className="form-group">
          <label htmlFor="titulo">Titulo</label>
          <input type="text" name="titulo" id="titulo" onChange={cambiado} />
        </div>

        <div className="form-group">
          <label htmlFor="contenido">Contenido</label>
          <textarea
            type="text"
            name="contenido"
            id="contenido"
            onChange={cambiado}
          />
        </div>

        <div className="form-group">
          <label htmlFor="file0">Imagen</label>
          <input type="file" name="file0" id="file0" />
        </div>

        <input className="btn btn-success" type="submit" value="Guardar" />
      </form>
    </div>
  );
};
