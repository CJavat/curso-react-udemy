import React, { useState, useEffect } from "react";

export const MiUsuario = () => {
  const [usuario, setUsuario] = useState({
    datos: null,
    cargando: true,
  });

  const getUsuario = async (url) => {
    const peticion = await fetch(url);
    const { data: datos } = await peticion.json();

    setUsuario({ datos, cargando: false });
  };

  const getId = (e) => {
    let id = parseInt(e.target.value);
    let url = `https://reqres.in/api/users/${id}`;

    getUsuario(url);
  };

  useEffect(() => {
    getUsuario("https://reqres.in/api/users/1");
  }, []);

  return (
    <div>
      <h1>Mi Usuario:</h1>
      <p>Datos del usuario:</p>
      <p>{usuario.cargando ? "Cargando..." : ""}</p>
      {/* La "?" es como un if. Hace que no lo imprima si no existe. */}
      <p>{usuario?.datos?.first_name}</p>
      <input type="number" name="id" placeholder="" onChange={getId} />
    </div>
  );
};
