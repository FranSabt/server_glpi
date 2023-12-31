/* eslint-disable react/prop-types */
import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';

/**
 *  Renderiza los equipos seleccionados por el usuario para generar la nota de entrega.
 *  Cada elemento posee un boton que permite sacarlo de la lista.
 *   
 *  Debe haber por lo menos un elemento para poder renderizar el PDF.
 */

const TablaEquiposSeleccionados = ({data, retirarEquipo}) => {
  //console.log('data tabla: ', data)
  return (

    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Equipo(s)</th>
          <th>Serial</th>
          <th>Etiqueta</th>
          <th>Tipo</th>
          <th>Quitar de Nota</th>
          <th>Validado</th>
        </tr>
      </thead>
      <tbody>
        {
          // eslint-disable-next-line react/prop-types
          data?.length > 0 ?
          // eslint-disable-next-line react/prop-types
          data.map((e, index) => {
            return (
              e.name || e.serial ? 
              // eslint-disable-next-line react/jsx-key
              <tr key={index}>
              <td>{e.name ? e.name 
              :
                <Alert key='danger' variant='danger'>
                No hay nombre
                </Alert>
              }
              </td>
              <td >{e.serial ? e.serial 
              :
                <Alert key='warning' variant='warning'>
                Sin Serial
                </Alert>
              }
              </td>
              <td >{e.other_serial ? e.other_serial 
              :
                <Alert key='warning' variant='warning'>
                Sin etiqueta!
                </Alert>
              }
              </td>
              <td>{e.type}</td>
              <td className='mx-auto'>
                <Button variant="outline-danger" onClick={() => retirarEquipo(e.name)}>Quitar</Button>{' '}
              </td>
              <td >{e.validado ? 
                <Alert key='success' variant='success'>
                Validado
                </Alert>
                :
                <Alert key='danger' variant='danger'>
                No validado
                </Alert>
              }
              </td>
            </tr>
            : null
            )
          })
          : null
        }
      </tbody>
    </Table>
  );
}

export default TablaEquiposSeleccionados;