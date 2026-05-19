/**
 * Pruebas unitarias — authService
 * Cubre: login, registro, validaciones
 */

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Mock de los modelos para no necesitar DB real
jest.mock('../../src/models', () => ({
  Usuario: {
    findOne: jest.fn(),
    findByPk: jest.fn(),
    create: jest.fn()
  },
  Rol: {
    findByPk: jest.fn()
  }
}));

const { Usuario, Rol } = require('../../src/models');
const authService = require('../../src/services/authService');

// --- Variables de prueba ---
const rolMock = { id: 2, nombre: 'Voluntario' };
const usuarioMock = {
  id: 1,
  Nombre: 'Juan Pérez',
  Correo: 'juan@test.com',
  Contrasena: bcrypt.hashSync('123456', 10),
  idRol: 2,
  rol: rolMock
};

describe('authService — login', () => {
  beforeEach(() => jest.clearAllMocks());

  test('✅ Login exitoso con credenciales correctas', async () => {
    Usuario.findOne.mockResolvedValue(usuarioMock);
    process.env.JWT_SECRET = 'test_secret';

    const resultado = await authService.login('juan@test.com', '123456');

    expect(resultado).toHaveProperty('token');
    expect(resultado).toHaveProperty('usuario');
    expect(resultado.usuario.Correo).toBe('juan@test.com');
  });

  test('❌ Login falla si el usuario no existe', async () => {
    Usuario.findOne.mockResolvedValue(null);

    await expect(authService.login('noexiste@test.com', '123456'))
      .rejects.toThrow('Credenciales incorrectas');
  });

  test('❌ Login falla si la contraseña es incorrecta', async () => {
    Usuario.findOne.mockResolvedValue(usuarioMock);

    await expect(authService.login('juan@test.com', 'wrongpassword'))
      .rejects.toThrow('Credenciales incorrectas');
  });
});

describe('authService — registrar', () => {
  beforeEach(() => jest.clearAllMocks());

  test('✅ Registro exitoso con datos válidos', async () => {
    Rol.findByPk.mockResolvedValue(rolMock);
    Usuario.findOne.mockResolvedValue(null); // Correo no existe
    Usuario.create.mockResolvedValue({ id: 8, ...usuarioMock });
    Usuario.findByPk.mockResolvedValue({ ...usuarioMock, rol: rolMock });

    const resultado = await authService.registrar({
      Nombre: 'Juan Pérez',
      Correo: 'juan@test.com',
      Contrasena: '123456',
      idRol: 2
    });

    expect(resultado).toHaveProperty('id');
  });

  test('❌ Registro falla si falta la contraseña', async () => {
    await expect(authService.registrar({
      Nombre: 'Juan',
      Correo: 'juan@test.com',
      idRol: 2
    })).rejects.toThrow('La propiedad "Contrasena" es requerida');
  });

  test('❌ Registro falla si falta el idRol', async () => {
    await expect(authService.registrar({
      Nombre: 'Juan',
      Correo: 'juan@test.com',
      Contrasena: '123456'
    })).rejects.toThrow('El campo "idRol" es requerido');
  });

  test('❌ Registro falla si el rol no existe', async () => {
    Rol.findByPk.mockResolvedValue(null);

    await expect(authService.registrar({
      Nombre: 'Juan',
      Correo: 'juan@test.com',
      Contrasena: '123456',
      idRol: 99
    })).rejects.toThrow('El rol especificado no existe');
  });

  test('❌ Registro falla si el correo ya está registrado', async () => {
    Rol.findByPk.mockResolvedValue(rolMock);
    Usuario.findOne.mockResolvedValue(usuarioMock); // Correo ya existe

    await expect(authService.registrar({
      Nombre: 'Otro',
      Correo: 'juan@test.com',
      Contrasena: '123456',
      idRol: 2
    })).rejects.toThrow('El correo ya está registrado');
  });
});
