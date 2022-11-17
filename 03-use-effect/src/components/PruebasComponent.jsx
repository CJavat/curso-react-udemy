import React, { useState, useEffect } from "react";

export const PruebasComponent = () => {
  const [usuario, setUsuario] = useState("Javato");
  const [fecha, setFecha] = useState("01/01/1998");
  const [contador, setContador] = useState(0);

  const modificarUsuario = (e) => {
    setUsuario(e.target.value);

    // console.log("Ha habido un cambio en el estado.");
  };

  const cambiarFecha = () => {
    setFecha(new Date().toLocaleDateString());
  };

  useEffect(() => {
    console.log("Has cargado el componente: PruebasComponent.");
  }, []); // El segundo parametro es para indicar cuantas veces se va a ejecutar.
  useEffect(() => {
    setContador(contador + 1);
    console.log("Has modificado el usuario: " + contador);
  }, [usuario]);

  return (
    <div>
      <h1>El efecto - UseEffect</h1>
      <strong className={contador >= 10 ? "label label-green" : "label"}>
        {usuario}
      </strong>
      <strong className="label">{fecha}</strong>
      &nbsp;
      <p>
        <input
          onChange={modificarUsuario}
          type="text"
          placeholder="Cambiar el nombre"
        />

        <button onClick={cambiarFecha}>Cambiar fecha</button>
      </p>
    </div>
  );
};

// UseEffect --> Sirve para cuando hay algún cambio en un componente, se ejecuta lo que hay dentro de ese Hook.
