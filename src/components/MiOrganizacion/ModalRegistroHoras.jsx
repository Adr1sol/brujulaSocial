import React, { useState } from 'react'
import ServiceHoras from '../../services/ServiceHoras'
import Swal from 'sweetalert2'

function ModalRegistroHoras({ voluntario, idOrganizacion, onCerrar }) {

    const [actividad, setActividad] = useState("")
    const [fecha, setFecha] = useState("")
    const [horas, setHoras] = useState("")

    async function registrarHoras() {

        if (!actividad || !fecha || !horas) {
            Swal.fire({
                icon: 'error',
                title: 'Formulario incompleto',
                text: 'Todos los campos deben estar llenos.',
                confirmButtonColor: '#EF8514'
            })
            return
        }

        const objHoras = {
            idUsuario: voluntario.id,
            idOrganizacion: idOrganizacion,
            actividad: actividad,
            fecha: fecha,
            horas: parseInt(horas)
        }

        const registradas = await ServiceHoras.postHoras(objHoras)

        if (registradas) {
            Swal.fire({
                icon: 'success',
                title: '¡Horas registradas!',
                text: `Se registraron ${horas}h para ${voluntario.Nombre} correctamente.`,
                timer: 2000,
                showConfirmButton: false
            }).then(() => {
                onCerrar()
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudieron registrar las horas. Intentá de nuevo.',
                confirmButtonColor: '#EF8514'
            })
        }
    }

    const inputStyle = {
        width: '100%', padding: '10px 14px',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: '8px', fontSize: '14px',
        color: '#f8fafc', background: '#334155',
        marginBottom: '14px', fontFamily: 'inherit',
        outline: 'none', boxSizing: 'border-box'
    }

    const labelStyle = {
        fontSize: '12px', color: '#cbd5e1',
        fontWeight: '600', textTransform: 'uppercase',
        letterSpacing: '0.5px', marginBottom: '6px', display: 'block'
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
                maxWidth: '420px',
                overflow: 'hidden',
                boxShadow: '0 40px 100px rgba(0,0,0,0.5)'
            }}>

                {/* Header */}
                <div style={{
                    padding: '20px 24px',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    borderBottom: '1px solid rgba(255,255,255,0.12)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                            width: '40px', height: '40px', borderRadius: '12px',
                            background: 'rgba(20,184,166,0.15)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px'
                        }}>⏱️</div>
                        <h3 style={{ margin: 0, fontSize: '17px', fontWeight: '600', color: '#f8fafc' }}>
                            Registrar horas
                        </h3>
                    </div>
                    <button onClick={onCerrar} style={{
                        background: 'transparent', border: 'none', color: '#94a3b8',
                        cursor: 'pointer', fontSize: '20px', lineHeight: 1
                    }}>✕</button>
                </div>

                {/* Body */}
                <div style={{ padding: '24px' }}>

                    {/* Voluntario */}
                    <div style={{
                        background: '#334155', borderRadius: '8px',
                        padding: '12px 16px', marginBottom: '20px',
                        borderLeft: '3px solid #14b8a6'
                    }}>
                        <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '3px', fontWeight: '600' }}>
                            Voluntario
                        </div>
                        <div style={{ fontSize: '14px', fontWeight: '600', color: '#f8fafc' }}>
                            {voluntario.Nombre}
                        </div>
                        <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                            {voluntario.Correo}
                        </div>
                    </div>

                    <label style={labelStyle}>Actividad</label>
                    <input
                        type="text"
                        value={actividad}
                        onChange={(e) => setActividad(e.target.value)}
                        placeholder="Descripción de la actividad"
                        style={inputStyle}
                    />

                    <label style={labelStyle}>Fecha</label>
                    <input
                        type="date"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                        style={inputStyle}
                    />

                    <label style={labelStyle}>Cantidad de horas</label>
                    <input
                        type="number"
                        value={horas}
                        onChange={(e) => setHoras(e.target.value)}
                        placeholder="Ej: 4"
                        min="1"
                        style={{ ...inputStyle, marginBottom: 0 }}
                    />
                </div>

                {/* Footer */}
                <div style={{
                    padding: '16px 24px',
                    borderTop: '1px solid rgba(255,255,255,0.06)',
                    background: '#334155',
                    borderBottomLeftRadius: '16px',
                    borderBottomRightRadius: '16px',
                    display: 'flex', justifyContent: 'flex-end', gap: '10px'
                }}>
                    <button onClick={onCerrar} style={{
                        padding: '9px 20px', background: '#475569',
                        border: '1px solid rgba(255,255,255,0.12)',
                        borderRadius: '8px', color: '#e2e8f0',
                        fontSize: '13px', fontWeight: '600', cursor: 'pointer'
                    }}>Cancelar</button>
                    <button onClick={registrarHoras} style={{
                        padding: '9px 24px', background: '#14b8a6', border: 'none',
                        borderRadius: '8px', color: '#fff', fontSize: '13px',
                        fontWeight: '600', cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(20,184,166,0.4)'
                    }}>Registrar</button>
                </div>

            </div>
        </div>
    )
}

export default ModalRegistroHoras
