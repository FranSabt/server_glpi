// import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';

// eslint-disable-next-line react/prop-types
const DropNames = ({ users, handleUserSelect, vaciarEquipos }) => {
  return (
    <Form.Select className='form-control-sm' aria-label="Default select example" onChange={(e) =>{ 
      handleUserSelect(e.target.value), vaciarEquipos(), console.log(e.target.value)
      } }>
      <option>Seleccione un usuario</option>
      {
        // eslint-disable-next-line react/prop-types
        users?.map( (user) => <option value={user.name} key={user.name} name={user.name}>{ user.fisrtname ? `${user.fisrtname} ${user.realname}` : user.name }</option> )
      }
    </Form.Select>
  );
}

export default DropNames;