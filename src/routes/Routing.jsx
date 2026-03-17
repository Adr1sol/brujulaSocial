import { BrowserRouter, Routes, Route } from "react-router-dom";

import InicioUser from "../pages/InicioUser";
import RegistroUser from "../pages/RegistroUser";
import Buscador from "../pages/Buscador";

function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InicioUser />} />
        <Route path="/registro" element={<RegistroUser />} />
        <Route path="/buscador" element={<Buscador />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;