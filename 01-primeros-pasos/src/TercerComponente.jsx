import React from "react";
import PropTypes from "prop-types";

export const TercerComponente = ({
  nombre = "Valor Por Defecto",
  apellido = "Valor por defecto",
  ficha,
}) => {
  // Le asignas un valor por defecto dentro de las props, por si no mandan ningun dato, eso se asigne.

  return (
    <div>
      <h1>Comunicacion entre componentes</h1>
      <ul>
        <li>{nombre}</li>
        <li>{apellido}</li>
        <li>{ficha.grupo}</li>
        <li>{ficha.estado}</li>
      </ul>
    </div>
  );
};

// PROPTYPES SE UTILIZA PARA VALIDAR EL TIPO DE DATO A LOS PROPS.
TercerComponente.propTypes = {
  nombre: PropTypes.string.isRequired, // isRequired se utiliza para validar que no mande algo vacío.
  apellido: PropTypes.string, // Se le pone el tipo de dato a validar despues de la palabra reservada "PropTypes".
  ficha: PropTypes.object,
};

//! OTRA FORMA DE PASAR LOS VALORES POR DEFECTO. PERO EN LOS PARAMETROS DE LA FUNCION PRINCIPAL YA NO SE LES VA A PONER NADA.
TercerComponente.defaultProps = {
  nombre: "Valor por defecto",
  apellido: "Valor por defecto",
};
