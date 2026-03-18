import styles from "./Formregistro.module.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ServiceUsuario from "../../services/ServiceUsuario";

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

    const { nombre, apellido, tel, email, password, confirmPassword } = formData;
    if (!nombre.trim() || !apellido.trim() || !tel.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Formulario incompleto',
        text: 'Todos los campos son obligatorios. Por favor, revísalos.',
        confirmButtonColor: '#EF8514'
      });
      return;
    }

    if (formData.password.length < 6) {
      Swal.fire({
        icon: 'error',
        title: 'Contraseña débil',
        text: 'La contraseña debe tener al menos 6 caracteres.',
        confirmButtonColor: '#EF8514'
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Error de coincidencia',
        text: 'Las contraseñas ingresadas no coinciden.',
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
      const response = await ServiceUsuario.postRegistro(newUser);

      if (response) {
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
            onClick={() => navigate("/register")}
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
              value={formData.nombre}
              onChange={handleChange}
            />
            <input 
              name="apellido" 
              type="text" 
              placeholder="Apellido" 
              value={formData.apellido}
              onChange={handleChange}
            />
          </div>
          <input 
            name="tel" 
            type="tel" 
            placeholder="Número de teléfono" 
            value={formData.tel}
            onChange={handleChange}
          />
          <input 
            name="email" 
            type="email" 
            placeholder="Correo electrónico" 
            value={formData.email}
            onChange={handleChange}
          />
          <div className={styles.row}>
            <input 
              name="password" 
              type="password" 
              placeholder="Contraseña" 
              value={formData.password}
              onChange={handleChange}
            />
            <input 
              name="confirmPassword" 
              type="password" 
              placeholder="Confirmar contraseña" 
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
