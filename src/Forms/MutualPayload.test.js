import { describe, expect, it } from 'vitest';
import { DataPerson } from '../Data/DataPerson';
import { createMutualPayload } from './MutualPayload';

const person = (documento, genero) => ({
  ...DataPerson,
  nombre: 'Ana',
  apellido: 'Prueba',
  departamento: 'La Libertad',
  municipio: 'La Libertad Este',
  domicilio: 'Antiguo Cuscatlán',
  documento,
  genero,
  edad: '35',
  oficio: 'Comerciante',
});

describe('mutual payload', () => {
  it('converts money, percentages, dates and identifiers to legal text', () => {
    const payload = createMutualPayload({
      debtor: person('01234567-8', 'Femenino'),
      creditor: person('87654321-0', 'Masculino'),
      agent: {
        nombres: 'Nora',
        apellidos: 'Notaria',
        departamento: 'San Salvador',
        distrito: 'San Salvador',
        municipio: 'San Salvador Centro',
        genero: 'Femenino',
        rol: 'Notario',
      },
      terms: {
        amount: '5000.22',
        term: '6 meses',
        dueDate: '2026-10-09',
        installmentCount: '6',
        installmentAmount: '185',
        paymentBank: 'Banco Prueba',
        paymentAccount: '1234',
        monthlyInterest: '3.75',
        defaultInterest: '1',
        fundsPurpose: 'Gastos personales',
        billOfExchangeGuarantee: false,
        guaranteeDueDate: '',
        administrativeExpenses: '3',
        specialDomicile: 'Santa Tecla',
        signingState: 'La Libertad',
        signingMunicipality: 'La Libertad Sur',
        signingDistrict: 'Santa Tecla',
        signingDate: '2026-04-09',
        signingTime: '09:30',
        identifiesDebtor: 'No',
        identifiesCreditor: 'Sí',
      },
    });

    expect(payload.condiciones.monto).toBe('CINCO MIL CON VEINTIDÓS CENTAVOS');
    expect(payload.condiciones.interes_mensual).toBe(
      'TRES PUNTO SETENTA Y CINCO'
    );
    expect(payload.condiciones.fecha_vencimiento).toContain('OCTUBRE');
    expect(payload.condiciones.lugar_firma).toBe(
      'Santa Tecla, Municipio de La Libertad Sur'
    );
    expect(payload.deudor.documento).toBe(
      'CERO UNO DOS TRES CUATRO CINCO SEIS SIETE-OCHO'
    );
  });
});
