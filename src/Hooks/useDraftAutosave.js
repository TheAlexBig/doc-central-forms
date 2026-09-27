import { useEffect, useRef, useState } from 'react';

export default function useDraftAutosave({
  state,
  recoveredDraft,
  hasData,
  writeDraft,
  clearDraft,
  delay = 750,
}) {
  const [autosave, setAutosave] = useState({
    savedAt: recoveredDraft?.savedAt || null,
    recovered: Boolean(recoveredDraft),
    saving: false,
  });
  const skipInitialSave = useRef(Boolean(recoveredDraft));
  const serializedState = JSON.stringify(state);

  useEffect(() => {
    if (skipInitialSave.current) {
      skipInitialSave.current = false;
      return undefined;
    }
    const snapshot = JSON.parse(serializedState);
    if (!hasData(snapshot)) {
      clearDraft(window.localStorage);
      setAutosave({ savedAt: null, recovered: false, saving: false });
      return undefined;
    }
    setAutosave((current) => ({ ...current, saving: true }));
    const timeout = window.setTimeout(() => {
      const savedAt = new Date().toISOString();
      writeDraft(window.localStorage, snapshot, savedAt);
      setAutosave({ savedAt, recovered: false, saving: false });
    }, delay);
    return () => window.clearTimeout(timeout);
  }, [clearDraft, delay, hasData, serializedState, writeDraft]);

  const resetAutosave = () =>
    setAutosave({ savedAt: null, recovered: false, saving: false });

  return { autosave, resetAutosave };
}
