import { describe, expect, it } from 'vitest';
import {
  marriageErrorsForStep,
  validateMarriageFields,
  validateMarriageState,
} from './MarriageRules';
import { validMarriageState } from './MarriageTestData.test-helper';

describe('marriage client rules', () => {
  it('accepts a complete ordinary marriage', () => {
    expect(validateMarriageState(validMarriageState())).toEqual([]);
  });

  it('blocks impediments and missing conditional documents', () => {
    const state = validMarriageState();
    state.partyOne.currentMarriage = true;
    state.partyTwo.familyStatus = 'DIVORCED';
    state.details.capitulations = true;
    state.witnesses[0].readsWritesSpanish = false;

    expect(validateMarriageState(state).join(' ')).toContain(
      'vínculo matrimonial vigente'
    );
    expect(validateMarriageState(state).join(' ')).toContain(
      'documento del matrimonio anterior'
    );
    expect(validateMarriageState(state).join(' ')).toContain(
      'instrumento de capitulaciones'
    );
    expect(validateMarriageState(state).join(' ')).toContain(
      'leer y escribir castellano'
    );
  });

  it('requires an interpreter when a party does not speak Spanish', () => {
    const state = validMarriageState();
    state.partyOne.speaksSpanish = false;
    expect(validateMarriageState(state)).toContain('Seleccione intérprete.');
  });

  it('returns errors keyed to the exact field and current step', () => {
    const state = validMarriageState();
    state.partyOne.nombre = '';
    state.partyOne.birthCertificateIssueDate = '2026-01-01';
    state.partyTwo.apellido = '';

    const errors = validateMarriageFields(state);
    expect(errors['partyOne.nombre']).toBe('Ingrese los nombres.');
    expect(errors['partyOne.birthCertificateIssueDate']).toContain(
      'dos meses anteriores'
    );
    expect(marriageErrorsForStep(state, 1)).toEqual({
      'partyOne.nombre': 'Ingrese los nombres.',
      'partyOne.birthCertificateIssueDate':
        'La partida debe haberse expedido dentro de los dos meses anteriores al acta.',
    });
  });
});
