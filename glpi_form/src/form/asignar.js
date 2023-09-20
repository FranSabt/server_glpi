import axios from 'axios'

const crearCorrelativo = async (user) => {
  user['user_id_tech'] = 999;
  user['usuario_asignado'] = `${user.fisrtname} ${user.realname}`;
  const res = await axios.post('http://localhost:5000/crear-orden-asignacion', user);
  // console.log('Correlativo ' , res.status);
  if (res.status != 200 && res.status != 201) {
    alert('Fallo el registro del correlativo');
    return false;
  }
  return res.data;
}

const registarEquiposEnAsignacion = async (data) => {
  const res = await axios.post('http://localhost:5000/asignar-equipos', data);
  // console.log('Asignacion de equipos' , res.data);

  return res.data
}

export const asignar = async (equipos, user) => {
  const correlativo = await crearCorrelativo(user);
  if (correlativo == false) return false;

  console.log("Correlativo SUperior", correlativo)
  const equiposAsignar = equipos.map((e) => {
    e["user"] = `${user.fisrtname} ${user.realname}`;
    e["orden_de_asignacion"] = correlativo[0].id
    // console.log('MAP')
    // console.log(correlativo[0])
    // console.log(e)
      return e;
  })
  // console.log("Equpos a Asignar",equiposAsignar)
  const registro = await registarEquiposEnAsignacion(equiposAsignar);
  console.log("REGISTRO", registro)
  return registro;

}