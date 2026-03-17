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

import NavbarOrg from "../components/NavbarOrg/NavbarOrg";

function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
}

function MainLayout() {
    const location = useLocation();
    const isOrgPage = location.pathname === "/registerOrg";

    return (
        <>
            {isOrgPage ? <NavbarOrg /> : <Navbar />}
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/privacidad" element={<Privacidad />} />
                    <Route path="/terminos" element={<Terminos />} />
                    <Route path="/registro" element={<RegistroUser />} />
                    <Route path="/login" element={<InicioUser />} />
                    <Route path="/registerOrg" element={<Buscador />} />
                </Routes>
            </main>
        </>
    );
}

function Routing() {
    return (
        <Router>
            <ScrollToTop />
            <MainLayout />
            <Footer />
        </Router>
    );
}

export default Routing;