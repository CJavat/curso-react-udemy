import React from "react";

export const Empleados = React.memo(() => {
  console.log("Se ha vuelto a renderizar empleados...");
  return <div>Empleados</div>;
});

// React.memo() --> Sirve para que no se reenderice todo el componente a menos que haya un cambio verdadero.
