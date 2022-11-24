import { useState } from "react";
import { useAjax } from "./useAjax";

export const MiUsuario = () => {
  const [url, setUrl] = useState("https://reqres.in/api/users/1");
  const { datos, cargando } = useAjax(url);
  const getId = (e) => {
    let id = parseInt(e.target.value);
    setUrl(`https://reqres.in/api/users/${id}`);

    // getUsuario(url);
  };

  return (
    <div>
      <h1>Mi Usuario:</h1>
      <p>Datos del usuario:</p>
      <p>{cargando ? "Cargando..." : ""}</p>
      {/* La "?" es como un if. Hace que no lo imprima si no existe. */}
      <p>
        {datos?.first_name} {datos?.last_name}
      </p>
      <input type="number" name="id" placeholder="" onChange={getId} />
    </div>
  );
};
