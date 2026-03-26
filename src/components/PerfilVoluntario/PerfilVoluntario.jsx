import React, { useState, useEffect } from 'react';
import ServiceVoluntariado from '../../services/ServiceVoluntariado';
import ServiceOrganizaciones from '../../services/ServiceOrganizaciones';
import ServiceHoras from '../../services/ServiceHoras';
import ServiceCategorias from '../../services/ServiceCategorias';
import ServiceUsuario from '../../services/ServiceUsuario';
import styles from './PerfilVoluntario.module.css';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend} from 'recharts';

function PerfilVoluntario() {
    const [usuario, setUsuario] = useState(null);
    const [organizaciones, setOrganizaciones] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [aplicacionesDelUsuario, setAplicacionesDelUsuario] = useState([]);
    const [orgsDelUsuario, setOrgsDelUsuario] = useState([]);
    const [horasDelUsuario, setHorasDelUsuario] = useState([]);

    const [editando, setEditando] = useState(false);
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [telefono, setTelefono] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        cargarDatos();
    }, []);

    async function cargarDatos() {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) return;
        setUsuario(user);

        const todasLasAplicaciones = await ServiceVoluntariado.getVoluntariado();
        const aplicacionesFiltradas = todasLasAplicaciones.filter(
            (a) => String(a.idUsuario) === String(user.id)
        );
        setAplicacionesDelUsuario(aplicacionesFiltradas);

        const todasLasOrgs = await ServiceOrganizaciones.getOrganizaciones();
        setOrganizaciones(todasLasOrgs);

        const idsOrgs = [...new Set(aplicacionesFiltradas.map((a) => String(a.idOrganizacion)))];
        const orgsFiltradas = todasLasOrgs.filter(
            (org) => idsOrgs.includes(String(org.id))
        );
        setOrgsDelUsuario(orgsFiltradas);

        const todasLasHoras = await ServiceHoras.getHoras();
        const horasFiltradas = todasLasHoras.filter(
            (h) => String(h.idUsuario) === String(user.id)
        );
        setHorasDelUsuario(horasFiltradas);

        const todasLasCategorias = await ServiceCategorias.getCategorias();
        setCategorias(todasLasCategorias);
    }

    function handleEditar() {
        setNombre(usuario.Nombre)
        setCorreo(usuario.Correo)
        setTelefono(usuario.Telefono || "")
        setEditando(true)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    function handleCancelar() {
        setEditando(false)
        setNombre("")
        setCorreo("")
        setTelefono("")
    }

    async function handleGuardarCambios() {
        if (!nombre || !correo) {
            Swal.fire({
                icon: 'error',
                title: 'Campos incompletos',
                text: 'El nombre y correo son obligatorios.',
                confirmButtonColor: '#EF8514'
            })
            return
        }

        const objUsuario = {
            ...usuario,
            Nombre: nombre,
            Correo: correo,
            Telefono: telefono
        }

        const actualizado = await ServiceUsuario.putUsuario(objUsuario, usuario.id)

        if (actualizado) {
            localStorage.setItem("user", JSON.stringify(actualizado))
            setUsuario(actualizado)
            setEditando(false)

            Swal.fire({
                icon: 'success',
                title: '¡Perfil actualizado!',
                text: 'Tus datos fueron actualizados correctamente.',
                timer: 2000,
                showConfirmButton: false
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error al actualizar',
                text: 'No se pudo actualizar el perfil. Intentá de nuevo.',
                confirmButtonColor: '#EF8514'
            })
        }
    }

    async function handleEliminar() {
        Swal.fire({
            icon: 'warning',
            title: '¿Estás seguro?',
            text: 'Esta acción eliminará tu cuenta permanentemente.',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#d33',
            cancelButtonColor: '#078A87'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await ServiceUsuario.deleteUsuario(usuario.id)
                localStorage.removeItem("user")

                Swal.fire({
                    icon: 'success',
                    title: 'Cuenta eliminada',
                    timer: 2000,
                    showConfirmButton: false
                }).then(() => {
                    navigate("/")
                })
            }
        })
    }

    function getNombreOrg(idOrganizacion) {
        const org = organizaciones.find((o) => String(o.id) === String(idOrganizacion));
        return org ? org.NombreOrganizacion : "Organización desconocida";
    }

    function calcularTotalHoras() {
        return horasDelUsuario.reduce((total, h) => total + parseInt(h.horas || 0), 0);
    }

    function getIniciales(nombre) {
        if (!nombre) return "??";
        const partes = nombre.split(" ");
        return partes.length >= 2
            ? partes[0][0] + partes[1][0]
            : nombre.substring(0, 2).toUpperCase();
    }

    function getNivel() {
        const total = calcularTotalHoras();
        if (total === 0) return { nivel: "Nuevo", color: "#888780", siguiente: 10, progreso: 0 };
        if (total < 10) return { nivel: "Principiante", color: "#639922", siguiente: 10, progreso: (total / 10) * 100 };
        if (total < 50) return { nivel: "Intermedio", color: "#185FA5", siguiente: 50, progreso: (total / 50) * 100 };
        if (total < 100) return { nivel: "Experto", color: "#E8841A", siguiente: 100, progreso: (total / 100) * 100 };
        return { nivel: "Embajador", color: "#0F6E56", siguiente: null, progreso: 100 };
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
            { id: 5, nombre: "Colaborador activo", descripcion: "Aplicaste a 3 o más organizaciones", desbloqueada: orgs >= 3, emoji: "🤝" },
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
            const nombre = cat ? cat.NombreCategoria : "Sin categoría";
            resultado[nombre] = (resultado[nombre] || 0) + parseInt(h.horas || 0);
        });
        return Object.entries(resultado).map(([nombre, valor]) => ({ nombre, valor }));
    }

    const COLORES = ["#1D9E75", "#E8841A", "#185FA5", "#534AB7", "#3B6D11", "#D4537E"];
    const nivel = getNivel();
    const insignias = getInsignias();

    return (
        // ✅ Se eliminó el <> fragment con NavbarGlobal — ahora es solo el div
        <div className={styles.pagina}>
            {usuario ? (
                <div>

                    {/* ── Header ── */}
                    <div className={styles.perfilHeader}>
                        <div className={styles.perfilAvatar}>
                            {getIniciales(usuario.Nombre)}
                        </div>
                        <div className={styles.perfilInfo}>
                            <div className={styles.perfilNombre}>{usuario.Nombre}</div>
                            <div className={styles.perfilCorreo}>{usuario.Correo}</div>
                            <div className={styles.perfilHorasBadge}>
                                ⏱️ {calcularTotalHoras()} horas donadas
                            </div>
                        </div>
                        <div style={{display:'flex', gap:'8px', flexShrink:0}}>
                            <button onClick={handleEditar} style={{
                                padding:'8px 16px',
                                background:'rgba(255,255,255,.15)',
                                border:'1px solid rgba(255,255,255,.35)',
                                borderRadius:'20px',
                                color:'#fff',
                                fontSize:'12px',
                                cursor:'pointer'
                            }}>✏️ Editar perfil</button>
                            <button onClick={handleEliminar} style={{
                                padding:'8px 16px',
                                background:'rgba(211,51,51,.2)',
                                border:'1px solid rgba(211,51,51,.35)',
                                borderRadius:'20px',
                                color:'#fff',
                                fontSize:'12px',
                                cursor:'pointer'
                            }}>🗑️ Eliminar cuenta</button>
                        </div>
                    </div>

                    {/* ── Formulario editar ── */}
                    {editando && (
                        <div className={styles.seccion}>
                            <div className={styles.seccionTitulo}>Editar perfil</div>
                            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'14px', marginBottom:'14px'}}>
                                <div style={{display:'flex', flexDirection:'column', gap:'5px'}}>
                                    <label style={{fontSize:'12px', color:'#5F5E5A', fontWeight:'500'}}>Nombre completo</label>
                                    <input
                                        type="text"
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                        placeholder="Tu nombre completo"
                                        style={{padding:'9px 12px', border:'0.5px solid #D3D1C7', borderRadius:'8px', fontSize:'13px', fontFamily:'inherit'}}
                                    />
                                </div>
                                <div style={{display:'flex', flexDirection:'column', gap:'5px'}}>
                                    <label style={{fontSize:'12px', color:'#5F5E5A', fontWeight:'500'}}>Correo electrónico</label>
                                    <input
                                        type="email"
                                        value={correo}
                                        onChange={(e) => setCorreo(e.target.value)}
                                        placeholder="Tu correo"
                                        style={{padding:'9px 12px', border:'0.5px solid #D3D1C7', borderRadius:'8px', fontSize:'13px', fontFamily:'inherit'}}
                                    />
                                </div>
                                <div style={{display:'flex', flexDirection:'column', gap:'5px'}}>
                                    <label style={{fontSize:'12px', color:'#5F5E5A', fontWeight:'500'}}>Teléfono</label>
                                    <input
                                        type="text"
                                        value={telefono}
                                        onChange={(e) => setTelefono(e.target.value)}
                                        placeholder="Tu teléfono"
                                        style={{padding:'9px 12px', border:'0.5px solid #D3D1C7', borderRadius:'8px', fontSize:'13px', fontFamily:'inherit'}}
                                    />
                                </div>
                            </div>
                            <div style={{display:'flex', gap:'10px', justifyContent:'flex-end'}}>
                                <button onClick={handleCancelar} style={{
                                    padding:'9px 20px', background:'#F1EFE8',
                                    border:'0.5px solid #D3D1C7', borderRadius:'8px',
                                    fontSize:'13px', cursor:'pointer', color:'#5F5E5A'
                                }}>Cancelar</button>
                                <button onClick={handleGuardarCambios} style={{
                                    padding:'9px 24px', background:'#1D9E75',
                                    border:'none', borderRadius:'8px',
                                    color:'#fff', fontSize:'13px', cursor:'pointer', fontWeight:'500'
                                }}>Guardar cambios</button>
                            </div>
                        </div>
                    )}

                    {/* ── Stats ── */}
                    <div className={styles.statsGrid}>
                        <div className={styles.statCard}>
                            <div className={styles.statIconWrap} style={{background:"#E1F5EE"}}>🌿</div>
                            <div>
                                <div className={styles.statNum} style={{color:"#1D9E75"}}>{calcularTotalHoras()}</div>
                                <div className={styles.statLbl}>Horas donadas</div>
                            </div>
                        </div>
                        <div className={styles.statCard}>
                            <div className={styles.statIconWrap} style={{background:"#FAEEDA"}}>🏢</div>
                            <div>
                                <div className={styles.statNum} style={{color:"#E8841A"}}>{orgsDelUsuario.length}</div>
                                <div className={styles.statLbl}>Organizaciones</div>
                            </div>
                        </div>
                        <div className={styles.statCard}>
                            <div className={styles.statIconWrap} style={{background:"#E6F1FB"}}>📋</div>
                            <div>
                                <div className={styles.statNum} style={{color:"#185FA5"}}>{aplicacionesDelUsuario.length}</div>
                                <div className={styles.statLbl}>Aplicaciones</div>
                            </div>
                        </div>
                    </div>

                    {/* ── Nivel ── */}
                    <div className={styles.seccion}>
                        <div className={styles.seccionTitulo}>Nivel de voluntario</div>
                        <div className={styles.nivelRow}>
                            <span className={styles.nivelNombre} style={{color: nivel.color}}>{nivel.nivel}</span>
                            <span className={styles.nivelHoras}>
                                {calcularTotalHoras()} {nivel.siguiente ? `/ ${nivel.siguiente} h` : 'h — Nivel máximo'}
                            </span>
                        </div>
                        <div className={styles.nivelBarra}>
                            <div
                                className={styles.nivelBarraFill}
                                style={{
                                    width: `${Math.min(nivel.progreso, 100)}%`,
                                    background: nivel.color
                                }}
                            />
                        </div>
                        {nivel.siguiente && (
                            <div className={styles.nivelHint}>
                                Te faltan {nivel.siguiente - calcularTotalHoras()} horas para el siguiente nivel
                            </div>
                        )}
                    </div>

                    {/* ── Insignias ── */}
                    <div className={styles.seccion}>
                        <div className={styles.seccionTitulo}>Insignias</div>
                        <div className={styles.insigniasGrid}>
                            {insignias.map((ins) => (
                                <div key={ins.id} className={`${styles.insigniaCard} ${ins.desbloqueada ? styles.insigniaDesbloqueada : styles.insigniaBloqueada}`}>
                                    <div className={styles.insigniaEmoji}>{ins.emoji}</div>
                                    <div className={styles.insigniaNombre}>{ins.nombre}</div>
                                    <div className={styles.insigniaDesc}>{ins.descripcion}</div>
                                    {!ins.desbloqueada && <div className={styles.insigniaLock}>🔒 Bloqueada</div>}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── Gráfica horas por mes ── */}
                    {getHorasPorMes().length > 0 && (
                        <div className={styles.seccion}>
                            <div className={styles.seccionTitulo}>Horas donadas por mes</div>
                            <div className={styles.graficaWrap}>
                                <ResponsiveContainer width="100%" height={200}>
                                    <BarChart data={getHorasPorMes()}>
                                        <XAxis dataKey="mes" tick={{ fontSize: 12 }} />
                                        <YAxis tick={{ fontSize: 12 }} />
                                        <Tooltip />
                                        <Bar dataKey="horas" fill="#1D9E75" radius={[4, 4, 0, 0]} name="Horas" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    )}

                    {/* ── Impacto por categoría ── */}
                    {getImpactoPorCategoria().length > 0 && (
                        <div className={styles.seccion}>
                            <div className={styles.seccionTitulo}>Impacto por categoría</div>
                            <div className={styles.graficaWrap}>
                                <ResponsiveContainer width="100%" height={200}>
                                    <PieChart>
                                        <Pie
                                            data={getImpactoPorCategoria()}
                                            dataKey="valor"
                                            nameKey="nombre"
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={80}
                                            label={({ nombre, percent }) =>
                                                `${nombre} ${Math.round(percent * 100)}%`
                                            }
                                        >
                                            {getImpactoPorCategoria().map((_, i) => (
                                                <Cell key={i} fill={COLORES[i % COLORES.length]} />
                                            ))}
                                        </Pie>
                                        <Legend />
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    )}

                    {/* ── Historial de horas ── */}
                    <div className={styles.seccion}>
                        <div className={styles.seccionTitulo}>Historial de horas</div>
                        {horasDelUsuario.length > 0 ? (
                            <div className={styles.tablaWrap}>
                                <table className={styles.tabla}>
                                    <thead>
                                        <tr>
                                            <th>Actividad</th>
                                            <th>Organización</th>
                                            <th>Fecha</th>
                                            <th>Horas</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {horasDelUsuario.map((h) => (
                                            <tr key={h.id}>
                                                <td>{h.actividad}</td>
                                                <td>{getNombreOrg(h.idOrganizacion)}</td>
                                                <td>{h.fecha}</td>
                                                <td><span className={styles.horasBadge}>{h.horas} h</span></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : <p className={styles.emptyState}>Aún no tenés horas registradas.</p>}
                    </div>

                    {/* ── Historial de aplicaciones ── */}
                    <div className={styles.seccion}>
                        <div className={styles.seccionTitulo}>Historial de voluntariado</div>
                        {aplicacionesDelUsuario.length > 0 ? (
                            <div className={styles.tablaWrap}>
                                <table className={styles.tabla}>
                                    <thead>
                                        <tr>
                                            <th>Organización</th>
                                            <th>Fecha de aplicación</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {aplicacionesDelUsuario.map((a) => (
                                            <tr key={a.id}>
                                                <td>{getNombreOrg(a.idOrganizacion)}</td>
                                                <td>{a.FechaAplicacion}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : <p className={styles.emptyState}>Aún no tenés voluntariados registrados.</p>}
                    </div>

                    {/* ── Organizaciones ── */}
                    <div className={styles.seccion}>
                        <div className={styles.seccionTitulo}>Organizaciones donde colaboré</div>
                        {orgsDelUsuario.length > 0 ? (
                            orgsDelUsuario.map((org, i) => (
                                <div key={org.id} className={styles.orgRow}>
                                    <div className={styles.orgAvatar} style={{background: COLORES[i % COLORES.length]}}>
                                        {getIniciales(org.NombreOrganizacion)}
                                    </div>
                                    <div>
                                        <div className={styles.orgNombre}>{org.NombreOrganizacion}</div>
                                        <div className={styles.orgDesc}>{org.Descripcion}</div>
                                    </div>
                                </div>
                            ))
                        ) : <p className={styles.emptyState}>Aún no has colaborado con ninguna organización.</p>}
                    </div>

                </div>
            ) : (
                <p className={styles.cargando}>Cargando información del perfil...</p>
            )}
        </div>
    );
}

export default PerfilVoluntario
