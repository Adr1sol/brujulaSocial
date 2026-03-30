import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavbarGlobal from "../components/NavbarGlobal/NavbarGlobal";
import HomePage             from "../pages/HomePage";
import InicioUser           from "../pages/InicioUser";
import RegistroUser         from "../pages/RegistroUser";
import Buscador             from "../pages/Buscador";
import RegisterOrganizacion from "../pages/RegisterOrganizacion";
import PerfilPage           from "../pages/PerfilPage";
import PerfilOrganizacion   from "../pages/PerfilOrganizacion";
import TerminosCondiciones  from "../pages/Terminos";
import DashImpacto          from "../pages/DashImpacto";
import Donaciones           from "../pages/Home/Donacion";
import Admin                from "../pages/Admin";
import BuscadorPublico      from "../pages/BuscadorPublico";
import PrivateRoute         from "./PrivateRoute";

function Routing() {
  return (
    <BrowserRouter>

      {/* NavbarGlobal en TODAS las páginas */}
      <NavbarGlobal />

      <Routes>
        {/* Rutas públicas */}
        <Route path="/"               element={<HomePage />} />
        <Route path="/home"           element={<HomePage />} />
        <Route path="/inicio"         element={<InicioUser />} />
        <Route path="/registro"       element={<RegistroUser />} />
        <Route path="/explorar"       element={<BuscadorPublico />} />
        <Route path="/terminos"       element={<TerminosCondiciones />} />
        <Route path="/Donacion"       element={<Donaciones />} />
        <Route path="/register"       element={<RegisterOrganizacion />} />

        {/* Rutas privadas — requieren sesión activa */}
        <Route path="/buscador"       element={<PrivateRoute roles={["voluntario", "admin"]}><Buscador /></PrivateRoute>} />
        <Route path="/impacto"        element={<PrivateRoute><DashImpacto /></PrivateRoute>} />

        {/* Ruta privada — solo voluntarios */}
        <Route path="/perfil"         element={<PrivateRoute roles={["voluntario"]}><PerfilPage /></PrivateRoute>} />

        {/* Ruta privada — solo organizaciones */}
        <Route path="/miOrganizacion" element={<PrivateRoute roles={["organizacion"]}><PerfilOrganizacion /></PrivateRoute>} />

        {/* Ruta privada — solo admin */}
        <Route path="/panel"          element={<PrivateRoute roles={["admin"]}><Admin /></PrivateRoute>} />
      </Routes>

    </BrowserRouter>
  );
}

export default Routing;