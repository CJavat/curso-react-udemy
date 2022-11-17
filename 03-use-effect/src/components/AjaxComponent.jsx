import React, { useState } from "react";
import { useEffect } from "react";

export const AjaxComponent = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [errores, setErrores] = useState("");

  // Generico o Basico.
  const getUsuariosEstaticos = () => {
    setUsuarios([
      {
        id: 1,
        email: "victor@gmail.com",
        first_name: "Victor",
        last_name: "Robles",
      },
      {
        id: 2,
        email: "Juan@gmail.com",
        first_name: "Juan",
        last_name: "Lopez",
      },
      {
        id: 3,
        email: "pepe@gmail.com",
        first_name: "Pepe",
        last_name: "Lopez",
      },
    ]);
  };

  // Hacer una peticion mediante una promesa.
  const getUsuariosAjaxPromesa = () => {
    fetch("https://reqres.in/api/users?page=1")
      .then((respuesta) => respuesta.json())
      .then(
        (resultadoFinal) => {
          setUsuarios(resultadoFinal.data);
          console.log(usuarios);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  // Hacer una peticion mediante el Async-Await.
  const getUsuariosAjaxAsyncAwait = () => {
    try {
      setTimeout(async () => {
        const peticion = await fetch("https://reqres.in/api/users?page=1");
        const { data } = await peticion.json();
        setUsuarios(data);
        setCargando(false);
      }, 2000);
    } catch (error) {
      console.log("Hubo un error al recoger los datos... " + error);
      setErrores(error.message);
    }
  };

  useEffect(() => {
    // getUsuariosEstaticos();
    // getUsuariosAjaxPromesa();
    getUsuariosAjaxAsyncAwait();
  }, []);

  if (errores !== "") {
    // Cuando pasa algún error.
    return <div className="errores">{errores}</div>;
  } else if (cargando === true) {
    // Cuando esta todo cargando.
    return <div className="cargando">Cargando datos...</div>;
  } else if (cargando === false && errores === "") {
    // Cuando todo ha ido bien.
    return (
      <div>
        <h2>Listado de usuarios via AJAX</h2>
        <ol className="usuarios">
          {usuarios.map((usuario) => {
            console.log(usuario);
            return (
              <li key={usuario.id}>
                <img src={usuario.avatar} alt="User" width="30" />
                &nbsp;
                {usuario.first_name} {usuario.last_name}
              </li>
            );
          })}
        </ol>
      </div>
    );
  }
};
