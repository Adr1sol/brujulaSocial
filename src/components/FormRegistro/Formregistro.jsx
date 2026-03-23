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

    if (password.length < 6) {
      Swal.fire({
        icon: 'error',
        title: 'Contraseña débil',
        text: 'La contraseña debe tener al menos 6 caracteres.',
        confirmButtonColor: '#EF8514'
      });
      return;
    }

    if (password !== confirmPassword) {
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
      const response = await ServiceUsuario.postUsuario(newUser);

      if (response) {
        // ── Guardar en localStorage y redirigir ──
        localStorage.setItem("user", JSON.stringify(response));

        Swal.fire({
          icon: 'success',
          title: '¡Cuenta creada!',
          text: 'Se ha registrado con éxito.',
          timer: 2000,
          showConfirmButton: false
        }).then(() => {
          navigate("/buscador")
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
    <div className={styles.wrapper}>
      <div className={styles.visualSide}>
        <div className={styles.overlay}></div>
        <div className={styles.branding}>
          <h1>Únete a nosotros</h1>
          <p>Crea tu cuenta para empezar a mejorar el mundo a través del voluntariado.</p>
        </div>
      </div>
      <div className={styles.formSide}>
        <div className={styles.card}>
          <div className={styles.header}>
            <h2>Crear cuenta</h2>
            <p className={styles.sub}>Completa tus datos para formar parte de la comunidad.</p>
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
              onClick={() => navigate("/register")}
            >
              <h4>Organización</h4>
            </div>
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <label>Nombre</label>
                <input 
                  name="nombre" 
                  type="text" 
                  placeholder="Nombre" 
                  value={formData.nombre}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Apellido</label>
                <input 
                  name="apellido" 
                  type="text" 
                  placeholder="Apellido" 
                  value={formData.apellido}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label>Teléfono</label>
              <input 
                name="tel" 
                type="tel" 
                placeholder="+506 0000-0000" 
                value={formData.tel}
                onChange={handleChange}
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Correo electrónico</label>
              <input 
                name="email" 
                type="email" 
                placeholder="ejemplo@correo.com" 
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <label>Contraseña</label>
                <input 
                  name="password" 
                  type="password" 
                  placeholder="••••••••" 
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.inputGroup}>
                <label>Confirmar</label>
                <input 
                  name="confirmPassword" 
                  type="password" 
                  placeholder="••••••••" 
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? "Creando cuenta..." : "Registrarse"}
            </button>
          </form>

          <p className={styles.login}>
            ¿Ya tienes una cuenta? <Link to="/inicio"><span>Inicia sesión aquí</span></Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Formregistro;