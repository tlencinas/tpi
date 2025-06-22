import React, {useState, useEffect} from 'react';
import categoriasService from '../services/categorias.service';
function Categorias() {
  const tituloPagina = 'Categorias';
  const [categorias, setCategorias] = useState(null);

  useEffect(() => {
    BuscarCategorias();
  }, []);
  async function BuscarCategorias() {
    let data = await categoriasService.Buscar();
    setCategorias(data);
  };
  return (
    <>
        <div>
        <div className="tituloPagina">{tituloPagina}</div>
        <table className="table table-bordered table-striped">
            <thead>
            <tr>
                <th style={{ width: "40%" }}>IdCategoria</th>
                <th style={{ width: "60%" }}>Nombre</th>
            </tr>
            </thead>
            <tbody>
            {categorias &&
                categorias.map((categoria) => (
                <tr key={categoria.IdCategoria}>
                    <td>{categoria.IdCategoria}</td>
                    <td>{categoria.Nombre}</td>
                </tr>
                ))}
            </tbody>
        </table>
        </div>
    </>
  );
}
export default Categorias;
