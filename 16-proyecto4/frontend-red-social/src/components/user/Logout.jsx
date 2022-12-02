import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export const Logout = () => {
  const { setAuth, setCounters } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Vaciar LocalStorage.
    localStorage.clear();

    // Setear estados globales a vacio.
    setAuth({});
    setCounters({});

    // Navigate (redireccion) al Login.
    navigate("/login");
  }, []);

  return <div>Logout</div>;
};
