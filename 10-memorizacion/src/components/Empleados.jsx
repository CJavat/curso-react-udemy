import React, { useEffect, useState, memo } from "react";

export const Empleados = memo(({ pagina, mensaje }) => {
  const [empleados, setEmpleados] = useState([]);

  useEffect(() => {
    conseguirEmpleados(pagina);
  }, [pagina]);

  const conseguirEmpleados = async (page) => {
    const url = "https://reqres.in/api/users?page=" + page;
    const peticion = await fetch(url);
    const { data: empleados } = await peticion.json();

    setEmpleados(empleados);

    console.log("Se ejecuto la funcion AJAX.");
  };

  mensaje();

  return (
    <div>
      <p>Mostrando la pagina: {pagina}</p>
      <ul className="empleados">
        {empleados.map((empleado) => {
          return (
            <li key={empleado.id}>
              {empleados.length >= 1 &&
                empleado.first_name + " " + empleado.last_name}
            </li>
          );
        })}
      </ul>
    </div>
  );
});

// React.memo() --> Sirve para que no se reenderice todo el componente a menos que haya un cambio verdadero.
