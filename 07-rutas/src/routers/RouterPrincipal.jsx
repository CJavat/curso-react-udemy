import React from "react";
import {
  Routes,
  Route,
  NavLink,
  BrowserRouter,
  Navigate,
} from "react-router-dom";
import { Articulos } from "../components/Articulos";
import { Contacto } from "../components/Contacto";
import { Error404 } from "../components/Error404";
import { Inicio } from "../components/Inicio";
import { PanelControl } from "../components/PanelControl";
import { Persona } from "../components/Persona";
import { InicioPanel } from "../components/panel/Inicio";
import { CrearArticulos } from "../components/panel/CrearArticulos";
import { GestionUsuarios } from "../components/panel/GestionUsuarios";
import { AcercaDe } from "../components/panel/AcercaDe";

export const RouterPrincipal = () => {
  return (
    <BrowserRouter>
      <h1>Cabecera</h1>
      <hr />
      <nav>
        <ul>
          <li>
            <NavLink // HACE EL SPA (Single Page Application). que cambie de pagina/componente sin cargar de nuevo toda la pagina.
              to="/inicio"
              className={({ isActive }) => (isActive ? "activado" : "")}
            >
              Inicio
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/articulos"
              className={({ isActive }) => (isActive ? "activado" : "")}
            >
              Articulos
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contacto"
              className={({ isActive }) => (isActive ? "activado" : "")}
            >
              Contactos
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/panel"
              className={({ isActive }) => (isActive ? "activado" : "")}
            >
              Panel De Control
            </NavLink>
          </li>
        </ul>
      </nav>
      <hr />
      <section className="contenido-principal">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/articulos" element={<Articulos />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/persona/:nombre/:apellido" element={<Persona />} />
          <Route path="/persona/:nombre" element={<Persona />} />
          <Route path="/persona" element={<Persona />} />
          <Route
            path="/redirigir"
            element={<Navigate to="/persona/daniel/plascencia" />}
          />
          {/* Mandar parametros desde la URL. */}
          <Route path="/panel/*" element={<PanelControl />}>
            <Route path="inicio" element={<InicioPanel />} />
            <Route index element={<InicioPanel />} />
            <Route path="crear-articulos" element={<CrearArticulos />} />
            <Route path="gestion-usuarios" element={<GestionUsuarios />} />
            <Route path="acerca-de" element={<AcercaDe />} />
          </Route>
          <Route path="*" element={<Error404 />} />
        </Routes>
      </section>
    </BrowserRouter>
  );
};
