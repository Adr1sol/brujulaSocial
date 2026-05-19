const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { sequelize } = require('./models');
const setupSwagger = require('./config/swagger');

// Importar Rutas
const authRoutes           = require('./routes/authRoutes');
const usuarioRoutes        = require('./routes/usuarioRoutes');
const organizacionRoutes   = require('./routes/organizacionRoutes');
const aplicacionRoutes     = require('./routes/aplicacionRoutes');
const horasRoutes          = require('./routes/horasRoutes');
const categoriaRoutes      = require('./routes/categoriaRoutes');
const provinciaRoutes      = require('./routes/provinciaRoutes');
const disponibilidadRoutes = require('./routes/disponibilidadRoutes');

const app = express();

// --- MIDDLEWARES ---

// CORS con credentials para permitir cookies entre frontend y backend
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true  // Necesario para que el browser envíe las cookies
}));

// Cookie parser — necesario para leer req.cookies
app.use(cookieParser());

// Middleware para parsear JSON en el cuerpo de las peticiones
app.use(express.json());

// --- DEFINICIÓN DE RUTAS ---
const BASE = '/api/v1';

// --- SWAGGER (debe ir antes del 404) ---
setupSwagger(app);

app.use(BASE + '/auth',             authRoutes);
app.use(BASE + '/usuarios',         usuarioRoutes);
app.use(BASE + '/organizaciones',   organizacionRoutes);
app.use(BASE + '/aplicaciones',     aplicacionRoutes);
app.use(BASE + '/horas',            horasRoutes);
app.use(BASE + '/categorias',       categoriaRoutes);
app.use(BASE + '/provincias',       provinciaRoutes);
app.use(BASE + '/disponibilidades', disponibilidadRoutes);

// Middleware para manejar rutas no encontradas (404)
app.use((req, res, next) => {
    res.status(404).json({
        ok: false,
        msg: 'Ruta no encontrada'
    });
});

// --- BASE DE DATOS ---

// Probar conexión a la DB
sequelize.authenticate()
    .then(() => {
        console.log('✅ Conexión a MySQL establecida correctamente.');
    })
    .catch(err => {
        console.error('❌ No se pudo conectar a la base de datos:', err);
    });

module.exports = app;