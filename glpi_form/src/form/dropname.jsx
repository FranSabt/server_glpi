// import Dropdown from 'react-bootstrap/Dropdown';
import Form from "react-bootstrap/Form";

/**
 *  El compontonete recibe la info de los usuarios y renderiza los nombre y apellidos 
 *  para su selección. 
 *  
 *  La elección de un usuario dispara un evento que llena la variable "user" en ecomponente "Form"
 *  y permite llamar a todos los equipos asignados al mismo en el GLPI .
 *  
 *  Al realizar un cambio de usuario las listas de equipos son vaciadas para previnir asignaciones
 *  que no correspondan al usuario.
 */

// eslint-disable-next-line react/prop-types
const DropNames = ({ users, handleUserSelect, vaciarEquipos }) => {
  return (
    <Form.Select
      className="form-control-sm"
      aria-label="Default select example"
      onChange={(e) => {
        e.target.value !== "Seleccione un usuario"
          ? handleUserSelect(e.target.value)
          : null,
          vaciarEquipos();
      }}
    >
      <option value={undefined} name={undefined}>
        Seleccione un usuario
      </option>
      {
        // eslint-disable-next-line react/prop-types
        users?.map((user) => (
          <option value={user.name} key={user.name} name={user.name}>
            {user.fisrtname ? `${user.fisrtname} ${user.realname}` : user.name}
          </option>
        ))
      }
    </Form.Select>
  );
};

export default DropNames;
