export const createDraftStorage = (key, schemaVersion = 2) => ({
  read(storage) {
    try {
      const saved = JSON.parse(storage.getItem(key));
      if (
        saved?.schemaVersion === schemaVersion &&
        saved?.state &&
        saved?.savedAt
      ) {
        return saved;
      }
    } catch (_error) {
      // Invalid drafts are intentionally discarded below.
    }
    storage.removeItem(key);
    return null;
  },

  write(storage, state, savedAt) {
    storage.setItem(key, JSON.stringify({ schemaVersion, state, savedAt }));
  },

  clear(storage) {
    storage.removeItem(key);
  },
});
