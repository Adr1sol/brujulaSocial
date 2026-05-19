require('dotenv').config();
const app = require('./app');
const { sequelize } = require('./models');

const PORT = process.env.PORT || 3001; // Usamos 3001 para no chocar con el puerto por defecto de React

// Sincronización con la base de datos antes de iniciar el servidor
// alter: true actualiza las tablas existentes con los nuevos alias y relaciones sin borrar los datos
sequelize.sync({ alter: true })
    .then(() => {
        console.log(`==========================================`);
        console.log(` ✅ Base de datos sincronizada correctamente`);
        app.listen(PORT, () => {
            console.log(` 🚀 Servidor corriendo en: http://localhost:${PORT}`);
            console.log(`==========================================`);
        });
    })
    .catch(err => {
        console.error(`==========================================`);
        console.error(` ❌ Error crítico al sincronizar la base de datos:`);
        console.error(err);
        console.error(`==========================================`);
    });