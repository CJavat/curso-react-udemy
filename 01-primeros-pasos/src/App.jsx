import "./App.css";
import MiComponente from "./MiComponente";
import { SegundoComponente } from "./SegundoComponente";
import { TercerComponente } from "./TercerComponente";
import EventosComponente from "./EventosComponente";

function App() {
  const fichaMedica = {
    altura: "170cm",
    grupo: "O+",
    estado: "Bueno",
    alergias: "Ninguna",
  };

  return (
    <div className="App">
      <MiComponente />
      <SegundoComponente />
      <hr />
      <TercerComponente
        nombre="Javato"
        apellido="Plascencia"
        ficha={fichaMedica}
      />
      <EventosComponente />
    </div>
  );
}

export default App;
