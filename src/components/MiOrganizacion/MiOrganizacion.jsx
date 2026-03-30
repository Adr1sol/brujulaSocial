import React, { useState, useEffect } from 'react'
import ReactECharts from 'echarts-for-react'
import ServiceOrganizaciones from '../../services/ServiceOrganizaciones'
import ServiceVoluntariado from '../../services/ServiceVoluntariado'
import ServiceUsuario from '../../services/ServiceUsuario'
import ServiceHoras from '../../services/ServiceHoras'
import ServiceCategorias from '../../services/ServiceCategorias'
import ServiceProvincias from '../../services/ServiceProvincias'
import ServiceDisponibilidades from '../../services/ServiceDisponibilidades'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import ModalVoluntario from './ModalVoluntario'
import ModalRegistroHoras from './ModalRegistroHoras'
import OrgSidebar from './OrgSidebar'
import styles from "./MiOrganizacion.module.css"

function PerfilOrganizacion() {

    const [seccionActiva, setSeccionActiva] = useState("resumen")
    const [organizacion, setOrganizacion] = useState(null)
    const [voluntarios, setVoluntarios] = useState([])
    const [categoriaNombre, setCategoriaNombre] = useState("")
    const [provinciaNombre, setProvinciaNombre] = useState("")
    const [disponibilidadNombre, setDisponibilidadNombre] = useState("")

    const [editando, setEditando] = useState(false)
    const [nombreOrganizacion, setNombreOrganizacion] = useState("")
    const [idCategoria, setIdCategoria] = useState("")
    const [idProvincia, setIdProvincia] = useState("")
    const [idDisponibilidad, setIdDisponibilidad] = useState("")
    const [descripcion, setDescripcion] = useState("")

    const [horas, setHoras] = useState([])
    const [provincias, setProvincias] = useState([])

    const [voluntarioSeleccionado, setVoluntarioSeleccionado] = useState(null)
    const [voluntarioParaHoras, setVoluntarioParaHoras] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        cargarDatos()
    }, [])

    async function cargarDatos() {
        const user = JSON.parse(localStorage.getItem("user") || "null")
        if (!user || !user.idOrganizacion) return

        const todasLasOrgs = await ServiceOrganizaciones.getOrganizaciones()
        const miOrg = todasLasOrgs.find(
            (o) => String(o.id) === String(user.idOrganizacion)
        )
        if (!miOrg) return

        localStorage.setItem("miOrganizacion", JSON.stringify(miOrg))
        setOrganizacion(miOrg)

        const categorias       = await ServiceCategorias.getCategorias()
        const provincias       = await ServiceProvincias.getProvincias()
        const disponibilidades = await ServiceDisponibilidades.getDisponibilidades()

        const cat  = categorias.find((c) => parseInt(c.id) === parseInt(miOrg.idCategoria))
        const prov = provincias.find((p) => parseInt(p.id) === parseInt(miOrg.IdProvincia))
        const disp = disponibilidades.find((d) => parseInt(d.id) === parseInt(miOrg.idDisponibilidad))

        setCategoriaNombre(cat  ? cat.NombreCategoria         : "Sin categoría")
        setProvinciaNombre(prov ? prov.NombreProvincia        : "Sin provincia")
        setDisponibilidadNombre(disp ? disp.NombreDisponibilidad : "Sin disponibilidad")

        const todasLasAplicaciones = await ServiceVoluntariado.getVoluntariado()
        const aplicacionesDeLaOrg = todasLasAplicaciones.filter(
            (a) => String(a.idOrganizacion) === String(miOrg.id)
        )

        const todosLosUsuarios = await ServiceUsuario.getUsuarios()
        const voluntariosDeLaOrg = aplicacionesDeLaOrg.map((aplicacion) => {
            const usuario = todosLosUsuarios.find(
                (u) => String(u.id) === String(aplicacion.idUsuario)
            )
            return { ...usuario, FechaAplicacion: aplicacion.FechaAplicacion }
        }).filter(v => v && v.Nombre)

        setVoluntarios(voluntariosDeLaOrg)
        setProvincias(provincias)

        const todasLasHoras = await ServiceHoras.getHoras()
        const horasDeLaOrg = todasLasHoras.filter(
            (h) => String(h.idOrganizacion) === String(miOrg.id)
        )
        setHoras(horasDeLaOrg)
    }

    function handleEditar() {
        setNombreOrganizacion(organizacion.NombreOrganizacion)
        setIdCategoria(organizacion.idCategoria)
        setIdProvincia(organizacion.IdProvincia)
        setIdDisponibilidad(organizacion.idDisponibilidad)
        setDescripcion(organizacion.Descripcion)
        setEditando(true)
        setSeccionActiva("resumen")
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    function handleCancelar() {
        setEditando(false)
        setNombreOrganizacion("")
        setIdCategoria("")
        setIdProvincia("")
        setIdDisponibilidad("")
        setDescripcion("")
    }

    async function handleGuardarCambios() {
        if (!nombreOrganizacion || !idCategoria || !idProvincia || !idDisponibilidad || !descripcion) {
            Swal.fire({
                icon: 'error',
                title: 'Formulario incompleto',
                text: 'Todos los campos deben estar llenos.',
                confirmButtonColor: '#EF8514'
            })
            return
        }

        const objOrganizacion = {
            NombreOrganizacion: nombreOrganizacion,
            idCategoria:        parseInt(idCategoria),
            IdProvincia:        parseInt(idProvincia),
            idDisponibilidad:   parseInt(idDisponibilidad),
            Descripcion:        descripcion
        }

        const actualizada = await ServiceOrganizaciones.putOrganizaciones(objOrganizacion, organizacion.id)

        if (actualizada) {
            localStorage.setItem("miOrganizacion", JSON.stringify(actualizada))
            setOrganizacion(actualizada)
            setEditando(false)

            Swal.fire({
                icon: 'success',
                title: '¡Actualización exitosa!',
                text: 'Tu organización fue actualizada correctamente.',
                timer: 2000,
                showConfirmButton: false
            })

            cargarDatos()
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error al actualizar',
                text: 'No se pudo actualizar la organización. Intentá de nuevo.',
                confirmButtonColor: '#EF8514'
            })
        }
    }

    async function handleEliminar() {
        Swal.fire({
            icon: 'warning',
            title: '¿Estás seguro?',
            text: 'Esta acción eliminará tu organización permanentemente.',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#d33',
            cancelButtonColor: '#078A87'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await ServiceOrganizaciones.deleteOrganizaciones(organizacion.id)
                localStorage.removeItem("miOrganizacion")
                localStorage.removeItem("user")
                setOrganizacion(null)

                Swal.fire({
                    icon: 'success',
                    title: 'Organización eliminada',
                    timer: 2000,
                    showConfirmButton: false
                }).then(() => {
                    navigate("/register")
                })
            }
        })
    }

    const titulos = {
        resumen:     editando ? "Editar organización" : "Mi Organización",
        dashboard:   "Dashboard",
        voluntarios: "Voluntarios"
    }

    // ── CHART DATA ──
    function totalHoras() {
        return horas.reduce((s, h) => s + parseInt(h.horas || 0), 0)
    }

    function chartTopVoluntarios() {
        const ranking = voluntarios.map(v => ({
            nombre: v.Nombre ? v.Nombre.split(" ")[0] : "?",
            horas: horas.filter(h => String(h.idUsuario) === String(v.id))
                        .reduce((s, h) => s + parseInt(h.horas || 0), 0)
        })).sort((a, b) => b.horas - a.horas).slice(0, 6)
        return { nombres: ranking.map(r => r.nombre), valores: ranking.map(r => r.horas) }
    }

    function chartHorasPorMes() {
        const meses = {}
        horas.forEach(h => {
            if (!h.fecha) return
            const key = h.fecha.substring(0, 7)
            meses[key] = (meses[key] || 0) + parseInt(h.horas || 0)
        })
        const sorted = Object.entries(meses).sort(([a], [b]) => a.localeCompare(b)).slice(-7)
        return { meses: sorted.map(([k]) => k), valores: sorted.map(([, v]) => v) }
    }

    function chartSolicitudesPorMes() {
        const meses = {}
        voluntarios.forEach(v => {
            if (!v.FechaAplicacion) return
            const key = v.FechaAplicacion.substring(0, 7)
            meses[key] = (meses[key] || 0) + 1
        })
        const sorted = Object.entries(meses).sort(([a], [b]) => a.localeCompare(b)).slice(-7)
        return { meses: sorted.map(([k]) => k), valores: sorted.map(([, v]) => v) }
    }

    function chartActividadesPorVoluntario() {
        const data = voluntarios.map(v => ({
            name: v.Nombre ? v.Nombre.split(" ")[0] : "?",
            value: horas.filter(h => String(h.idUsuario) === String(v.id)).length
        })).filter(d => d.value > 0).slice(0, 7)
        return data
    }

    const COLORS = ['#14b8a6','#3b82f6','#f59e0b','#a855f7','#22c55e','#ef4444','#06b6d4']
    const baseOpts = {
        backgroundColor: 'transparent',
        textStyle: { color: '#cbd5e1', fontFamily: 'Inter, system-ui, sans-serif' },
        tooltip: { backgroundColor: '#1e293b', borderColor: 'rgba(255,255,255,0.1)', textStyle: { color: '#f8fafc' } }
    }

    function optBarVoluntarios() {
        const { nombres, valores } = chartTopVoluntarios()
        return {
            ...baseOpts,
            grid: { left: 60, right: 20, top: 10, bottom: 30 },
            xAxis: { type: 'category', data: nombres, axisLine: { lineStyle: { color: '#334155' } }, axisLabel: { color: '#94a3b8', fontSize: 12 } },
            yAxis: { type: 'value', splitLine: { lineStyle: { color: '#1e293b' } }, axisLabel: { color: '#94a3b8', fontSize: 11 } },
            series: [{
                type: 'bar', data: valores, barMaxWidth: 40,
                itemStyle: {
                    color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
                        colorStops: [{ offset: 0, color: '#14b8a6' }, { offset: 1, color: '#0d9488' }] },
                    borderRadius: [8, 8, 0, 0]
                },
                label: { show: true, position: 'top', color: '#94a3b8', fontSize: 11 }
            }]
        }
    }

    function optAreaHoras() {
        const { meses, valores } = chartHorasPorMes()
        return {
            ...baseOpts,
            grid: { left: 50, right: 20, top: 20, bottom: 30 },
            xAxis: { type: 'category', data: meses, axisLine: { lineStyle: { color: '#334155' } }, axisLabel: { color: '#94a3b8', fontSize: 11 } },
            yAxis: { type: 'value', splitLine: { lineStyle: { color: '#1e293b' } }, axisLabel: { color: '#94a3b8', fontSize: 11 } },
            series: [{
                type: 'line', data: valores, smooth: true, symbol: 'circle', symbolSize: 7,
                lineStyle: { color: '#f59e0b', width: 3 },
                itemStyle: { color: '#f59e0b', borderColor: '#0f172a', borderWidth: 2 },
                areaStyle: {
                    color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
                        colorStops: [{ offset: 0, color: 'rgba(245,158,11,0.35)' }, { offset: 1, color: 'rgba(245,158,11,0)' }] }
                }
            }]
        }
    }

    function optLineSolicitudes() {
        const { meses, valores } = chartSolicitudesPorMes()
        return {
            ...baseOpts,
            grid: { left: 50, right: 20, top: 20, bottom: 30 },
            xAxis: { type: 'category', data: meses, axisLine: { lineStyle: { color: '#334155' } }, axisLabel: { color: '#94a3b8', fontSize: 11 } },
            yAxis: { type: 'value', minInterval: 1, splitLine: { lineStyle: { color: '#1e293b' } }, axisLabel: { color: '#94a3b8', fontSize: 11 } },
            series: [{
                type: 'line', data: valores, smooth: true, symbol: 'circle', symbolSize: 7,
                lineStyle: { color: '#3b82f6', width: 3 },
                itemStyle: { color: '#3b82f6', borderColor: '#0f172a', borderWidth: 2 },
                areaStyle: {
                    color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
                        colorStops: [{ offset: 0, color: 'rgba(59,130,246,0.3)' }, { offset: 1, color: 'rgba(59,130,246,0)' }] }
                }
            }]
        }
    }

    function optDonutActividades() {
        const data = chartActividadesPorVoluntario()
        return {
            ...baseOpts,
            legend: { bottom: 0, textStyle: { color: '#94a3b8', fontSize: 11 }, itemWidth: 10, itemHeight: 10 },
            series: [{
                type: 'pie', radius: ['45%', '70%'], center: ['50%', '42%'],
                label: { show: false },
                emphasis: { label: { show: true, fontSize: 13, fontWeight: 'bold', color: '#f8fafc' } },
                data: data.map((d, i) => ({
                    ...d, itemStyle: { color: COLORS[i % COLORS.length], borderWidth: 2, borderColor: '#0f172a' }
                }))
            }]
        }
    }

    // Sin organización
    if (!organizacion) {
        return (
            <div className={styles.layout}>
                <div className={styles.main}>
                    <div className={styles.pageContent}>
                        <div className={styles.noOrg}>
                            <div className={styles.noOrgTitulo}>Sin organización registrada</div>
                            <div className={styles.noOrgSub}>Aún no tenés una organización asociada a tu cuenta.</div>
                            <a href="/register" className={styles.btnIrRegistro}>Registrá tu organización</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.layout}>

            {/* SIDEBAR */}
            <OrgSidebar
                organizacion={organizacion}
                activeTab={seccionActiva}
                onTabChange={(tab) => { setSeccionActiva(tab); setEditando(false) }}
                onEditar={handleEditar}
                onEliminar={handleEliminar}
            />

            {/* MAIN */}
            <main className={styles.main}>
                <header className={styles.topbar}>
                    <div className={styles.topbarLeft}>
                        <div className={styles.breadcrumb}>
                            <span className={styles.breadcrumbRoot}>Mi Organización</span>
                            <span className={styles.breadcrumbSep}>/</span>
                            <span className={styles.breadcrumbCurrent}>{titulos[seccionActiva]}</span>
                        </div>
                        <h1 className={styles.pageTitle}>{titulos[seccionActiva]}</h1>
                    </div>
                    <div className={styles.topbarRight}>
                        <div className={styles.orgPill}>
                            <span className={styles.orgPillDot} />
                            Activo
                        </div>
                    </div>
                </header>

                <div className={styles.pageContent}>

                    {/* ══ RESUMEN ══ */}
                    {seccionActiva === "resumen" && !editando && (
                        <>
                            <div className={styles.perfilHeader}>
                                <div className={styles.perfilInfo}>
                                    <div className={styles.perfilNombre}>{organizacion.NombreOrganizacion}</div>
                                    <div className={styles.perfilMeta}>Organización registrada</div>
                                    <div className={styles.perfilTags}>
                                        <span className={styles.perfilTag}>{categoriaNombre}</span>
                                        <span className={styles.perfilTag}>{provinciaNombre}</span>
                                        <span className={styles.perfilTag}>{disponibilidadNombre}</span>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.datosGrid}>
                                <div className={styles.datoCard}>
                                    <div className={styles.datoLabel}>Categoría</div>
                                    <div className={styles.datoValue}>{categoriaNombre}</div>
                                </div>
                                <div className={styles.datoCard}>
                                    <div className={styles.datoLabel}>Provincia</div>
                                    <div className={styles.datoValue}>{provinciaNombre}</div>
                                </div>
                                <div className={styles.datoCard}>
                                    <div className={styles.datoLabel}>Disponibilidad</div>
                                    <div className={styles.datoValue}>{disponibilidadNombre}</div>
                                </div>
                            </div>

                            <div className={styles.descripcionCard}>
                                <div className={styles.descripcionLabel}>Descripción</div>
                                <div className={styles.descripcionTexto}>{organizacion.Descripcion}</div>
                            </div>
                        </>
                    )}

                    {/* ══ EDITAR ══ */}
                    {seccionActiva === "resumen" && editando && (
                        <div className={styles.formCard}>
                            <div className={styles.formTitulo}>Editar organización</div>
                            <div className={styles.formGrid}>
                                <div className={styles.formGroup}>
                                    <label>Nombre de la organización</label>
                                    <input
                                        type="text"
                                        value={nombreOrganizacion}
                                        onChange={(e) => setNombreOrganizacion(e.target.value)}
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Categoría</label>
                                    <select value={idCategoria} onChange={(e) => setIdCategoria(e.target.value)}>
                                        <option value="">Seleccionar categoría</option>
                                        <option value="1">Medio Ambiente</option>
                                        <option value="2">Educación</option>
                                        <option value="3">Salud</option>
                                        <option value="4">Bienestar Animal</option>
                                        <option value="5">Cultura</option>
                                    </select>
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Provincia</label>
                                    <select value={idProvincia} onChange={(e) => setIdProvincia(e.target.value)}>
                                        <option value="">Seleccionar provincia</option>
                                        <option value="1">San José</option>
                                        <option value="2">Alajuela</option>
                                        <option value="3">Cartago</option>
                                        <option value="4">Heredia</option>
                                        <option value="5">Guanacaste</option>
                                        <option value="6">Puntarenas</option>
                                        <option value="7">Limón</option>
                                    </select>
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Disponibilidad</label>
                                    <select value={idDisponibilidad} onChange={(e) => setIdDisponibilidad(e.target.value)}>
                                        <option value="">Seleccionar disponibilidad</option>
                                        <option value="1">Fines de semana</option>
                                        <option value="2">Por horas</option>
                                        <option value="3">Remoto</option>
                                        <option value="4">Entre semana</option>
                                    </select>
                                </div>
                                <div className={styles.formGroupFull}>
                                    <label>Descripción</label>
                                    <textarea
                                        value={descripcion}
                                        onChange={(e) => setDescripcion(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className={styles.formBotones}>
                                <button className={styles.btnCancelar} onClick={handleCancelar}>Cancelar</button>
                                <button className={styles.btnGuardar} onClick={handleGuardarCambios}>Guardar cambios</button>
                            </div>
                        </div>
                    )}

                    {/* ══ DASHBOARD ══ */}
                    {seccionActiva === "dashboard" && (
                        <>
                            {/* KPI cards */}
                            <div className={styles.dashStats}>
                                <div className={styles.dashStatCard} style={{'--acc':'#14b8a6','--acc-bg':'rgba(20,184,166,0.12)'}}>
                                    <div className={styles.dashStatTop}>
                                        <span className={styles.dashStatLabel}>Voluntarios</span>
                                        <span className={styles.dashStatIcon} style={{background:'rgba(20,184,166,0.12)'}}>👥</span>
                                    </div>
                                    <div className={styles.dashStatNum} style={{color:'#14b8a6'}}>{voluntarios.length}</div>
                                    <div className={styles.dashStatBar}><div style={{background:'#14b8a6',width:'100%'}}/></div>
                                </div>
                                <div className={styles.dashStatCard} style={{'--acc':'#f59e0b','--acc-bg':'rgba(245,158,11,0.12)'}}>
                                    <div className={styles.dashStatTop}>
                                        <span className={styles.dashStatLabel}>Horas totales</span>
                                        <span className={styles.dashStatIcon} style={{background:'rgba(245,158,11,0.12)'}}>⏱️</span>
                                    </div>
                                    <div className={styles.dashStatNum} style={{color:'#f59e0b'}}>{totalHoras()}</div>
                                    <div className={styles.dashStatBar}><div style={{background:'#f59e0b',width:'100%'}}/></div>
                                </div>
                                <div className={styles.dashStatCard} style={{'--acc':'#3b82f6','--acc-bg':'rgba(59,130,246,0.12)'}}>
                                    <div className={styles.dashStatTop}>
                                        <span className={styles.dashStatLabel}>Registros de horas</span>
                                        <span className={styles.dashStatIcon} style={{background:'rgba(59,130,246,0.12)'}}>📋</span>
                                    </div>
                                    <div className={styles.dashStatNum} style={{color:'#3b82f6'}}>{horas.length}</div>
                                    <div className={styles.dashStatBar}><div style={{background:'#3b82f6',width:'100%'}}/></div>
                                </div>
                                <div className={styles.dashStatCard} style={{'--acc':'#a855f7','--acc-bg':'rgba(168,85,247,0.12)'}}>
                                    <div className={styles.dashStatTop}>
                                        <span className={styles.dashStatLabel}>Prom. horas/voluntario</span>
                                        <span className={styles.dashStatIcon} style={{background:'rgba(168,85,247,0.12)'}}>📊</span>
                                    </div>
                                    <div className={styles.dashStatNum} style={{color:'#a855f7'}}>
                                        {voluntarios.length > 0 ? Math.round(totalHoras() / voluntarios.length) : 0}
                                    </div>
                                    <div className={styles.dashStatBar}><div style={{background:'#a855f7',width:'100%'}}/></div>
                                </div>
                            </div>

                            {/* Row 1: area horas + line solicitudes */}
                            <div className={styles.dashGrid2}>
                                <div className={styles.chartCard}>
                                    <h3 className={styles.chartTitle}>
                                        <span className={styles.chartDot} style={{background:'#f59e0b'}}/>
                                        Horas registradas por mes
                                    </h3>
                                    <ReactECharts option={optAreaHoras()} style={{height:230}} theme="dark" />
                                </div>
                                <div className={styles.chartCard}>
                                    <h3 className={styles.chartTitle}>
                                        <span className={styles.chartDot} style={{background:'#3b82f6'}}/>
                                        Solicitudes por mes
                                    </h3>
                                    <ReactECharts option={optLineSolicitudes()} style={{height:230}} theme="dark" />
                                </div>
                            </div>

                            {/* Row 2: bar voluntarios + donut actividades */}
                            <div className={styles.dashGrid2}>
                                <div className={styles.chartCard}>
                                    <h3 className={styles.chartTitle}>
                                        <span className={styles.chartDot} style={{background:'#14b8a6'}}/>
                                        Top voluntarios por horas
                                    </h3>
                                    <ReactECharts option={optBarVoluntarios()} style={{height:240}} theme="dark" />
                                </div>
                                <div className={styles.chartCard}>
                                    <h3 className={styles.chartTitle}>
                                        <span className={styles.chartDot} style={{background:'#a855f7'}}/>
                                        Actividades por voluntario
                                    </h3>
                                    {chartActividadesPorVoluntario().length > 0
                                        ? <ReactECharts option={optDonutActividades()} style={{height:240}} theme="dark" />
                                        : <div className={styles.chartEmpty}>Sin registros de horas aún</div>
                                    }
                                </div>
                            </div>
                        </>
                    )}

                    {/* ══ VOLUNTARIOS ══ */}
                    {seccionActiva === "voluntarios" && (
                        <>
                            <div className={styles.seccionTitulo}>Voluntarios que aplicaron</div>
                            <div className={styles.seccionSub}>
                                {voluntarios.length} voluntario{voluntarios.length !== 1 ? 's' : ''} en tu organización
                            </div>
                            {voluntarios.length > 0 ? (
                                <div className={styles.tablaWrap}>
                                    <table className={styles.tabla}>
                                        <thead>
                                            <tr>
                                                <th>Nombre</th>
                                                <th>Correo</th>
                                                <th>Fecha de aplicación</th>
                                                <th>Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {voluntarios.map((vol, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <div className={styles.tdUser}>
                                                            <div className={styles.avatarSm}>
                                                                {vol.Nombre?.charAt(0).toUpperCase()}
                                                            </div>
                                                            {vol.Nombre}
                                                        </div>
                                                    </td>
                                                    <td>{vol.Correo}</td>
                                                    <td>{vol.FechaAplicacion}</td>
                                                    <td>
                                                        <div className={styles.accionesBtns}>
                                                            <button className={styles.btnVerPerfil} onClick={() => setVoluntarioSeleccionado(vol)}>Ver perfil</button>
                                                            <button className={styles.btnRegistrarHoras} onClick={() => setVoluntarioParaHoras(vol)}>Registrar horas</button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className={styles.emptyState}>
                                    Aún no hay voluntarios que hayan aplicado a tu organización.
                                </div>
                            )}
                        </>
                    )}

                </div>
            </main>

            {voluntarioSeleccionado && (
                <ModalVoluntario
                    voluntario={voluntarioSeleccionado}
                    onCerrar={() => setVoluntarioSeleccionado(null)}
                />
            )}

            {voluntarioParaHoras && (
                <ModalRegistroHoras
                    voluntario={voluntarioParaHoras}
                    idOrganizacion={organizacion.id}
                    onCerrar={() => setVoluntarioParaHoras(null)}
                />
            )}
        </div>
    )
}

export default PerfilOrganizacion
