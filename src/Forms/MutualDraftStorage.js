export const MUTUAL_AUTOSAVE_KEY = 'central-docs.mutual-draft.v1';

export const readMutualDraft = (storage) => {
  try {
    const saved = JSON.parse(storage.getItem(MUTUAL_AUTOSAVE_KEY));
    return saved?.state && saved?.savedAt ? saved : null;
  } catch (_error) {
    storage.removeItem(MUTUAL_AUTOSAVE_KEY);
    return null;
  }
};

export const writeMutualDraft = (storage, state, savedAt) => {
  storage.setItem(MUTUAL_AUTOSAVE_KEY, JSON.stringify({ state, savedAt }));
};

export const clearMutualDraft = (storage) => {
  storage.removeItem(MUTUAL_AUTOSAVE_KEY);
};
