import React from 'react';
import styles from './terminos.module.css';

const Terminos = () => {
  return (
    <div className={styles.container}>
      <div className={styles.paper}>
        <header className={styles.header}>
          <h1>ESTATUTO DE TÉRMINOS, CONDICIONES Y MARCO REGULATORIO DE LA PLATAFORMA</h1>
        </header>

        <section className={styles.section}>
          <h2>CLÁUSULA I: NATURALEZA JURÍDICA Y OBJETO</h2>
          <p>
            El presente documento constituye un contrato de adhesión vinculante entre el usuario (en adelante, "El Colaborador") y la administración de la plataforma (en adelante, "La Entidad"). El objeto es regular el acceso al ecosistema digital destinado a la gestión, articulación y despliegue de iniciativas de regeneración ecosistémica y empoderamiento comunitario en territorio costarricense.
          </p>
        </section>

        <section className={styles.section}>
          <h2>CLÁUSULA II: DECLARACIÓN DE NO-RELACIÓN LABORAL</h2>
          <p>De conformidad con la Ley de Voluntariado de Costa Rica (Ley N° 8435), se establece de forma taxativa que:</p>
          <ul>
            <li>La participación en los proyectos es de carácter altruista, solidario y estrictamente gratuito.</li>
            <li>No existe subordinación jurídica, dependencia económica ni jornada laboral regulada por el Código de Trabajo.</li>
            <li>La Entidad actúa únicamente como facilitador tecnológico y operacional, por lo que no asume obligaciones patronales de ninguna índole.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>CLÁUSULA III: PROTOCOLOS DE BIOSEGURIDAD Y GESTIÓN DE RIESGOS</h2>
          <p>Dado que las actividades de regeneración activa pueden implicar entornos rurales o silvestres:</p>
          <ul>
            <li><strong>Asunción de Riesgo:</strong> El Colaborador reconoce y acepta de forma voluntaria los riesgos inherentes al trabajo de campo (factores climáticos, biológicos o geográficos).</li>
            <li><strong>Indemnidad:</strong> El Colaborador renuncia irrevocablemente a ejercer acciones legales contra La Entidad por lesiones, daños fortuitos o perjuicios derivados de la ejecución de actividades de voluntariado, asumiendo su propia póliza de accidentes personales si así se requiere.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>CLÁUSULA IV: PROPIEDAD INTELECTUAL Y DERECHOS DE IMAGEN</h2>
          <p><strong>Activos Digitales:</strong> Todos los algoritmos, interfaces de usuario (UI), esquemas de color, logotipos y estructuras de datos son propiedad intelectual protegida bajo la Ley de Derechos de Autor y Derechos Conexos (Ley N° 6683).</p>
          <p><strong>Cesión de Imagen:</strong> Al participar en los proyectos, El Colaborador autoriza a La Entidad el uso no exclusivo de su imagen en material audiovisual, fotográfico o digital con fines estrictamente promocionales de la misión social, sin derecho a contraprestación económica.</p>
        </section>

        <section className={styles.section}>
          <h2>IX. RÉGIMEN DE PROPIEDAD INTELECTUAL DERIVADA</h2>
          <p>Cualquier metodología, reporte de impacto, registro fotográfico o hallazgo científico resultante de las actividades de voluntariado coordinadas a través de la plataforma se considerará Propiedad Intelectual de la Entidad.</p>
          <p>El Colaborador retiene el derecho moral de autoría, pero cede de forma exclusiva, perpetua y global los derechos patrimoniales para la divulgación, edición y publicación de dichos resultados en informes de sostenibilidad o publicaciones académicas.</p>
        </section>

        <section className={styles.section}>
          <h2>X. CLÁUSULA ANTICORRUPCIÓN Y CUMPLIMIENTO (COMPLIANCE)</h2>
          <p>De acuerdo con la Ley de Responsabilidad de las Personas Jurídicas sobre Cohecho Doméstico (Ley N° 9699):</p>
          <ul>
            <li><strong>Cero Tolerancia:</strong> El Colaborador tiene prohibido solicitar, aceptar u ofrecer dádivas, pagos indebidos o favores de comunidades rurales, entes gubernamentales o empresas privadas en nombre de la plataforma.</li>
            <li><strong>Conflicto de Interés:</strong> El Colaborador debe declarar si posee intereses económicos en zonas de intervención que puedan sesgar los reportes de regeneración o el empoderamiento comunitario.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>XI. PROTOCOLO DE SEGURIDAD, EMERGENCIAS Y SEGUROS</h2>
          <p><strong>Seguro Obligatorio:</strong> Se establece que la plataforma es un facilitador de información. Es responsabilidad del Colaborador verificar si el proyecto específico cuenta con una Póliza de Riesgos del Trabajo (RT) de carácter voluntario o si debe adquirir un seguro de accidentes personales por cuenta propia.</p>
          <p><strong>Protocolo de Extracción:</strong> En caso de emergencia médica en zonas de difícil acceso (corredores biológicos), la plataforma coordinará con los entes de socorro (Cruz Roja/Bomberos), pero los costos derivados de rescates privados no cubiertos por seguros públicos serán responsabilidad del Colaborador.</p>
        </section>

        <section className={styles.section}>
          <h2>XII. POLÍTICA DE USO DE HERRAMIENTAS Y ACTIVOS FÍSICOS</h2>
          <p>Si para la misión de regeneración se asignan herramientas (drones, sensores de suelo, equipo de reforestación):</p>
          <ul>
            <li>El Colaborador asume la custodia legal del equipo.</li>
            <li>Cualquier daño derivado de la negligencia, impericia o uso fuera de protocolo será responsabilidad económica del Colaborador, quien deberá resarcir el valor de reposición del activo a La Entidad.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>XIII. CONFIDENCIALIDAD Y NO DIVULGACIÓN (NDA)</h2>
          <p>El Colaborador se obliga a no revelar información técnica, bases de datos de donantes, estrategias de expansión o datos sensibles de poblaciones vulnerables a terceros. Esta obligación de confidencialidad permanecerá vigente por un periodo de cinco (5) años tras la finalización de su última actividad de voluntariado.</p>
        </section>

        <section className={styles.section}>
          <h2>XIV. TRATAMIENTO DE IMAGEN Y REPUTACIÓN DIGITAL</h2>
          <ul>
            <li><strong>Difusión en Redes Sociales:</strong> Se permite al Colaborador documentar su experiencia, siempre que no comprometa la dignidad de las personas locales ni la ubicación exacta de especies en peligro crítico (para evitar la caza furtiva).</li>
            <li><strong>Daño Reputacional:</strong> La publicación de contenido difamatorio o falso que afecte la integridad de la plataforma o de las comunidades socias será causal de expulsión inmediata y reserva de acciones legales por daños y perjuicios.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>XV. VALIDEZ DE LA FIRMA ELECTRÓNICA</h2>
          <p>De conformidad con la Ley de Certificados, Firmas Digitales y Documentos Electrónicos (Ley N° 8454), la aceptación mediante el marcado de la casilla "Acepto los Términos y Condiciones" en el formulario de registro posee la misma validez jurídica que una firma autógrafa para todos los efectos legales.</p>
        </section>
        
        <footer className={styles.termsFooter}>
          <button className={styles.backButton} onClick={() => window.history.back()}>
            Volver
          </button>
        </footer>
      </div>
    </div>
  );
};

export default Terminos;
