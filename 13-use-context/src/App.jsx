import "./App.css";
import { useState } from "react";
import { PruebaContext } from "./context/PruebaContext";
import { AppRouter } from "./router/AppRouter";

function App() {
  const [usuario, setUsuario] = useState({
    nombre: "Daniel",
    web: "javato.com",
  });

  const curso = {
    id: 1,
    titulo: "Master en TypeScript",
    contenido: "Muchas horas de contenido...",
  };

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
