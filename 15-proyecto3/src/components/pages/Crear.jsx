import React, { useState } from "react";
import { useForm } from "../../hooks/useForm";
import { Global } from "../../helpers/Global";
import { Peticion } from "../../helpers/Peticion";

export const Crear = () => {
  const { formulario, enviado, cambiado } = useForm({});
  const [resultado, setResultado] = useState("noEnviado");

  const guardarArticulo = async (e) => {
    e.preventDefault();

    // Recoger datos formulario.
    let nuevoArticulo = formulario;
    // Guardar articulo en el backend.
    const { datos, cargando } = await Peticion(
      Global.url + "crear",
      "POST",
      nuevoArticulo
    );
    console.log(datos);
    if (datos.status === "Success.") {
      setResultado("datosGuardados");

      // Subir la imágen.
      const fileInput = document.querySelector("#file0");
      // Comprobar que si hayan mandado una imagen.
      if (fileInput.value !== "") {
        const formData = new FormData(); // FormData funciona para enviar archivos.
        formData.append("file0", fileInput.files[0]);

        const subida = await Peticion(
          Global.url + "subir-imagen/" + datos.articulo._id,
          "POST",
          formData,
          true
        );

        if (subida.datos.status === "success") {
          setResultado("datosGuardados");
        } else {
          setResultado("error");
        }
      }
    } else {
      setResultado("error");
    }

    document.getElementById("formulario").reset();
  };

  return (
    <div className="jumbo">
      <h1>Crear Articulo</h1>
      <p>Formulario para crear un articulo</p>

      <strong>
        {resultado === "datosGuardados" ? "Articulo guardado con exito." : ""}
      </strong>
      <strong>
        {resultado === "error"
          ? "Los datos proporcionados son incorrectos.1"
          : ""}
      </strong>

      {/* Montar formulario */}
      <form id="formulario" className="formulario" onSubmit={guardarArticulo}>
        <div className="form-group">
          <label htmlFor="titulo">Titulo</label>
          <input type="text" name="titulo" id="titulo" onChange={cambiado} />
        </div>

        <div className="form-group">
          <label htmlFor="contenido">Contenido</label>
          <textarea
            type="text"
            name="contenido"
            id="contenido"
            onChange={cambiado}
          />
        </div>

        <div className="form-group">
          <label htmlFor="file0">Imagen</label>
          <input type="file" name="file0" id="file0" />
        </div>

        <input className="btn btn-success" type="submit" value="Guardar" />
      </form>
    </div>
  );
};
