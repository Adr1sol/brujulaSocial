import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from "../pages/HomePage"
import PerfilPage from "../pages/PerfilPage"

function Routing() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/perfil" element={<PerfilPage />} />
            </Routes>
        </Router>
    )
}

export default Routing