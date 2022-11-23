import "./App.css";
import { useState, useEffect } from "react";
import { PruebaContext } from "./context/PruebaContext";
import { AppRouter } from "./router/AppRouter";

function App() {
  const [usuario, setUsuario] = useState({});

  useEffect(() => {
    // La primera vez que se carga el componente.
    let usuarioLocal = JSON.parse(localStorage.getItem("usuario"));
    setUsuario(usuarioLocal);
  }, []);

  useEffect(() => {
    // Cada vez que se actualice el estado usuario se guarda en el LocalStorage.
    localStorage.setItem("usuario", JSON.stringify(usuario));
  }, [usuario]);

  // const curso = {
  //   id: 1,
  //   titulo: "Master en TypeScript",
  //   contenido: "Muchas horas de contenido...",
  // };

  return (
    <div className="App">
      <h1>Aprendiendo a usar el useContext</h1>
      <PruebaContext.Provider
        value={{
          usuario,
          setUsuario,
        }}
      >
        <AppRouter />
      </PruebaContext.Provider>
    </div>
  );
}

export default App;
