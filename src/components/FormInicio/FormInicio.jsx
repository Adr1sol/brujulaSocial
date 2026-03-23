import { useState } from "react";
import styles from "./FormInicio.module.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ServiceUsuario from "../../services/ServiceUsuario";

export default function FormInicio() {
  const [tipo, setTipo] = useState("voluntario");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Campos vacíos',
        text: 'Por favor, completa todos los campos para continuar.',
        confirmButtonColor: '#EF8514'
      });
      return;
    }

    if (password.length < 6) {
      Swal.fire({
        icon: 'error',
        title: 'Contraseña corta',
        text: 'La contraseña debe tener al menos 6 caracteres.',
        confirmButtonColor: '#EF8514'
      });
      return;
    }

    setLoading(true);

    try {
      const users = await ServiceUsuario.getUsuarios();
      const user = users.find(u => u.Correo === email && u.Contrasena === password && u.Tipo === tipo);

      if (user) {
        localStorage.setItem("user", JSON.stringify(user));

        Swal.fire({
          icon: 'success',
          title: `¡Hola, ${user.Nombre}!`,
          text: 'Inicio de sesión exitoso',
          timer: 2000,
          showConfirmButton: false
        }).then(() => {
          // ── Redirigir según el tipo ──
          if (user.Tipo === "admin") {
            navigate("/panel")
          } else if (localStorage.getItem("miOrganizacion")) {
            navigate("/miOrganizacion")
          } else {
            navigate("/buscador")
          }
        });

      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Correo o contraseña incorrectos.',
          confirmButtonColor: '#078A87'
        });
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error de conexión',
        text: 'Hubo un error al conectar con el servidor.',
        confirmButtonColor: '#078A87'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.visualSide}>
        <div className={styles.overlay}></div>
        <div className={styles.branding}>
          <h1>Brújula Social</h1>
          <p>Conectando voluntarios con oportunidades que importan.</p>
        </div>
      </div>
      <div className={styles.formSide}>
        <div className={styles.card}>
          <div className={styles.header}>
            <h2>Iniciar sesión</h2>
            <p className={styles.sub}>Bienvenido de nuevo. Por favor, introduce tus datos.</p>
          </div>

          <div className={styles.accountTypeHeader}>
            <p className={styles.tipo}>Tipo de cuenta</p>
          </div>
          
          <div className={styles.selector}>
            <div
              className={`${styles.opcion} ${tipo === "voluntario" ? styles.activo : ""}`}
              onClick={() => setTipo("voluntario")}
            >
              <h4>Voluntario</h4>
            </div>
            <div
              className={`${styles.opcion} ${tipo === "org" ? styles.activo : ""}`}
              onClick={() => setTipo("org")}
            >
              <h4>Organización</h4>
            </div>
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
              {loading ? "Iniciando sesión..." : "Iniciar sesión"}
            </button>
          </form>

          <p className={styles.register}>
            ¿No tienes una cuenta? <Link to="/registro"><span>Regístrate aquí</span></Link>
          </p>
        </div>
      </div>
    </div>
  );
}