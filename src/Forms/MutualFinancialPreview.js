const parseDate = (value) => {
  const [year, month, day] = String(value || '')
    .split('-')
    .map(Number);
  return year && month && day ? new Date(Date.UTC(year, month - 1, day)) : null;
};

const dateValue = (date) => date.toISOString().slice(0, 10);
const TERM_UNIT_LABELS = {
  DAYS: ['día', 'días'],
  MONTHS: ['mes', 'meses'],
  YEARS: ['año', 'años'],
};

export const formatMutualMoney = (value) =>
  new Intl.NumberFormat('es-SV', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(Number(value));

export const formatMutualDate = (value) => {
  const date = parseDate(value);
  return date
    ? new Intl.DateTimeFormat('es-SV', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC',
      }).format(date)
    : '';
};
const addMonths = (date, months) => {
  const day = date.getUTCDate();
  const result = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + months, 1)
  );
  const lastDay = new Date(
    Date.UTC(result.getUTCFullYear(), result.getUTCMonth() + 1, 0)
  ).getUTCDate();
  result.setUTCDate(Math.min(day, lastDay));
  return result;
};

export const resolveMutualDueDate = (terms) => {
  const start = parseDate(terms.signingDate);
  if (!start) return '';
  if (terms.termMode === 'SPECIFIC_DATE') return terms.dueDate || '';
  const quantity = Number(terms.termQuantity);
  if (!Number.isInteger(quantity) || quantity <= 0) return '';
  if (terms.termUnit === 'DAYS') {
    const result = new Date(start);
    result.setUTCDate(result.getUTCDate() + quantity);
    return dateValue(result);
  }
  if (terms.termUnit === 'MONTHS') return dateValue(addMonths(start, quantity));
  if (terms.termUnit === 'YEARS')
    return dateValue(addMonths(start, quantity * 12));
  return '';
};

export const calculateMutualPreview = (terms) => {
  const capital = Number(terms.amount);
  const count = Number(terms.installmentCount);
  const start = parseDate(terms.signingDate);
  const dueDate = resolveMutualDueDate(terms);
  const end = parseDate(dueDate);
  if (
    !(capital > 0) ||
    !Number.isInteger(count) ||
    count <= 0 ||
    !start ||
    !end ||
    end <= start
  )
    return null;
  const totalDays = Math.round((end - start) / 86400000);
  if (count > totalDays) return null;
  const rate = Number(terms.monthlyInterest || 0);
  if (rate < 0) return null;
  const months =
    terms.termMode === 'DURATION'
      ? terms.termUnit === 'YEARS'
        ? Number(terms.termQuantity) * 12
        : terms.termUnit === 'MONTHS'
          ? Number(terms.termQuantity)
          : Number(terms.termQuantity) / 30
      : totalDays / 30;
  const calendarMonths =
    terms.termMode === 'DURATION'
      ? terms.termUnit === 'YEARS'
        ? Number(terms.termQuantity) * 12
        : terms.termUnit === 'MONTHS'
          ? Number(terms.termQuantity)
          : 0
      : 0;
  const dates = Array.from({ length: count }, (_, index) => {
    if (calendarMonths && calendarMonths % count === 0) {
      return dateValue(
        addMonths(start, (calendarMonths / count) * (index + 1))
      );
    }
    const offset =
      index === count - 1
        ? totalDays
        : Math.floor((totalDays * (index + 1)) / count);
    const date = new Date(start);
    date.setUTCDate(date.getUTCDate() + offset);
    return dateValue(date);
  });
  const periodicRate = (rate / 100) * (months / count);
  const payment = periodicRate
    ? Math.round(
        ((capital * periodicRate) / (1 - Math.pow(1 + periodicRate, -count))) *
          100
      ) / 100
    : Math.round((capital / count) * 100) / 100;
  let balance = capital;
  const installments = dates.map((date, index) => {
    const last = index === count - 1;
    const installmentInterest = Math.round(balance * periodicRate * 100) / 100;
    const installmentCapital = last
      ? balance
      : Math.min(
          balance,
          Math.round((payment - installmentInterest) * 100) / 100
        );
    balance = Math.round((balance - installmentCapital) * 100) / 100;
    return {
      date,
      capital: installmentCapital,
      interest: installmentInterest,
      total: Math.round((installmentCapital + installmentInterest) * 100) / 100,
    };
  });
  const total =
    Math.round(
      installments.reduce((sum, installment) => sum + installment.total, 0) *
        100
    ) / 100;
  const interest = Math.round((total - capital) * 100) / 100;
  const periodicity =
    terms.termMode === 'DURATION' && Number(terms.termQuantity) % count === 0
      ? (() => {
          const value = Number(terms.termQuantity) / count;
          const labels = TERM_UNIT_LABELS[terms.termUnit];
          return `Cada ${value} ${labels[value === 1 ? 0 : 1]}`;
        })()
      : 'Fechas distribuidas proporcionalmente';
  return {
    capital,
    interest,
    total,
    dueDate,
    installmentAmount: installments[0].total,
    periodicity,
    installments,
  };
};
