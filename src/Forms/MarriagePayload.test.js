import { describe, expect, it } from 'vitest';
import { createMarriagePayload } from './MarriagePayload';
import { validMarriageState } from './MarriageTestData.test-helper';

describe('marriage payload', () => {
  it('converts dates, identifiers and territorial values for legal text', () => {
    const payload = createMarriagePayload(validMarriageState());

    expect(payload.contrayente_uno.persona.documento).toBe(
      'CERO UNO DOS TRES CUATRO CINCO SEIS SIETE-OCHO'
    );
    expect(payload.contrayente_uno.partida_nacimiento.numero).toBe(
      'UNO DOS TRES'
    );
    expect(payload.datos.lugar_celebracion).toBe(
      'San Salvador, Municipio de San Salvador Centro'
    );
    expect(payload.datos.hora_celebracion).toContain('DIECISÉIS');
    expect(payload.datos.numero_escritura).toBe(12);
    expect(payload.datos.regimen_patrimonial).toBe('COMMUNITY_DEFERRED');
    expect(payload.agente_juridico.rol).toBe('Notario');
  });
});
