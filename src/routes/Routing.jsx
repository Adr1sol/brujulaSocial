import { BrowserRouter, Routes, Route } from "react-router-dom";
import InicioUser from "../pages/InicioUser";
import RegistroUser from "../pages/RegistroUser";
import Buscador from "../pages/Buscador";
import RegisterOrganizacion from "../pages/RegisterOrganizacion";
import PerfilPage from "../pages/PerfilPage";
import PerfilOrganizacion from '../pages/PerfilOrganizacion'
import DashImpacto from "../pages/DashImpacto"
import Admin from "../pages/Admin"

function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InicioUser />} />
        <Route path="/inicio" element={<InicioUser />} />
        <Route path="/registro" element={<RegistroUser />} />
        <Route path="/buscador" element={<Buscador />} />
        <Route path="/register" element={<RegisterOrganizacion />} />
        <Route path="/perfil" element={<PerfilPage />} />
        <Route path="/miOrganizacion" element={<PerfilOrganizacion />} />
        <Route path="/impacto" element={<DashImpacto />} />
        <Route path="/panel" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;