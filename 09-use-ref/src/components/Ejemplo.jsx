import React, { useEffect, useState, useRef } from "react";

export const Ejemplo = () => {
  const [numeroSaludo, setNumeroSaludo] = useState(0);
  const saludosEnCola = useRef(numeroSaludo);

  useEffect(() => {
    saludosEnCola.current = numeroSaludo;
    setTimeout(() => {
      console.log("Mensajes en cola: " + saludosEnCola.current);
    }, 5000);
  }, [numeroSaludo]);

  const enviarSaludo = () => {
    setNumeroSaludo(numeroSaludo + 1);
  };

  return (
    <div>
      <h1>Ejemplo con useRef</h1>

      <h2>Saludos enviados: {numeroSaludo}</h2>
      <button onClick={enviarSaludo}>Enviar Saludo</button>
    </div>
  );
};
