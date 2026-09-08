import { describe, expect, it } from 'vitest';
import {
  MARRIAGE_AUTOSAVE_KEY,
  clearMarriageDraft,
  readMarriageDraft,
  writeMarriageDraft,
} from './MarriageDraftStorage';

const memoryStorage = () => {
  const values = new Map();
  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
    removeItem: (key) => values.delete(key),
    values,
  };
};

describe('marriage draft storage', () => {
  it('writes, reads and clears its own draft', () => {
    const storage = memoryStorage();
    writeMarriageDraft(
      storage,
      { partyOne: { nombre: 'Ana' } },
      '2026-09-08T12:00:00Z'
    );
    expect(readMarriageDraft(storage)?.state.partyOne.nombre).toBe('Ana');
    clearMarriageDraft(storage);
    expect(storage.values.has(MARRIAGE_AUTOSAVE_KEY)).toBe(false);
  });

  it('removes malformed data', () => {
    const storage = memoryStorage();
    storage.setItem(MARRIAGE_AUTOSAVE_KEY, '{broken');
    expect(readMarriageDraft(storage)).toBeNull();
    expect(storage.values.has(MARRIAGE_AUTOSAVE_KEY)).toBe(false);
  });
});
