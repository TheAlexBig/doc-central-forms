export const MARRIAGE_AUTOSAVE_KEY = 'central-docs.marriage-draft.v1';

export const readMarriageDraft = (storage) => {
  try {
    const saved = JSON.parse(storage.getItem(MARRIAGE_AUTOSAVE_KEY));
    return saved?.state && saved?.savedAt ? saved : null;
  } catch (_error) {
    storage.removeItem(MARRIAGE_AUTOSAVE_KEY);
    return null;
  }
};

export const writeMarriageDraft = (storage, state, savedAt) => {
  storage.setItem(MARRIAGE_AUTOSAVE_KEY, JSON.stringify({ state, savedAt }));
};

export const clearMarriageDraft = (storage) => {
  storage.removeItem(MARRIAGE_AUTOSAVE_KEY);
};
