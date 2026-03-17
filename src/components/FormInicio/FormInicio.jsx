import { useState } from "react";
import styles from "./FormInicio.module.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ServiceUsuario from "../../services/ServiceUsuario";

export default function FormInicio() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const users = await ServiceUsuario.getUsuarios();
      const user = users.find(u => u.Correo === email && u.Contrasena === password);

      if (user) {
        Swal.fire({
          icon: 'success',
          title: `¡Bienvenido, ${user.Nombre}!`,
          text: 'Inicio de sesión exitoso',
          timer: 2000,
          showConfirmButton: false
        });
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/"); 
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
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>Iniciar sesión</h2>
        <p className={styles.sub}>Bienvenido de nuevo</p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label>Correo electrónico</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />

          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Cargando..." : "Iniciar sesión →"}
          </button>
        </form>

        <p className={styles.register}>
          ¿No tiene una cuenta? <Link to="/registro"><span>Regístrese</span></Link>
        </p>
      </div>
    </div>
  );
}
