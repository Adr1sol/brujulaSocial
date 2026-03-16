import { BrowserRouter, Routes, Route } from "react-router-dom";

import InicioUser from "../pages/InicioUser";
import RegistroUser from "../pages/RegistroUser";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InicioUser />} />
        <Route path="/registro" element={<RegistroUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;