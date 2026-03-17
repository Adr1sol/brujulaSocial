import styles from "./Formregistro.module.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Formregistro() {
  const [tipo, setTipo] = useState("voluntario");
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    tel: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      Swal.fire({
        icon: 'warning',
        title: 'Contraseñas no coinciden',
        text: 'Por favor verifica que ambas contraseñas sean iguales.',
        confirmButtonColor: '#EF8514'
      });
      return;
    }

    setLoading(true);

    const newUser = {
      Nombre: `${formData.nombre} ${formData.apellido}`,
      Correo: formData.email,
      Contrasena: formData.password,
      Telefono: formData.tel,
      Tipo: tipo,
      IdProvincia: 1,
      FechaRegistro: new Date().toISOString().split('T')[0]
    };

    try {
      const response = await fetch("http://localhost:3001/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: '¡Cuenta creada!',
          text: 'Se ha registrado con éxito. Ahora puede iniciar sesión.',
          confirmButtonColor: '#078A87'
        }).then(() => {
          navigate("/login");
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error al registrar',
          text: 'No se pudo crear la cuenta. Inténtelo de nuevo.',
          confirmButtonColor: '#078A87'
        });
      }
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error de servidor',
        text: 'No se pudo conectar con el servidor en este momento.',
        confirmButtonColor: '#078A87'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.fondo}>
      <div className={styles.card}>
        <h2>Únete a Brújula Social</h2>
        <p className={styles.sub}>Crea tu cuenta para empezar a mejorar el mundo</p>

        <p className={styles.tipo}>Tipo de cuenta</p>
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
          <div className={styles.row}>
            <input 
              name="nombre" 
              type="text" 
              placeholder="Nombre" 
              required 
              value={formData.nombre}
              onChange={handleChange}
            />
            <input 
              name="apellido" 
              type="text" 
              placeholder="Apellido" 
              required 
              value={formData.apellido}
              onChange={handleChange}
            />
          </div>
          <input 
            name="tel" 
            type="tel" 
            placeholder="Número de teléfono" 
            required 
            value={formData.tel}
            onChange={handleChange}
          />
          <input 
            name="email" 
            type="email" 
            placeholder="Correo electrónico" 
            required 
            value={formData.email}
            onChange={handleChange}
          />
          <div className={styles.row}>
            <input 
              name="password" 
              type="password" 
              placeholder="Contraseña" 
              required 
              value={formData.password}
              onChange={handleChange}
            />
            <input 
              name="confirmPassword" 
              type="password" 
              placeholder="Confirmar contraseña" 
              required 
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Registrando..." : "Registrarse"}
          </button>
        </form>

        <p className={styles.login}>
          ¿Ya tiene una cuenta? <Link to="/login"><span>Inicie sesión aquí</span></Link>
        </p>
      </div>
    </div>
  );
}

export default Formregistro;