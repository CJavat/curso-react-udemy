import React from "react";
import { useMayus } from "../hooks/useMayus";

export const PruebasCustom = () => {
  const { estado, mayusculas, minusculas, concatenar } =
    useMayus("Daniel Javato");

  return (
    <div>
      <h1>Probando componentes personalizados</h1>
      {estado}
      <br />
      <button onClick={mayusculas}>Poner en Mayusculas</button>
      &nbsp;
      <button onClick={minusculas}>Poner en Minusculas</button>
      &nbsp;
      <button onClick={(e) => concatenar(" <- Hola")}>
        Poner en Minusculas
      </button>
    </div>
  );
};
