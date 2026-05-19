/**
 * Pruebas de integración — endpoints principales
 * Usa supertest para hacer peticiones HTTP reales al servidor
 */

const request = require('supertest');
const app = require('../../src/app');

// Mock completo de modelos para no necesitar DB
jest.mock('../../src/models', () => {
  const rolMock = { id: 2, nombre: 'Voluntario' };
  const usuarioMock = {
    id: 1,
    Nombre: 'Juan Test',
    Correo: 'juan@test.com',
    Contrasena: '$2b$10$hashedpassword',
    idRol: 2,
    rol: rolMock
  };
  const orgMock = {
    id: 1,
    NombreOrganizacion: 'EcoVoluntarios CR',
    Descripcion: 'Organización ambiental',
    idCategoria: 1,
    update: jest.fn(),
    destroy: jest.fn()
  };

  return {
    sequelize: {
      authenticate: jest.fn().mockResolvedValue(true),
      sync: jest.fn().mockResolvedValue(true)
    },
    Rol: {
      findByPk: jest.fn().mockResolvedValue(rolMock),
      hasMany: jest.fn()
    },
    Usuario: {
      findOne: jest.fn().mockResolvedValue(null),
      findByPk: jest.fn().mockResolvedValue({ ...usuarioMock, rol: rolMock }),
      create: jest.fn().mockResolvedValue(usuarioMock),
      findAll: jest.fn().mockResolvedValue([usuarioMock])
    },
    Organizacion: {
      findAndCountAll: jest.fn().mockResolvedValue({ count: 1, rows: [orgMock] }),
      findByPk: jest.fn().mockResolvedValue(orgMock),
      create: jest.fn().mockResolvedValue(orgMock)
    },
    Provincia:      { findByPk: jest.fn() },
    Categoria:      { findByPk: jest.fn() },
    Disponibilidad: { findByPk: jest.fn() },
    Aplicacion:     { findAndCountAll: jest.fn(), findByPk: jest.fn(), findOne: jest.fn(), create: jest.fn() },
    Horas:          { findAndCountAll: jest.fn(), findByPk: jest.fn(), create: jest.fn() }
  };
});

// ============================================================
// AUTH
// ============================================================
describe('POST /api/v1/auth/register', () => {
  test('✅ 201 — Registro exitoso', async () => {
    const res = await request(app)
      .post('/api/v1/auth/register')
      .send({ Nombre: 'Juan', Correo: 'juan@test.com', Contrasena: '123456', idRol: 2 });

    expect(res.statusCode).toBe(201);
    expect(res.body.ok).toBe(true);
  });

  test('❌ 400 — Falta contraseña', async () => {
    const res = await request(app)
      .post('/api/v1/auth/register')
      .send({ Nombre: 'Juan', Correo: 'juan@test.com', idRol: 2 });

    expect(res.statusCode).toBe(400);
    expect(res.body.ok).toBe(false);
  });
});

describe('POST /api/v1/auth/login', () => {
  test('❌ 401 — Credenciales incorrectas', async () => {
    const { Usuario } = require('../../src/models');
    Usuario.findOne.mockResolvedValueOnce(null);

    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({ Correo: 'noexiste@test.com', Contrasena: '123456' });

    expect(res.statusCode).toBe(401);
    expect(res.body.ok).toBe(false);
  });
});

// ============================================================
// ORGANIZACIONES
// ============================================================
describe('GET /api/v1/organizaciones', () => {
  test('✅ 200 — Lista organizaciones públicamente', async () => {
    const res = await request(app).get('/api/v1/organizaciones');

    expect(res.statusCode).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(res.body).toHaveProperty('organizaciones');
  });
});

describe('GET /api/v1/organizaciones/:id', () => {
  test('✅ 200 — Retorna organización por ID', async () => {
    const res = await request(app).get('/api/v1/organizaciones/1');

    expect(res.statusCode).toBe(200);
    expect(res.body.ok).toBe(true);
    expect(res.body).toHaveProperty('organizacion');
  });

  test('❌ 404 — Organización no encontrada', async () => {
    const { Organizacion } = require('../../src/models');
    Organizacion.findByPk.mockResolvedValueOnce(null);

    const res = await request(app).get('/api/v1/organizaciones/999');
    expect(res.statusCode).toBe(404);
  });
});

describe('POST /api/v1/organizaciones', () => {
  test('❌ 401 — Sin token no puede crear organización', async () => {
    const res = await request(app)
      .post('/api/v1/organizaciones')
      .send({ Nombre: 'Nueva Org' });

    expect(res.statusCode).toBe(401);
  });
});

// ============================================================
// RUTAS INEXISTENTES
// ============================================================
describe('Ruta no encontrada', () => {
  test('❌ 404 — Ruta inexistente retorna 404', async () => {
    const res = await request(app).get('/api/v1/ruta-que-no-existe');
    expect(res.statusCode).toBe(404);
    expect(res.body.ok).toBe(false);
  });
});
