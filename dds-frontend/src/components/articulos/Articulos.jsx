import React, { useState, useEffect } from "react";
import moment from "moment";
import ArticulosBuscar from "./ArticulosBuscar";
import ArticulosListado from "./ArticulosListado";
import ArticulosRegistro from "./ArticulosRegistro";
import { categoriasMockService as categoriasService } from "../../services/categorias-mock.service";

function Articulos() {
  const TituloAccionABMC = {
    A: "(Agregar)",
    B: "(Eliminar)",
    M: "(Modificar)",
    C: "(Consultar)",
    L: "(Listado)",
  };
  const [AccionABMC, setAccionABMC] = useState("L");

  const [Nombre, setNombre] = useState("");
  const [Activo, setActivo] = useState("");

  const [Items, setItems] = useState(null);
  const [Item, setItem] = useState(null); // usado en BuscarporId (Modificar, Consultar)
  const [RegistrosTotal, setRegistrosTotal] = useState(0);
  const [Pagina, setPagina] = useState(1);
  const [Paginas, setPaginas] = useState([]);

  const [Categorias, setCategorias] = useState(null);

  // cargar al "montar" el componente, solo la primera vez (por la dependencia [])
  useEffect(() => {
    async function BuscarCategorias() {
      let data = await categoriasService.Buscar();
      setCategorias(data);
    }
    BuscarCategorias();
  }, []);

async function Buscar() {
    setAccionABMC("L");
    // harcodeamos 2 articulos para probar
    setItems([
      {
        IdArticulo: 108,
        Nombre: "ADAPTADOR USB WIFI TL-WN722N",
        Precio: 219.0,
        CodigoDeBarra: "0693536405046",
        IdCategoria: 9,
        Stock: 898,
        FechaAlta: "2017-01-23T00:00:00",
        Activo: false,
      },
      {
        IdArticulo: 139,
        Nombre: "AIRE ACONDICIONADO DAEWOO 3200FC DWT23200FC",
        Precio: 5899.0,
        CodigoDeBarra: "0779816944014",
        IdCategoria: 7,
        Stock: 668,
        FechaAlta: "2017-01-04T00:00:00",
        Activo: true,
      },
    ]);
    setRegistrosTotal(2);
    setPaginas([1]);
    alert("Buscando...");
  }

  async function BuscarPorId(item, accionABMC) {
    setAccionABMC(accionABMC);
    setItem(item);
    if (accionABMC === "C") {
      alert("Consultando...");
    }
    if (accionABMC === "M") {
      alert("Preparando la Modificacion...");
    }
  }

  function Consultar(item) {
    BuscarPorId(item, "C"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
  }
  function Modificar(item) {
    if (!item.Activo) {
      alert("No puede modificarse un registro Inactivo.");
      return;
    }
    BuscarPorId(item, "M"); // paso la accionABMC pq es asincrono la busqueda y luego de ejecutarse quiero cambiar el estado accionABMC
  }

  async function Agregar() {
    setAccionABMC("A");
    setItem({
        IdArticulo: 0,
        Nombre: '',
        Precio: '',
        Stock: '',
        CodigoDeBarra: '',
        IdCategoria: '',
        FechaAlta: moment(new Date()).format("YYYY-MM-DD"),
        Activo: true,
      });
    alert("preparando el Alta...");
  }


  function Imprimir() {
    window.print()
    //En desarrollo...
  }

  async function ActivarDesactivar(item) {
    const resp = window.confirm(
      "Está seguro que quiere " +
        (item.Activo ? "desactivar" : "activar") +
        " el registro?"
    );
    if (resp) {
      alert("Activando/Desactivando...");
    }
  }

  async function Grabar(item) {
    alert(
      "Registro " +
        (AccionABMC === "A" ? "agregado" : "modificado") +
        " correctamente."
    );

    Volver();
  }

  // Volver/Cancelar desde Agregar/Modificar/Consultar
  function Volver() {
    setAccionABMC("L");
  }

  return (
    <div>
      <div className="tituloPagina">
        Articulos <small>{TituloAccionABMC[AccionABMC]}</small>
      </div>

      { AccionABMC === "L" && <ArticulosBuscar
        Nombre={Nombre}
        setNombre={setNombre}
        Activo={Activo}
        setActivo={setActivo}
        Buscar={Buscar}
        Agregar={Agregar}
      />
      } 


      {/* Tabla de resutados de busqueda y Paginador */}
      {AccionABMC === "L" && Items?.length > 0 && 
        <ArticulosListado
            {...{
                Items,
                Consultar,
                Modificar,
                ActivarDesactivar,
                Imprimir,
                Pagina,
                RegistrosTotal,
                Paginas,
                Buscar,
                }
            }
        />
      }


      {AccionABMC === "L" && Items?.length === 0 && 
        <div className="alert alert-info mensajesAlert">
            <i className="fa fa-exclamation-sign"></i>
            No se encontraron registros...
        </div>
    }


      {/* Formulario de alta/modificacion/consulta */}
      {AccionABMC !== "L" && 
        <ArticulosRegistro
            {...{ AccionABMC, Categorias, Item, Grabar, Volver }}
        />
    }

    </div>
  );
}
export default Articulos;
