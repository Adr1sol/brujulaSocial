import React, { useState, useEffect } from 'react'
import ServiceVoluntariado from '../../services/ServiceVoluntariado'
import ServiceOrganizaciones from '../../services/ServiceOrganizaciones'

function ModalVoluntario({ voluntario, onCerrar }) {

    const [historial, setHistorial] = useState([])
    const [organizaciones, setOrganizaciones] = useState([])

    useEffect(() => {
        async function cargarHistorial() {
            const todasLasAplicaciones = await ServiceVoluntariado.getVoluntariado()
            const aplicacionesDelVoluntario = todasLasAplicaciones.filter(
                (a) => String(a.idUsuario) === String(voluntario.id)
            )
            setHistorial(aplicacionesDelVoluntario)

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
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
            background: 'rgba(15,23,42,0.75)', backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
            <div style={{
                background: '#1e293b',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '16px',
                width: '100%',
                maxWidth: '480px',
                maxHeight: '90vh',
                overflow: 'auto',
                boxShadow: '0 40px 100px rgba(0,0,0,0.5)'
            }}>

                {/* Header */}
                <div style={{
                    padding: '20px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid rgba(255,255,255,0.12)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                            width: '40px', height: '40px', borderRadius: '12px',
                            background: 'rgba(20,184,166,0.15)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px'
                        }}>👤</div>
                        <h3 style={{ margin: 0, fontSize: '17px', fontWeight: '600', color: '#f8fafc' }}>
                            Perfil del voluntario
                        </h3>
                    </div>
                    <button onClick={onCerrar} style={{
                        background: 'transparent', border: 'none', color: '#94a3b8',
                        cursor: 'pointer', fontSize: '20px', lineHeight: 1
                    }}>✕</button>
                </div>

                {/* Body */}
                <div style={{ padding: '24px' }}>

                    <p style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: '12px', fontWeight: '600' }}>
                        Información personal
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
                        {[
                            { label: 'Nombre completo', value: voluntario.Nombre },
                            { label: 'Correo',          value: voluntario.Correo },
                            { label: 'Teléfono',        value: voluntario.Telefono || 'No registrado' },
                            { label: 'Fecha de registro', value: voluntario.FechaRegistro },
                            { label: 'Fecha de aplicación', value: voluntario.FechaAplicacion },
                        ].map((item, i) => (
                            <div key={i} style={{ background: '#334155', borderRadius: '8px', padding: '10px 14px' }}>
                                <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '4px', fontWeight: '600' }}>{item.label}</div>
                                <div style={{ fontSize: '14px', fontWeight: '500', color: '#f8fafc' }}>{item.value}</div>
                            </div>
                        ))}
                    </div>

                    <p style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: '12px', fontWeight: '600' }}>
                        Historial de voluntariados
                    </p>
                    {historial.length > 0 ? (
                        historial.map((h, index) => (
                            <div key={index} style={{
                                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                padding: '10px 14px', background: '#334155', borderRadius: '8px',
                                marginBottom: '6px', fontSize: '13px'
                            }}>
                                <span style={{ fontWeight: '500', color: '#f8fafc' }}>{getNombreOrg(h.idOrganizacion)}</span>
                                <span style={{ fontSize: '12px', color: '#94a3b8' }}>{h.FechaAplicacion}</span>
                            </div>
                        ))
                    ) : (
                        <p style={{ fontSize: '13px', color: '#94a3b8' }}>Sin historial de voluntariados.</p>
                    )}
                </div>

                {/* Footer */}
                <div style={{
                    padding: '16px 24px',
                    borderTop: '1px solid rgba(255,255,255,0.06)',
                    background: '#334155',
                    borderBottomLeftRadius: '16px',
                    borderBottomRightRadius: '16px',
                    display: 'flex',
                    justifyContent: 'flex-end'
                }}>
                    <button onClick={onCerrar} style={{
                        padding: '9px 24px', background: '#14b8a6', border: 'none',
                        borderRadius: '8px', color: '#fff', fontSize: '13px',
                        fontWeight: '600', cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(20,184,166,0.4)'
                    }}>Cerrar</button>
                </div>

            </div>
        </div>
    )
}

export default ModalVoluntario
