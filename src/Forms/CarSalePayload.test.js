import { describe, expect, it } from 'vitest';
import { createCarSalePayload } from './CarSalePayload';

describe('createCarSalePayload', () => {
  it('creates legal text payloads for saved people, vehicles and agents', () => {
    const payload = createCarSalePayload({
      vendorStates: {
        nombre: 'Maria 2',
        apellido: 'Lopez',
        departamento: 'San Salvador',
        municipio: 'San Salvador Centro',
        domicilio: 'Colonia 10',
        documento: '12345678-9',
        genero: 'Femenino',
        edad: '35',
        oficio: 'Abogada 2',
      },
      personStates: {
        nombre: 'Carlos',
        apellido: 'Perez',
        departamento: 'La Libertad',
        municipio: 'Santa Tecla',
        domicilio: 'Residencial 5',
        documento: '87654321-0',
        genero: 'Masculino',
        edad: '30',
        oficio: 'Ingeniero',
      },
      carStates: {
        placa: 'P123456',
        marca: 'Toyota',
        modelo: 'Corolla 2020',
        color: 'Azul',
        fabricado: '2020',
        capacidad: '5',
        dominio: 'Propiedad',
        clase: 'Sedan',
        num_motor: 'M123',
        num_chasis: 'C456',
        num_vin: 'VIN789',
      },
      detailStates: {
        precio: '10000.50',
        departamento: 'La Libertad',
        municipio: 'Santa Tecla',
        domicilio: 'Santa Tecla',
        fecha_firma: '2026-05-26',
        hora_firma: '10:30',
        calidad_de: 'Propiedad',
        institucion: '',
        identifica_vendedor: 'No',
        identifica_comprador: 'Si',
      },
      agentStates: {
        nombres: 'Ana',
        apellidos: 'Garcia',
        departamento: 'La Libertad',
        municipio: 'Santa Tecla',
        distrito: 'Distrito 1',
        genero: 'Femenino',
        rol: 'Abogado',
      },
    });

    expect(payload.vendedor.nombre).toBe('Maria DOS');
    expect(payload.vendedor.edad).toBe('TREINTA Y CINCO');
    expect(payload.vendedor.documento).toBe(
      'UNO DOS TRES CUATRO CINCO SEIS SIETE OCHO-NUEVE'
    );
    expect(payload.comprador.domicilio).toBe(
      'Residencial CINCO, Municipio de Santa Tecla'
    );
    expect(payload.vehiculo.modelo).toBe('Corolla DOS MIL VEINTE');
    expect(payload.vehiculo.capacidad).toBe('CINCO');
    expect(payload.documento.precio).toBe('DIEZ MIL CON CINCUENTA CENTAVOS');
    expect(payload.documento.fecha_firma).toBe(
      'VEINTISÉIS DE MAYO DE DOS MIL VEINTISÉIS'
    );
    expect(payload.documento.hora_firma).toBe('DIEZ HORAS CON TREINTA MINUTOS');
    expect(payload.agente_juridico.rol).toBe('Abogado');
    expect(payload.agente_juridico.domicilio).toBe(
      'Distrito UNO, Municipio de Santa Tecla'
    );
  });
});
