import React, { useState } from 'react';

import './Donacion.css';

import Swal from 'sweetalert2'

const Donacion = () => {
    const [causa, setCausa] = useState('Educación');
    const [monto, setMonto] = useState('10.000');
    const [otroMonto, setOtroMonto] = useState('');

    const causas = [
        { id: 'edu', nombre: 'Educación', icon: '🎓' },

        { id: 'amb', nombre: 'Ambiente', icon: '🍃' },

        { id: 'adu', nombre: 'Adulto Mayor', icon: '👴' },
        { id: 'res', nombre: 'Rescate Animal', icon: '🐾' },
    ];

    const montos = ['5.000', '10.000', '25.000', 'Otro monto'];

    const handleDonarClick = () => {
        Swal.fire({
            title: 'Gracias Por tu Donacion',
            text: 'Tu Donacion ha sido enviada con exito.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
        });
    };
    // success verde
    // warning amarillo
    // info celeste

    return (

        <div className="donation-card">

            {/* Paso 1: Selecciona una Causa */}
            <section className="step-section">
                <div className="step-header">
                    <span className="step-number">1</span>
                    <h3>Selecciona una Causa</h3>
                </div>
                <div className="options-grid">
                    {causas.map((c) => (
                        <button
                            key={c.id}
                            className={`option-btn ${causa === c.nombre ? 'active' : ''}`}
                            onClick={() => setCausa(c.nombre)}
                        >
                            <span className="icon">{c.icon}</span>
                            <span className="label">{c.nombre}</span>

                        </button>
                    ))}
                </div>
            </section>

            {/* Paso 2: Monto de la Donación */}

            <section className="step-section">
                <div className="step-header">
                    <span className="step-number">2</span>
                    <h3>Monto de la Donación</h3>
                </div>
                <div className="amounts-grid">
                    {montos.map((m) => (
                        <button
                            key={m}
                            className={`amount-btn ${monto === m ? 'active' : ''}`}

                            onClick={() => setMonto(m)}
                        >
                            {m !== 'Otro monto' ? `₡${m}` : m}
                        </button>
                    ))}
                </div>
                {monto === 'Otro monto' && (

                    <div className="input-group">

                        <label>Ingresa un monto personalizado</label>
                        <input
                            type="number"
                            placeholder="Otro Monto"
                            value={otroMonto}
                            onChange={(e) => setOtroMonto(e.target.value)}

                            className="custom-amount-input"

                        />
                    </div>
                )}
            </section>

            {/* Paso 3: Información de Pago */}

            <section className="step-section">
                <div className="step-header">
                    <span className="step-number">3</span>
                    <h3>Información de Pago</h3>
                </div>

                <div className="payment-layout">
                    <div className="payment-form">
                        <div className="input-group">
                            <label>NOMBRE DEL TITULAR</label>
                            <input type="text" placeholder="Ej. María García" />
                        </div>
                        <div className="input-group">
                            <label>NÚMERO DE TARJETA</label>
                            <div className="card-input-wrapper">
                                <input type="text" placeholder="0000 0000 0000 0000" />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="input-group">
                                <label>VENCIMIENTO</label>
                                <input type="text" placeholder="MM/YY" />
                            </div>
                            <div className="input-group">

                                <label>CVV</label>
                                <input type="password" placeholder="***" />
                            </div>
                        </div>
                    </div>


                    <div className="secure-info">
                        <div className="shield-icon">🛡️</div>
                        <h4>Transacción Segura</h4>
                        <p>Tus datos están protegidos bajo protocolos de seguridad de grado bancario.</p>
                        <div className="card-logos">

                            <span>VISA</span> <span>MC</span> <span>AMEX</span>
                        </div>
                    </div>
                </div>
            </section>


            <button className="submit-btn" onClick={handleDonarClick}>
                
                🧡 Donar ahora
            </button>

            
            <p className="tax-disclaimer">

                ✓ Tu donación es 100% deducible de impuestos.
            </p>
        </div>
    );
};


export default Donacion;

