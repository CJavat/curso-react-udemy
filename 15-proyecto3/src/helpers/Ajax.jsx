export const Ajax = (url, metodo, datosGuardar = "") => {
  const datos = [];
  const cargando = true;

  const getData = async () => {
    cargando = true;

    let opciones = {
      method: "GET",
    };

    if (metodo == "GET" || metodo == "DELETE") {
      opciones = {
        method: metodo,
      };
    }

    if (metodo === "POST" || metodo === "PUT") {
      opciones = {
        method: metodo,
        body: JSON.stringify(datosGuardar),
        headers: {
          "Content-Type": "application/json",
        },
      };
    }
    const peticion = await fetch(url);
    const data = await peticion.json();

    setEstado({ datos, cargando: false });
  };

  useEffect(() => {
    getData();
  }, [url]);

  return { datos: estado.datos, cargando: estado.cargando };
};
