/**
 * Pruebas unitarias — horasService
 * Cubre: obtenerTodos, obtenerPorUsuario, obtenerPorId, crear, actualizar, eliminar
 */

jest.mock('../../src/models', () => ({
  Horas: {
    findAndCountAll: jest.fn(),
    findByPk: jest.fn(),
    create: jest.fn()
  },
  Usuario:      { findByPk: jest.fn() },
  Organizacion: { findByPk: jest.fn() }
}));

const { Horas, Organizacion } = require('../../src/models');
const horasService = require('../../src/services/horasService');

const horasMock = {
  id: 1,
  idUsuario: 1,
  idOrganizacion: 1,
  actividad: 'Limpieza de playa',
  fecha: new Date(),
  horas: 4,
  update: jest.fn().mockResolvedValue(true),
  destroy: jest.fn().mockResolvedValue(true)
};

const orgMock = { id: 1, NombreOrganizacion: 'EcoVoluntarios CR' };

describe('horasService — obtenerTodos', () => {
  beforeEach(() => jest.clearAllMocks());

  test('✅ Retorna lista paginada de horas', async () => {
    Horas.findAndCountAll.mockResolvedValue({ count: 3, rows: [horasMock] });

    const resultado = await horasService.obtenerTodos(1, 10);

    expect(resultado.total).toBe(3);
    expect(resultado.registros).toHaveLength(1);
  });
});

describe('horasService — obtenerPorUsuario', () => {
  beforeEach(() => jest.clearAllMocks());

  test('✅ Retorna horas de un usuario específico', async () => {
    Horas.findAndCountAll.mockResolvedValue({ count: 2, rows: [horasMock] });

    const resultado = await horasService.obtenerPorUsuario(1, 1, 10);

    expect(resultado.total).toBe(2);
    expect(resultado.registros).toHaveLength(1);
  });
});

describe('horasService — obtenerPorId', () => {
  beforeEach(() => jest.clearAllMocks());

  test('✅ Retorna un registro por ID', async () => {
    Horas.findByPk.mockResolvedValue(horasMock);

    const resultado = await horasService.obtenerPorId(1);
    expect(resultado.actividad).toBe('Limpieza de playa');
  });

  test('✅ Retorna null si no existe', async () => {
    Horas.findByPk.mockResolvedValue(null);

    const resultado = await horasService.obtenerPorId(999);
    expect(resultado).toBeNull();
  });
});

describe('horasService — crear', () => {
  beforeEach(() => jest.clearAllMocks());

  test('✅ Registra horas correctamente', async () => {
    Organizacion.findByPk.mockResolvedValue(orgMock);
    Horas.create.mockResolvedValue(horasMock);

    const resultado = await horasService.crear(1, {
      idOrganizacion: 1,
      actividad: 'Limpieza de playa',
      horas: 4
    });

    expect(Horas.create).toHaveBeenCalled();
  });

  test('❌ Falla si faltan campos requeridos', async () => {
    await expect(horasService.crear(1, { idOrganizacion: 1 }))
      .rejects.toThrow('idOrganizacion, actividad y horas son requeridos');
  });

  test('❌ Falla si las horas son 0 o negativas', async () => {
    await expect(horasService.crear(1, {
      idOrganizacion: 1,
      actividad: 'Test',
      horas: -1
    })).rejects.toThrow('Las horas deben ser un número positivo');
  });

  test('❌ Falla si la organización no existe', async () => {
    Organizacion.findByPk.mockResolvedValue(null);

    await expect(horasService.crear(1, {
      idOrganizacion: 999,
      actividad: 'Test',
      horas: 2
    })).rejects.toThrow('Organización no encontrada');
  });
});

describe('horasService — actualizar', () => {
  beforeEach(() => jest.clearAllMocks());

  test('✅ Admin puede actualizar cualquier registro', async () => {
    Horas.findByPk
      .mockResolvedValueOnce(horasMock)
      .mockResolvedValueOnce(horasMock);

    await horasService.actualizar(1, 99, 'Admin', { horas: 6 });
    expect(horasMock.update).toHaveBeenCalled();
  });

  test('✅ El dueño puede actualizar su registro', async () => {
    Horas.findByPk
      .mockResolvedValueOnce(horasMock)
      .mockResolvedValueOnce(horasMock);

    await horasService.actualizar(1, 1, 'Voluntario', { horas: 5 });
    expect(horasMock.update).toHaveBeenCalled();
  });

  test('❌ Falla si no es el dueño ni Admin', async () => {
    Horas.findByPk.mockResolvedValue(horasMock);

    await expect(horasService.actualizar(1, 99, 'Voluntario', {}))
      .rejects.toThrow('No tienes permiso');
  });

  test('❌ Falla si el registro no existe', async () => {
    Horas.findByPk.mockResolvedValue(null);

    await expect(horasService.actualizar(999, 1, 'Admin', {}))
      .rejects.toThrow('Registro de horas no encontrado');
  });
});

describe('horasService — eliminar', () => {
  beforeEach(() => jest.clearAllMocks());

  test('✅ Admin puede eliminar cualquier registro', async () => {
    Horas.findByPk.mockResolvedValue(horasMock);

    await horasService.eliminar(1, 99, 'Admin');
    expect(horasMock.destroy).toHaveBeenCalled();
  });

  test('❌ Falla si el registro no existe', async () => {
    Horas.findByPk.mockResolvedValue(null);

    await expect(horasService.eliminar(999, 1, 'Admin'))
      .rejects.toThrow('Registro de horas no encontrado');
  });
});
