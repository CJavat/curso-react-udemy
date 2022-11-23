import React, { useContext } from "react";
import { PruebaContext } from "../context/PruebaContext";

export const Login = () => {
  const { usuario, setUsuario } = useContext(PruebaContext);

  const guardarDatos = (e) => {
    e.preventDefault();

    let usuarioIdentificado = {
      username: e.target.username.value,
      nombre: e.target.nombre.value,
      web: e.target.web.value,
    };

    setUsuario(usuarioIdentificado);
  };

  return (
    <div>
      <h1>Login</h1>
      <p>Página de Login</p>

      <form className="login" onSubmit={guardarDatos}>
        <input type="text" name="username" placeholder="Username" />
        <input type="text" name="nombre" placeholder="Nombre" />
        <input type="text" name="web" placeholder="Web" />

        <input type="submit" value="Enviar" />
      </form>
    </div>
  );
};
