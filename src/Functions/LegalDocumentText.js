const UNITS = [
  'CERO',
  'UNO',
  'DOS',
  'TRES',
  'CUATRO',
  'CINCO',
  'SEIS',
  'SIETE',
  'OCHO',
  'NUEVE',
];

const SPECIAL_TENS = {
  10: 'DIEZ',
  11: 'ONCE',
  12: 'DOCE',
  13: 'TRECE',
  14: 'CATORCE',
  15: 'QUINCE',
  16: 'DIECISÉIS',
  17: 'DIECISIETE',
  18: 'DIECIOCHO',
  19: 'DIECINUEVE',
  20: 'VEINTE',
  21: 'VEINTIUNO',
  22: 'VEINTIDÓS',
  23: 'VEINTITRÉS',
  24: 'VEINTICUATRO',
  25: 'VEINTICINCO',
  26: 'VEINTISÉIS',
  27: 'VEINTISIETE',
  28: 'VEINTIOCHO',
  29: 'VEINTINUEVE',
};

const TENS = {
  30: 'TREINTA',
  40: 'CUARENTA',
  50: 'CINCUENTA',
  60: 'SESENTA',
  70: 'SETENTA',
  80: 'OCHENTA',
  90: 'NOVENTA',
};

const HUNDREDS = {
  1: 'CIENTO',
  2: 'DOSCIENTOS',
  3: 'TRESCIENTOS',
  4: 'CUATROCIENTOS',
  5: 'QUINIENTOS',
  6: 'SEISCIENTOS',
  7: 'SETECIENTOS',
  8: 'OCHOCIENTOS',
  9: 'NOVECIENTOS',
};

const MONTHS = [
  'ENERO',
  'FEBRERO',
  'MARZO',
  'ABRIL',
  'MAYO',
  'JUNIO',
  'JULIO',
  'AGOSTO',
  'SEPTIEMBRE',
  'OCTUBRE',
  'NOVIEMBRE',
  'DICIEMBRE',
];

const apocopate = (words) =>
  words
    .replace(/VEINTIUNO$/, 'VEINTIÚN')
    .replace(/ Y UNO$/, ' Y UN')
    .replace(/UNO$/, 'UN');

const belowOneThousand = (number) => {
  if (number < 10) {
    return UNITS[number];
  }
  if (number < 30) {
    return SPECIAL_TENS[number];
  }
  if (number < 100) {
    const tens = Math.floor(number / 10) * 10;
    const units = number % 10;
    return units ? `${TENS[tens]} Y ${UNITS[units]}` : TENS[tens];
  }
  if (number === 100) {
    return 'CIEN';
  }
  const hundreds = Math.floor(number / 100);
  const rest = number % 100;
  return rest
    ? `${HUNDREDS[hundreds]} ${belowOneThousand(rest)}`
    : HUNDREDS[hundreds];
};

const integerToWords = (number) => {
  if (number < 1000n) {
    return belowOneThousand(Number(number));
  }
  if (number < 1000000n) {
    const thousands = number / 1000n;
    const rest = number % 1000n;
    const thousandsText =
      thousands === 1n ? 'MIL' : `${apocopate(integerToWords(thousands))} MIL`;
    return rest ? `${thousandsText} ${integerToWords(rest)}` : thousandsText;
  }
  if (number < 1000000000000n) {
    const millions = number / 1000000n;
    const rest = number % 1000000n;
    const millionsText =
      millions === 1n
        ? 'UN MILLÓN'
        : `${apocopate(integerToWords(millions))} MILLONES`;
    return rest ? `${millionsText} ${integerToWords(rest)}` : millionsText;
  }
  return String(number)
    .split('')
    .map((digit) => UNITS[Number(digit)])
    .join(' ');
};

export const toLegalNumber = (value) => {
  const number = String(value ?? '')
    .trim()
    .replace(',', '.');
  if (!number) {
    return '';
  }
  if (!/^\d+(\.\d+)?$/.test(number)) {
    return replaceNumericSequences(number);
  }
  const [integer, fraction = ''] = number.split('.');
  const integerWords = integerToWords(BigInt(integer));
  if (!fraction || /^0+$/.test(fraction)) {
    return integerWords;
  }
  const cents = fraction.padEnd(2, '0').slice(0, 2);
  return `${integerWords} CON ${integerToWords(BigInt(cents))} CENTAVOS`;
};

export const replaceNumericSequences = (value) =>
  String(value ?? '').replace(/\d+/g, (digits) =>
    integerToWords(BigInt(digits))
  );

export const toLegalIdentifier = (value) =>
  String(value ?? '')
    .replace(/\d/g, (digit) => ` ${UNITS[Number(digit)]} `)
    .replace(/\s+/g, ' ')
    .replace(/\s*-\s*/g, '-')
    .trim();

export const toLegalDate = (date) => {
  const match = String(date ?? '').match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) {
    return replaceNumericSequences(date);
  }
  const [, year, month, day] = match;
  const monthName = MONTHS[Number(month) - 1];
  if (!monthName) {
    return replaceNumericSequences(date);
  }
  return `${integerToWords(BigInt(day))} DE ${monthName} DE ${integerToWords(
    BigInt(year)
  )}`;
};

export const toLegalYear = (dateOrYear) => {
  const year = String(dateOrYear ?? '').match(/^\d{4}/)?.[0];
  return year
    ? integerToWords(BigInt(year))
    : replaceNumericSequences(dateOrYear);
};

export const toLegalTime = (time) => {
  const match = String(time ?? '').match(/^(\d{2}):(\d{2})$/);
  if (!match) {
    return replaceNumericSequences(time);
  }
  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  const hourWords =
    hours === 1
      ? 'UNA HORA'
      : `${integerToWords(BigInt(hours)).replace(/UNO$/, 'UNA')} HORAS`;
  return minutes
    ? `${hourWords} CON ${integerToWords(BigInt(minutes))} MINUTOS`
    : hourWords;
};
