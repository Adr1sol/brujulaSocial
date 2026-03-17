import { BrowserRouter, Routes, Route } from "react-router-dom";

import InicioUser from "../pages/InicioUser";
import RegistroUser from "../pages/RegistroUser";
import Buscador from "../pages/Buscador";
import HomePage from "../pages/HomePage";

function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/inicio" element={<InicioUser />} />
        <Route path="/registro" element={<RegistroUser />} />
        <Route path="/buscador" element={<Buscador />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;