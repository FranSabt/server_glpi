import axios from 'axios'

const url = 'http://localhost:5000';

//* Generamos un numero de Correlativo *//
const crearCorrelativo = async (user) => {
  user['user_id_tech'] = 999; // fijado hasta que tenga login
  user['usuario_asignado'] = user.id//`${user.fisrtname} ${user.realname}`;
  const res = await axios.post(url+'/crear-orden-asignacion', user);
  // console.log('Correlativo ' , res.status);
  if (res.status != 200 && res.status != 201) {
    alert('Fallo el registro del correlativo');
    return false;
  }
  return res.data;
}

//* Cada equipo es asignado a un usuario con su número de correlatico *//
const registarEquiposEnAsignacion = async (data) => {
  const res = await axios.post(url+'/asignar-equipos', data);
  // console.log('Asignacion de equipos' , res.data);

  return res.data
}

//* Llama a las dos funciones previas*//
export const asignar = async (equipos, user) => {
  const correlativo = await crearCorrelativo(user);
  
  // Si falla el registro de un correlativo se cancela la ejecivion
  if (correlativo == false) return false; 

  // Se le asigna a cada producto el nombre de usuario que lo posee 
  // y el 'id' del correlativo a la nota de entrega
  const equiposAsignar = equipos.map((e) => {
    e["user"] = user.id //`${user.fisrtname} ${user.realname}`;
    e["orden_de_asignacion"] = correlativo[0].id
      return e;
  })
  const registro = await registarEquiposEnAsignacion(equiposAsignar);
  console.log("REGISTRO", registro)
  return {registro, correlativo};

}