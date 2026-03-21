import { BrowserRouter, Routes, Route } from "react-router-dom";
import InicioUser from "../pages/InicioUser";
import RegistroUser from "../pages/RegistroUser";
import Buscador from "../pages/Buscador";
import HomePage from "../pages/HomePage";
import RegisterOrganizacion from "../pages/RegisterOrganizacion";
import PerfilPage from "../pages/PerfilPage";
import PerfilOrganizacion from '../pages/PerfilOrganizacion'
import DashImpacto from "../pages/DashImpacto"

function Routing() {
  return (
    <BrowserRouter>
      <Routes>
<<<<<<< HEAD
        <Route path="/" element={<HomePage />} />
        <Route path="/inicio" element={<InicioUser />} />
        <Route path="/login" element={<InicioUser />} />
=======
        <Route path="/" element={<InicioUser />} />
        <Route path="/inicio" element={<InicioUser />} />
>>>>>>> d0a724793b40936c8328e32882afceb9ce238c1b
        <Route path="/registro" element={<RegistroUser />} />
        <Route path="/buscador" element={<Buscador />} />
        <Route path="/register" element={<RegisterOrganizacion />} />
        <Route path="/perfil" element={<PerfilPage />} />
        <Route path="/miOrganizacion" element={<PerfilOrganizacion />} />
<<<<<<< HEAD
=======
        <Route path="/impacto" element={<DashImpacto />} />

>>>>>>> d0a724793b40936c8328e32882afceb9ce238c1b
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;
