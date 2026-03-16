import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

function Routing() {
    return (
        <Router>
            <Navbar />
            <main>
                <div style={{ padding: '2rem', textAlign: 'center' }}>
                    <h1>Espacio para contenido de compañeros</h1>
                    <p>El Navbar y el Footer están listos.</p>
                </div>
            </main>
            <Footer />
        </Router>
    )
}
export default Routing