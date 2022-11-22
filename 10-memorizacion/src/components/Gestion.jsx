import React, { useRef, useState, useCallback } from "react";
import { Empleados } from "./Empleados";

export const Gestion = () => {
  const [nombre, setNombre] = useState("");
  const gestorInput = useRef();
  const [pagina, setPagina] = useState(1);

  const asignarGestor = (e) => {
    setNombre(gestorInput.current.value);
  };

  const mostrarMensaje = useCallback(() => {
    console.log("Hola, que tal, soy un mensaje desde el componente empleados.");
  }, [pagina]);

  return (
    <div>
      <h1>Nombre del gestor: {nombre}</h1>
      <input
        type="text"
        ref={gestorInput}
        onChange={asignarGestor}
        placeholder="Introduce tu nombre de gestor"
      />

      <h2>Listado de empleados:</h2>
      <p>
        Los usuarios son gestionados por {nombre} vienen de jsonplaceholder...
      </p>
      <button onClick={() => setPagina(1)}>Pagina 1</button>
      <button onClick={() => setPagina(2)}>Pagina 2</button>
      <Empleados pagina={pagina} mensaje={mostrarMensaje} />
    </div>
  );
};
