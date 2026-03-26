import React, { useState, useEffect } from 'react'
import ServiceUsuario from '../../services/ServiceUsuario'
import ServiceOrganizaciones from '../../services/ServiceOrganizaciones'
import ServiceHoras from '../../services/ServiceHoras'
import ServiceVoluntariado from '../../services/ServiceVoluntariado'
import ServiceCategorias from '../../services/ServiceCategorias'
import ServiceProvincias from '../../services/ServiceProvincias'
import styles from './PanelAdmin.module.css'
import Swal from 'sweetalert2'
import logoBrujula from '../../images/logoSinNombre.png'

function PanelAdmin() {

    const [seccionActiva, setSeccionActiva] = useState("resumen")
    const [usuarios, setUsuarios] = useState([])
    const [organizaciones, setOrganizaciones] = useState([])
    const [horas, setHoras] = useState([])
    const [aplicaciones, setAplicaciones] = useState([])
    const [categorias, setCategorias] = useState([])
    const [provincias, setProvincias] = useState([])
    const [busqueda, setBusqueda] = useState("")

    const [modalUsuario, setModalUsuario] = useState(false)
    const [usuarioEditando, setUsuarioEditando] = useState(null)
    const [editNombre, setEditNombre] = useState("")
    const [editCorreo, setEditCorreo] = useState("")
    const [editTelefono, setEditTelefono] = useState("")

    const [modalOrg, setModalOrg] = useState(false)
    const [orgEditando, setOrgEditando] = useState(null)
    const [editNombreOrg, setEditNombreOrg] = useState("")
    const [editDescripcion, setEditDescripcion] = useState("")
    const [editIdCategoria, setEditIdCategoria] = useState("")
    const [editIdProvincia, setEditIdProvincia] = useState("")

    useEffect(() => { cargarDatos() }, [])

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
        const colores = ["#00b8a9", "#f6ad55", "#185FA5", "#9b59b6", "#3B6D11", "#e74c3c"]
        return colores[i % colores.length]
    }
    function actividadReciente() {
        const actividades = []
        aplicaciones.slice(-3).reverse().forEach(a => {
            actividades.push({
                texto: `${getNombreUsuario(a.idUsuario)} aplicó a ${getNombreOrg(a.idOrganizacion)}`,
                fecha: a.FechaAplicacion,
                color: "#00b8a9"
            })
        })
        horas.slice(-2).reverse().forEach(h => {
            actividades.push({
                texto: `${getNombreUsuario(h.idUsuario)} registró ${h.horas}h en ${getNombreOrg(h.idOrganizacion)}`,
                fecha: h.fecha,
                color: "#f6ad55"
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
    function filtrar(lista, campos) {
        if (!busqueda.trim()) return lista
        const q = busqueda.toLowerCase()
        return lista.filter(item =>
            campos.some(campo => String(item[campo] || "").toLowerCase().includes(q))
        )
    }

    async function eliminarUsuario(id) {
        Swal.fire({
            icon: 'warning', title: '¿Eliminar voluntario?', text: 'Esta acción no se puede deshacer.',
            showCancelButton: true, confirmButtonText: 'Sí, eliminar', cancelButtonText: 'Cancelar',
            confirmButtonColor: '#e74c3c', cancelButtonColor: '#00b8a9'
        }).then(async (r) => {
            if (r.isConfirmed) {
                await ServiceUsuario.deleteUsuario(id)
                Swal.fire({ icon: 'success', title: 'Eliminado', timer: 1500, showConfirmButton: false })
                cargarDatos()
            }
        })
    }
    function abrirModalUsuario(u) {
        setUsuarioEditando(u); setEditNombre(u.Nombre || "")
        setEditCorreo(u.Correo || ""); setEditTelefono(u.Telefono || "")
        setModalUsuario(true)
    }
    async function guardarUsuario() {
        if (!editNombre || !editCorreo) {
            Swal.fire({ icon: 'error', title: 'Campos incompletos', confirmButtonColor: '#f6ad55' }); return
        }
        const obj = { ...usuarioEditando, Nombre: editNombre, Correo: editCorreo, Telefono: editTelefono }
        const r = await ServiceUsuario.putUsuario(obj, usuarioEditando.id)
        if (r) { Swal.fire({ icon: 'success', title: '¡Actualizado!', timer: 1500, showConfirmButton: false }); setModalUsuario(false); cargarDatos() }
    }
    async function eliminarOrganizacion(id) {
        Swal.fire({
            icon: 'warning', title: '¿Eliminar organización?', text: 'Esta acción no se puede deshacer.',
            showCancelButton: true, confirmButtonText: 'Sí, eliminar', cancelButtonText: 'Cancelar',
            confirmButtonColor: '#e74c3c', cancelButtonColor: '#00b8a9'
        }).then(async (r) => {
            if (r.isConfirmed) {
                await ServiceOrganizaciones.deleteOrganizaciones(id)
                Swal.fire({ icon: 'success', title: 'Eliminada', timer: 1500, showConfirmButton: false })
                cargarDatos()
            }
        })
    }
    function abrirModalOrg(org) {
        setOrgEditando(org); setEditNombreOrg(org.NombreOrganizacion || "")
        setEditDescripcion(org.Descripcion || ""); setEditIdCategoria(org.idCategoria || "")
        setEditIdProvincia(org.IdProvincia || ""); setModalOrg(true)
    }
    async function guardarOrg() {
        if (!editNombreOrg) { Swal.fire({ icon: 'error', title: 'Nombre requerido', confirmButtonColor: '#f6ad55' }); return }
        const obj = { ...orgEditando, NombreOrganizacion: editNombreOrg, Descripcion: editDescripcion, idCategoria: parseInt(editIdCategoria), IdProvincia: parseInt(editIdProvincia) }
        const r = await ServiceOrganizaciones.putOrganizaciones(obj, orgEditando.id)
        if (r) { Swal.fire({ icon: 'success', title: '¡Actualizada!', timer: 1500, showConfirmButton: false }); setModalOrg(false); cargarDatos() }
    }
    async function eliminarHoras(id) {
        Swal.fire({
            icon: 'warning', title: '¿Eliminar registro?',
            showCancelButton: true, confirmButtonText: 'Sí, eliminar', cancelButtonText: 'Cancelar',
            confirmButtonColor: '#e74c3c', cancelButtonColor: '#00b8a9'
        }).then(async (r) => {
            if (r.isConfirmed) {
                await ServiceHoras.deleteHoras(id)
                Swal.fire({ icon: 'success', title: 'Eliminado', timer: 1500, showConfirmButton: false })
                cargarDatos()
            }
        })
    }

    const navItems = [
        { id: "resumen",        label: "Resumen",           icon: "◈",  badge: null,                  group: "GENERAL" },
        { id: "organizaciones", label: "Organizaciones",    icon: "🏢", badge: organizaciones.length,  group: "GENERAL" },
        { id: "voluntarios",    label: "Voluntarios",       icon: "👥", badge: usuarios.length,        group: "GENERAL" },
        { id: "horas",          label: "Horas Registradas", icon: "⏱️", badge: null,                  group: "GENERAL" },
        { id: "aplicaciones",   label: "Solicitudes",       icon: "📋", badge: aplicaciones.length,   group: "PLATAFORMA" },
    ]

    const titulos = {
        resumen: "Resumen general", organizaciones: "Organizaciones",
        voluntarios: "Voluntarios", horas: "Horas Registradas", aplicaciones: "Solicitudes"
    }

    const stats = [
        { label: "Organizaciones", val: organizaciones.length, icon: "🏢", color: "#00b8a9", bg: "rgba(0,184,169,0.1)",    accent: "#00b8a9" },
        { label: "Voluntarios",    val: usuarios.length,        icon: "👥", color: "#185FA5", bg: "rgba(24,95,165,0.1)",    accent: "#185FA5" },
        { label: "Horas totales",  val: totalHoras(),            icon: "⏱️", color: "#f6ad55", bg: "rgba(246,173,85,0.1)",  accent: "#f6ad55" },
        { label: "Solicitudes",    val: aplicaciones.length,    icon: "📋", color: "#9b59b6", bg: "rgba(155,89,182,0.1)",   accent: "#9b59b6" },
    ]

    return (
        <div className={styles.layout}>

            {/* ── SIDEBAR ── */}
            <aside className={styles.sidebar}>
                <div className={styles.sidebarBrand}>
                    {/* ✅ Logo PNG real */}
                    <img src={logoBrujula} alt="Brújula Social" className={styles.brandLogo} />
                    <div>
                        <div className={styles.brandName}>
                            Brújula<span className={styles.brandAccent}>Social</span>
                        </div>
                        <div className={styles.brandSub}>ADMIN PANEL</div>
                    </div>
                </div>

                <nav className={styles.sidebarNav}>
                    {["GENERAL", "PLATAFORMA"].map(group => (
                        <div key={group}>
                            <p className={styles.navGroupLabel}>{group}</p>
                            {navItems.filter(n => n.group === group).map(item => (
                                <button
                                    key={item.id}
                                    className={`${styles.navItem} ${seccionActiva === item.id ? styles.navItemActive : ''}`}
                                    onClick={() => setSeccionActiva(item.id)}
                                >
                                    <span className={styles.navIcon}>{item.icon}</span>
                                    <span className={styles.navLabel}>{item.label}</span>
                                    {item.badge !== null && (
                                        <span className={styles.navBadge}>{item.badge}</span>
                                    )}
                                </button>
                            ))}
                        </div>
                    ))}
                </nav>

                <div className={styles.sidebarFooter}>
                    <div className={styles.adminInfo}>
                        <div className={styles.adminAvatar}>AD</div>
                        <div>
                            <div className={styles.adminName}>Administrador</div>
                            <div className={styles.adminRole}>Super Admin</div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* ── MAIN ── */}
            <main className={styles.main}>

                {/* Topbar */}
                <header className={styles.topbar}>
                    <div className={styles.topbarLeft}>
                        <div className={styles.breadcrumb}>
                            <span className={styles.breadcrumbRoot}>Panel</span>
                            <span className={styles.breadcrumbSep}>/</span>
                            <span className={styles.breadcrumbCurrent}>{titulos[seccionActiva]}</span>
                        </div>
                        <h1 className={styles.pageTitle}>{titulos[seccionActiva]}</h1>
                    </div>
                    <div className={styles.topbarRight}>
                        <div className={styles.searchBox}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={styles.searchSvg}>
                                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                            </svg>
                            <input type="text" placeholder="Buscar..." value={busqueda}
                                onChange={(e) => setBusqueda(e.target.value)} className={styles.searchInput} />
                        </div>
                        <div className={styles.adminPill}>
                            <span className={styles.adminPillDot} />
                            Admin
                        </div>
                    </div>
                </header>

                <div className={styles.pageContent}>

                    {/* ══ RESUMEN ══ */}
                    {seccionActiva === "resumen" && (
                        <>
                            <div className={styles.statsRow}>
                                {stats.map((s, i) => (
                                    <div key={i} className={styles.statCard} style={{'--accent': s.accent, '--acc-bg': s.bg}}>
                                        <div className={styles.statTop}>
                                            <span className={styles.statLabel}>{s.label}</span>
                                            <div className={styles.statIconBox} style={{background: s.bg}}>
                                                <span>{s.icon}</span>
                                            </div>
                                        </div>
                                        <div className={styles.statNum} style={{color: s.color}}>{s.val}</div>
                                        <div className={styles.statBar}>
                                            <div className={styles.statBarFill} style={{background: s.color, width: '100%'}}/>
                                        </div>
                                        <div className={styles.statGlow} style={{background: s.color}}/>
                                    </div>
                                ))}
                            </div>

                            <div className={styles.twoCol}>
                                <div className={styles.card}>
                                    <h3 className={styles.cardTitle}>
                                        <span className={styles.cardDot} style={{background:'#00b8a9'}}/>
                                        Actividad reciente
                                    </h3>
                                    {actividadReciente().length > 0 ? actividadReciente().map((a, i) => (
                                        <div key={i} className={styles.actRow}>
                                            <div className={styles.actDot} style={{background: a.color, boxShadow:`0 0 8px ${a.color}`}}/>
                                            <div>
                                                <p className={styles.actText}>{a.texto}</p>
                                                <span className={styles.actDate}>{a.fecha}</span>
                                            </div>
                                        </div>
                                    )) : <p className={styles.empty}>Sin actividad reciente</p>}
                                </div>
                                <div className={styles.card}>
                                    <h3 className={styles.cardTitle}>
                                        <span className={styles.cardDot} style={{background:'#f6ad55'}}/>
                                        Categorías activas
                                    </h3>
                                    {categoriasActivas().map((cat, i) => (
                                        <div key={i} className={styles.catRow}>
                                            <span className={styles.catName}>{cat.nombre}</span>
                                            <div className={styles.catBar}>
                                                <div className={styles.catBarFill} style={{width:`${cat.porcentaje}%`}}/>
                                            </div>
                                            <span className={styles.catCount}>{cat.count}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}

                    {/* ══ ORGANIZACIONES ══ */}
                    {seccionActiva === "organizaciones" && (
                        <div className={styles.card}>
                            <h3 className={styles.cardTitle}><span className={styles.cardDot} style={{background:'#00b8a9'}}/>{organizaciones.length} organizaciones</h3>
                            <div className={styles.tableWrap}>
                                <table className={styles.table}>
                                    <thead><tr><th>Organización</th><th>Categoría</th><th>Provincia</th><th>Voluntarios</th><th>Acciones</th></tr></thead>
                                    <tbody>
                                        {filtrar(organizaciones, ["NombreOrganizacion","Descripcion"]).map((org, i) => (
                                            <tr key={org.id}>
                                                <td><div className={styles.userCell}><div className={styles.avatar} style={{background:getColorAvatar(i)}}>{getIniciales(org.NombreOrganizacion)}</div><div><p className={styles.cellName}>{org.NombreOrganizacion}</p><p className={styles.cellSub}>{org.Descripcion}</p></div></div></td>
                                                <td><span className={styles.chip}>{getNombreCategoria(org.idCategoria)}</span></td>
                                                <td className={styles.tdMuted}>{getNombreProvincia(org.IdProvincia)}</td>
                                                <td><span className={styles.chipTeal}>{aplicaciones.filter(a=>String(a.idOrganizacion)===String(org.id)).length}</span></td>
                                                <td><div className={styles.actions}><button className={styles.btnEdit} onClick={()=>abrirModalOrg(org)}>✏️</button><button className={styles.btnDel} onClick={()=>eliminarOrganizacion(org.id)}>🗑️</button></div></td>
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
                            <h3 className={styles.cardTitle}><span className={styles.cardDot} style={{background:'#185FA5'}}/>{usuarios.length} voluntarios</h3>
                            <div className={styles.tableWrap}>
                                <table className={styles.table}>
                                    <thead><tr><th>Voluntario</th><th>Provincia</th><th>Horas</th><th>Aplicaciones</th><th>Registro</th><th>Acciones</th></tr></thead>
                                    <tbody>
                                        {filtrar(usuarios, ["Nombre","Correo"]).map((u, i) => (
                                            <tr key={u.id}>
                                                <td><div className={styles.userCell}><div className={styles.avatar} style={{background:getColorAvatar(i)}}>{getIniciales(u.Nombre)}</div><div><p className={styles.cellName}>{u.Nombre}</p><p className={styles.cellSub}>{u.Correo}</p></div></div></td>
                                                <td className={styles.tdMuted}>{getNombreProvincia(u.IdProvincia)}</td>
                                                <td><span className={styles.chipOrange}>{horas.filter(h=>String(h.idUsuario)===String(u.id)).reduce((s,h)=>s+parseInt(h.horas||0),0)}h</span></td>
                                                <td className={styles.tdMuted}>{aplicaciones.filter(a=>String(a.idUsuario)===String(u.id)).length}</td>
                                                <td className={styles.tdMono}>{u.FechaRegistro}</td>
                                                <td><div className={styles.actions}><button className={styles.btnEdit} onClick={()=>abrirModalUsuario(u)}>✏️</button><button className={styles.btnDel} onClick={()=>eliminarUsuario(u.id)}>🗑️</button></div></td>
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
                            <h3 className={styles.cardTitle}><span className={styles.cardDot} style={{background:'#f6ad55'}}/>Total {totalHoras()} horas registradas</h3>
                            <div className={styles.tableWrap}>
                                <table className={styles.table}>
                                    <thead><tr><th>Voluntario</th><th>Organización</th><th>Actividad</th><th>Fecha</th><th>Horas</th><th>Acciones</th></tr></thead>
                                    <tbody>
                                        {filtrar(horas, ["actividad"]).map((h) => (
                                            <tr key={h.id}>
                                                <td className={styles.cellName}>{getNombreUsuario(h.idUsuario)}</td>
                                                <td className={styles.tdMuted}>{getNombreOrg(h.idOrganizacion)}</td>
                                                <td className={styles.tdMuted}>{h.actividad}</td>
                                                <td className={styles.tdMono}>{h.fecha}</td>
                                                <td><span className={styles.chipOrange}>{h.horas}h</span></td>
                                                <td><div className={styles.actions}><button className={styles.btnDel} onClick={()=>eliminarHoras(h.id)}>🗑️</button></div></td>
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
                            <h3 className={styles.cardTitle}><span className={styles.cardDot} style={{background:'#9b59b6'}}/>{aplicaciones.length} solicitudes</h3>
                            <div className={styles.tableWrap}>
                                <table className={styles.table}>
                                    <thead><tr><th>Voluntario</th><th>Organización</th><th>Fecha solicitud</th><th>Estado</th></tr></thead>
                                    <tbody>
                                        {filtrar(aplicaciones, []).map((a, i) => (
                                            <tr key={a.id}>
                                                <td><div className={styles.userCell}><div className={styles.avatar} style={{background:getColorAvatar(i)}}>{getIniciales(getNombreUsuario(a.idUsuario))}</div><p className={styles.cellName}>{getNombreUsuario(a.idUsuario)}</p></div></td>
                                                <td className={styles.tdMuted}>{getNombreOrg(a.idOrganizacion)}</td>
                                                <td className={styles.tdMono}>{a.FechaAplicacion}</td>
                                                <td><span className={styles.chipTeal}>✓ Activo</span></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* ══ MODAL USUARIO ══ */}
            {modalUsuario && (
                <div className={styles.overlay} onClick={() => setModalUsuario(false)}>
                    <div className={styles.modal} onClick={e => e.stopPropagation()}>
                        <div className={styles.modalHead}>
                            <div className={styles.modalHeadLeft}><div className={styles.modalIcon}>👤</div><h3>Editar voluntario</h3></div>
                            <button className={styles.modalClose} onClick={() => setModalUsuario(false)}>✕</button>
                        </div>
                        <div className={styles.modalBody}>
                            <div className={styles.formGrid}>
                                <div className={styles.formGroup}><label>Nombre completo</label><input type="text" value={editNombre} onChange={e=>setEditNombre(e.target.value)} className={styles.input}/></div>
                                <div className={styles.formGroup}><label>Correo electrónico</label><input type="email" value={editCorreo} onChange={e=>setEditCorreo(e.target.value)} className={styles.input}/></div>
                                <div className={styles.formGroup}><label>Teléfono</label><input type="text" value={editTelefono} onChange={e=>setEditTelefono(e.target.value)} className={styles.input}/></div>
                            </div>
                        </div>
                        <div className={styles.modalFoot}>
                            <button className={styles.btnCancel} onClick={() => setModalUsuario(false)}>Cancelar</button>
                            <button className={styles.btnSave} onClick={guardarUsuario}>Guardar cambios</button>
                        </div>
                    </div>
                </div>
            )}

            {/* ══ MODAL ORGANIZACIÓN ══ */}
            {modalOrg && (
                <div className={styles.overlay} onClick={() => setModalOrg(false)}>
                    <div className={styles.modal} onClick={e => e.stopPropagation()}>
                        <div className={styles.modalHead}>
                            <div className={styles.modalHeadLeft}><div className={styles.modalIcon}>🏢</div><h3>Editar organización</h3></div>
                            <button className={styles.modalClose} onClick={() => setModalOrg(false)}>✕</button>
                        </div>
                        <div className={styles.modalBody}>
                            <div className={styles.formGrid}>
                                <div className={styles.formGroup}><label>Nombre</label><input type="text" value={editNombreOrg} onChange={e=>setEditNombreOrg(e.target.value)} className={styles.input}/></div>
                                <div className={styles.formGroup}><label>Categoría</label><select value={editIdCategoria} onChange={e=>setEditIdCategoria(e.target.value)} className={styles.input}><option value="">Seleccionar</option>{categorias.map(c=><option key={c.id} value={c.id}>{c.NombreCategoria}</option>)}</select></div>
                                <div className={styles.formGroup}><label>Provincia</label><select value={editIdProvincia} onChange={e=>setEditIdProvincia(e.target.value)} className={styles.input}><option value="">Seleccionar</option>{provincias.map(p=><option key={p.id} value={p.id}>{p.NombreProvincia}</option>)}</select></div>
                                <div className={`${styles.formGroup} ${styles.fullWidth}`}><label>Descripción</label><textarea value={editDescripcion} onChange={e=>setEditDescripcion(e.target.value)} className={styles.input} style={{minHeight:'80px',resize:'vertical'}}/></div>
                            </div>
                        </div>
                        <div className={styles.modalFoot}>
                            <button className={styles.btnCancel} onClick={() => setModalOrg(false)}>Cancelar</button>
                            <button className={styles.btnSave} onClick={guardarOrg}>Guardar cambios</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default PanelAdmin