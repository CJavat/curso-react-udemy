import React, { createContext, useState, useEffect } from "react";
import { Global } from "../helpers/Global";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [counters, setCounters] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authUser();
  }, []);

  const authUser = async () => {
    // Sacar datos del usuario identificado del LocalStorage.
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    // Comprobar si tengo el token y el user.
    if (!token || !user) {
      setLoading(false);
      return false;
    }

    // Transformar los datos a un objeto de JavaScript.
    const userObj = JSON.parse(user);
    const userId = userObj.id;

    // Hacer petición Ajax al Backend que compruebe el token.
    // Y que devuelva todos los datos del usuario.
    const request = await fetch(`${Global.url}user/profile/${userId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: token },
    });

    const data = await request.json();

    // Petición para los contadores.
    const requestCounters = await fetch(
      `${Global.url}user/counters/${userId}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json", Authorization: token },
      }
    );

    const dataCounters = await requestCounters.json();

    // Setear el estado de auth.
    setAuth(data.user);
    setCounters(dataCounters);
    setLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{ authUser, auth, setAuth, counters, setCounters, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
