import { BrowserRouter, Routes, Route } from "react-router-dom";
import InicioUser from "../pages/InicioUser";
import RegistroUser from "../pages/RegistroUser";
import Buscador from "../pages/Buscador";
import RegisterOrganizacion from "../pages/RegisterOrganizacion";
import PerfilPage from "../pages/PerfilPage";

function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InicioUser />} />
        <Route path="/registro" element={<RegistroUser />} />
        <Route path="/buscador" element={<Buscador />} />
          <Route path="/register" element={<RegisterOrganizacion />}/>
           <Route path="/perfil" element={<PerfilPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;
