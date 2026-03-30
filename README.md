# 🧭 Brújula Social

Plataforma web que conecta voluntarios con organizaciones de impacto social en Costa Rica. Permite a los usuarios explorar causas, aplicar a voluntariados, registrar horas y hacer seguimiento de su impacto.

---

## Tabla de contenidos

- [Descripción](#descripción)
- [Tecnologías](#tecnologías)
- [Requisitos previos](#requisitos-previos)
- [Instalación y uso](#instalación-y-uso)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Rutas](#rutas)
- [Roles de usuario](#roles-de-usuario)

---

## Descripción

Brújula Social es una plataforma construida con React y Vite. Usa JSON Server como backend simulado para el desarrollo. La plataforma tiene tres tipos de usuario: **voluntario**, **organización** y **administrador**, cada uno con su propio panel y flujo.

---

## Tecnologías

| Categoría | Tecnología |
|---|---|
| Framework | React + Vite |
| Routing | React Router DOM 7 |
| UI | Material-UI 7, Bootstrap 5, Styled Components |
| Gráficos | ECharts (echarts-for-react), Recharts |
| Alertas | SweetAlert2 |
| Email | EmailJS |
| Iconos | React Icons, MUI Icons |
| Backend (dev) | JSON Server |
| Estilos | CSS Modules + variables globales en `index.css` |

---

## Requisitos previos

- Node.js 18 o superior
- npm 9 o superior

---

## Instalación y uso

```bash
# 1. Clonar el repositorio
git clone https://github.com/Adr1sol/brujulaSocial.git
cd brujulaSocial

# 2. Instalar dependencias
npm install

# 3. Iniciar frontend y backend en paralelo
npm run dev:all
```

La aplicación estará disponible en `http://localhost:5173`
El servidor JSON corre en `http://localhost:3001`

---

## Estructura del proyecto

```
src/
├── assets/              # Imágenes y recursos estáticos
├── components/          # Componentes reutilizables
│   ├── AboutUs/
│   ├── Buscador/        # Buscador de organizaciones (modo privado)
│   ├── BuscadorPublico/ # Buscador público sin login
│   ├── Carrusel/
│   ├── Filtros/         # Filtros de organizaciones
│   ├── Footer/
│   ├── FormInicio/
│   ├── FormRegistro/
│   ├── Hero/
│   ├── MiOrganizacion/  # Panel de organización
│   ├── NavbarGlobal/
│   ├── PanelAdmin/      # Panel de administración con dashboards
│   ├── PerfilVoluntario/# Perfil y dashboards del voluntario
│   ├── ProyectosDestacados/
│   ├── RegistroOrganizacion/
│   ├── TerminosCondiciones/
│   └── Testimonials/
├── images/              # Imágenes del proyecto
├── pages/               # Páginas (solo re-exportan componentes)
├── routes/
│   └── Routing.jsx      # Configuración de rutas
└── services/            # Llamadas a la API (JSON Server)
    ├── ServiceCategorias.jsx
    ├── ServiceDisponibilidades.jsx
    ├── ServiceHoras.jsx
    ├── ServiceOrganizaciones.jsx
    ├── ServiceProvincias.jsx
    ├── ServiceUsuario.jsx
    └── ServiceVoluntariado.jsx
```

---

## Rutas

| Ruta | Descripción | Acceso |
|---|---|---|
| `/` | Página de inicio | Público |
| `/explorar` | Buscador público de organizaciones | Público |
| `/inicio` | Inicio de sesión | Público |
| `/registro` | Registro de voluntario | Público |
| `/terminos` | Términos y condiciones | Público |
| `/Donacion` | Página de donaciones | Público |
| `/perfil` | Perfil del voluntario con dashboards | Voluntario |
| `/buscador` | Buscador de organizaciones | Voluntario |
| `/impacto` | Dashboard de impacto social | Voluntario |
| `/miOrganizacion` | Panel de la organización | Organización |
| `/register` | Registro de organización | Organización |
| `/panel` | Panel de administración | Administrador |

---

## Roles de usuario

### Voluntario
- Explorar y aplicar a organizaciones
- Ver historial de participación e insignias

### Organización
- Gestionar el perfil de la organización
- Ver voluntarios inscritos
- Registrar horas por voluntario
- Acceder a dashboards de actividad

### Administrador
- Gestionar usuarios y organizaciones (CRUD)
- Ver dashboards globales de la plataforma
- Administrar registros de horas y solicitudes


