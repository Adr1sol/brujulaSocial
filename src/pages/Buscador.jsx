import React, { useState } from 'react'
import BuscadorOrganizaciones from '../components/Buscador/BuscadorOrganizaciones'
import FiltrosOrganizaciones from '../components/Filtros/FiltrosOrganizaciones'
import NavbarGlobal from '../components/NavbarGlobal/NavbarGlobal'

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
            <NavbarGlobal links={linksBuscador} usuario={usuario} />

            <FiltrosOrganizaciones
                filtros={filtros}
                onFiltroChange={manejoCambioFiltro}
            />

            <BuscadorOrganizaciones
                filtros={filtros}
            />
        </div>
    )
}

export default Buscador