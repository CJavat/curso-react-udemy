import React from "react";
import { useForm } from "../hooks/useForm";

export const MiFormulario = () => {
  const { formulario, enviado, cambiado } = useForm({});

  return (
    <div>
      <h1>MiFormulario</h1>
      <p>Formulario para guardar un curso</p>
      <p>Curso guardado: {formulario.titulo}</p>
      <pre className="codigo">{JSON.stringify(formulario)}</pre>

      <form className="mi-formulario" onSubmit={enviado}>
        <input
          type="text"
          name="titulo"
          placeholder="Titulo"
          onChange={cambiado}
        />
        <input
          type="number"
          name="anio"
          placeholder="Año de publicación"
          onChange={cambiado}
        />
        <textarea
          name="descripcion"
          placeholder="Descripción"
          onChange={cambiado}
        />
        <input
          type="text"
          name="autor"
          placeholder="Autor"
          onChange={cambiado}
        />
        <input
          type="email"
          name="email"
          placeholder="E-Mail"
          onChange={cambiado}
        />
        <input type="submit" value="Enviar" />
      </form>
    </div>
  );
};
