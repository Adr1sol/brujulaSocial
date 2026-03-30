import React, { useState } from 'react';
import Swal from 'sweetalert2';
import styles from './Donacion.module.css';

const Donacion = () => {
    const [causa, setCausa] = useState('Educación');
    const [monto, setMonto] = useState('10.000');
    const [otroMonto, setOtroMonto] = useState('');

    const causas = [
        { id: 'edu', nombre: 'Educación', icon: '🎓' },
        { id: 'amb', nombre: 'Ambiente', icon: '🌿' },
        { id: 'adu', nombre: 'Adulto Mayor', icon: '👴' },
        { id: 'res', nombre: 'Rescate Animal', icon: '🐾' },
    ];

    const montos = ['5.000', '10.000', '25.000', 'Otro'];

    const handleDonarClick = () => {
        Swal.fire({
            title: '¡Gracias Por tu Donación!',
            text: 'Tu contribución ayuda a seguir haciendo el cambio.',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#078A87'
        });
    };

    return (
        <div className={styles.donationContainer}>
            <div className={styles.donationCard}>

                {/* Header Section */}
                <div className={styles.mainTitle}>
                    <h2>Haz la Diferencia Hoy</h2>
                    <p>Tu contribución directa ayuda a transformar comunidades en Costa Rica.</p>
                </div>

                {/* Paso 1 */}
                <section className={styles.stepSection}>
                    <div className={styles.stepHeader}>
                        <span className={styles.stepNumber}>1</span>
                        <h3>Selecciona una Causa</h3>
                    </div>
                    <div className={styles.optionsGrid}>
                        {causas.map((c) => (
                            <button
                                key={c.id}
                                className={`${styles.optionBtn} ${causa === c.nombre ? styles.active : ''}`}
                                onClick={() => setCausa(c.nombre)}
                            >
                                <span className={styles.icon}>{c.icon}</span>
                                <span className={styles.label}>{c.nombre}</span>
                            </button>
                        ))}
                    </div>
                </section>

                {/* Paso 2 */}
                <section className={styles.stepSection}>
                    <div className={styles.stepHeader}>
                        <span className={styles.stepNumber}>2</span>
                        <h3>Monto de la Donación</h3>
                    </div>
                    <div className={styles.amountsGrid}>
                        {montos.map((m) => (
                            <button
                                key={m}
                                className={`${styles.amountBtn} ${monto === m ? styles.active : ''}`}
                                onClick={() => setMonto(m)}
                            >
                                {m !== 'Otro' ? `₡${m}` : m}
                            </button>
                        ))}
                    </div>
                    {monto === 'Otro' && (
                        <div className={styles.inputGroup}>
                            <label>Ingresa un monto personalizado</label>
                            <input
                                type="number"
                                placeholder="Monto en Colones"
                                value={otroMonto}
                                onChange={(e) => setOtroMonto(e.target.value)}
                                className={styles.customAmountInput}
                            />
                        </div>
                    )}
                </section>

                {/* Paso 3 */}
                <section className={styles.stepSection}>
                    <div className={styles.stepHeader}>
                        <span className={styles.stepNumber}>3</span>
                        <h3>Información de Pago</h3>
                    </div>

                    <div className={styles.paymentLayout}>
                        <div className={styles.paymentForm}>
                            <div className={styles.inputGroup}>
                                <label>NOMBRE DEL TITULAR</label>
                                <input type="text" placeholder="Ej. Ana Pérez" className={styles.inputField} />
                            </div>
                            <div className={styles.inputGroup}>
                                <label>NÚMERO DE TARJETA</label>
                                <input type="text" placeholder="0000 0000 0000 0000" className={styles.inputField} />
                            </div>
                            <div className={styles.formRow}>
                                <div className={styles.inputGroup}>
                                    <label>VENCIMIENTO</label>
                                    <input type="text" placeholder="MM/YY" className={styles.inputField} />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label>CVV</label>
                                    <input type="password" placeholder="***" className={styles.inputField} />
                                </div>
                            </div>
                        </div>

                        <div className={styles.secureInfo}>
                            <div className={styles.shieldIcon}>🛡️</div>
                            <h4>Transacción Segura</h4>
                            <p>Tus datos están protegidos bajo protocolos de encriptación de grado bancario.</p>
                            <div className={styles.cardLogos}>
                                <span>💳 VISA</span>
                                <span>💳 MC</span>
                                <span>💳 AMEX</span>
                            </div>
                        </div>
                    </div>
                </section>

                <button className={styles.submitBtn} onClick={handleDonarClick}>
                    ❤️ Donar Ahora
                </button>

                <p className={styles.taxDisclaimer}>
                    ✓ Tu donación es 100% deducible de impuestos en Costa Rica.
                </p>
            </div>
        </div>
    );
};

export default Donacion