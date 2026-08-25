import { describe, expect, it } from 'vitest';
import {
  hasSamePartyDui,
  isNotary,
  validateCarSaleState,
} from './CarSaleRules';

describe('car sale business rules', () => {
  it('accepts only notaries as authenticating agents', () => {
    expect(isNotary({ rol: 'Notario' })).toBe(true);
    expect(isNotary({ rol: 'Abogado' })).toBe(false);
  });

  it('compares buyer and seller by normalized DUI', () => {
    expect(
      hasSamePartyDui({ documento: '01234567-8' }, { documento: '0123 4567 8' })
    ).toBe(true);
  });

  it('reports invalid recovered drafts before generation', () => {
    expect(
      validateCarSaleState({
        agentStates: { rol: 'Abogado' },
        personStates: { documento: '01234567-8' },
        vendorStates: { documento: '87654321-0' },
      })
    ).toContain('notario');
  });
});
