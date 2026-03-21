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
                maxWidth: '420px',
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
                        Registrar horas
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

                    {/* Voluntario seleccionado */}
                    <div style={{
                        background: '#f5f5f5',
                        borderRadius: '8px',
                        padding: '10px 14px',
                        marginBottom: '16px'
                    }}>
                        <div style={{ fontSize: '11px', color: 'gray', marginBottom: '3px' }}>
                            Voluntario
                        </div>
                        <div style={{ fontSize: '14px', fontWeight: '500' }}>
                            {voluntario.Nombre}
                        </div>
                        <div style={{ fontSize: '12px', color: 'gray' }}>
                            {voluntario.Correo}
                        </div>
                    </div>

                    <p style={{ fontSize: '13px', marginBottom: '5px' }}>Actividad</p>
                    <input
                        type="text"
                        value={actividad}
                        onChange={(e) => setActividad(e.target.value)}
                        placeholder="Descripción de la actividad"
                        style={{
                            width: '100%',
                            padding: '8px 12px',
                            border: '0.5px solid #ccc',
                            borderRadius: '8px',
                            fontSize: '13px',
                            marginBottom: '12px'
                        }}
                    />

                    <p style={{ fontSize: '13px', marginBottom: '5px' }}>Fecha</p>
                    <input
                        type="date"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '8px 12px',
                            border: '0.5px solid #ccc',
                            borderRadius: '8px',
                            fontSize: '13px',
                            marginBottom: '12px'
                        }}
                    />

                    <p style={{ fontSize: '13px', marginBottom: '5px' }}>Cantidad de horas</p>
                    <input
                        type="number"
                        value={horas}
                        onChange={(e) => setHoras(e.target.value)}
                        placeholder="Ej: 4"
                        min="1"
                        style={{
                            width: '100%',
                            padding: '8px 12px',
                            border: '0.5px solid #ccc',
                            borderRadius: '8px',
                            fontSize: '13px',
                            marginBottom: '16px'
                        }}
                    />
                </div>

                {/* Footer */}
                <div style={{
                    padding: '14px 20px',
                    borderTop: '0.5px solid #eee',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: '8px'
                }}>
                    <button onClick={onCerrar} style={{
                        padding: '8px 16px',
                        background: 'transparent',
                        border: '0.5px solid #ccc',
                        borderRadius: '8px',
                        fontSize: '13px',
                        cursor: 'pointer'
                    }}>Cancelar</button>
                    <button onClick={registrarHoras} style={{
                        padding: '8px 20px',
                        background: '#1D9E75',
                        border: 'none',
                        borderRadius: '8px',
                        color: '#fff',
                        fontSize: '13px',
                        cursor: 'pointer'
                    }}>Registrar</button>
                </div>

            </div>
        </div>
    )
}

export default ModalRegistroHoras