import React, { useState } from 'react'
import { Button } from 'react-bootstrap';


const AgregarManualmente = ({ seleccionarEquipos, user }) => {

  const [articulo, setArticulo] = useState({
    name: '',
    serial: '',
    other_serial: '',
    type:''
  })

  const crearArtculo = e => {
    setArticulo({
      ...articulo,
      [e.target.name]: e.target.value,
    })
  }

  const enviarArticulo = () => {
    articulo.serial ? null : articulo.serial = undefined;
    articulo.other_serial ? null : articulo.other_serial = undefined;
    articulo.type ? null : articulo.type = undefined;

    seleccionarEquipos({data: articulo})
  }

  return (
    <>
      <div className="input-group mb-3">
        <span className="input-group-text" id="name" name="name">Equipo</span>
        <input type="text" className="form-control me-2" placeholder="Nombre del equipo" name="name" aria-label="name" aria-describedby="basic-addon1" onChange={crearArtculo} />
        <span className="input-group-text" id="serial" name="serial">Serial</span>
        <input type="text" className="form-control me-2" placeholder="Serial del equipo" aria-label="serial" aria-describedby="basic-addon1" onChange={crearArtculo} name="serial"/>
        <span className="input-group-text" id="other_serial" name="other_serial">Etiqueta</span>
        <input type="text" className="form-control me-2" placeholder="Etiqueta del equipo" aria-label="Username" aria-describedby="basic-addon1" onChange={crearArtculo} name="other_serial"/>
        <span className="input-group-text" id="other_serial" name="other_serial">Tipo</span>
        <input type="text" className="form-control me-2" placeholder="Tipo de equipo" aria-label="Username" aria-describedby="basic-addon1" onChange={crearArtculo} name="type"/>
        <Button variant="success" disabled={!(articulo.name && user)} onClick={enviarArticulo} >Agregar equipo</Button>
        <p>Llene los campos de arriba para agregar un articulo manualmente que no se encuentre listado para el usuario.</p>
      </div>
    </>
  )
}

export default AgregarManualmente;
