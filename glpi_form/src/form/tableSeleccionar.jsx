import { Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';

/**
 * Renderiza la lista de equipos asociada a un usuario al GLPI.
 * 
 * Cada equipo posee un boton para se añadido a la lista de equipos seleccionados.
 * Si el equipo no posee ni "serial" ni "etiqueta" no podrá ser seleccionado en la lista.
 *  - Si se necesita ese equipo se puede cambiar en GLPI o agregar manualmente.
 */
// eslint-disable-next-line react/prop-types
const TablaEquipos = ({ data, seleccionarEquipos, liberarEquipo }) => {
  //console.log('data tabla: ', data)
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Equipos</th>
          <th>Serial</th>
          <th>Etiqueta</th>
          <th>Tipo</th>
          <th>Agregar a Nota</th>
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
                      {
                        e.validado ?
                        <Button variant="outline-primary" onClick={() => {
                          console.log(e);
                          seleccionarEquipos({ data: e })
                        }}>Agregar</Button>
                        :
                        <Button variant="outline-danger" onClick={() => {
                          console.log(e);
                          liberarEquipo( e )
                        }}>LIBERAR</Button>
                      }
                    </td>
                    {/* <td>{e?.serial}</td>
              <td>{e?.type}</td> */}
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

export default TablaEquipos;