import React, { useState } from "react";

export const FormularioComponent = () => {
  const [usuario, setUsuario] = useState({});

  const conseguirDatosFormulario = (e) => {
    e.preventDefault();

    let datos = e.target;

    let user = {
      nombre: datos.nombre.value,
      apellido: datos.apellido.value,
      genero: datos.genero.value,
      bio: datos.bio.value,
      enviar: datos.enviar.value,
    };

    console.log(user);
    setUsuario(user);
  };

  const cambiarDatos = (e) => {
    console.log(e.target.name);
    let nameDelInput = e.target.name;
    // let usuarioParaModificar = usuario;

    // usuarioParaModificar[nameDelInput] = e.target.value;
    setUsuario((estadoPrevio) => {
      // console.log("Estado previo: ", estadoPrevio);
      return {
        ...estadoPrevio,
        [nameDelInput]: e.target.value,
      };
    });
  };

  return (
    <div>
      <h1>Formularios con React</h1>

      {usuario.enviar && (
        <div className="info-usuario label label-gray">
          {usuario.nombre} {usuario.apellido} es un {usuario.genero} y su
          biografia es: {usuario.bio}
        </div>
      )}

      <form onSubmit={conseguirDatosFormulario}>
        <input
          name="nombre"
          type="text"
          placeholder="Nombre"
          onChange={cambiarDatos}
        />
        <input
          name="apellido"
          type="text"
          placeholder="Apellido"
          onChange={cambiarDatos}
        />
        <select name="genero" id="genero" onChange={cambiarDatos}>
          <option value="Hombre">Hombre</option>
          <option value="Mujer">Mujer</option>
        </select>
        <textarea
          name="bio"
          id="bio"
          cols="30"
          rows="10"
          placeholder="Biografia"
          onChange={cambiarDatos}
        ></textarea>
        <input type="submit" value="enviar" name="enviar" />
      </form>
    </div>
  );
};
