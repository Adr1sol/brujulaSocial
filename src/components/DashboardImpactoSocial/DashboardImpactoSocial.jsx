import React, { useState, useEffect } from 'react'
import ServiceUsuario from '../../services/ServiceUsuario'
import ServiceOrganizaciones from '../../services/ServiceOrganizaciones'
import ServiceVoluntariado from '../../services/ServiceVoluntariado'
import ServiceHoras from '../../services/ServiceHoras'
import ServiceCategorias from '../../services/ServiceCategorias'
import ServiceProvincias from '../../services/ServiceProvincias'
import styles from './DashboardImpactoSocial.module.css'
// 1. Importamos el nuevo componente
import NavbarVarios from '../NavbarGlobal/NavbarGlobal' 

function DashboardImpactoSocial() {
    const [usuarios, setUsuarios] = useState([])
    const [organizaciones, setOrganizaciones] = useState([])
    const [aplicaciones, setAplicaciones] = useState([])
    const [horas, setHoras] = useState([])
    const [categorias, setCategorias] = useState([])
    const [provincias, setProvincias] = useState([])
    const [voluntarioSeleccionado, setVoluntarioSeleccionado] = useState(null)
    const [tabActiva, setTabActiva] = useState("dashboard")

    async function cargarDatos() {
        const u = await ServiceUsuario.getUsuarios()
        const o = await ServiceOrganizaciones.getOrganizaciones()
        const a = await ServiceVoluntariado.getVoluntariado()
        const h = await ServiceHoras.getHoras()
        const c = await ServiceCategorias.getCategorias()
        const p = await ServiceProvincias.getProvincias()

        setUsuarios(u || [])
        setOrganizaciones(o || [])
        setAplicaciones(a || [])
        setHoras(h || [])
        setCategorias(c || [])
        setProvincias(p || [])
    }

    // ... (tus funciones de lógica se mantienen exactamente igual)
    function totalHoras() { return horas.reduce((sum, h) => sum + parseInt(h.horas || 0), 0) }
    function getNombreCategoria(idCategoria) {
        const cat = categorias.find((c) => String(c.id) === String(idCategoria))
        return cat ? cat.NombreCategoria : "Sin categoría"
    }
    function getNombreProvincia(idProvincia) {
        const prov = provincias.find((p) => String(p.id) === String(idProvincia))
        return prov ? prov.NombreProvincia : "Sin provincia"
    }
    function getNombreOrg(idOrganizacion) {
        const org = organizaciones.find((o) => String(o.id) === String(idOrganizacion))
        return org ? org.NombreOrganizacion : "Organización desconocida"
    }
    function horasPorCategoria() {
        const resultado = {}
        horas.forEach((h) => {
            const org = organizaciones.find((o) => String(o.id) === String(h.idOrganizacion))
            if (org) {
                const cat = getNombreCategoria(org.idCategoria)
                resultado[cat] = (resultado[cat] || 0) + parseInt(h.horas || 0)
            }
        })
        return Object.entries(resultado).sort((a, b) => b[1] - a[1])
    }
    function voluntariosPorProvincia() {
        const resultado = {}
        usuarios.forEach((u) => {
            const prov = getNombreProvincia(u.IdProvincia)
            resultado[prov] = (resultado[prov] || 0) + 1
        })
        return Object.entries(resultado).sort((a, b) => b[1] - a[1])
    }
    function orgsActivas() {
        const resultado = {}
        horas.forEach((h) => {
            resultado[h.idOrganizacion] = (resultado[h.idOrganizacion] || 0) + parseInt(h.horas || 0)
        })
        return Object.entries(resultado)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([id, totalH]) => ({
                org: organizaciones.find((o) => String(o.id) === String(id)),
                totalH
            }))
            .filter((item) => item.org)
    }
    function aplicacionesRecientes() {
        return aplicaciones.slice(-5).reverse().map((a) => ({
            usuario: usuarios.find((u) => String(u.id) === String(a.idUsuario)),
            orgNombre: getNombreOrg(a.idOrganizacion),
            fecha: a.FechaAplicacion
        })).filter((item) => item.usuario)
    }
    function getIniciales(nombre) {
        if (!nombre) return "??"
        const partes = nombre.split(" ")
        return partes.length >= 2
            ? partes[0][0] + partes[1][0]
            : nombre.substring(0, 2).toUpperCase()
    }
    const coloresAvatar = ["#1D9E75", "#E8841A", "#185FA5", "#534AB7", "#3B6D11", "#D4537E"]
    function getColorAvatar(index) { return coloresAvatar[index % coloresAvatar.length] }
    function getMaximo(arr) { return Math.max(...arr.map(([, v]) => v), 1) }

    useEffect(() => {
        Promise.resolve().then(() => cargarDatos())
    }, [])

    return (
        <div className={styles.pagina}>

            {/* 2. REEMPLAZO DEL NAVBAR: Usamos el componente dinámico */}
            <NavbarVarios 
                tipo="impacto" 
                tabActiva={tabActiva} 
                setTabActiva={setTabActiva} 
            />

            {/* ===== DASHBOARD ===== */}
            {tabActiva === "dashboard" && (
                <div>
                    <div className={styles.hero}>
                        <h1 className={styles.heroTitulo}>Impacto Social</h1>
                        <p className={styles.heroSub}>Datos en tiempo real de voluntarios y organizaciones en Costa Rica.</p>
                        <div className={styles.heroStats}>
                            <div className={styles.heroStat}>
                                <div className={styles.heroStatN}>{usuarios.length}</div>
                                <div className={styles.heroStatL}>Voluntarios</div>
                            </div>
                            <div className={styles.heroDivider}></div>
                            <div className={styles.heroStat}>
                                <div className={styles.heroStatN}>{organizaciones.length}</div>
                                <div className={styles.heroStatL}>Organizaciones</div>
                            </div>
                            <div className={styles.heroDivider}></div>
                            <div className={styles.heroStat}>
                                <div className={styles.heroStatN}>{totalHoras()}</div>
                                <div className={styles.heroStatL}>Horas donadas</div>
                            </div>
                            <div className={styles.heroDivider}></div>
                            <div className={styles.heroStat}>
                                <div className={styles.heroStatN}>7</div>
                                <div className={styles.heroStatL}>Provincias</div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.contenido}>
                        <div className={styles.statsGrid}>
                            <div className={styles.statCard}>
                                <div className={styles.statIconWrap} style={{background:"#E1F5EE"}}>
                                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="8" r="4" stroke="#1D9E75" strokeWidth="1.5"/><path d="M3 19c0-3.866 3.582-7 8-7s8 3.134 8 7" stroke="#1D9E75" strokeWidth="1.5" strokeLinecap="round"/></svg>
                                </div>
                                <div>
                                    <div className={styles.statNum} style={{color:"#1D9E75"}}>{usuarios.length}</div>
                                    <div className={styles.statLbl}>Voluntarios activos</div>
                                </div>
                            </div>
                            <div className={styles.statCard}>
                                <div className={styles.statIconWrap} style={{background:"#FAEEDA"}}>
                                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="3" y="8" width="16" height="11" rx="2" stroke="#E8841A" strokeWidth="1.5"/><path d="M8 8V6a3 3 0 016 0v2" stroke="#E8841A" strokeWidth="1.5"/></svg>
                                </div>
                                <div>
                                    <div className={styles.statNum} style={{color:"#E8841A"}}>{organizaciones.length}</div>
                                    <div className={styles.statLbl}>Organizaciones</div>
                                </div>
                            </div>
                            <div className={styles.statCard}>
                                <div className={styles.statIconWrap} style={{background:"#E6F1FB"}}>
                                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="8" stroke="#185FA5" strokeWidth="1.5"/><path d="M11 7v4l2.5 2.5" stroke="#185FA5" strokeWidth="1.5" strokeLinecap="round"/></svg>
                                </div>
                                <div>
                                    <div className={styles.statNum} style={{color:"#185FA5"}}>{totalHoras()}</div>
                                    <div className={styles.statLbl}>Horas donadas</div>
                                </div>
                            </div>
                            <div className={styles.statCard}>
                                <div className={styles.statIconWrap} style={{background:"#EAF3DE"}}>
                                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M11 2C7.686 2 5 4.686 5 8c0 5.5 6 12 6 12s6-6.5 6-12c0-3.314-2.686-6-6-6z" stroke="#3B6D11" strokeWidth="1.5"/><circle cx="11" cy="8" r="2" stroke="#3B6D11" strokeWidth="1.5"/></svg>
                                </div>
                                <div>
                                    <div className={styles.statNum} style={{color:"#3B6D11"}}>7</div>
                                    <div className={styles.statLbl}>Provincias cubiertas</div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.chartsRow}>
                            <div className={styles.chartCard}>
                                <div className={styles.chartTitle}>Horas donadas por categoría</div>
                                {horasPorCategoria().length > 0 ? horasPorCategoria().map(([cat, total]) => (
                                    <div key={cat} className={styles.barRow}>
                                        <div className={styles.barLabel}>{cat}</div>
                                        <div className={styles.barTrack}>
                                            <div className={styles.barFill} style={{
                                                width: `${Math.round((total / getMaximo(horasPorCategoria())) * 100)}%`,
                                                background: "#185FA5"
                                            }}>
                                                <span className={styles.barVal}>{total}h</span>
                                            </div>
                                        </div>
                                    </div>
                                )) : <p className={styles.sinDatos}>Sin datos aún</p>}
                            </div>
                            <div className={styles.chartCard}>
                                <div className={styles.chartTitle}>Voluntarios por provincia</div>
                                {voluntariosPorProvincia().length > 0 ? voluntariosPorProvincia().map(([prov, total]) => (
                                    <div key={prov} className={styles.barRow}>
                                        <div className={styles.barLabel}>{prov}</div>
                                        <div className={styles.barTrack}>
                                            <div className={styles.barFill} style={{
                                                width: `${Math.round((total / getMaximo(voluntariosPorProvincia())) * 100)}%`,
                                                background: "#1D9E75"
                                            }}>
                                                <span className={styles.barVal}>{total}</span>
                                            </div>
                                        </div>
                                    </div>
                                )) : <p className={styles.sinDatos}>Sin datos aún</p>}
                            </div>
                        </div>

                        <div className={styles.dosCols}>
                            <div className={styles.chartCard}>
                                <div className={styles.chartTitle}>Organizaciones más activas</div>
                                {orgsActivas().length > 0 ? orgsActivas().map((item, i) => (
                                    <div key={i} className={styles.listRow}>
                                        <div className={styles.avatar} style={{background: getColorAvatar(i)}}>
                                            {getIniciales(item.org.NombreOrganizacion)}
                                        </div>
                                        <div>
                                            <div className={styles.listNombre}>{item.org.NombreOrganizacion}</div>
                                            <div className={styles.listMeta}>{getNombreCategoria(item.org.idCategoria)}</div>
                                        </div>
                                        <div className={styles.listHoras}>{item.totalH} h</div>
                                    </div>
                                )) : <p className={styles.sinDatos}>Sin datos aún</p>}
                            </div>
                            <div className={styles.chartCard}>
                                <div className={styles.chartTitle}>Voluntarios recientes</div>
                                {aplicacionesRecientes().length > 0 ? aplicacionesRecientes().map((item, i) => (
                                    <div key={i} className={styles.listRow}>
                                        <div className={styles.avatar} style={{background: getColorAvatar(i)}}>
                                            {getIniciales(item.usuario.Nombre)}
                                        </div>
                                        <div>
                                            <div className={styles.listNombre}>{item.usuario.Nombre}</div>
                                            <div className={styles.listMeta}>{item.orgNombre} · {item.fecha}</div>
                                        </div>
                                        <button
                                            className={styles.verPerfilBtn}
                                            onClick={() => setVoluntarioSeleccionado(item.usuario)}
                                        >Ver perfil</button>
                                    </div>
                                )) : <p className={styles.sinDatos}>Sin datos aún</p>}
                            </div>
                        </div>

                        <div className={styles.chartTitle} style={{marginBottom:"12px"}}>Cobertura por provincia</div>
                        <div className={styles.provGrid}>
                            {provincias.map((prov) => {
                                const total = organizaciones.filter(
                                    (o) => String(o.IdProvincia) === String(prov.id)
                                ).length
                                return (
                                    <div key={prov.id} className={styles.provCard}>
                                        <div className={styles.provNombre}>{prov.NombreProvincia}</div>
                                        <div className={styles.provVal}>{total}</div>
                                        <div className={styles.provLbl}>organizaciones</div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            )}

            {/* ===== VOLUNTARIOS ===== */}
            {tabActiva === "voluntarios" && (
                <div className={styles.contenido}>
                    <div className={styles.tabHeader}>
                        <div>
                            <div className={styles.tabTitulo}>Voluntarios registrados</div>
                            <div className={styles.tabSub}>{usuarios.length} voluntarios en la plataforma</div>
                        </div>
                    </div>
                    <div className={styles.tablaWrap}>
                        <table className={styles.tabla}>
                            <thead>
                                <tr>
                                    <th>Voluntario</th>
                                    <th>Correo</th>
                                    <th>Provincia</th>
                                    <th>Fecha de registro</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {usuarios.map((u, i) => (
                                    <tr key={u.id}>
                                        <td>
                                            <div className={styles.tdUser}>
                                                <div className={styles.avatarSm} style={{background: getColorAvatar(i)}}>
                                                    {getIniciales(u.Nombre)}
                                                </div>
                                                <span>{u.Nombre}</span>
                                            </div>
                                        </td>
                                        <td>{u.Correo}</td>
                                        <td>{getNombreProvincia(u.IdProvincia)}</td>
                                        <td>{u.FechaRegistro}</td>
                                        <td>
                                            <button
                                                className={styles.verPerfilBtn}
                                                onClick={() => setVoluntarioSeleccionado(u)}
                                            >Ver perfil</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* ===== ORGANIZACIONES ===== */}
            {tabActiva === "organizaciones" && (
                <div className={styles.contenido}>
                    <div className={styles.tabHeader}>
                        <div>
                            <div className={styles.tabTitulo}>Organizaciones registradas</div>
                            <div className={styles.tabSub}>{organizaciones.length} organizaciones en la plataforma</div>
                        </div>
                    </div>
                    <div className={styles.tablaWrap}>
                        <table className={styles.tabla}>
                            <thead>
                                <tr>
                                    <th>Organización</th>
                                    <th>Categoría</th>
                                    <th>Provincia</th>
                                    <th>Descripción</th>
                                    <th>Voluntarios</th>
                                </tr>
                            </thead>
                            <tbody>
                                {organizaciones.map((org, i) => (
                                    <tr key={org.id}>
                                        <td>
                                            <div className={styles.tdUser}>
                                                <div className={styles.avatarSm} style={{background: getColorAvatar(i)}}>
                                                    {getIniciales(org.NombreOrganizacion)}
                                                </div>
                                                <span>{org.NombreOrganizacion}</span>
                                            </div>
                                        </td>
                                        <td>{getNombreCategoria(org.idCategoria)}</td>
                                        <td>{getNombreProvincia(org.IdProvincia)}</td>
                                        <td>{org.Descripcion}</td>
                                        <td>
                                            {aplicaciones.filter(
                                                (a) => String(a.idOrganizacion) === String(org.id)
                                            ).length}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* MODAL VER PERFIL */}
            {voluntarioSeleccionado && (
                <div className={styles.modalOverlay} onClick={() => setVoluntarioSeleccionado(null)}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h3>Perfil del voluntario</h3>
                            <button className={styles.modalClose} onClick={() => setVoluntarioSeleccionado(null)}>X</button>
                        </div>
                        <div className={styles.modalBody}>
                            <div className={styles.modalAvatarWrap}>
                                <div className={styles.modalAvatar} style={{background: getColorAvatar(0)}}>
                                    {getIniciales(voluntarioSeleccionado.Nombre)}
                                </div>
                                <div>
                                    <div className={styles.modalNombre}>{voluntarioSeleccionado.Nombre}</div>
                                    <div className={styles.modalCorreo}>{voluntarioSeleccionado.Correo}</div>
                                </div>
                            </div>
                            <div className={styles.infoGrid}>
                                <div className={styles.infoItem}>
                                    <div className={styles.infoLabel}>Teléfono</div>
                                    <div className={styles.infoValue}>{voluntarioSeleccionado.Telefono || "No registrado"}</div>
                                </div>
                                <div className={styles.infoItem}>
                                    <div className={styles.infoLabel}>Provincia</div>
                                    <div className={styles.infoValue}>{getNombreProvincia(voluntarioSeleccionado.IdProvincia)}</div>
                                </div>
                                <div className={styles.infoItem}>
                                    <div className={styles.infoLabel}>Fecha de registro</div>
                                    <div className={styles.infoValue}>{voluntarioSeleccionado.FechaRegistro}</div>
                                </div>
                                <div className={styles.infoItem}>
                                    <div className={styles.infoLabel}>Aplicaciones</div>
                                    <div className={styles.infoValue}>
                                        {aplicaciones.filter(
                                            (a) => String(a.idUsuario) === String(voluntarioSeleccionado.id)
                                        ).length} organizaciones
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.modalFooter}>
                            <button className={styles.btnCerrar} onClick={() => setVoluntarioSeleccionado(null)}>Cerrar</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default DashboardImpactoSocial