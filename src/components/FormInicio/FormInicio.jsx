import { useState } from "react";
import styles from "./FormInicio.module.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ServiceUsuario from "../../services/ServiceUsuario";

export default function FormInicio() {
  const [email, setEmail]           = useState("");
  const [password, setPassword]     = useState("");
  const [loading, setLoading]       = useState(false);
  const [tipoCuenta, setTipoCuenta] = useState("voluntario");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      Swal.fire({ icon: 'error', title: 'Campos vacíos', text: 'Por favor, completa todos los campos.', confirmButtonColor: '#EF8514' });
      return;
    }
    if (password.length < 6) {
      Swal.fire({ icon: 'error', title: 'Contraseña corta', text: 'La contraseña debe tener al menos 6 caracteres.', confirmButtonColor: '#EF8514' });
      return;
    }

    setLoading(true);
    try {
      const users = await ServiceUsuario.getUsuarios();

      const user = users.find(u =>
        u.Correo === email &&
        u.Contrasena === password &&
        (tipoCuenta === "voluntario"
          ? (u.Tipo === "voluntario" || u.Tipo === "admin" || !u.Tipo)
          : u.Tipo === "organizacion"
        )
      );

      if (user) {
        localStorage.setItem("user", JSON.stringify(user));

        Swal.fire({
          icon: 'success',
          title: `¡Hola, ${user.Nombre}!`,
          text: 'Inicio de sesión exitoso',
          timer: 2000,
          showConfirmButton: false
        }).then(() => {
          if (user.Tipo === "admin")             navigate("/panel");
          else if (user.Tipo === "organizacion") navigate("/miOrganizacion");
          else                                   navigate("/buscador");
        });

      } else {
        const existeUsuario = users.find(u => u.Correo === email && u.Contrasena === password);
        if (existeUsuario) {
          Swal.fire({
            icon: 'warning',
            title: 'Tipo de cuenta incorrecto',
            text: `Este correo está registrado como ${existeUsuario.Tipo === "organizacion" ? "Organización" : "Voluntario"}. Por favor selecciona el tipo correcto.`,
            confirmButtonColor: '#078A87'
          });
        } else {
          Swal.fire({ icon: 'error', title: 'Credenciales incorrectas', text: 'Correo o contraseña incorrectos.', confirmButtonColor: '#078A87' });
        }
      }
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Error de conexión', text: 'Hubo un error al conectar con el servidor.', confirmButtonColor: '#078A87' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>

      {/* ── Lado visual ── */}
      <div className={styles.visualSide}>
        <div className={styles.branding}>
          <h1>Brújula Social</h1>
          <p>Conectando voluntarios con oportunidades que importan.</p>
        </div>
      </div>

      {/* ── Lado formulario ── */}
      <div className={styles.formSide}>
        <div className={styles.card}>

          <Link to="/" className={styles.backLink}>← Volver al inicio</Link>

          <div className={styles.header}>
            <h2>Iniciar sesión</h2>
            <p className={styles.sub}>Bienvenido de nuevo. Por favor, introduce tus datos.</p>
          </div>

          {/* Selector tipo de cuenta */}
          <div className={styles.accountTypeHeader}>
            <p className={styles.tipo}>TIPO DE CUENTA</p>
          </div>
          <div className={styles.selector}>

            {/* ✅ Voluntario — activo por defecto */}
            <div
              className={`${styles.opcion} ${tipoCuenta === "voluntario" ? styles.activo : ""}`}
              onClick={() => setTipoCuenta("voluntario")}
            >
              <h4>Voluntario</h4>
            </div>

            {/* ✅ Organización — redirige a /register para registrarse
                o muestra el form si ya tiene cuenta (futuro) */}
            <div
              className={`${styles.opcion} ${tipoCuenta === "organizacion" ? styles.activo : ""}`}
              onClick={() => {
                setTipoCuenta("organizacion")
                // Si no hay sesión activa, no hacer nada más —
                // el usuario puede ingresar sus credenciales de org
              }}
            >
              <h4>Organización</h4>
            </div>

          </div>

          <div className={styles.hintBox}>
            {tipoCuenta === "organizacion" && (
              <p className={styles.orgHint}>
                ¿Aún no tienes una cuenta de organización?{" "}
                <span
                  className={styles.orgHintLink}
                  onClick={() => navigate("/register")}
                >
                  Regístrala aquí →
                </span>
              </p>
            )}
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label>Correo electrónico</label>
              <input
                type="email"
                placeholder="ejemplo@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Contraseña</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? "Cargando..." : "Iniciar sesión"}
            </button>
          </form>

          <p className={styles.register}>
            ¿No tienes una cuenta?{" "}
            <Link to="/registro"><span>Regístrate aquí</span></Link>
          </p>

        </div>
      </div>
    </div>
  );
}