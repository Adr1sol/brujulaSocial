import React, { useState, useEffect } from 'react'
import ServiceUsuario from '../../services/ServiceUsuario'
import ServiceOrganizaciones from '../../services/ServiceOrganizaciones'
import ServiceHoras from '../../services/ServiceHoras'
import ServiceVoluntariado from '../../services/ServiceVoluntariado'
import ServiceCategorias from '../../services/ServiceCategorias'
import ServiceProvincias from '../../services/ServiceProvincias'
import styles from './PanelAdmin.module.css'
import Swal from 'sweetalert2'

function PanelAdmin() {

    const [seccionActiva, setSeccionActiva] = useState("resumen")
    const [usuarios, setUsuarios] = useState([])
    const [organizaciones, setOrganizaciones] = useState([])
    const [horas, setHoras] = useState([])
    const [aplicaciones, setAplicaciones] = useState([])
    const [categorias, setCategorias] = useState([])
    const [provincias, setProvincias] = useState([])
    const [busqueda, setBusqueda] = useState("")

    // Estados para modal editar usuario
    const [modalUsuario, setModalUsuario] = useState(false)
    const [usuarioEditando, setUsuarioEditando] = useState(null)
    const [editNombre, setEditNombre] = useState("")
    const [editCorreo, setEditCorreo] = useState("")
    const [editTelefono, setEditTelefono] = useState("")

    // Estados para modal editar organización
    const [modalOrg, setModalOrg] = useState(false)
    const [orgEditando, setOrgEditando] = useState(null)
    const [editNombreOrg, setEditNombreOrg] = useState("")
    const [editDescripcion, setEditDescripcion] = useState("")
    const [editIdCategoria, setEditIdCategoria] = useState("")
    const [editIdProvincia, setEditIdProvincia] = useState("")

    useEffect(() => {
        cargarDatos()
    }, [])

    async function cargarDatos() {
        const u = await ServiceUsuario.getUsuarios()
        const o = await ServiceOrganizaciones.getOrganizaciones()
        const h = await ServiceHoras.getHoras()
        const a = await ServiceVoluntariado.getVoluntariado()
        const c = await ServiceCategorias.getCategorias()
        const p = await ServiceProvincias.getProvincias()

        setUsuarios(u || [])
        setOrganizaciones(o || [])
        setHoras(h || [])
        setAplicaciones(a || [])
        setCategorias(c || [])
        setProvincias(p || [])
    }

    function getNombreCategoria(id) {
        const cat = categorias.find(c => String(c.id) === String(id))
        return cat ? cat.NombreCategoria : "Sin categoría"
    }

    function getNombreProvincia(id) {
        const prov = provincias.find(p => String(p.id) === String(id))
        return prov ? prov.NombreProvincia : "Sin provincia"
    }

    function getNombreOrg(id) {
        const org = organizaciones.find(o => String(o.id) === String(id))
        return org ? org.NombreOrganizacion : "Desconocida"
    }

    function getNombreUsuario(id) {
        const u = usuarios.find(u => String(u.id) === String(id))
        return u ? u.Nombre : "Desconocido"
    }

    function totalHoras() {
        return horas.reduce((sum, h) => sum + parseInt(h.horas || 0), 0)
    }

    function getIniciales(nombre) {
        if (!nombre) return "??"
        const p = nombre.split(" ")
        return p.length >= 2 ? p[0][0] + p[1][0] : nombre.substring(0, 2).toUpperCase()
    }

    function getColorAvatar(i) {
        const colores = ["#1D9E75", "#E8841A", "#185FA5", "#534AB7", "#3B6D11", "#D4537E"]
        return colores[i % colores.length]
    }

    function actividadReciente() {
        const actividades = []
        aplicaciones.slice(-3).reverse().forEach(a => {
            actividades.push({
                tipo: "aplicacion",
                texto: `${getNombreUsuario(a.idUsuario)} aplicó a ${getNombreOrg(a.idOrganizacion)}`,
                fecha: a.FechaAplicacion,
                color: "#1D9E75"
            })
        })
        horas.slice(-2).reverse().forEach(h => {
            actividades.push({
                tipo: "horas",
                texto: `${getNombreUsuario(h.idUsuario)} registró ${h.horas}h en ${getNombreOrg(h.idOrganizacion)}`,
                fecha: h.fecha,
                color: "#E8841A"
            })
        })
        return actividades.slice(0, 5)
    }

    function categoriasActivas() {
        const resultado = {}
        organizaciones.forEach(org => {
            const nombre = getNombreCategoria(org.idCategoria)
            resultado[nombre] = (resultado[nombre] || 0) + 1
        })
        const max = Math.max(...Object.values(resultado), 1)
        return Object.entries(resultado)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([nombre, count]) => ({ nombre, count, porcentaje: Math.round((count / max) * 100) }))
    }

    // ── Búsqueda corregida ──
    function filtrar(lista, campos) {
        if (!busqueda.trim()) return lista
        const q = busqueda.toLowerCase()
        return lista.filter(item =>
            campos.some(campo => {
                const valor = String(item[campo] || "").toLowerCase()
                return valor.includes(q)
            })
        )
    }

    // ── Eliminar usuario ──
    async function eliminarUsuario(id) {
        Swal.fire({
            icon: 'warning',
            title: '¿Eliminar voluntario?',
            text: 'Esta acción no se puede deshacer.',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#d33',
            cancelButtonColor: '#078A87'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await ServiceUsuario.deleteUsuario(id)
                Swal.fire({ icon: 'success', title: 'Voluntario eliminado', timer: 1500, showConfirmButton: false })
                cargarDatos()
            }
        })
    }

    // ── Editar usuario ──
    function abrirModalUsuario(u) {
        setUsuarioEditando(u)
        setEditNombre(u.Nombre || "")
        setEditCorreo(u.Correo || "")
        setEditTelefono(u.Telefono || "")
        setModalUsuario(true)
    }

    async function guardarUsuario() {
        if (!editNombre || !editCorreo) {
            Swal.fire({ icon: 'error', title: 'Campos incompletos', text: 'Nombre y correo son obligatorios.', confirmButtonColor: '#EF8514' })
            return
        }
        const objUsuario = { ...usuarioEditando, Nombre: editNombre, Correo: editCorreo, Telefono: editTelefono }
        const actualizado = await ServiceUsuario.putUsuario(objUsuario, usuarioEditando.id)
        if (actualizado) {
            Swal.fire({ icon: 'success', title: '¡Actualizado!', timer: 1500, showConfirmButton: false })
            setModalUsuario(false)
            cargarDatos()
        }
    }

    // ── Eliminar organización ──
    async function eliminarOrganizacion(id) {
        Swal.fire({
            icon: 'warning',
            title: '¿Eliminar organización?',
            text: 'Esta acción no se puede deshacer.',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#d33',
            cancelButtonColor: '#078A87'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await ServiceOrganizaciones.deleteOrganizaciones(id)
                Swal.fire({ icon: 'success', title: 'Organización eliminada', timer: 1500, showConfirmButton: false })
                cargarDatos()
            }
        })
    }

    // ── Editar organización ──
    function abrirModalOrg(org) {
        setOrgEditando(org)
        setEditNombreOrg(org.NombreOrganizacion || "")
        setEditDescripcion(org.Descripcion || "")
        setEditIdCategoria(org.idCategoria || "")
        setEditIdProvincia(org.IdProvincia || "")
        setModalOrg(true)
    }

    async function guardarOrg() {
        if (!editNombreOrg) {
            Swal.fire({ icon: 'error', title: 'Nombre requerido', confirmButtonColor: '#EF8514' })
            return
        }
        const objOrg = { ...orgEditando, NombreOrganizacion: editNombreOrg, Descripcion: editDescripcion, idCategoria: parseInt(editIdCategoria), IdProvincia: parseInt(editIdProvincia) }
        const actualizada = await ServiceOrganizaciones.putOrganizaciones(objOrg, orgEditando.id)
        if (actualizada) {
            Swal.fire({ icon: 'success', title: '¡Actualizado!', timer: 1500, showConfirmButton: false })
            setModalOrg(false)
            cargarDatos()
        }
    }

    // ── Eliminar horas ──
    async function eliminarHoras(id) {
        Swal.fire({
            icon: 'warning',
            title: '¿Eliminar este registro?',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#d33',
            cancelButtonColor: '#078A87'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await ServiceHoras.deleteHoras(id)
                Swal.fire({ icon: 'success', title: 'Registro eliminado', timer: 1500, showConfirmButton: false })
                cargarDatos()
            }
        })
    }

    return (
        <div className={styles.layout}>

            {/* ── SIDEBAR ── */}
            <div className={styles.sidebar}>
                <div className={styles.sidebarHeader}>
                    <div className={styles.sidebarLogo}>
                        <div className={styles.sidebarLogoIcon}>🧭</div>
                        <div>
                            <div className={styles.sidebarLogoText}>Brújula Social</div>
                            <div className={styles.sidebarLogoSub}>Admin Panel</div>
                        </div>
                    </div>
                </div>

                <div className={styles.sidebarSection}>
                    <div className={styles.sidebarSectionLabel}>GENERAL</div>
                    <button className={`${styles.sidebarItem} ${seccionActiva === "resumen" ? styles.sidebarItemActivo : ""}`} onClick={() => setSeccionActiva("resumen")}>
                        <span className={styles.sidebarIcon}>▦</span> Resumen
                    </button>
                    <button className={`${styles.sidebarItem} ${seccionActiva === "organizaciones" ? styles.sidebarItemActivo : ""}`} onClick={() => setSeccionActiva("organizaciones")}>
                        <span className={styles.sidebarIcon}>🏢</span> Organizaciones
                        <span className={styles.sidebarBadge}>{organizaciones.length}</span>
                    </button>
                    <button className={`${styles.sidebarItem} ${seccionActiva === "voluntarios" ? styles.sidebarItemActivo : ""}`} onClick={() => setSeccionActiva("voluntarios")}>
                        <span className={styles.sidebarIcon}>👥</span> Voluntarios
                        <span className={styles.sidebarBadge}>{usuarios.length}</span>
                    </button>
                    <button className={`${styles.sidebarItem} ${seccionActiva === "horas" ? styles.sidebarItemActivo : ""}`} onClick={() => setSeccionActiva("horas")}>
                        <span className={styles.sidebarIcon}>⏱️</span> Horas Registradas
                    </button>
                </div>

                <div className={styles.sidebarSection}>
                    <div className={styles.sidebarSectionLabel}>PLATAFORMA</div>
                    <button className={`${styles.sidebarItem} ${seccionActiva === "aplicaciones" ? styles.sidebarItemActivo : ""}`} onClick={() => setSeccionActiva("aplicaciones")}>
                        <span className={styles.sidebarIcon}>📋</span> Solicitudes
                        <span className={styles.sidebarBadge}>{aplicaciones.length}</span>
                    </button>
                </div>
            </div>

            {/* ── CONTENIDO ── */}
            <div className={styles.contenido}>

                {/* Topbar */}
                <div className={styles.topbar}>
                    <div className={styles.topbarTitulo}>
                        {seccionActiva === "resumen" && "Resumen general"}
                        {seccionActiva === "organizaciones" && "Organizaciones"}
                        {seccionActiva === "voluntarios" && "Voluntarios"}
                        {seccionActiva === "horas" && "Horas Registradas"}
                        {seccionActiva === "aplicaciones" && "Solicitudes"}
                    </div>
                    <div className={styles.topbarAcciones}>
                        <div className={styles.searchWrap}>
                            <span className={styles.searchIcon}>🔍</span>
                            <input
                                type="text"
                                placeholder="Buscar..."
                                value={busqueda}
                                onChange={(e) => setBusqueda(e.target.value)}
                                className={styles.searchInput}
                            />
                        </div>
                        <div className={styles.adminBadge}>🔒 Admin</div>
                    </div>
                </div>

                <div className={styles.contenidoInner}>

                    {/* ══ RESUMEN ══ */}
                    {seccionActiva === "resumen" && (
                        <div>
                            <div className={styles.statsGrid}>
                                <div className={styles.statCard}>
                                    <div className={styles.statIconWrap} style={{background:"#E1F5EE"}}><span style={{fontSize:20}}>🏢</span></div>
                                    <div className={styles.statInfo}>
                                        <div className={styles.statLabel}>ORGANIZACIONES</div>
                                        <div className={styles.statNum}>{organizaciones.length}</div>
                                    </div>
                                </div>
                                <div className={styles.statCard}>
                                    <div className={styles.statIconWrap} style={{background:"#E6F1FB"}}><span style={{fontSize:20}}>👥</span></div>
                                    <div className={styles.statInfo}>
                                        <div className={styles.statLabel}>VOLUNTARIOS</div>
                                        <div className={styles.statNum}>{usuarios.length}</div>
                                    </div>
                                </div>
                                <div className={styles.statCard}>
                                    <div className={styles.statIconWrap} style={{background:"#FAEEDA"}}><span style={{fontSize:20}}>⏱️</span></div>
                                    <div className={styles.statInfo}>
                                        <div className={styles.statLabel}>HORAS TOTALES</div>
                                        <div className={styles.statNum}>{totalHoras()}</div>
                                    </div>
                                </div>
                                <div className={styles.statCard}>
                                    <div className={styles.statIconWrap} style={{background:"#EAF3DE"}}><span style={{fontSize:20}}>📋</span></div>
                                    <div className={styles.statInfo}>
                                        <div className={styles.statLabel}>SOLICITUDES</div>
                                        <div className={styles.statNum}>{aplicaciones.length}</div>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.dosCols}>
                                <div className={styles.card}>
                                    <div className={styles.cardTitulo}>Actividad reciente</div>
                                    {actividadReciente().length > 0 ? actividadReciente().map((a, i) => (
                                        <div key={i} className={styles.actividadRow}>
                                            <div className={styles.actividadDot} style={{background: a.color}}></div>
                                            <div>
                                                <div className={styles.actividadTexto}>{a.texto}</div>
                                                <div className={styles.actividadFecha}>{a.fecha}</div>
                                            </div>
                                        </div>
                                    )) : <p className={styles.sinDatos}>Sin actividad reciente</p>}
                                </div>
                                <div className={styles.card}>
                                    <div className={styles.cardTitulo}>Categorías activas</div>
                                    {categoriasActivas().map((cat, i) => (
                                        <div key={i} className={styles.categoriaRow}>
                                            <div className={styles.categoriaLabel}>{cat.nombre}</div>
                                            <div className={styles.categoriaBarra}>
                                                <div className={styles.categoriaBarraFill} style={{width: `${cat.porcentaje}%`}} />
                                            </div>
                                            <div className={styles.categoriaCount}>{cat.count} orgs</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ══ ORGANIZACIONES ══ */}
                    {seccionActiva === "organizaciones" && (
                        <div className={styles.card}>
                            <div className={styles.cardTitulo}>Organizaciones registradas</div>
                            <div className={styles.tablaWrap}>
                                <table className={styles.tabla}>
                                    <thead>
                                        <tr>
                                            <th>ORGANIZACIÓN</th>
                                            <th>CATEGORÍA</th>
                                            <th>PROVINCIA</th>
                                            <th>VOLUNTARIOS</th>
                                            <th>ACCIONES</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filtrar(organizaciones, ["NombreOrganizacion", "Descripcion"]).map((org, i) => (
                                            <tr key={org.id}>
                                                <td>
                                                    <div className={styles.tdUser}>
                                                        <div className={styles.avatar} style={{background: getColorAvatar(i)}}>{getIniciales(org.NombreOrganizacion)}</div>
                                                        <div>
                                                            <div className={styles.tdNombre}>{org.NombreOrganizacion}</div>
                                                            <div className={styles.tdSub}>{org.Descripcion}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td><span className={styles.badge}>{getNombreCategoria(org.idCategoria)}</span></td>
                                                <td>{getNombreProvincia(org.IdProvincia)}</td>
                                                <td>{aplicaciones.filter(a => String(a.idOrganizacion) === String(org.id)).length}</td>
                                                <td>
                                                    <div className={styles.accionesBtns}>
                                                        <button className={styles.btnEditar} onClick={() => abrirModalOrg(org)} title="Editar">✏️</button>
                                                        <button className={styles.btnEliminar} onClick={() => eliminarOrganizacion(org.id)} title="Eliminar">🗑</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* ══ VOLUNTARIOS ══ */}
                    {seccionActiva === "voluntarios" && (
                        <div className={styles.card}>
                            <div className={styles.cardTitulo}>Voluntarios registrados</div>
                            <div className={styles.tablaWrap}>
                                <table className={styles.tabla}>
                                    <thead>
                                        <tr>
                                            <th>VOLUNTARIO</th>
                                            <th>PROVINCIA</th>
                                            <th>HORAS</th>
                                            <th>APLICACIONES</th>
                                            <th>FECHA REGISTRO</th>
                                            <th>ACCIONES</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filtrar(usuarios, ["Nombre", "Correo"]).map((u, i) => (
                                            <tr key={u.id}>
                                                <td>
                                                    <div className={styles.tdUser}>
                                                        <div className={styles.avatar} style={{background: getColorAvatar(i)}}>{getIniciales(u.Nombre)}</div>
                                                        <div>
                                                            <div className={styles.tdNombre}>{u.Nombre}</div>
                                                            <div className={styles.tdSub}>{u.Correo}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>{getNombreProvincia(u.IdProvincia)}</td>
                                                <td><strong>{horas.filter(h => String(h.idUsuario) === String(u.id)).reduce((sum, h) => sum + parseInt(h.horas || 0), 0)}h</strong></td>
                                                <td>{aplicaciones.filter(a => String(a.idUsuario) === String(u.id)).length}</td>
                                                <td>{u.FechaRegistro}</td>
                                                <td>
                                                    <div className={styles.accionesBtns}>
                                                        <button className={styles.btnEditar} onClick={() => abrirModalUsuario(u)} title="Editar">✏️</button>
                                                        <button className={styles.btnEliminar} onClick={() => eliminarUsuario(u.id)} title="Eliminar">🗑</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* ══ HORAS ══ */}
                    {seccionActiva === "horas" && (
                        <div className={styles.card}>
                            <div className={styles.cardTitulo}>Registro de horas</div>
                            <div className={styles.tablaWrap}>
                                <table className={styles.tabla}>
                                    <thead>
                                        <tr>
                                            <th>VOLUNTARIO</th>
                                            <th>ORGANIZACIÓN</th>
                                            <th>ACTIVIDAD</th>
                                            <th>FECHA</th>
                                            <th>HORAS</th>
                                            <th>ACCIONES</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filtrar(horas, ["actividad"]).map((h) => (
                                            <tr key={h.id}>
                                                <td>{getNombreUsuario(h.idUsuario)}</td>
                                                <td>{getNombreOrg(h.idOrganizacion)}</td>
                                                <td>{h.actividad}</td>
                                                <td>{h.fecha}</td>
                                                <td><strong>{h.horas}h</strong></td>
                                                <td>
                                                    <div className={styles.accionesBtns}>
                                                        <button className={styles.btnEliminar} onClick={() => eliminarHoras(h.id)} title="Eliminar">🗑</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* ══ APLICACIONES ══ */}
                    {seccionActiva === "aplicaciones" && (
                        <div className={styles.card}>
                            <div className={styles.cardTitulo}>Solicitudes de voluntariado</div>
                            <div className={styles.tablaWrap}>
                                <table className={styles.tabla}>
                                    <thead>
                                        <tr>
                                            <th>VOLUNTARIO</th>
                                            <th>ORGANIZACIÓN</th>
                                            <th>FECHA SOLICITUD</th>
                                            <th>ESTADO</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filtrar(aplicaciones, []).map((a, i) => (
                                            <tr key={a.id}>
                                                <td>
                                                    <div className={styles.tdUser}>
                                                        <div className={styles.avatar} style={{background: getColorAvatar(i)}}>{getIniciales(getNombreUsuario(a.idUsuario))}</div>
                                                        <div className={styles.tdNombre}>{getNombreUsuario(a.idUsuario)}</div>
                                                    </div>
                                                </td>
                                                <td>{getNombreOrg(a.idOrganizacion)}</td>
                                                <td>{a.FechaAplicacion}</td>
                                                <td><span className={styles.badgeActivo}>Activo</span></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                </div>
            </div>

            {/* ══ MODAL EDITAR USUARIO ══ */}
            {modalUsuario && (
                <div className={styles.modalOverlay} onClick={() => setModalUsuario(false)}>
                    <div className={styles.modal} onClick={e => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h3>Editar voluntario</h3>
                            <button className={styles.modalClose} onClick={() => setModalUsuario(false)}>✕</button>
                        </div>
                        <div className={styles.modalBody}>
                            <div className={styles.modalGrid}>
                                <div className={styles.modalGroup}>
                                    <label>Nombre completo</label>
                                    <input type="text" value={editNombre} onChange={e => setEditNombre(e.target.value)} className={styles.modalInput} />
                                </div>
                                <div className={styles.modalGroup}>
                                    <label>Correo electrónico</label>
                                    <input type="email" value={editCorreo} onChange={e => setEditCorreo(e.target.value)} className={styles.modalInput} />
                                </div>
                                <div className={styles.modalGroup}>
                                    <label>Teléfono</label>
                                    <input type="text" value={editTelefono} onChange={e => setEditTelefono(e.target.value)} className={styles.modalInput} />
                                </div>
                            </div>
                        </div>
                        <div className={styles.modalFooter}>
                            <button className={styles.btnCancelarModal} onClick={() => setModalUsuario(false)}>Cancelar</button>
                            <button className={styles.btnGuardarModal} onClick={guardarUsuario}>Guardar cambios</button>
                        </div>
                    </div>
                </div>
            )}

            {/* ══ MODAL EDITAR ORGANIZACIÓN ══ */}
            {modalOrg && (
                <div className={styles.modalOverlay} onClick={() => setModalOrg(false)}>
                    <div className={styles.modal} onClick={e => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h3>Editar organización</h3>
                            <button className={styles.modalClose} onClick={() => setModalOrg(false)}>✕</button>
                        </div>
                        <div className={styles.modalBody}>
                            <div className={styles.modalGrid}>
                                <div className={styles.modalGroup}>
                                    <label>Nombre</label>
                                    <input type="text" value={editNombreOrg} onChange={e => setEditNombreOrg(e.target.value)} className={styles.modalInput} />
                                </div>
                                <div className={styles.modalGroup}>
                                    <label>Categoría</label>
                                    <select value={editIdCategoria} onChange={e => setEditIdCategoria(e.target.value)} className={styles.modalInput}>
                                        <option value="">Seleccionar</option>
                                        {categorias.map(c => <option key={c.id} value={c.id}>{c.NombreCategoria}</option>)}
                                    </select>
                                </div>
                                <div className={styles.modalGroup}>
                                    <label>Provincia</label>
                                    <select value={editIdProvincia} onChange={e => setEditIdProvincia(e.target.value)} className={styles.modalInput}>
                                        <option value="">Seleccionar</option>
                                        {provincias.map(p => <option key={p.id} value={p.id}>{p.NombreProvincia}</option>)}
                                    </select>
                                </div>
                                <div className={styles.modalGroup} style={{gridColumn:'1/-1'}}>
                                    <label>Descripción</label>
                                    <textarea value={editDescripcion} onChange={e => setEditDescripcion(e.target.value)} className={styles.modalInput} style={{minHeight:'80px', resize:'vertical'}} />
                                </div>
                            </div>
                        </div>
                        <div className={styles.modalFooter}>
                            <button className={styles.btnCancelarModal} onClick={() => setModalOrg(false)}>Cancelar</button>
                            <button className={styles.btnGuardarModal} onClick={guardarOrg}>Guardar cambios</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default PanelAdmin