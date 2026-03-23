import { BrowserRouter, Routes, Route } from "react-router-dom";
import InicioUser from "../pages/InicioUser";
import RegistroUser from "../pages/RegistroUser";
import Buscador from "../pages/Buscador";
import HomePage from "../pages/HomePage";
import RegisterOrganizacion from "../pages/RegisterOrganizacion";
import PerfilPage from "../pages/PerfilPage";
import PerfilOrganizacion from '../pages/PerfilOrganizacion'
import TerminosCondiciones from "../pages/Terminos";
import DashImpacto from "../pages/DashImpacto"
import Donaciones from "../pages/Home/Donacion";

import Admin from "../pages/Admin"

function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/terminos" element={<TerminosCondiciones />} />
        <Route path="/register" element={<RegisterOrganizacion />} />
        <Route path="/impacto" element={<DashImpacto />} />
        <Route path="/Donacion" element={<Donaciones />} />
        {/* <Route path="/" element={<DashImpacto />} /> */}
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