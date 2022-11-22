import React, { useLayoutEffect, useState, useEffect, useRef } from "react";

export const EjemploComponent = () => {
  const [mostrar, setMostrar] = useState(false);
  const caja = useRef();
  const boton = useRef();

  useLayoutEffect(() => {
    console.log("useLayoutEffect: componente cargado!!");
  }, [mostrar]);

  useEffect(() => {
    console.log("useEffect: componente cargado!!");
    if (caja.current === null) return;
    const { bottom } = boton.current.getBoundingClientRect();

    console.log(bottom);
  }, [mostrar]);

  return (
    <div>
      <h1>Ejemplo useEffect y useLayoutEffect</h1>
      <button ref={boton} onClick={() => setMostrar((prev) => !prev)}>
        Mostrar mensaje {mostrar}
      </button>
      {mostrar && <div id="caja" ref={caja}></div>}
    </div>
  );
};
