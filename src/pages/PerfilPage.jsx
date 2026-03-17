import React from 'react'
import PerfilVoluntario from '../components/PerfilVoluntario/PerfilVoluntario'

function PerfilPage() {

    // Temporal hasta que el login esté listo
    localStorage.setItem("nombre", "María González")

    return (
        <div>
            <PerfilVoluntario />
        </div>
    )
}

export default PerfilPage