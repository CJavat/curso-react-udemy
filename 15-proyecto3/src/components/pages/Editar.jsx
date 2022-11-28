import React, { useState, useEffect } from "react";
import { useForm } from "../../hooks/useForm";
import { Global } from "../../helpers/Global";
import { Peticion } from "../../helpers/Peticion";
import { useParams } from "react-router-dom";

export const Editar = () => {
  const { formulario, enviado, cambiado } = useForm({});
  const [resultado, setResultado] = useState("noEnviado");
  const [articulo, setArticulo] = useState({});
  const params = useParams();

  useEffect(() => {
    conseguirArticulo();
  }, []);

  const conseguirArticulo = async () => {
    const { datos } = await Peticion(
      Global.url + "articulo/" + params.id,
      "GET"
    );

    if (datos.status === "Success") {
      setArticulo(datos.articulo);
    }
  };

  const editarArticulo = async (e) => {
    e.preventDefault();

    // Recoger datos formulario.
    let nuevoArticulo = formulario;
    // Guardar articulo en el backend.
    const { datos } = await Peticion(
      Global.url + "articulo/" + params.id,
      "PUT",
      nuevoArticulo
    );

    if (datos.status === "success") {
      setResultado("datosGuardados");

      // Subir la imágen.
      const fileInput = document.querySelector("#file0");
      console.log(fileInput);
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
      <h1>Editar Articulo</h1>
      <p>Formulario para editar: {articulo.titulo}</p>

      <strong>
        {resultado === "datosGuardados" ? "Articulo guardado con exito." : ""}
      </strong>
      <strong>
        {resultado === "error"
          ? "Los datos proporcionados son incorrectos."
          : ""}
      </strong>

      {/* Montar formulario */}
      <form id="formulario" className="formulario" onSubmit={editarArticulo}>
        <div className="form-group">
          <label htmlFor="titulo">Titulo</label>
          <input
            type="text"
            name="titulo"
            id="titulo"
            defaultValue={articulo.titulo}
            onChange={cambiado}
          />
        </div>

        <div className="form-group">
          <label htmlFor="contenido">Contenido</label>
          <textarea
            type="text"
            name="contenido"
            id="contenido"
            defaultValue={articulo.contenido}
            onChange={cambiado}
          />
        </div>

        <div className="form-group">
          <label htmlFor="file0">Imagen</label>
          <div className="mascara">
            {articulo.imagen == "default.png" && (
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/800px-Unofficial_JavaScript_logo_2.svg.png"
                alt="imagen de prueba"
              />
            )}
            {articulo.imagen != "default.png" && (
              <img
                src={Global.url + "imagen/" + articulo.imagen}
                alt="imagen de prueba"
              />
            )}
          </div>
          <input type="file" name="file0" id="file0" />
        </div>

        <input className="btn btn-success" type="submit" value="Guardar" />
      </form>
    </div>
  );
};
