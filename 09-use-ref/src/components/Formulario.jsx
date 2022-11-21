import React, { useRef } from "react";

export const Formulario = () => {
  const nombreInput = useRef();
  const apellidoInput = useRef();
  const emailInput = useRef();
  const miCaja = useRef();

  const mostrar = (e) => {
    e.preventDefault();
    console.log(nombreInput);
    console.log(apellidoInput);
    console.log(emailInput);

    // Mi Caja.
    console.log(miCaja);
    let { current: caja } = miCaja; // Se crea una variable caja que tendra el valor de "miCaja.current" dentro de ella para no escribir todo eso y solo escribir "caja".
    caja.classList.add("fondoVerde");
    caja.innerHTML = "Formulario enviado";
  };

  return (
    <div>
      <h1>Formulario</h1>

      <div className="mi-caja" ref={miCaja}>
        <h2>Pruebas con UseRef </h2>
      </div>

      <form onSubmit={mostrar}>
        <input type="text" placeholder="Nombre" ref={nombreInput} />
        <br />
        <input type="text" placeholder="Apellidos" ref={apellidoInput} />
        <br />
        <input type="text" placeholder="Correo Electronico" ref={emailInput} />
        <br />
        <input type="submit" value="Enviar" />
      </form>

      <button onClick={() => nombreInput.current.select()}>
        Empezar a rellenar el formulario
      </button>
    </div>
  );
};
