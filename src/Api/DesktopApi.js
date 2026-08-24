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

export async function downloadSupportPackage() {
  const response = await desktopRequest(
    '/api/v1/desktop/diagnostics/support-package',
    undefined,
    'No se pudo crear el paquete de soporte.'
  );
  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'central-docs-support.zip';
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
