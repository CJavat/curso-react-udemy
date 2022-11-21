import React from "react";
import { Link, LinkNav } from "react-router-dom";
import { trabajos } from "../data/trabajos";
import { ListadoTrabajos } from "./ListadoTrabajos";

export const Portafolio = () => {
  return (
    <div className="page">
      <h1 className="heading">Portafolio</h1>
      <ListadoTrabajos />
    </div>
  );
};
