import React from "react";

function EventosComponente() {
  const hasDadoClick = (e, nombre) => {
    alert("Has dado click al botón." + nombre);
  };

  const hasDadoDobleClick = (e) => {
    console.log("Has dado doble click al botón.");
  };

  const hasEntrado = (e, accion) => {
    console.log(`Has ${accion} a la caja con el Mouse.`);
  };

  const hasSalido = (e, accion) => {
    console.log(`Has ${accion} a la caja con el Mouse.`);
  };

  const estasDentro = () => {
    console.log("Estas dentro del input. Mete tu nombre.");
  };
  const estasFuera = () => {
    console.log("Estas fuera del input.");
  };

  return (
    <div>
      <h1>Eventos en react</h1>
      {/* Evento Click */}
      <button onClick={(e) => hasDadoClick(e, "Victor")}>Dame Click</button>
      <button onDoubleClick={hasDadoDobleClick}>Dame Doble Click</button>
      <div
        id="caja"
        onMouseEnter={(e) => hasEntrado(e, "entrado")}
        onMouseLeave={(e) => hasSalido(e, "salido")}
      >
        {/* Evento OnMuseEnter y onMouseLeave */}
        Pasa por encima
      </div>

      <p>
        <input
          type="text"
          onFocus={estasDentro}
          onBlur={estasFuera}
          placeholder="Introduce tu nombre"
        />
      </p>
    </div>
  );
}

export default EventosComponente;
