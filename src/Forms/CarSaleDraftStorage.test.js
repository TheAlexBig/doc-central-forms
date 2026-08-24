import { describe, expect, it } from 'vitest';
import {
  CAR_SALE_AUTOSAVE_KEY,
  clearCarSaleDraft,
  readCarSaleDraft,
  writeCarSaleDraft,
} from './CarSaleDraftStorage';

const memoryStorage = () => {
  const values = new Map();
  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
    removeItem: (key) => values.delete(key),
    values,
  };
};

describe('car sale draft storage', () => {
  it('writes, reads and clears a draft', () => {
    const storage = memoryStorage();
    writeCarSaleDraft(
      storage,
      { carStates: { placa: 'P123' } },
      '2026-08-24T03:00:00Z'
    );
    expect(readCarSaleDraft(storage)).toEqual({
      state: { carStates: { placa: 'P123' } },
      savedAt: '2026-08-24T03:00:00Z',
    });
    clearCarSaleDraft(storage);
    expect(storage.values.has(CAR_SALE_AUTOSAVE_KEY)).toBe(false);
  });

  it('discards malformed saved data', () => {
    const storage = memoryStorage();
    storage.setItem(CAR_SALE_AUTOSAVE_KEY, '{broken');
    expect(readCarSaleDraft(storage)).toBeNull();
    expect(storage.values.has(CAR_SALE_AUTOSAVE_KEY)).toBe(false);
  });
});
