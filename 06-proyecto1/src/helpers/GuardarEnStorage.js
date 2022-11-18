// ESTE ES UN HELPER QUE FUE CREADO PARA QUE PUDIERA SER REUTILIZADO.
// LO QUE HACE ES GUARDAR DATOS EN EL LOCAL STORAGE.
export const GuardarEnStorage = (clave, elemento) => {
  // Conseguir los elementos que ya tenemos en LocalStorage.
  let elementos = JSON.parse(localStorage.getItem(clave));

  // Comprobar si es un array.
  if (Array.isArray(elementos)) {
    // ñadir dentro del array un elemento nuevo.
    elementos.push(elemento);
  } else {
    // Crear un array con el nuevo elemento.
    elementos = [elemento];
  }

  // Guardar en el LocalStorage.
  localStorage.setItem(clave, JSON.stringify(elementos));

  // Devolver objeto.
  return elemento;
};
