import { describe, expect, it } from 'vitest';
import {
  MUTUAL_AUTOSAVE_KEY,
  clearMutualDraft,
  readMutualDraft,
  writeMutualDraft,
} from './MutualDraftStorage';

const memoryStorage = () => {
  const values = new Map();
  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
    removeItem: (key) => values.delete(key),
    values,
  };
};

describe('mutual draft storage', () => {
  it('writes, reads and clears an independent mutual draft', () => {
    const storage = memoryStorage();
    writeMutualDraft(
      storage,
      { terms: { amount: '750' } },
      '2026-09-04T17:30:00Z'
    );
    expect(readMutualDraft(storage)).toEqual({
      state: { terms: { amount: '750' } },
      savedAt: '2026-09-04T17:30:00Z',
    });
    clearMutualDraft(storage);
    expect(storage.values.has(MUTUAL_AUTOSAVE_KEY)).toBe(false);
  });

  it('discards malformed saved data', () => {
    const storage = memoryStorage();
    storage.setItem(MUTUAL_AUTOSAVE_KEY, '{broken');
    expect(readMutualDraft(storage)).toBeNull();
    expect(storage.values.has(MUTUAL_AUTOSAVE_KEY)).toBe(false);
  });
});
