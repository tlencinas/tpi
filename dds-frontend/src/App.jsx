import './App.css';
import Categorias from "./components/Categorias.jsx";
import Inicio from "./components/Inicio.jsx";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Menu from './components/Menu.jsx';
import Footer from './components/Footer.jsx';
import Articulos from './components/articulos/Articulos.jsx';
import ModalDialog from "./components/ModalDialog.jsx";
import Usuarios from "./components/Usuarios.jsx";
import RequireAuth from "./components/RequiereAuth.jsx" ;
import Login from "./components/login/Login.jsx";

function App() {
  return (
     <>
      <BrowserRouter>
        <ModalDialog />
        <Menu />
        <div className="divBody">
          <Routes>
            <Route path="/Inicio" element={<Inicio />} />
            <Route path="/categorias" element={<Categorias />} />
            <Route path="/articulos" element={<Articulos />} />
            <Route
              path="/usuarios"
              element={
                <RequireAuth>
                  <Usuarios />
                </RequireAuth>
              }
            />
            <Route path="/login/:componentFrom" element={<Login />} />
            <Route path="*" element={<Navigate to="/Inicio" replace />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>


    </>
  );
}
export default App;
