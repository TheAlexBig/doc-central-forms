import { toLegalNumber } from './LegalDocumentText';
import { describe, expect, test } from 'vitest';

describe('toLegalNumber', () => {
  test('converts a dollar amount with thousands and cents', () => {
    expect(toLegalNumber('$5,000.22')).toBe('CINCO MIL CON VEINTIDÓS CENTAVOS');
  });

  test('keeps support for decimal comma input', () => {
    expect(toLegalNumber('5000,22')).toBe('CINCO MIL CON VEINTIDÓS CENTAVOS');
  });
});
