import React from "react";
import { NavLink } from "react-router-dom";

export const Nav = () => {
  return (
    /* Barra de navegación */
    <nav className="nav">
      <ul>
        <li>
          <NavLink to="/inicio">Inicio</NavLink>
        </li>
        <li>
          <NavLink to="/articulos">Articulos</NavLink>
        </li>
        <li>
          <NavLink to="/crear-articulos">Crear Artículos</NavLink>
        </li>
        <li>
          <NavLink to="/contacto">Contacto</NavLink>
        </li>
      </ul>
    </nav>
  );
};
