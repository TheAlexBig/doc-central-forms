import { useEffect, useState } from 'react';
import {
  listCarSaleTemplates,
  resetCarSaleTemplate,
  saveCarSaleTemplate,
} from '../Api/CarSaleTemplatesApi';

export function useCarSaleTemplates() {
  const [templates, setTemplates] = useState([]);
  const [templatesError, setTemplatesError] = useState('');
  const [busy, setBusy] = useState('');

  useEffect(() => {
    listCarSaleTemplates()
      .then(setTemplates)
      .catch((error) => setTemplatesError(error.message));
  }, []);

  const run = async (operation) => {
    setBusy('template');
    setTemplatesError('');
    try {
      const updated = await operation();
      setTemplates((current) =>
        current.map((template) =>
          template.name === updated.name ? updated : template
        )
      );
      return updated;
    } catch (error) {
      setTemplatesError(error.message);
      return null;
    } finally {
      setBusy('');
    }
  };

  return {
    templates,
    templatesError,
    busy,
    saveTemplate: (name, content) =>
      run(() => saveCarSaleTemplate(name, content)),
    resetTemplate: (name) => run(() => resetCarSaleTemplate(name)),
  };
}
