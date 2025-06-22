import axios from "axios";
const urlResource = "https://labsys.frc.utn.edu.ar/dds-backend-2025/api/categorias";
// const urlResource = "http://localhost:3000/api/categorias";
async function Buscar() {
  const resp = await axios.get(urlResource);
  return resp.data;
}
export default {Buscar};