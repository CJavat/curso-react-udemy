var saludar = new Promise((resolve, reject) => {
  setTimeout(() => {
    let saludo = "Hola Mundo.";

    if (saludo) {
      resolve(saludo);
    } else {
      reject("No hay saludo disponible.");
    }
  }, 2000);
});

saludar
  .then((resultado) => {
    alert(resultado);
  })
  .catch((err) => {
    alert(err);
  });
