import React, { useId } from "react";

export const MiComponente = () => {
  const id = useId();

  return (
    <div>
      <h1>Hook useID</h1>
      <input type="text" id={id} name="nombre" placeholder="nombre" />
    </div>
  );
};
