import React from "react";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import { Articulos } from "../components/Articulos";
import { Contacto } from "../components/Contacto";
import { Error404 } from "../components/Error404";
import { Inicio } from "../components/Inicio";

export const RouterPrincipal = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/articulos" element={<Articulos />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
};
