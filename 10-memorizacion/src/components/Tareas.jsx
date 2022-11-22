import React, { useState, useMemo } from "react";

export const Tareas = () => {
  const [tareas, setTareas] = useState([]);
  const [contador, setContador] = useState(6230);
  const guardarTareas = (e) => {
    e.preventDefault();
    let tareas_actualizadas = [...tareas, e.target.descripcion.value];

    setTareas(tareas_actualizadas);
  };

  const borrarTarea = (id) => {
    // Filtrar las tareas para eliminar la que no quiero.
    let nuevasTareas = tareas.filter((tarea, indice) => indice !== id);

    // setState, guardar el nuevo listado de tareas en el estado.
    setTareas(nuevasTareas);
  };

  const sumarAlContador = (e) => {
    setContador(contador + 1);
  };

  const contadoresPasados = (acumulacion) => {
    for (let i = 0; i <= acumulacion; i++) {
      console.log("Ejecutando acumulacion de contadores del pasado...");
    }

    return `Contador manual de tareas: ${acumulacion}`;
  };

  const memoContadores = useMemo(() => contadoresPasados(contador), [contador]);

  return (
    <div>
      <h1>Mis Tareas</h1>
      <form onSubmit={guardarTareas}>
        <input type="text" name="descripcion" placeholder="Describe la tarea" />
        <input type="submit" value="Guardar" />
      </form>

      <h3>{memoContadores}</h3>
      <button onClick={sumarAlContador}>Sumar</button>

      <hr />
      <h3>Lista de Tareas:</h3>
      <ul>
        {tareas.map((tarea, indice) => (
          <li key={indice}>
            {tarea}
            &nbsp;
            <button onClick={() => borrarTarea(indice)}>x</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
