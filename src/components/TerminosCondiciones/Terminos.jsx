import React from 'react';
import styles from "./Terminos.module.css";
// ✅ Navbar eliminado — NavbarGlobal vive en Routing.jsx

const Terminos = () => {
    return (
        <div className={styles['terminos-wrapper']}>
            {/* ✅ <Navbar /> eliminado */}
            <div className={styles['terminos-container']}>
                <header className={styles['terminos-header']}>
                    <h1>Términos y Condiciones</h1>
                    <p>Última actualización: [Fecha Actual]</p>
                </header>

                <section className={styles['terminos-seccion']}>
                    <h2>1. Aceptación de los Términos</h2>
                    <p>
                        Al acceder y utilizar este sitio web, usted acepta cumplir y estar sujeto a los siguientes términos y condiciones de uso. Si no está de acuerdo con alguna parte de estos términos, no debe utilizar este sitio web.
                    </p>
                </section>

                <section className={styles['terminos-seccion']}>
                    <h2>2. Naturaleza del Servicio</h2>
                    <p>
                        Nuestra plataforma actúa como un intermediario para conectar a voluntarios con organizaciones que buscan apoyo. No somos responsables de la conducta de los voluntarios ni de las condiciones en las organizaciones.
                    </p>
                </section>

                <section className={styles['terminos-seccion']}>
                    <h2>3. Responsabilidades del Voluntario</h2>
                    <ul>
                        <li>Comprometerse con las tareas acordadas.</li>
                        <li>Tratar a los demás con respeto.</li>
                        <li>Proporcionar información veraz.</li>
                        <li>Cumplir con las normativas de la organización.</li>
                    </ul>
                </section>

                <section className={styles['terminos-seccion']}>
                    <h2>4. Responsabilidades de la Organización</h2>
                    <ul>
                        <li>Proporcionar un entorno seguro y adecuado.</li>
                        <li>Informar sobre riesgos y normas.</li>
                        <li>Proporcionar los recursos necesarios para el voluntariado.</li>
                    </ul>
                </section>

                <section className={styles['terminos-seccion']}>
                    <h2>5. Propiedad Intelectual</h2>
                    <p>
                        Todo el contenido del sitio web es propiedad de la plataforma o de sus licenciantes y está protegido por derechos de autor.
                    </p>
                </section>

                <section className={styles['terminos-seccion']}>
                    <h2>6. Limitación de Responsabilidad</h2>
                    <p>
                        La plataforma no se hace responsable por daños o pérdidas derivados del uso del sitio web o de la participación en las actividades de voluntariado.
                    </p>
                </section>

                <section className={styles['terminos-seccion']}>
                    <h2>7. Política de Privacidad</h2>
                    <p>
                        Nuestra política de privacidad describe cómo recopilamos, utilizamos y protegemos sus datos personales. Puede consultarla aquí: [Enlace a la política de privacidad].
                    </p>
                </section>

                <section className={styles['terminos-seccion']}>
                    <h2>8. Modificaciones a los Términos</h2>
                    <p>
                        Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios se notificarán en este sitio web.
                    </p>
                </section>

                <section className={styles['terminos-seccion']}>
                    <h2>9. Ley Aplicable y Jurisdicción</h2>
                    <p>
                        Estos términos se rigen por las leyes de [Su país/estado]. Cualquier disputa se resolverá en los tribunales de [Su ciudad].
                    </p>
                </section>

                <footer className={styles['terminos-footer']}>
                </footer>
            </div>
        </div>
    );
};

export default Terminos;