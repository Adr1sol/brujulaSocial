import React, { useState } from 'react'
import BuscadorOrganizaciones from '../components/Buscador/BuscadorOrganizaciones'
import FiltrosOrganizaciones from '../components/Filtros/FiltrosOrganizaciones'
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

function Buscador() {

    const [filtros, setFiltros] = useState({
        idCategoria: '',
        IdProvincia: '',
        idDisponibilidad: ''
    })

    function manejoCambioFiltro(campo, valor) {
        setFiltros((prev) => ({ ...prev, [campo]: valor }))
    }

    return (
        <div>
            <Navbar/>
            <FiltrosOrganizaciones
                filtros={filtros}
                onFiltroChange={manejoCambioFiltro}
            />

            <BuscadorOrganizaciones
                filtros={filtros}
            />
            <Footer />
        </div>
    )
}

export default Buscador