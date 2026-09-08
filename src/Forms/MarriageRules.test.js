import { describe, expect, it } from 'vitest';
import { validateMarriageState } from './MarriageRules';
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
      'no cumple requisitos legales'
    );
  });

  it('requires an interpreter when a party does not speak Spanish', () => {
    const state = validMarriageState();
    state.partyOne.speaksSpanish = false;
    expect(validateMarriageState(state)).toContain('Seleccione intérprete.');
  });
});
