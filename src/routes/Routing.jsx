import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Home from "../pages/Home/Home";
import Privacidad from "../pages/Privacidad";
import Terminos from "../pages/Terminos";
import InicioUser from "../pages/InicioUser";
import RegistroUser from "../pages/RegistroUser";
import Buscador from "../pages/Buscador";

import Consultas from "../pages/Consultas/Consultas";

function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
}

function Routing() {
    return (
        <Router>
            <ScrollToTop />
            <Navbar />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/privacidad" element={<Privacidad />} />
                    <Route path="/terminos" element={<Terminos />} />
                    <Route path="/registro" element={<RegistroUser />} />
                    <Route path="/login" element={<InicioUser />} />
                    <Route path="/buscador" element={<Buscador />} />
                    <Route path="/consultas" element={<Consultas />} />
                </Routes>
            </main>
            <Footer />
        </Router>
    );
}

export default Routing;