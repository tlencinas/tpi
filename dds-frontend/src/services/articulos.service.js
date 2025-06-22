import axios from "axios";

const urlResource = "https://labsys.frc.utn.edu.ar/dds-backend-2025/api/articulos";
// const urlResource = "http://localhost:3000/api/articulos";
async function Buscar(Nombre, Activo, Pagina) {
  const resp = await axios.get(urlResource, {
    params: { Nombre, Activo, Pagina },
  });
  return resp.data;
}
async function BuscarPorId(item) {
  const resp = await axios.get(urlResource + "/" + item.IdArticulo);
  return resp.data;
}
async function ActivarDesactivar(item) {
  await axios.delete(urlResource + "/" + item.IdArticulo);
}
async function Grabar(item) {
  if (item.IdArticulo === 0) {
    await axios.post(urlResource, item);
  } else {
    await axios.put(urlResource + "/" + item.IdArticulo, item);
  }
}
export default {Buscar, BuscarPorId, ActivarDesactivar, Grabar};
