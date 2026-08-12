const apiUrl = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

const desktopRequest = async (path, options, failureMessage) => {
  let response;
  try {
    response = await fetch(`${apiUrl}${path}`, options);
  } catch (_error) {
    throw new Error(
      `${failureMessage} No se pudo conectar con la aplicación local.`
    );
  }

  if (!response.ok) {
    throw new Error(`${failureMessage} Intente nuevamente.`);
  }
  return response;
};

export async function getDesktopDiagnostics() {
  const response = await desktopRequest(
    '/api/v1/desktop/diagnostics',
    undefined,
    'No se pudo cargar el diagnóstico.'
  );
  return response.json();
}

export async function openLogsFolder() {
  await desktopRequest(
    '/api/v1/desktop/diagnostics/logs-folder',
    {
      method: 'POST',
    },
    'No se pudo abrir la carpeta de logs.'
  );
}
