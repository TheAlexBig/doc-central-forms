const apiUrl = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

const licenseRequest = async (path, options) => {
  const response = await fetch(`${apiUrl}${path}`, options);
  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.message || 'No se pudo validar la licencia.');
  }
  return response.json();
};

export const getLicenseStatus = () => licenseRequest('/api/v1/license/status');

export const activateLicense = (license) =>
  licenseRequest('/api/v1/license/activate', {
    body: JSON.stringify(license),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
  });
