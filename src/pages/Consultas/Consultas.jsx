import React, { useState } from 'react';
import styles from './Consultas.module.css';

const Consultas = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        mensaje: ''
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí iría la lógica para enviar la consulta
        console.log('Consulta enviada:', formData);
        setSubmitted(true);
        setFormData({
            nombre: '',
            email: '',
            mensaje: ''
        });
    };

    return (
        <div className={styles.container}>
            <div className={styles.helpHeader}>
                <h1>Ayuda y Consultas</h1>
                <p>¿Tienes alguna duda o necesitas asistencia? Escríbenos y nos pondremos en contacto contigo lo antes posible.</p>
            </div>

            <div className={styles.formWrapper}>
                {submitted ? (
                    <div className={styles.successMessage}>
                        <i className="gg-check-o"></i>
                        <h2>¡Consulta enviada con éxito!</h2>
                        <p>Gracias por contactarnos. Responderemos a tu solicitud a la brevedad.</p>
                        <button onClick={() => setSubmitted(false)} className={styles.resetButton}>
                            Enviar otra consulta
                        </button>
                    </div>
                ) : (
                    <form className={styles.consultasForm} onSubmit={handleSubmit}>
                        <div className={styles.formGroup}>
                            <label htmlFor="nombre">Nombre Completo</label>
                            <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                placeholder="Tu nombre"
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="email">Correo Electrónico</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="tu@email.com"
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="mensaje">Mensaje</label>
                            <textarea
                                id="mensaje"
                                name="mensaje"
                                value={formData.mensaje}
                                onChange={handleChange}
                                placeholder="Describe tu consulta aquí..."
                                rows="5"
                                required
                            ></textarea>
                        </div>

                        <button type="submit" className={styles.submitButton}>
                            Enviar Consulta
                        </button>
                    </form>
                )}
            </div>

            <div className={styles.contactInfo}>
                <h3>Otras formas de contacto</h3>
                <div className={styles.infoCards}>
                    <div className={styles.infoCard}>
                        <i className="gg-mail"></i>
                        <p>soporte@brujulasocial.cr</p>
                    </div>
                    <div className={styles.infoCard}>
                        <i className="gg-phone"></i>
                        <p>+506 2222-3333</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Consultas;
