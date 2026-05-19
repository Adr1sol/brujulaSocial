const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Brújula Social API',
      version: '1.0.0',
      description: 'API RESTful para la plataforma de voluntariado Brújula Social. Conecta voluntarios con organizaciones.'
    },
    servers: [
      { url: 'http://localhost:3001/api/v1', description: 'Servidor local' }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        // --- AUTH ---
        RegisterInput: {
          type: 'object',
          required: ['Nombre', 'Correo', 'Contrasena', 'idRol'],
          properties: {
            Nombre:     { type: 'string', example: 'Juan Pérez' },
            Correo:     { type: 'string', example: 'juan@test.com' },
            Contrasena: { type: 'string', example: '123456' },
            idRol:      { type: 'integer', example: 2, description: '1=Admin, 2=Voluntario, 3=Organizacion' },
            IdProvincia:{ type: 'integer', example: 1 }
          }
        },
        LoginInput: {
          type: 'object',
          required: ['Correo', 'Contrasena'],
          properties: {
            Correo:     { type: 'string', example: 'juan@test.com' },
            Contrasena: { type: 'string', example: '123456' }
          }
        },
        // --- ORGANIZACION ---
        OrganizacionInput: {
          type: 'object',
          required: ['Nombre'],
          properties: {
            Nombre:           { type: 'string', example: 'EcoVoluntarios CR' },
            Descripcion:      { type: 'string', example: 'Organización ambiental' },
            Contacto:         { type: 'string', example: 'contacto@eco.org' },
            idCategoria:      { type: 'integer', example: 1 },
            IdProvincia:      { type: 'integer', example: 2 },
            idDisponibilidad: { type: 'integer', example: 1 },
            ImagenUrl:        { type: 'string', example: 'https://imagen.com/foto.jpg' }
          }
        },
        // --- APLICACION ---
        AplicacionInput: {
          type: 'object',
          required: ['idOrganizacion'],
          properties: {
            idOrganizacion: { type: 'integer', example: 1 }
          }
        },
        // --- HORAS ---
        HorasInput: {
          type: 'object',
          required: ['idOrganizacion', 'actividad', 'horas'],
          properties: {
            idOrganizacion: { type: 'integer', example: 1 },
            actividad:      { type: 'string', example: 'Limpieza de playa' },
            fecha:          { type: 'string', format: 'date', example: '2026-05-14' },
            horas:          { type: 'integer', example: 4 }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.js']
};

const swaggerSpec = swaggerJsdoc(options);

/**
 * Configura Swagger en la aplicación Express.
 * Accesible en: /api/docs
 */
const setupSwagger = (app) => {
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customSiteTitle: 'Brújula Social API Docs',
    customCss: '.swagger-ui .topbar { background-color: #1a1a2e; }'
  }));

  // Endpoint para obtener el JSON de la especificación
  app.get('/api/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  console.log('📚 Swagger disponible en: http://localhost:3001/api/docs');
};

module.exports = setupSwagger;
