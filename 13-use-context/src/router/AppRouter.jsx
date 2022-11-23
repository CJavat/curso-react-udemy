import React from "react";
import { useContext } from "react";
import { Routes, Route, NavLink, BrowserRouter } from "react-router-dom";
import { Acerca } from "../components/Acerca";
import { Articulos } from "../components/Articulos";
import { Contacto } from "../components/Contacto";
import { Error404 } from "../components/Error404";
import { Inicio } from "../components/Inicio";
import { Login } from "../components/Login";
import { PruebaContext } from "../context/PruebaContext";

export const AppRouter = () => {
  const { usuario, setUsuario } = useContext(PruebaContext);

  return (
    <BrowserRouter>
      <header className="header">
        {/* MENU DE NAVEGACION */}
        <nav>
          <div className="logo">
            <h2>Aprendiendo React Context</h2>
          </div>
          <ul>
            <li>
              <NavLink to="/">Inicio</NavLink>
            </li>
            <li>
              <NavLink to="/articulos">Artículos</NavLink>
            </li>
            <li>
              <NavLink to="/acerca-de">Acerca De</NavLink>
            </li>
            <li>
              <NavLink to="/contacto">Contacto</NavLink>
            </li>

            {usuario.hasOwnProperty("username") && usuario.username !== null ? (
              <>
                <li>
                  <NavLink to="/">{usuario.username}</NavLink>
                </li>
                <li>
                  <a
                    href="/#"
                    onClick={(e) => {
                      e.preventDefault();
                      setUsuario({});
                    }}
                  >
                    Cerrar Sesión
                  </a>
                </li>
              </>
            ) : (
              <NavLink to="/login">Identificate</NavLink>
            )}
          </ul>
        </nav>
      </header>
      <section className="content">
        {/* CONFIGURAR RUTAS */}
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/articulos" element={<Articulos />} />
          <Route path="/acerca-de" element={<Acerca />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </section>
    </BrowserRouter>
  );
};
