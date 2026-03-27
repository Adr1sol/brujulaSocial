


import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavbarGlobal from "../components/NavbarGlobal/NavbarGlobal";
import HomePage from "../pages/HomePage";
import InicioUser from "../pages/InicioUser";
import RegistroUser from "../pages/RegistroUser";
import Buscador from "../pages/Buscador";
import RegisterOrganizacion from "../pages/RegisterOrganizacion";
import PerfilOrganizacion from '../pages/PerfilOrganizacion'
import Terminos from '../pages/Terminos'
import PerfilPage from "../pages/PerfilPage";
import DashImpacto from "../pages/DashImpacto";
import Donaciones from "../pages/Home/Donacion";
import Admin from "../pages/Admin";

function Routing() {
  return (
    <BrowserRouter>

      {/* :white_check_mark: NavbarGlobal aparece en TODAS las páginas automáticamente */}
      <NavbarGlobal />

      <Routes>
        {/* ✅ Ruta raíz agregada */}
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />

        <Route path="/inicio" element={<InicioUser />} />
        <Route path="/registro" element={<RegistroUser />} />
        <Route path="/buscador" element={<Buscador />} />
        <Route path="/perfil" element={<PerfilPage />} />
        <Route path="/impacto" element={<DashImpacto />} />
        <Route path="/panel" element={<Admin />} />
        <Route path="/miOrganizacion" element={<PerfilOrganizacion />} />
        <Route path="/register" element={<RegisterOrganizacion />} />
        <Route path="/Donacion" element={<Donaciones />} />
        <Route path="/terminos" element={<Terminos />} />
      </Routes>

    </BrowserRouter>
  );
}

export default Routing;