export const normalizeDui = (documento = '') =>
  documento
    .toString()
    .trim()
    .toUpperCase()
    .replace(/[^0-9A-Z]/g, '');

export const formatDui = (documento = '') => {
  const digits = documento.toString().replace(/\D/g, '').slice(0, 9);

  if (digits.length <= 8) {
    return digits;
  }

  return `${digits.slice(0, 8)}-${digits.slice(8)}`;
};
