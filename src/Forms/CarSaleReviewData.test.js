import { describe, expect, it } from 'vitest';
import { createCarSaleReviewData } from './CarSaleReviewData';

describe('createCarSaleReviewData', () => {
  it('preserves the values entered by the user', () => {
    const review = createCarSaleReviewData({
      agentStates: {
        nombres: 'Fiora',
        apellidos: 'La Carta',
        distrito: 'Nahuizalco',
        municipio: 'Sonsonate Norte',
        departamento: 'Sonsonate',
      },
      personStates: {
        nombre: 'Matias',
        apellido: 'Delgado',
        documento: '12321323-2',
      },
      vendorStates: {
        nombre: 'Jose Alexander',
        apellido: 'Garcia Valladares',
        documento: '05404679-9',
      },
      carStates: {
        placa: 'P-23233',
        modelo: 'K3000S',
        fabricado: '1999',
        capacidad: '2.90',
        unidad_capacidad: 'TON',
        traccion: '4x2',
      },
      detailStates: {
        precio: '12332',
        fecha_firma: '2026-08-14',
        hora_firma: '16:12',
      },
    });

    expect(review.comprador.documento).toBe('12321323-2');
    expect(review.vehiculo.placa).toBe('P-23233');
    expect(review.vehiculo.modelo).toBe('K3000S');
    expect(review.vehiculo.fabricado).toBe('1999');
    expect(review.vehiculo.capacidad).toBe('2.90 TON');
    expect(review.vehiculo.traccion).toBe('4x2');
    expect(review.documento.precio).toBe('12332');
    expect(review.documento.fecha_firma).toBe('2026-08-14');
    expect(review.documento.hora_firma).toBe('16:12');
  });
});
