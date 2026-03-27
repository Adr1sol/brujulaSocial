import React, { useState, useEffect } from 'react';
import ServiceVoluntariado from '../../services/ServiceVoluntariado';
import ServiceOrganizaciones from '../../services/ServiceOrganizaciones';
import ServiceHoras from '../../services/ServiceHoras';
import ServiceCategorias from '../../services/ServiceCategorias';
import ServiceUsuario from '../../services/ServiceUsuario';
import styles from './PerfilVoluntario.module.css';
import PerfilSidebar from './PerfilSidebar';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import logoBrujula from '../../images/logoSinNombre.png';

function PerfilVoluntario() {
    const [seccionActiva, setSeccionActiva] = useState("resumen");
    
    const [usuario, setUsuario] = useState(null);
    const [organizaciones, setOrganizaciones] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [aplicacionesDelUsuario, setAplicacionesDelUsuario] = useState([]);
    const [orgsDelUsuario, setOrgsDelUsuario] = useState([]);
    const [horasDelUsuario, setHorasDelUsuario] = useState([]);

    const [modalEditar, setModalEditar] = useState(false);
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [telefono, setTelefono] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        cargarDatos();
    }, []);

    async function cargarDatos() {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            navigate("/login");
            return;
        }
        setUsuario(user);

        const todasLasAplicaciones = await ServiceVoluntariado.getVoluntariado();
        const appValidas = todasLasAplicaciones || [];
        const aplicacionesFiltradas = appValidas.filter(
            (a) => String(a.idUsuario) === String(user.id)
        );
        setAplicacionesDelUsuario(aplicacionesFiltradas);

        const todasLasOrgs = await ServiceOrganizaciones.getOrganizaciones();
        const orgValidas = todasLasOrgs || [];
        setOrganizaciones(orgValidas);

        const idsOrgs = [...new Set(aplicacionesFiltradas.map((a) => String(a.idOrganizacion)))];
        const orgsFiltradas = orgValidas.filter(
            (org) => idsOrgs.includes(String(org.id))
        );
        setOrgsDelUsuario(orgsFiltradas);

        const todasLasHoras = await ServiceHoras.getHoras();
        const horasValidas = todasLasHoras || [];
        const horasFiltradas = horasValidas.filter(
            (h) => String(h.idUsuario) === String(user.id)
        );
        setHorasDelUsuario(horasFiltradas);

        const todasLasCategorias = await ServiceCategorias.getCategorias();
        setCategorias(todasLasCategorias || []);
    }

    function abrirModalEditar() {
        setNombre(usuario.Nombre);
        setCorreo(usuario.Correo);
        setTelefono(usuario.Telefono || "");
        setModalEditar(true);
    }

    async function handleGuardarCambios() {
        if (!nombre || !correo) {
            Swal.fire({
                icon: 'error',
                title: 'Campos incompletos',
                text: 'El nombre y correo son obligatorios.',
                confirmButtonColor: '#f6ad55'
            });
            return;
        }

        const objUsuario = {
            ...usuario,
            Nombre: nombre,
            Correo: correo,
            Telefono: telefono
        };

        const actualizado = await ServiceUsuario.putUsuario(objUsuario, usuario.id);

        if (actualizado) {
            localStorage.setItem("user", JSON.stringify(actualizado));
            setUsuario(actualizado);
            setModalEditar(false);

            Swal.fire({
                icon: 'success',
                title: '¡Perfil actualizado!',
                text: 'Tus datos fueron actualizados correctamente.',
                timer: 2000,
                showConfirmButton: false
            });
        }
    }

    async function handleEliminar() {
        Swal.fire({
            icon: 'warning',
            title: '¿Eliminar cuenta?',
            text: 'Esta acción no se puede deshacer.',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#14b8a6'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await ServiceUsuario.deleteUsuario(usuario.id);
                localStorage.removeItem("user");

                Swal.fire({
                    icon: 'success',
                    title: 'Cuenta eliminada',
                    timer: 1500,
                    showConfirmButton: false
                }).then(() => {
                    navigate("/");
                });
            }
        });
    }

    function handleCerrarSesion() {
        Swal.fire({
            icon: 'question',
            title: 'Cerrar sesión',
            text: '¿Estás seguro de que quieres cerrar sesión?',
            showCancelButton: true,
            confirmButtonText: 'Sí, cerrar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#14b8a6'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('user');
                localStorage.removeItem('miOrganizacion');
                navigate('/');
            }
        });
    }

    function getNombreOrg(idOrganizacion) {
        const org = organizaciones.find((o) => String(o.id) === String(idOrganizacion));
        return org ? org.NombreOrganizacion : "Desconocida";
    }

    function calcularTotalHoras() {
        return horasDelUsuario.reduce((total, h) => total + parseInt(h.horas || 0), 0);
    }

    function getIniciales(nombreStr) {
        if (!nombreStr) return "??";
        const partes = nombreStr.split(" ");
        return partes.length >= 2
            ? partes[0][0] + partes[1][0]
            : nombreStr.substring(0, 2).toUpperCase();
    }

    function getNivel() {
        const total = calcularTotalHoras();
        if (total === 0) return { nivel: "Nuevo", color: "#64748b", siguiente: 10, progreso: 0 };
        if (total < 10) return { nivel: "Principiante", color: "#10b981", siguiente: 10, progreso: (total / 10) * 100 };
        if (total < 50) return { nivel: "Intermedio", color: "#059669", siguiente: 50, progreso: (total / 50) * 100 };
        if (total < 100) return { nivel: "Experto", color: "#065f46", siguiente: 100, progreso: (total / 100) * 100 };
        return { nivel: "Embajador", color: "#064e3b", siguiente: null, progreso: 100 };
    }

    function getInsignias() {
        const total = calcularTotalHoras();
        const orgs = orgsDelUsuario.length;
        const categoriaIds = [...new Set(orgsDelUsuario.map(o => o.idCategoria))];
        return [
            { id: 1, nombre: "Primera aplicación", descripcion: "Aplicaste a tu primera organización", desbloqueada: aplicacionesDelUsuario.length >= 1, emoji: "🌱" },
            { id: 2, nombre: "10 horas donadas", descripcion: "Llegaste a 10 horas de voluntariado", desbloqueada: total >= 10, emoji: "⏱️" },
            { id: 3, nombre: "50 horas donadas", descripcion: "Llegaste a 50 horas de voluntariado", desbloqueada: total >= 50, emoji: "🏆" },
            { id: 4, nombre: "Multisector", descripcion: "Colaboraste en más de una categoría", desbloqueada: categoriaIds.length >= 2, emoji: "🌐" },
            { id: 5, nombre: "Colaborador activo", descripcion: "Aplicaste a 3 organizaciones", desbloqueada: orgs >= 3, emoji: "🤝" },
            { id: 6, nombre: "Embajador", descripcion: "Alcanzaste 100 horas de voluntariado", desbloqueada: total >= 100, emoji: "⭐" }
        ];
    }

    function getHorasPorMes() {
        const meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
        const resultado = {};
        horasDelUsuario.forEach((h) => {
            if (!h.fecha) return;
            const mes = new Date(h.fecha).getMonth();
            resultado[mes] = (resultado[mes] || 0) + parseInt(h.horas || 0);
        });
        return meses.map((nombre, i) => ({
            mes: nombre,
            horas: resultado[i] || 0
        })).filter((_, i) => resultado[i] !== undefined);
    }

    function getImpactoPorCategoria() {
        const resultado = {};
        horasDelUsuario.forEach((h) => {
            const org = organizaciones.find((o) => String(o.id) === String(h.idOrganizacion));
            if (!org) return;
            const cat = categorias.find((c) => String(c.id) === String(org.idCategoria));
            const nombreStr = cat ? cat.NombreCategoria : "Sin categoría";
            resultado[nombreStr] = (resultado[nombreStr] || 0) + parseInt(h.horas || 0);
        });
        return Object.entries(resultado).map(([nombreStr, valor]) => ({ nombre: nombreStr, valor }));
    }

    const COLORES_CHART = ["#063930", "#059669", "#10b981", "#34d399", "#6ee7b7", "#a7f3d0"];
    const nivel = getNivel();
    const insignias = getInsignias();


    const titulos = {
        resumen: "Resumen de perfil",
        historial: "Historial de voluntariados y horas",
        "mis-organizaciones": "Mis Organizaciones",
        organizaciones: "Organizaciones apoyadas"
    };

    if (!usuario) {
        return <div className={styles.layout}><div className={styles.cargando}>Cargando perfil...</div></div>;
    }

    return (
        <div className={styles.layout}>
            {/* ── SIDEBAR ── */}
            <PerfilSidebar
                user={usuario}
                activeTab={seccionActiva}
                onTabChange={setSeccionActiva}
                onEditarPerfil={abrirModalEditar}
                onCerrarSesion={handleCerrarSesion}
                onEliminarCuenta={handleEliminar}
            />

            {/* ── MAIN ── */}
            <main className={styles.main}>
                <header className={styles.topbar}>
                    <div className={styles.topbarLeft}>
                        <div className={styles.breadcrumb}>
                            <span className={styles.breadcrumbRoot}>Perfil</span>
                            <span className={styles.breadcrumbSep}>/</span>
                            <span className={styles.breadcrumbCurrent}>{titulos[seccionActiva]}</span>
                        </div>
                        <h1 className={styles.pageTitle}>{titulos[seccionActiva]}</h1>
                    </div>
                    <div className={styles.topbarRight}>
                        <div className={styles.adminPill}>
                            <span className={styles.adminPillDot} />
                            Activo
                        </div>
                    </div>
                </header>

                <div className={styles.pageContent}>

                    {/* ══ RESUMEN ══ */}
                    {seccionActiva === "resumen" && (
                        <>
                            {/* Estadísticas Top */}
                            <div className={styles.statsRow}>
                                <div className={styles.statCard}>
                                    <div className={styles.statTop}>
                                        <span className={styles.statLabel}>Horas Donadas</span>
                                        <div className={styles.statIconBox} style={{background: '#ecfdf5', color: '#10b981', borderColor: '#d1fae5'}}>🌿</div>
                                    </div>
                                    <div className={styles.statNum}>{calcularTotalHoras()}</div>
                                </div>
                                <div className={styles.statCard}>
                                    <div className={styles.statTop}>
                                        <span className={styles.statLabel}>Organizaciones</span>
                                        <div className={styles.statIconBox} style={{background: '#f8fafc', color: '#063930', borderColor: '#e2e8f0'}}>🏢</div>
                                    </div>
                                    <div className={styles.statNum}>{orgsDelUsuario.length}</div>
                                </div>
                                <div className={styles.statCard}>
                                    <div className={styles.statTop}>
                                        <span className={styles.statLabel}>Aplicaciones</span>
                                        <div className={styles.statIconBox} style={{background: '#f8fafc', color: '#063930', borderColor: '#e2e8f0'}}>📋</div>
                                    </div>
                                    <div className={styles.statNum}>{aplicacionesDelUsuario.length}</div>
                                </div>
                            </div>

                            {/* Fila Dividida */}
                            <div className={styles.twoCol}>
                                <div className={styles.card}>
                                    <h3 className={styles.cardTitle}><span className={styles.cardDot} style={{background:'#10b981'}}/>Nivel de voluntario</h3>
                                    <div className={styles.nivelRow}>
                                        <span className={styles.nivelNombre} style={{color: nivel.color}}>{nivel.nivel}</span>
                                        <span className={styles.nivelHoras}>
                                            {calcularTotalHoras()} {nivel.siguiente ? `/ ${nivel.siguiente} h` : 'h (Max)'}
                                        </span>
                                    </div>
                                    <div className={styles.nivelBarra}>
                                        <div className={styles.nivelBarraFill} style={{ width: `${Math.min(nivel.progreso, 100)}%`, background: nivel.color, color: nivel.color }}/>
                                    </div>
                                    {nivel.siguiente && (
                                        <div className={styles.nivelHint}>
                                            Te faltan {nivel.siguiente - calcularTotalHoras()} horas para el siguiente nivel.
                                        </div>
                                    )}
                                </div>

                                <div className={styles.card}>
                                    <h3 className={styles.cardTitle}><span className={styles.cardDot} style={{background:'#063930'}}/>Impacto por categoría</h3>
                                    {getImpactoPorCategoria().length > 0 ? (
                                        <div className={styles.graficaWrap} style={{height:'180px', border:'none', background:'transparent', padding:0}}>
                                            <ResponsiveContainer width="100%" height="100%">
                                                <PieChart>
                                                    <Pie
                                                        data={getImpactoPorCategoria()} dataKey="valor" nameKey="nombre"
                                                        cx="50%" cy="50%" outerRadius={60} stroke="#ffffff"
                                                    >
                                                        {getImpactoPorCategoria().map((_, i) => (
                                                            <Cell key={i} fill={COLORES_CHART[i % COLORES_CHART.length]} />
                                                        ))}
                                                    </Pie>
                                                    <Tooltip contentStyle={{backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius:'8px', color: 'var(--text-1)', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.5)'}} itemStyle={{color:'var(--text-1)', fontWeight: '500'}} />
                                                </PieChart>
                                            </ResponsiveContainer>
                                        </div>
                                    ) : <p className={styles.emptyState} style={{border:'none', margin:0, padding:'20px'}}>No hay datos todavía</p>}
                                </div>
                            </div>

                            {/* Colección Insignias */}
                            <div className={styles.card}>
                                <h3 className={styles.cardTitle}><span className={styles.cardDot} style={{background:'#10b981'}}/>Mis Insignias</h3>
                                <div className={styles.insigniasGrid}>
                                    {insignias.map((ins) => (
                                        <div key={ins.id} className={`${styles.insigniaCard} ${ins.desbloqueada ? styles.insigniaDesbloqueada : styles.insigniaBloqueada}`}>
                                            {ins.desbloqueada && <div className={styles.insigniaGlow}/>}
                                            <div className={styles.insigniaEmoji}>{ins.emoji}</div>
                                            <div className={styles.insigniaNombre}>{ins.nombre}</div>
                                            <div className={styles.insigniaDesc}>{ins.descripcion}</div>
                                            {!ins.desbloqueada && <div className={styles.insigniaLock}>🔒 Bloqueada</div>}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Gráfica de Barras */}
                            {getHorasPorMes().length > 0 && (
                                <div className={styles.card}>
                                    <h3 className={styles.cardTitle}><span className={styles.cardDot} style={{background:'#063930'}}/>Horas por mes</h3>
                                    <div className={styles.graficaWrap}>
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={getHorasPorMes()}>
                                                <XAxis dataKey="mes" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={{stroke:'#e2e8f0'}} tickLine={false} />
                                                <YAxis tick={{ fill: '#64748b', fontSize: 12 }} axisLine={{stroke:'#e2e8f0'}} tickLine={false} />
                                                <Tooltip cursor={{fill: 'rgba(255,255,255,0.03)'}} contentStyle={{backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius:'8px', color: 'var(--text-1)', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.5)'}} />
                                                <Bar dataKey="horas" fill="var(--teal)" radius={[4, 4, 0, 0]} name="Horas" />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            )}
                        </>
                    )}

                    {/* ══ HISTORIAL ══ */}
                    {seccionActiva === "historial" && (
                        <>
                            <div className={styles.card}>
                                <h3 className={styles.cardTitle}><span className={styles.cardDot} style={{background:'#10b981'}}/>Historial de horas</h3>
                                {horasDelUsuario.length > 0 ? (
                                    <div className={styles.tableWrap}>
                                        <table className={styles.table}>
                                            <thead>
                                                <tr><th>Actividad</th><th>Organización</th><th>Fecha</th><th>Horas</th></tr>
                                            </thead>
                                            <tbody>
                                                {horasDelUsuario.map((h) => (
                                                    <tr key={h.id}>
                                                        <td>{h.actividad}</td>
                                                        <td className={styles.tdMuted}>{getNombreOrg(h.idOrganizacion)}</td>
                                                        <td className={styles.tdMono}>{h.fecha}</td>
                                                        <td><span className={styles.chipTeal}>{h.horas} h</span></td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : <p className={styles.emptyState}>Aún no tenés horas registradas.</p>}
                            </div>

                            <div className={styles.card}>
                                <h3 className={styles.cardTitle}><span className={styles.cardDot} style={{background:'#063930'}}/>Solicitudes de voluntariado</h3>
                                {aplicacionesDelUsuario.length > 0 ? (
                                    <div className={styles.tableWrap}>
                                        <table className={styles.table}>
                                            <thead>
                                                <tr><th>Organización</th><th>Fecha de aplicación</th><th>Estado</th></tr>
                                            </thead>
                                            <tbody>
                                                {aplicacionesDelUsuario.map((a) => (
                                                    <tr key={a.id}>
                                                        <td style={{fontWeight:500}}>{getNombreOrg(a.idOrganizacion)}</td>
                                                        <td className={styles.tdMono}>{a.FechaAplicacion}</td>
                                                        <td><span className={styles.chipOrange}>✓ Enviada</span></td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : <p className={styles.emptyState}>Aún no tenés solicitudes registradas.</p>}
                            </div>
                        </>
                    )}

                    {/* ══ MIS ORGANIZACIONES ══ */}
                    {seccionActiva === "mis-organizaciones" && (
                        <div className={styles.card}>
                            <h3 className={styles.cardTitle}><span className={styles.cardDot} style={{background:'#10b981'}}/>Organizaciones apoyadas</h3>
                            {orgsDelUsuario.length > 0 ? (
                                <div style={{display:'flex', flexDirection:'column', gap:'4px'}}>
                                    {orgsDelUsuario.map((org, i) => (
                                        <div key={org.id} className={styles.orgRow}>
                                            <div className={styles.orgAvatar} style={{background: COLORES_CHART[i % COLORES_CHART.length]}}>
                                                {getIniciales(org.NombreOrganizacion)}
                                            </div>
                                            <div>
                                                <div className={styles.orgNombre}>{org.NombreOrganizacion}</div>
                                                <div className={styles.orgDesc}>{org.Descripcion}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : <p className={styles.emptyState}>Aún no has colaborado con ninguna organización.</p>}
                        </div>
                    )}

                    {/* ══ ORGANIZACIONES ══ */}
                    {seccionActiva === "organizaciones" && (
                        <div className={styles.card}>
                            <h3 className={styles.cardTitle}><span className={styles.cardDot} style={{background:'#10b981'}}/>Organizaciones apoyadas</h3>
                            {orgsDelUsuario.length > 0 ? (
                                <div style={{display:'flex', flexDirection:'column', gap:'4px'}}>
                                    {orgsDelUsuario.map((org, i) => (
                                        <div key={org.id} className={styles.orgRow}>
                                            <div className={styles.orgAvatar} style={{background: COLORES_CHART[i % COLORES_CHART.length]}}>
                                                {getIniciales(org.NombreOrganizacion)}
                                            </div>
                                            <div>
                                                <div className={styles.orgNombre}>{org.NombreOrganizacion}</div>
                                                <div className={styles.orgDesc}>{org.Descripcion}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : <p className={styles.emptyState}>Aún no has colaborado con ninguna organización.</p>}
                        </div>
                    )}

                </div>
            </main>

            {/* ══ MODAL EDITAR ══ */}
            {modalEditar && (
                <div className={styles.overlay} onClick={() => setModalEditar(false)}>
                    <div className={styles.modal} onClick={e => e.stopPropagation()}>
                        <div className={styles.modalHead}>
                            <div className={styles.modalHeadLeft}>
                                <div className={styles.modalIcon}>✏️</div>
                                <h3>Editar Perfil</h3>
                            </div>
                            <button className={styles.modalClose} onClick={() => setModalEditar(false)}>✕</button>
                        </div>
                        <div className={styles.modalBody}>
                            <div className={styles.formGrid}>
                                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                                    <label>Nombre completo</label>
                                    <input type="text" value={nombre} onChange={e=>setNombre(e.target.value)} className={styles.input}/>
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Correo electrónico</label>
                                    <input type="email" value={correo} onChange={e=>setCorreo(e.target.value)} className={styles.input}/>
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Teléfono</label>
                                    <input type="text" value={telefono} onChange={e=>setTelefono(e.target.value)} className={styles.input}/>
                                </div>
                            </div>
                        </div>
                        <div className={styles.modalFoot}>
                            <button className={styles.btnCancel} onClick={() => setModalEditar(false)}>Cancelar</button>
                            <button className={styles.btnSave} onClick={handleGuardarCambios}>Guardar cambios</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PerfilVoluntario;