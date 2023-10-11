// import React from 'react'
import { useState, useEffect } from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import { Container, Button } from 'react-bootstrap';
import axios from 'axios';
//* Componentes *//
import PdfDocument from '../pdf/pdfDocument';
import DropNames from './dropname';
import TablaEquipos from './tableSeleccionar';
import TablaEquiposSeleccionados from './tableSeleccionados'
import AgregarManualmente from './agregarManualmente';
import { asignar } from './asignar';

/**
 * Componente principal de la dirección raíz de la aplicación.
 *
 * Primero busca la lista de usuarios, una vez seleccionado el usuario permite
 * realizar la busqueda en la BD de todos los articulos asignados a dicho usuario.
 *
 * Por ende los articulo primero deben ser asignados en la interfaz del GLPI.
 *
 * Se seleccionan los articulos y estos apareceran en la planilla PDF
 *
 * TODO: lo siguiente está pendiente
 *
 * Una vez seleccionados los equipos se verifica que aquellos que poseen serial y/o etiqueta (other_serial)
 * no se encuentren asignados a un usuario, de lo contrario se bloquea la planilla.
 *
 * Si se debe desbloquear un producto pasa a "equipos asignados."
 */
const url = 'http://localhost:5000';

const MyForm = () => {

  const [data, setData] = useState([]);
  const [equipos, setEquipos] = useState([]);
  const [equiposSeleccionados, setEquiposSeleccionados] = useState([]);
  const [user, setUser] = useState({});
  const [notaEntrega, setNotaEntrega] = useState(false);
  const [disable, setDisable] = useState(true);
  const [correlativo, setCorrelativo] = useState(null)

  ////////////////////////////////////////////////////////////

  //* Llamada a la API para traer usuarios *//
  useEffect(() => {
    axios.get(url+'/users').then((response) => {
      setData(response.data.data);
      // console.log(response.data)
    })
    .catch((error) => {
      // handle error
      console.log(error);
    });
  }, []);

  ////////////////////////////////////////////////////////////

  //* Metodo para seleccionar un único usuario y poder traer lo quipos asignados al mismo *//
  const handleUserSelect = (userSelected) => {
    // console.log('UserSelected', userSelected)
    const myUser = data.find(e => e.name === userSelected)
    // console.log('MYUSER ', myUser);
    setUser(myUser);
  };


  ////////////////////////////////////////////////////////////

  //* Llamada a la API para traer los quipos asociados al usuario *//
  const buscarEquipos = async () => {
    try{
      const response = await axios.get(`${url}/user-detail?id=${user.id}`)
      // console.log(response)
      setEquipos(response.data)
    }
    catch (error){
      console.error(error)
    }
  }
  ///////////////////////////////////////////////////////////////

  //* Vacia las lista de equipos *//
  /**
   * Vacia los estados donde se encuentran los equipos encontrados y seleccionados
   * cuando se realiza un cambio de usuario en la seleccion de usuarios.
   *
   * Se evita que se pueda crear una nota de entrega a un usuario 'A' que tenga
   * los quipos asignado a un usuario 'B'.
   */
  const vaciarEquipos = () => { setEquipos([]), setEquiposSeleccionados([]), setNotaEntrega(false)}

  ///////////////////////////////////////////////////////////////

  //*  Permite selecciona un equipo para que este aparezca en la nota de entrega PDF *//

  const seleccionarEquipos = (equipoSeleccionado) => {

    if(notaEntrega){
      alert("No puede agregar elementos hasta limpiar las listas")
      return 0;
    }
    const equipo = equipoSeleccionado.data;

    // Verificar si el equipo ya existe en el array equiposSeleccionados
    // Si el serial y/o la etiqueta no es "undefined" se compara si existe en la lista de equipos seleccionados
    if (!equiposSeleccionados.some(e => (e.serial !== undefined && e.serial === equipo.serial) && e.name === equipo.name && (e.other_serial !== undefined && e.other_serial === equipo.other_serial))) {
      const nuevoArrayEquipos = [...equiposSeleccionados, equipo];
      setEquiposSeleccionados(nuevoArrayEquipos);
      // setDisable(true)
      const isDisable = nuevoArrayEquipos.find((e) => e.validado === false)
      setDisable(isDisable)
    }
    else {
      alert(`El equipo ${equipo.name} ya esta en la lista de equipos seleccioandos.`)
    }
  }
  ///////////////////////////////////////////////////////////////

  //* Se elimina un quipo de la lista de seleccionados y de la nota de entrega PDF *//
  const retirarEquipo = (equipoSeleccionado) => {
    if(notaEntrega){
      alert("No puede retirar elementos hasta limpiar las listas")
      return 0;
    }
    const nuevoArrayEquipos = equiposSeleccionados.filter(e => e.name !== equipoSeleccionado);
      setEquiposSeleccionados(nuevoArrayEquipos);
      // Chequea otra vez la validez de los equipos //
    const isDisable =  nuevoArrayEquipos.find((e) => e.validado === false)
    setDisable(isDisable)
  }

  ////////////////////////////////////////////////////////////////

  const mostrarPDF = async() => {
    setNotaEntrega(!notaEntrega)
    const res = await asignar(equiposSeleccionados, user);
    const { correlativo } = res;
    // console.log(correlativo[0].id);
    setCorrelativo(correlativo[0].id)
  }

  ////////////////////////////////////////////////////////////////

  const liberarEquipo = async (equipoLiberar) => {
    try {
      const response = await axios.post(`${url}/liberar-equipos`, equipoLiberar);
      const { data, status } = response;
  
      if (status === 200) {
        const equiposActualizados = equipos.map((e) => {
          if (e.id === data.id && (e.serial === data.serial || e.other_serial === data.other_serial)) {
            return{...e,  asignado: data.asignado, validado: data.validado};
          }
          return e;
        });
        setEquipos(equiposActualizados);
      } else {
        alert("Hubo un problema al liberar el equipo");
      }
    } catch (error) {
      console.error("Ocurrió un error:", error);
      alert("Hubo un problema al liberar el equipo");
    }
  };
  
  ////////////////////////////////////////////////////////////////

  //* Envia los equipos a la API y verifica que no se encuentren asignados *//
  // const validar = async () => {
  //     const isDisable = equiposSeleccionados.find((e) => e.validado === false)
  //     setDisable(isDisable)
  // }

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
            user && (user !== 'Seleccione un usuario') ?
            <Container className='m-5 '>
              <h4>Nombre  :   <span className="badge bg-dark">{user.fisrtname ? user.fisrtname : ''}</span></h4>
              <h4>Apellido: <span className="badge bg-dark">{user.realname ? user.realname : ''}</span></h4>
              <h4>Cargo   :    <span className="badge bg-dark">{user.comment ? user.comment : ''}</span></h4>
              <h4>CI      :       <span className="badge bg-dark">{user.registration_number ? user.registration_number : ''}</span></h4>
            </Container>
            : null
          }
          </div>
          <AgregarManualmente seleccionarEquipos={seleccionarEquipos} user={user.name}/>
        </div>
      </Container>
        <div>
        {
          equiposSeleccionados?.length > 0 ?
          <Container>
            <h3>Equipos Seleccionados</h3>
            <TablaEquiposSeleccionados data={equiposSeleccionados} retirarEquipo={retirarEquipo} />
          </Container>
          : null
        }
        </div>
        <div>
          <Container>
            { !notaEntrega ?  <Button disabled={disable} onClick={mostrarPDF}>Registrar & PDF</Button> : <Button variant="warning" onClick={vaciarEquipos} >Limpiar</Button>}
            {notaEntrega && equiposSeleccionados.length > 0 ?
              <PDFViewer width={"100%"} height={800}>
                <PdfDocument user={user} equipos={equiposSeleccionados} correlativo={correlativo}/>
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
          <TablaEquipos data={equipos} seleccionarEquipos={seleccionarEquipos} liberarEquipo={liberarEquipo}/>
          : null
        }
        <div>
            {
              user.name ?
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
