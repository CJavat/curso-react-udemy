import React, {useState} from 'react'

export const MiPrimerEstado = () => {

  // let nombre =  "Daniel Plascencia";

  const [nombre, setNombre] = useState("Daniel Plascencia");

  const cambiarNombre = (e, nombreFijo) => {
    setNombre(nombreFijo);
  }

  return (
    <div>
      <h3>Componente: MiPrimerEstado</h3>
      <strong className='label'>
        {nombre}
      </strong>
      &nbsp;
      <button onClick= { e => cambiarNombre(e, "Francisco") }>Cambiar nombre por Francisco</button>
      &nbsp;
      <input onKeyUp= { e => cambiarNombre(e, e.target.value)} type="text" placeholder='Cambia el nombre' />
      <input onChange= { e => cambiarNombre(e, e.target.value)} type="text" placeholder='Cambia el nombre' />
    </div>
  )
}
