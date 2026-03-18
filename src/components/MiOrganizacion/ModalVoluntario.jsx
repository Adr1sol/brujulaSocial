import React, { useState, useEffect } from 'react'
import ServiceVoluntariado from '../../services/ServiceVoluntariado'
import ServiceOrganizaciones from '../../services/ServiceOrganizaciones'

function ModalVoluntario({ voluntario, onCerrar }) {

    const [historial, setHistorial] = useState([])
    const [organizaciones, setOrganizaciones] = useState([])

    useEffect(() => {
        async function cargarHistorial() {

            // 1. Traer todas las aplicaciones del voluntario
            const todasLasAplicaciones = await ServiceVoluntariado.getVoluntariado()
            const aplicacionesDelVoluntario = todasLasAplicaciones.filter(
                (a) => String(a.idUsuario) === String(voluntario.id)
            )
            setHistorial(aplicacionesDelVoluntario)

            // 2. Traer organizaciones para mostrar los nombres
            const todasLasOrgs = await ServiceOrganizaciones.getOrganizaciones()
            setOrganizaciones(todasLasOrgs)
        }

        cargarHistorial()
    }, [voluntario])

    function getNombreOrg(idOrganizacion) {
        const org = organizaciones.find((o) => String(o.id) === String(idOrganizacion))
        return org ? org.NombreOrganizacion : "Organización desconocida"
    }

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
        }}>
            <div style={{
                background: 'white',
                borderRadius: '14px',
                width: '100%',
                maxWidth: '480px',
                overflow: 'hidden'
            }}>

                {/* Header */}
                <div style={{
                    background: 'linear-gradient(135deg, #0a5040, #1D9E75)',
                    padding: '18px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <h3 style={{ color: '#fff', fontSize: '16px', fontWeight: '500' }}>
                        Perfil del voluntario
                    </h3>
                    <button onClick={onCerrar} style={{
                        background: 'rgba(255,255,255,.2)',
                        border: 'none',
                        color: '#fff',
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        cursor: 'pointer',
                        fontSize: '14px'
                    }}>✕</button>
                </div>

                {/* Body */}
                <div style={{ padding: '20px' }}>

                    {/* Información personal */}
                    <p style={{ fontSize: '11px', color: 'gray', textTransform: 'uppercase', letterSpacing: '.6px', marginBottom: '10px' }}>
                        Información personal
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '18px' }}>
                        <div style={{ background: '#f5f5f5', borderRadius: '8px', padding: '10px 12px' }}>
                            <div style={{ fontSize: '11px', color: 'gray', marginBottom: '3px' }}>Nombre completo</div>
                            <div style={{ fontSize: '13px', fontWeight: '500' }}>{voluntario.Nombre}</div>
                        </div>
                        <div style={{ background: '#f5f5f5', borderRadius: '8px', padding: '10px 12px' }}>
                            <div style={{ fontSize: '11px', color: 'gray', marginBottom: '3px' }}>Correo</div>
                            <div style={{ fontSize: '13px', fontWeight: '500' }}>{voluntario.Correo}</div>
                        </div>
                        <div style={{ background: '#f5f5f5', borderRadius: '8px', padding: '10px 12px' }}>
                            <div style={{ fontSize: '11px', color: 'gray', marginBottom: '3px' }}>Teléfono</div>
                            <div style={{ fontSize: '13px', fontWeight: '500' }}>{voluntario.Telefono || "No registrado"}</div>
                        </div>
                        <div style={{ background: '#f5f5f5', borderRadius: '8px', padding: '10px 12px' }}>
                            <div style={{ fontSize: '11px', color: 'gray', marginBottom: '3px' }}>Fecha de registro</div>
                            <div style={{ fontSize: '13px', fontWeight: '500' }}>{voluntario.FechaRegistro}</div>
                        </div>
                        <div style={{ background: '#f5f5f5', borderRadius: '8px', padding: '10px 12px' }}>
                            <div style={{ fontSize: '11px', color: 'gray', marginBottom: '3px' }}>Fecha de aplicación</div>
                            <div style={{ fontSize: '13px', fontWeight: '500' }}>{voluntario.FechaAplicacion}</div>
                        </div>
                    </div>

                    {/* Historial */}
                    <p style={{ fontSize: '11px', color: 'gray', textTransform: 'uppercase', letterSpacing: '.6px', marginBottom: '10px' }}>
                        Historial de voluntariados
                    </p>
                    {historial.length > 0 ? (
                        historial.map((h, index) => (
                            <div key={index} style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '8px 12px',
                                background: '#f5f5f5',
                                borderRadius: '8px',
                                marginBottom: '6px',
                                fontSize: '13px'
                            }}>
                                <span style={{ fontWeight: '500' }}>{getNombreOrg(h.idOrganizacion)}</span>
                                <span style={{ fontSize: '12px', color: 'gray' }}>{h.FechaAplicacion}</span>
                            </div>
                        ))
                    ) : (
                        <p style={{ fontSize: '13px', color: 'gray' }}>Sin historial de voluntariados.</p>
                    )}
                </div>

                {/* Footer */}
                <div style={{
                    padding: '14px 20px',
                    borderTop: '0.5px solid #eee',
                    display: 'flex',
                    justifyContent: 'flex-end'
                }}>
                    <button onClick={onCerrar} style={{
                        padding: '8px 20px',
                        background: '#1D9E75',
                        border: 'none',
                        borderRadius: '8px',
                        color: '#fff',
                        fontSize: '13px',
                        cursor: 'pointer'
                    }}>Cerrar</button>
                </div>

            </div>
        </div>
    )
}

export default ModalVoluntario