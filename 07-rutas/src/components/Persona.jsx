import React from "react";
import { useNavigate, useParams } from "react-router-dom";

export const Persona = () => {
  const { nombre = "Javato", apellido = "Plascencia" } = useParams(); // OTRO HOOK. SE UTILIZA PARA OBENER LOS PARAMETROS DE UN LINK.
  /* SE LE ASIGNAN VALORES POR DEFECTOS, PARA QUE EN CASO DE QUE NO ESCRIBAN LOS PARAMEROS, NO PASE NADA. */

  const navegar = useNavigate();

  const enviar = (e) => {
    e.preventDefault();
    let nombre = e.target.nombre.value;
    let apellido = e.target.apellido.value;
    const url = `/persona/${nombre}/${apellido}`;

    if (nombre.length <= 0 && apellido.length <= 0) navegar("/inicio");
    else if (nombre === "contacto") navegar("/contacto");
    else navegar(url);
  };

  return (
    <div>
      <h1>
        Pagina de Persona: {nombre} {apellido}
      </h1>
      <p>Esta es la pagina de Persona</p>
      <form onSubmit={enviar}>
        <input type="text" name="nombre" />
        <input type="text" name="apellido" />
        <input type="submit" name="enviar" value="Enviar" />
      </form>
    </div>
  );
};
