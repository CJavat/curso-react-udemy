import React, { useState, useEffect } from "react";
import { AvisoComponent } from "./AvisoComponent";

export const PruebasComponent = () => {
  const [usuario, setUsuario] = useState("Javato");
  const [fecha, setFecha] = useState("01/01/1998");
  const [contadorUsuario, setContadorUsuario] = useState(0);
  const [contadorFecha, setContadorFecha] = useState(0);

  const modificarUsuario = (e) => {
    setUsuario(e.target.value);

    // console.log("Ha habido un cambio en el estado.");
  };

  const cambiarFecha = () => {
    setFecha(Date.now);
  };

  useEffect(() => {
    console.log("Has cargado el componente: PruebasComponent.");
  }, []); // El segundo parametro es para indicar cuantas veces se va a ejecutar.

  useEffect(() => {
    setContadorUsuario(contadorUsuario + 1);
    console.log("Has modificado el usuario: " + contadorUsuario);
  }, [usuario]);

  useEffect(() => {
    setContadorFecha(contadorFecha + 1);
    console.log("Has modificado la fecha: " + contadorFecha);
  }, [fecha]);

  return (
    <div>
      <h1>El efecto - UseEffect</h1>
      <strong className={contadorUsuario >= 10 ? "label label-green" : "label"}>
        {usuario}
      </strong>
      <strong className={contadorFecha >= 10 ? "label label-red" : "label"}>
        {fecha}
      </strong>
      &nbsp;
      <p>
        <input
          onChange={modificarUsuario}
          type="text"
          placeholder="Cambiar el nombre"
        />

        <button onClick={cambiarFecha}>Cambiar fecha</button>
      </p>
      {usuario === "Daniel" && <AvisoComponent />}
    </div>
  );
};

// UseEffect --> Sirve para cuando hay algún cambio en un componente, se ejecuta lo que hay dentro de ese Hook.
