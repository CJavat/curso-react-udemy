import React from "react";
import { useMayus } from "../hooks/useMayus";

export const PruebasCustom = () => {
  const { mayusculas } = useMayus("daniel plascencia");

  // mayusculas("Holas");

  return (
    <div>
      <h1>Probando componentes personalizados</h1>
    </div>
  );
};
