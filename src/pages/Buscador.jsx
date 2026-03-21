import React, { useState } from 'react'
import BuscadorOrganizaciones from '../components/Buscador/BuscadorOrganizaciones'
import FiltrosOrganizaciones from '../components/Filtros/FiltrosOrganizaciones'
<<<<<<< HEAD
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
=======
import NavbarGlobal from '../components/NavbarGlobal/NavbarGlobal'
>>>>>>> d0a724793b40936c8328e32882afceb9ce238c1b

function Buscador() {

    const usuario = JSON.parse(localStorage.getItem("user"))

    const linksBuscador = [
        { label: 'Home', path: '/' },
        { label: 'Mi Perfil', path: '/perfil' },
        { label: 'Contacto', path: '/' }
    ]

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
<<<<<<< HEAD
            <Navbar/>
            <FiltrosOrganizaciones
                filtros={filtros}
                onFiltroChange={manejoCambioFiltro}
            />

            <BuscadorOrganizaciones
                filtros={filtros}
            />
            <Footer />
=======
            <NavbarGlobal links={linksBuscador} usuario={usuario} />

            <div style={{ padding: '24px', background: '#F1EFE8', minHeight: '100vh' }}>
                <FiltrosOrganizaciones
                    filtros={filtros}
                    onFiltroChange={manejoCambioFiltro}
                />
                <BuscadorOrganizaciones
                    filtros={filtros}
                />
            </div>
>>>>>>> d0a724793b40936c8328e32882afceb9ce238c1b
        </div>
    )
}

export default Buscador