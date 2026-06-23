const apiUrl = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

const downloadFilename = (contentDisposition, contentType) => {
  const encodedName = contentDisposition?.match(/filename\*=UTF-8''([^;]+)/i);
  if (encodedName) {
    return decodeURIComponent(encodedName[1]);
  }
  const name = contentDisposition?.match(/filename="?([^";]+)"?/i);
  if (name?.[1]) {
    return name[1];
  }
  return contentType?.includes('pdf')
    ? 'compra-venta.pdf'
    : 'compra-venta.docx';
};

const downloadBlob = async (response) => {
  const blob = await response.blob();
  const objectUrl = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = objectUrl;
  link.download = downloadFilename(
    response.headers.get('Content-Disposition'),
    response.headers.get('Content-Type')
  );
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => window.URL.revokeObjectURL(objectUrl), 1000);
};

const formatQuery = (format = 'docx') =>
  `?format=${encodeURIComponent(format)}`;

export async function downloadCarSaleDocument(payload, draft, format = 'docx') {
  const response = await fetch(
    `${apiUrl}/api/v1/documents/car-sale/history${formatQuery(format)}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        documento: payload,
        borrador: draft,
      }),
    }
  );

  if (!response.ok) {
    let message = 'No se pudo generar el documento. Verifique los datos.';
    try {
      const error = await response.json();
      message = error.message || message;
    } catch (_error) {
      // Keep the friendly fallback if the server did not provide JSON.
    }
    throw new Error(message);
  }

  await downloadBlob(response);
  return response.headers.get('X-Document-History-Id');
}

export async function listDocumentHistory() {
  const response = await fetch(`${apiUrl}/api/v1/documents/history`);
  if (!response.ok) {
    throw new Error('No se pudo cargar el historial de documentos.');
  }
  return response.json();
}

export async function downloadHistoryDocument(id, format = 'docx') {
  const response = await fetch(
    `${apiUrl}/api/v1/documents/history/${id}/file${formatQuery(format)}`
  );
  if (!response.ok) {
    throw new Error('No se pudo descargar el documento histórico.');
  }
  await downloadBlob(response);
}
