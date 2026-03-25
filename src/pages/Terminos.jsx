import React, { useState, useEffect } from 'react';
import styles from './Legal.module.css';

// --- Icon Components ---
const SectionIcon = ({ type }) => {
  const icons = {
    nature: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>,
    work: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
    bio: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
    ip: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>,
    derived: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>,
    anticorruption: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>,
    emergency: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>,
    tools: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg>,
    lock: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>,
    reputation: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><polyline points="16 11 18 13 22 9" /></svg>,
    signature: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>,
  };
  return <div className={styles.iconCircle}>{icons[type]}</div>;
};

const Terminos = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className={styles.containerWrap}>
      <div className={styles.container}>
        <header className={styles.header}>
          <img src="/logo.png" alt="Brújula Social Logo" className={styles.logo} />
          <div className={styles.badge}>Marco Legal 2026</div>
          <h1 className={styles.title}>ESTATUTO DE TÉRMINOS Y CONDICIONES</h1>
          <p className={styles.subtitle}>Regulación de la Plataforma de Regeneración y Empoderamiento</p>
        </header>
        
        <div className={styles.legalBody}>
          <section className={styles.legalSection}>
            <div className={styles.sectionHeader}>
              <SectionIcon type="nature" />
              <h2>CLÁUSULA I: NATURALEZA JURÍDICA Y OBJETO</h2>
            </div>
            <p>
              El presente documento constituye un contrato de adhesión vinculante entre el usuario (en adelante, "El Colaborador") y la administración de la plataforma (en adelante, "La Entidad"). El objeto es regular el acceso al ecosistema digital destinado a la gestión, articulación y despliegue de iniciativas de regeneración ecosistémica y empoderamiento comunitario en territorio costarricense.
            </p>
          </section>

          <section className={styles.legalSection}>
            <div className={styles.sectionHeader}>
              <SectionIcon type="work" />
              <h2>CLÁUSULA II: DECLARACIÓN DE NO-RELACIÓN LABORAL</h2>
            </div>
            <p>De conformidad con la Ley de Voluntariado de Costa Rica (Ley N° 8435), se establece de forma taxativa que:</p>
            <ul>
              <li>La participación en los proyectos es de carácter altruista, solidario y estrictamente gratuito.</li>
              <li>No existe subordinación jurídica, dependencia económica ni jornada laboral regulada por el Código de Trabajo.</li>
              <li>La Entidad actúa únicamente como facilitador tecnológico y operacional, por lo que no asume obligaciones patronales de ninguna índole.</li>
            </ul>
          </section>

          <section className={styles.legalSection}>
            <div className={styles.sectionHeader}>
              <SectionIcon type="bio" />
              <h2>CLÁUSULA III: PROTOCOLOS DE BIOSEGURIDAD</h2>
            </div>
            <p>Dado que las actividades de regeneración activa pueden implicar entornos rurales o silvestres:</p>
            <div className={styles.infoBox}>
              <p><strong>Asunción de Riesgo:</strong> El Colaborador reconoce y acepta de forma voluntaria los riesgos inherentes al trabajo de campo.</p>
              <p><strong>Indemnidad:</strong> El Colaborador renuncia irrevocablemente a ejercer acciones legales contra La Entidad por lesiones o perjuicios.</p>
            </div>
          </section>

          <section className={styles.legalSection}>
            <div className={styles.sectionHeader}>
              <SectionIcon type="ip" />
              <h2>CLÁUSULA IV: PROPIEDAD INTELECTUAL</h2>
            </div>
            <p><strong>Activos Digitales:</strong> Todos los algoritmos, interfaces de usuario (UI) y esquemas de color son propiedad intelectual protegida.</p>
            <p><strong>Cesión de Imagen:</strong> El Colaborador autoriza el uso no exclusivo de su imagen con fines estrictamente promocionales de la misión social.</p>
          </section>

          <section className={styles.legalSection}>
            <div className={styles.sectionHeader}>
              <SectionIcon type="derived" />
              <h2>IX. PROPIEDAD INTELECTUAL DERIVADA</h2>
            </div>
            <p>Cualquier metodología o reporte resultante de las actividades se considerará Propiedad Intelectual de la Entidad. El Colaborador retiene el derecho moral de autoría.</p>
          </section>

          <section className={styles.legalSection}>
            <div className={styles.sectionHeader}>
              <SectionIcon type="anticorruption" />
              <h2>X. CLÁUSULA ANTICORRUPCIÓN</h2>
            </div>
            <ul>
              <li><strong>Cero Tolerancia:</strong> Se prohíbe solicitar o aceptar dádivas en nombre de la plataforma.</li>
              <li><strong>Conflicto de Interés:</strong> El Colaborador debe declarar intereses económicos en zonas de intervención.</li>
            </ul>
          </section>

          <section className={styles.legalSection}>
            <div className={styles.sectionHeader}>
              <SectionIcon type="emergency" />
              <h2>XI. SEGURIDAD Y EMERGENCIAS</h2>
            </div>
            <p><strong>Seguro Obligatorio:</strong> Es responsabilidad del Colaborador verificar su Póliza de Riesgos del Trabajo.</p>
            <p><strong>Protocolo de Extracción:</strong> Los costos derivados de rescates privados no cubiertos por seguros públicos serán responsabilidad del Colaborador.</p>
          </section>

          <section className={styles.legalSection}>
            <div className={styles.sectionHeader}>
              <SectionIcon type="tools" />
              <h2>XII. USO DE ACTIVOS FÍSICOS</h2>
            </div>
            <p>Si se asignan herramientas (drones, sensores, equipo): El Colaborador asume la custodia legal. Cualquier daño por negligencia será su responsabilidad económica.</p>
          </section>

          <section className={styles.legalSection}>
            <div className={styles.sectionHeader}>
              <SectionIcon type="lock" />
              <h2>XIII. CONFIDENCIALIDAD (NDA)</h2>
            </div>
            <p>Obligación de no revelar información técnica o datos sensibles. Vigencia: 5 años tras la finalización de la actividad.</p>
          </section>

          <section className={styles.legalSection}>
            <div className={styles.sectionHeader}>
              <SectionIcon type="reputation" />
              <h2>XIV. REPUTACIÓN DIGITAL</h2>
            </div>
            <p>Se permite documentar la experiencia sin comprometer la dignidad local ni especies en peligro. El daño reputacional será causal de expulsión.</p>
          </section>

          <section className={styles.legalSection}>
            <div className={styles.sectionHeader}>
              <SectionIcon type="signature" />
              <h2>XV. VALIDEZ DE LA FIRMA ELECTRÓNICA</h2>
            </div>
            <p>El marcado de la casilla "Acepto los Términos" posee la misma validez jurídica que una firma autógrafa (Ley N° 8454).</p>
          </section>
        </div>

        <footer className={styles.footerAction}>
          <button className={styles.backBtn} onClick={() => window.history.back()}>
            Entendido y Aceptar
          </button>
        </footer>
        
        <p className={styles.lastUpdated}>Última actualización: 16 de marzo, 2026 • Costa Rica</p>
      </div>

      {showScrollTop && (
        <button className={styles.scrollTop} onClick={scrollToTop} aria-label="Ir arriba">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="18 15 12 9 6 15" /></svg>
        </button>
      )}
    </div>
  );
};

export default Terminos;
