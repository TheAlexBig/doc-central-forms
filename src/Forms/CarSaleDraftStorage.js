export const CAR_SALE_AUTOSAVE_KEY = 'central-docs.car-sale-draft.v1';

export const readCarSaleDraft = (storage) => {
  try {
    const saved = JSON.parse(storage.getItem(CAR_SALE_AUTOSAVE_KEY));
    return saved?.state && saved?.savedAt ? saved : null;
  } catch (_error) {
    storage.removeItem(CAR_SALE_AUTOSAVE_KEY);
    return null;
  }
};

export const writeCarSaleDraft = (storage, state, savedAt) => {
  storage.setItem(CAR_SALE_AUTOSAVE_KEY, JSON.stringify({ state, savedAt }));
};

export const clearCarSaleDraft = (storage) => {
  storage.removeItem(CAR_SALE_AUTOSAVE_KEY);
};
