import React from "react";
import { Routes, Route, BrowserRouter, Navigate, Link } from "react-router-dom";
import { PublicLayout } from "../components/layout/public/PublicLayout";
import { PrivateLayout } from "../components/layout/private/PrivateLayout";
import { Login } from "../components/user/Login";
import { Register } from "../components/user/Register";
import { Feed } from "../components/publication/Feed";
import { AuthProvider } from "../context/AuthProvider";

export const Routing = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* RUTAS PUBLICAS. */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Login />} />
            <Route path="login" element={<Login />} />
            <Route path="registro" element={<Register />} />
          </Route>
          {/* RUTAS PRIVADAS */}
          <Route path="/social" element={<PrivateLayout />}>
            <Route index element={<Feed />} />
            <Route path="feed" element={<Feed />} />
          </Route>
          {/* RUTA 404 */}
          <Route
            path="*"
            element={
              <>
                <p>
                  <h1> ERROR 404</h1>
                  <Link to="/">Volver al inicio</Link>
                </p>
              </>
            }
          />
          {/* Despues hacer un componente para la ruta de error. */}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};
