import { localRequest } from './LocalApi';

export async function downloadBackup() {
  const response = await localRequest(
    '/api/v1/backup',
    undefined,
    'No se pudo crear el respaldo.'
  );
  const blob = await response.blob();
  const disposition = response.headers.get('content-disposition') || '';
  const name =
    disposition.match(/filename="?([^";]+)"?/i)?.[1] ||
    'central-docs-backup.zip';
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = name;
  link.click();
  URL.revokeObjectURL(url);
}

export async function restoreBackup(file) {
  const data = new FormData();
  data.append('file', file);
  await localRequest(
    '/api/v1/backup',
    { method: 'POST', body: data },
    'No se pudo restaurar el respaldo.'
  );
}

export async function getApplicationInfo() {
  const response = await localRequest(
    '/api/v1/application/info',
    undefined,
    'No se pudo obtener la versión instalada.'
  );
  return response.json();
}

export async function checkUpdates() {
  const response = await localRequest(
    '/api/v1/application/updates',
    undefined,
    'No se pudo comprobar si hay actualizaciones.'
  );
  return response.json();
}
