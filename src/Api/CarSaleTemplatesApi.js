import { localRequest } from './LocalApi';

export async function listCarSaleTemplates() {
  const response = await localRequest(
    '/api/v1/templates/car-sale',
    undefined,
    'No se pudieron cargar las plantillas de compraventa.'
  );
  return response.json();
}

export async function saveCarSaleTemplate(name, content) {
  const response = await localRequest(
    `/api/v1/templates/car-sale/${encodeURIComponent(name)}`,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    },
    'No se pudo guardar el bloque de compraventa.'
  );
  return response.json();
}

export async function resetCarSaleTemplate(name) {
  const response = await localRequest(
    `/api/v1/templates/car-sale/${encodeURIComponent(name)}/reset`,
    { method: 'POST' },
    'No se pudo restaurar el bloque de compraventa.'
  );
  return response.json();
}
