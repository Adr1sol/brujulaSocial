import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Privacidad from "../pages/Privacidad";
import Terminos from "../pages/Terminos";

function Routing() {
    return (
        <Router>
            <Navbar />
            <main>
                <Routes>
                    <Route path="/" element={
                        <div style={{ padding: '4rem', textAlign: 'center' }}>
                            <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Brújula Social</h1>
                            <p style={{ color: '#64748b', fontSize: '1.2rem' }}>Conectando al voluntariado con el impacto social.</p>
                        </div>
                    } />
                    <Route path="/privacidad" element={<Privacidad />} />
                    <Route path="/terminos" element={<Terminos />} />
                    <Route path="/registro" element={<div style={{padding: '4rem', textAlign: 'center'}}><h1>Página de Registro</h1></div>} />
                    <Route path="/inicio-user" element={<div style={{padding: '4rem', textAlign: 'center'}}><h1>Página de Contacto / Login</h1></div>} />
                </Routes>
            </main>
            <Footer />
        </Router>
    )
}
export default Routing