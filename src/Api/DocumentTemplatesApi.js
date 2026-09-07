import { localRequest } from './LocalApi';

const templatePath = (documentType, name) =>
  `/api/v1/templates/${encodeURIComponent(documentType)}${name ? `/${encodeURIComponent(name)}` : ''}`;

export async function listDocumentTemplates(documentType) {
  const response = await localRequest(
    templatePath(documentType),
    undefined,
    'No se pudieron cargar las plantillas del documento.'
  );
  return response.json();
}

export async function saveDocumentTemplate(documentType, name, content) {
  const response = await localRequest(
    templatePath(documentType, name),
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    },
    'No se pudo guardar el bloque.'
  );
  return response.json();
}

export async function resetDocumentTemplate(documentType, name) {
  const response = await localRequest(
    `${templatePath(documentType, name)}/reset`,
    { method: 'POST' },
    'No se pudo restaurar el bloque.'
  );
  return response.json();
}
