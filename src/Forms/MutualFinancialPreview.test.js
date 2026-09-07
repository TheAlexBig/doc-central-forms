import { describe, expect, it } from 'vitest';
import {
  calculateMutualPreview,
  formatMutualDate,
  formatMutualMoney,
  resolveMutualDueDate,
} from './MutualFinancialPreview';

const terms = (overrides = {}) => ({
  amount: '1000',
  monthlyInterest: '2',
  signingDate: '2026-01-01',
  termMode: 'DURATION',
  termQuantity: '60',
  termUnit: 'DAYS',
  installmentCount: '4',
  ...overrides,
});

describe('mutual financial preview', () => {
  it('distributes 60 days into four payments', () => {
    const result = calculateMutualPreview(terms());
    expect(result.dueDate).toBe('2026-03-02');
    expect(result.interest).toBe(25.13);
    expect(result.installments[0].capital).toBe(246.28);
    expect(result.installments.at(-1).capital).toBe(253.75);
    expect(result.periodicity).toBe('Cada 15 días');
    expect(result.installments.map((item) => item.date)).toEqual([
      '2026-01-16',
      '2026-01-31',
      '2026-02-15',
      '2026-03-02',
    ]);
  });

  it('formats user-facing values in Spanish', () => {
    expect(formatMutualDate('2027-09-04')).toBe('4 de septiembre de 2027');
    expect(formatMutualMoney(1234)).toContain('1,234.00');
    expect(
      calculateMutualPreview(
        terms({
          termQuantity: '12',
          termUnit: 'MONTHS',
          installmentCount: '1',
        })
      ).periodicity
    ).toBe('Cada 12 meses');
  });

  it('uses calendar months and leap-year rules', () => {
    expect(
      resolveMutualDueDate(
        terms({
          signingDate: '2026-01-31',
          termQuantity: '1',
          termUnit: 'MONTHS',
        })
      )
    ).toBe('2026-02-28');
    expect(
      resolveMutualDueDate(
        terms({
          signingDate: '2024-02-29',
          termQuantity: '1',
          termUnit: 'YEARS',
        })
      )
    ).toBe('2025-02-28');
  });

  it('keeps specific final date and rejects invalid values', () => {
    const result = calculateMutualPreview(
      terms({
        termMode: 'SPECIFIC_DATE',
        dueDate: '2026-01-11',
        installmentCount: '3',
      })
    );
    expect(result.installments.map((item) => item.date)).toEqual([
      '2026-01-04',
      '2026-01-07',
      '2026-01-11',
    ]);
    expect(calculateMutualPreview(terms({ installmentCount: '0' }))).toBeNull();
    expect(
      calculateMutualPreview(
        terms({ termMode: 'SPECIFIC_DATE', dueDate: '2026-01-01' })
      )
    ).toBeNull();
  });
});
