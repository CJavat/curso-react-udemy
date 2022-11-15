import React from "react";

function MiComponente(props) {
  /* let nombre = "Victor";
  let web = "victorrobles.es";
 */
  let usuario = {
    nombre: "Victor",
    apellidos: "Robles",
    web: "victorrobles.es",
  };

  return (
    <div className="mi-componente">
      <hr />
      <h2>Componente creado</h2>
      <h3>Datos del usuario</h3>
      <ul>
        <li>
          Nombre: <strong>{usuario.nombre}</strong>
        </li>
        <li>
          Apellido: <strong>{usuario.apellidos}</strong>
        </li>
        <li>
          Web: <strong>{usuario.web}</strong>
        </li>
      </ul>
    </div>
  );
}

export default MiComponente;
