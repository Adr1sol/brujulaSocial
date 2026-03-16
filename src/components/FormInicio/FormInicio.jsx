import styles from "./FormInicio.module.css";
import { Link } from "react-router-dom";

export default function FormInicio() {
  return (
    <div className={styles.container}>

      <img src="/logo.png" alt="Logo" className={styles.logo} />

      <div className={styles.card}>

        <h2>Iniciar sesión</h2>
        <p className={styles.sub}>Bienvenido de nuevo</p>

        <form className={styles.form}>

          <label>Correo electrónico</label>
          <input
            type="email"
            placeholder="email"
          />

          <label>password</label>
          <input
            type="password"
            placeholder="********"
          />

          <button type="submit">
            Iniciar sesión →
          </button>

        </form>

        <p className={styles.register}>
          ¿No tienes una cuenta? <Link to="/registro"><span>Regístrate</span></Link>
        </p>

      </div>

    </div>
  );
}