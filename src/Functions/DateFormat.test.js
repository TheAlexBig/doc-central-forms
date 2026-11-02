import { describe, expect, it } from 'vitest';
import { formatDate, formatDateTime, parseDisplayDate } from './DateFormat';

describe('DateFormat', () => {
  it('presents ISO calendar dates as day, month and year', () => {
    expect(formatDate('2026-10-07')).toBe('07/10/2026');
  });

  it('preserves non-ISO text and supports an empty fallback', () => {
    expect(formatDate('Fecha por definir')).toBe('Fecha por definir');
    expect(formatDate('', 'Pendiente')).toBe('Pendiente');
  });

  it('converts valid display dates to ISO and rejects impossible dates', () => {
    expect(parseDisplayDate('07/10/2026')).toBe('2026-10-07');
    expect(parseDisplayDate('31/02/2026')).toBe('');
    expect(parseDisplayDate('7/10/2026')).toBe('');
  });

  it('presents timestamps with a numeric Salvadoran date', () => {
    expect(formatDateTime('2026-10-07T14:05:00Z')).toMatch(
      /^07\/10\/2026,? 14:05$/
    );
  });
});
