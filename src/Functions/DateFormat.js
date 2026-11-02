const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/;

export const formatDate = (value, fallback = '') => {
  const match = String(value || '').match(ISO_DATE);

  if (!match) return value || fallback;

  return `${match[3]}/${match[2]}/${match[1]}`;
};

export const parseDisplayDate = (value) => {
  const match = String(value || '').match(/^(\d{2})\/(\d{2})\/(\d{4})$/);

  if (!match) return '';

  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);
  const date = new Date(Date.UTC(year, month - 1, day));

  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return '';
  }

  return `${match[3]}-${match[2]}-${match[1]}`;
};

export const formatDateTime = (value, fallback = '') => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return fallback;

  return new Intl.DateTimeFormat('es-SV', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).format(date);
};
