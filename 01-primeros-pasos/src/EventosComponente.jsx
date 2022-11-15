import React from "react";

function EventosComponente() {
  const hasDadoClick = (e, nombre) => {
    alert("Has dado click al botón." + nombre);
  };

  return (
    <div>
      <h1>Eventos en react</h1>
      {/* Evento Click */}
      <button onClick={(e) => hasDadoClick(e, "Victor")}>Dame Click</button>
    </div>
  );
}

export default EventosComponente;
