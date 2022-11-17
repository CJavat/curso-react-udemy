import React, { useEffect } from "react";

export const AvisoComponent = () => {
  useEffect(() => {
    // Se detecta cuando el componente se monta.
    alert("El componente AvisoComponent esta montado");

    // Cuando el componente se desmonta.
    return () => {
      alert("Componente desmontado.");
    };
  }, []); // Se ejecuta una vez porque se le pasa el array vacio.

  return (
    <div>
      <hr />
      <h3>"Hola, carlos".</h3>
      <button
        onClick={(e) => {
          alert("Bienvenido");
        }}
      >
        Mostrar alerta
      </button>
    </div>
  );
};
