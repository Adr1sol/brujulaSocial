import styles from "./Formregistro.module.css"
import { useState } from "react"
import { Link } from "react-router-dom"

function Formregistro(){

const [tipo,setTipo] = useState("voluntario")

return(

<div className={styles.fondo}>

<img src="/logo.png" alt="Logo" className={styles.logo} />

<div className={styles.card}>

<h2>Únete a Brújula Social</h2>
<p className={styles.sub}>
Crea tu cuenta para empezar a mejorar el mundo
</p>

<p className={styles.tipo}>Tipo de cuenta</p>

<div className={styles.selector}>

<div
className={`${styles.opcion} ${tipo==="voluntario" ? styles.activo : ""}`}
onClick={()=>setTipo("voluntario")}
>

<h4>Voluntario</h4>
</div>

<div
className={`${styles.opcion} ${tipo==="org" ? styles.activo : ""}`}
onClick={()=>setTipo("org")}
>

<h4>Organización</h4>

</div>

</div>

<form className={styles.form}>

<div className={styles.row}>
<input type="text" placeholder="nombre"/>
<input type="text" placeholder="apellido"/>
</div>

<input type="tel" placeholder="000-000"/>

<input type="email" placeholder="correo electrónico"/>

<div className={styles.row}>
<input type="password" placeholder="Contraseña"/>
<input type="password" placeholder="Confirmar contraseña"/>
</div>

<button>Registrarse</button>

</form>

<p className={styles.login}>
¿Ya tienes una cuenta? <Link to="/"><span>Inicia sesión</span></Link>
</p>

</div>

</div>

)

}

export default Formregistro