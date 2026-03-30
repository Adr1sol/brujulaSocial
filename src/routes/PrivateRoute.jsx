import { Navigate } from "react-router-dom";

/**
 * PrivateRoute — protege rutas según autenticación y rol.
 *
 * Props:
 *   children  — componente a renderizar si pasa la guarda
 *   roles     — array de Tipo permitidos, ej. ["admin"] o ["voluntario", "admin"]
 *               Si se omite, solo verifica que haya sesión activa.
 *   redirectTo — ruta a la que redirige si no cumple la condición (default "/inicio")
 */
export default function PrivateRoute({ children, roles, redirectTo = "/inicio" }) {
  const raw = localStorage.getItem("user");

  // Sin sesión → al login
  if (!raw) return <Navigate to={redirectTo} replace />;

  let user;
  try {
    user = JSON.parse(raw);
  } catch {
    localStorage.removeItem("user");
    return <Navigate to={redirectTo} replace />;
  }

  // Con roles definidos → verificar Tipo
  if (roles && !roles.includes(user.Tipo)) {
    // Redirigir a su página correspondiente según tipo
    if (user.Tipo === "admin")             return <Navigate to="/panel"           replace />;
    if (user.Tipo === "organizacion")      return <Navigate to="/miOrganizacion"  replace />;
    return <Navigate to="/buscador" replace />;
  }

  return children;
}
