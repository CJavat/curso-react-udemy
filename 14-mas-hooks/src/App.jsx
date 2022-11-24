import "./App.css";
import { MiUsuario } from "./components/MiUsuario";
// import { MiFormulario } from "./components/MiFormulario";
// import { PruebasCustom } from "./components/PruebasCustom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <h1>Hola Mundo</h1>
        <PruebasCustom /> */}
        {/* <MiFormulario /> */}
        <MiUsuario />
      </header>
    </div>
  );
}

export default App;
