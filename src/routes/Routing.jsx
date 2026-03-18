import { BrowserRouter, Routes, Route } from "react-router-dom";
import InicioUser from "../pages/InicioUser";
import RegistroUser from "../pages/RegistroUser";
import Buscador from "../pages/Buscador";
import HomePage from "../pages/HomePage";
import RegisterOrganizacion from "../pages/RegisterOrganizacion";
import PerfilPage from "../pages/PerfilPage";
import PerfilOrganizacion from '../pages/PerfilOrganizacion'

function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/inicio" element={<InicioUser />} />
        <Route path="/registro" element={<RegistroUser />} />
        <Route path="/buscador" element={<Buscador />} />
        <Route path="/register" element={<RegisterOrganizacion />} />
        <Route path="/perfil" element={<PerfilPage />} />
        <Route path="/miOrganizacion" element={<PerfilOrganizacion />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;
