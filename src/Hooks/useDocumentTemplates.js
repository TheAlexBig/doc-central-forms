import { useEffect, useState } from 'react';
import {
  listDocumentTemplates,
  resetDocumentTemplate,
  saveDocumentTemplate,
} from '../Api/DocumentTemplatesApi';

export function useDocumentTemplates(documentType) {
  const [templates, setTemplates] = useState([]);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState('');
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(0);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError('');
    listDocumentTemplates(documentType)
      .then((result) => {
        if (active) setTemplates(result);
      })
      .catch((cause) => {
        if (active) setError(cause.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [documentType, reload]);

  const run = async (operation) => {
    setBusy('template');
    setError('');
    try {
      const updated = await operation();
      setTemplates((current) =>
        current.map((template) =>
          template.name === updated.name ? updated : template
        )
      );
      return updated;
    } catch (cause) {
      setError(cause.message);
      return null;
    } finally {
      setBusy('');
    }
  };

  return {
    templates,
    error,
    busy,
    loading,
    retry: () => setReload((value) => value + 1),
    saveTemplate: (name, content) =>
      run(() => saveDocumentTemplate(documentType, name, content)),
    resetTemplate: (name) =>
      run(() => resetDocumentTemplate(documentType, name)),
  };
}
