// import React from 'react'
import { useState, useEffect } from 'react';
import { BlobProvider, PDFViewer } from '@react-pdf/renderer';
import PdfDocument from '../pdf/pdfDocument';
import axios from 'axios';
import DropNames from './dropname';
import { Container, Button } from 'react-bootstrap';
import TablaEquipos from './tableSeleccionar';
import TablaEquiposSeleccionados from './tableSeleccionados'

const MyForm = () => {

  const [data, setData] = useState([]);
  const [equipos, setEquipos] = useState([]);
  const [equiposSeleccionados, setEquiposSeleccionados] = useState([]);
  const [user, setUser] = useState({});
  const [notaEntrega, setNotaEntrega] = useState(false);
  
  
  //* Llamada a la API para traer usuarios *//
  useEffect(() => {
    axios.get('http://localhost:5000/users').then((response) => {
      setData(response.data.data);
      // console.log(response.data)
    })
    .catch((error) => {
      // handle error
      console.log(error);
    });
  }, []);

  const handleUserSelect = (userSelected) => {
    // console.log('UserSelected', userSelected)
    const myUser = data.find(e => e.name === userSelected)
    // console.log('MYUSER ', myUser);
    setUser(myUser);
  };
  

  ////////////////////////////////////////////////////////////
  const buscarEquipos = () => {
    // console.log('click')
    axios.get(`http://localhost:5000/user-detail?id=${user.id}`).then((response) => {
      setEquipos(response.data)
      // console.log('equipos', equipos)
    })
    .catch((error) => {
      // handle error
      console.log(error);
    });
  }
  ///////////////////////////////////////////////////////////////
  const vaciarEquipos = () => { setEquipos([]), setEquiposSeleccionados([])}
  ///////////////////////////////////////////////////////////////

  const seleccionarEquipos = (equipoSeleccionado) => {
  // const equipo = equipos.find(e => e.name === equipoSeleccionado );
    console.log(equipoSeleccionado)

    const equipo = equipoSeleccionado.data;
  
    // Verificar si el equipo ya existe en el array equiposSeleccionados
    if (!equiposSeleccionados.some(e => e.serial === equipo.serial && e.name === equipo.name /*|| e.other_serial === equipo.other_serial */)) {
      const nuevoArrayEquipos = [...equiposSeleccionados, equipo];
      setEquiposSeleccionados(nuevoArrayEquipos);
    }
    else {
      alert(`El equipo ${equipo.name} ya esta en la lista de equipos seleccioandos.`)
    }
  }
  ///////////////////////////////////////////////////////////////

  const retirarEquipo = (equipoSeleccionado) => {
    //* Se retira el equipo *//
    const equipo = equiposSeleccionados.filter(e => e.name !== equipoSeleccionado);
      setEquiposSeleccionados(equipo);
  }
  
  ////////////////////////////////////////////////////////////////

  const mostrarPDF = () => {
    setNotaEntrega(!notaEntrega)
  }

  ////////////////////////////////////////////////////////////////
  
  //console.log('equipoSeleccionado', equiposSeleccionados)
  // console.log(user)
  return (
    <>
      <Container className='sm m-5 px-5'>
        <div>
          <Container>
          {
            data?.length ?
            <DropNames users={data} handleUserSelect={handleUserSelect} vaciarEquipos={vaciarEquipos} />
            : 
            <button className="btn btn-primary" type="button" disabled>
              <span className="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
            <span role="status">Cargando usuarios...</span>
            </button>
          }
          </Container>
        </div>
        <div>
          <div>
          {
            user ? 
            <Container className='m-5 '>
              <h4>Nombre  :   <span className="badge bg-secondary">{user.fisrtname}</span></h4>
              <h4>Apellido: <span className="badge bg-secondary">{user.realname}</span></h4>
              <h4>Cargo   :    <span className="badge bg-secondary">{user.comment}</span></h4>
              <h4>CI      :       <span className="badge bg-secondary">{user.registration_number}</span></h4>
            </Container>
            : null
          }
          </div>
        </div>
      </Container>
        <div>
        {
          equiposSeleccionados?.length > 0 ?
          <Container>
            <h3>Equipos Seleccionados</h3>
            <TablaEquiposSeleccionados data={equiposSeleccionados} retirarEquipo={retirarEquipo}/>
          </Container>
          : null
        }
        </div>
        <div>
          <Container>
            <Button disabled={ equiposSeleccionados.length > 0  ? false : true} onClick={mostrarPDF}>PDF</Button>
            {notaEntrega ?
              <PDFViewer width={"100%"} height={800}>
            <PdfDocument user={user} equipos={equiposSeleccionados}/>
          </PDFViewer>
          : null}
          </Container>
        </div>

      <hr/>
      {/* /////////////////////////////////////////////////////////////////////////////////// */}
      {/* /////////////////////////////////////////////////////////////////////////////////// */}
      {/* /////////////////////////////////////////////////////////////////////////////////// */}
      <Container>
        <h3>Equipos a seleccionar</h3>
        { //* PARA SELECCIOANR LOS EQUIPOS **//
          equipos?.length > 0 ?
          <TablaEquipos data={equipos} seleccionarEquipos={seleccionarEquipos}/>
          : null
        }
        <div>
            {
              user ? 
              <Container className='m-5 '>
                <Button onClick={buscarEquipos}>
                  Buscar Equipos
                </Button>
              </Container>
              : null
            }
            
        </div>
      </Container>
    </>
  )
}

export default MyForm;
