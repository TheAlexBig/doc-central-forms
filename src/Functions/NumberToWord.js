const NumberToWord = (props) => {
  const units = [
    'cero',
    'uno',
    'dos',
    'tres',
    'cuatro',
    'cinco',
    'seis',
    'siete',
    'ocho',
    'nueve',
  ];
  const tenToSixteen = [
    'diez',
    'once',
    'doce',
    'trece',
    'catorce',
    'quince',
    'dieciséis',
  ];
  const tens = [
    'treinta',
    'cuarenta',
    'cincuenta',
    'sesenta',
    'setenta',
    'ochenta',
    'noventa',
  ];

  const getName = (number) => {
    const numberNoLeftZeros = deleteZerosLeft(number);

    if (numberNoLeftZeros.length === 1) {
      return getUnits(numberNoLeftZeros);
    }
    if (numberNoLeftZeros.length === 2) {
      return getTens(numberNoLeftZeros);
    }
    if (numberNoLeftZeros.length === 3) {
      return getHundreds(numberNoLeftZeros);
    }
    if (numberNoLeftZeros.length < 7) {
      return getThousands(numberNoLeftZeros);
    }
  };
  const deleteZerosLeft = (number) => {
    let i = 0;
    let isZero = true;
    for (i = 0; i < number.length; i += 1) {
      if (number.charAt(i) !== 0) {
        isZero = false;
        break;
      }
    }
    return isZero ? '0' : number.substr(i);
  };

  const getUnits = (number) => {
    const numberInt = parseInt(number);
    return units[numberInt];
  };

  const getTens = (number) => {
    // Obtener las unidades
    const unitsTens = number.charAt(1);

    if (number < 17) {
      return tenToSixteen[number - 10];
    }
    if (number < 20) {
      return `dieci${getUnits(unitsTens)}`;
    }

    // eslint-disable-next-line default-case
    switch (number) {
      case '20':
        return 'veinte';
      case '22':
        return 'veintidós';
      case '23':
        return 'veintitrés';
      case '26':
        return 'veintiséis';
    }
    if (number < 30) {
      return `veinti${getUnits(unitsTens)}`;
    }
    let name = tens[number.charAt(0) - 3];
    if (unitsTens > 0) {
      name += ` y ${getUnits(unitsTens)}`;
    }
    return name;
  };

  const getHundreds = (number) => {
    let name = '';
    const hundreds = number.charAt(0);
    const tensHundreds = number.substr(1);
    if (number === 100) {
      return 'cien';
    }

    // eslint-disable-next-line default-case
    switch (hundreds) {
      case '1':
        name = 'ciento';
        break;
      case '5':
        name = 'quinientos';
        break;
      case '7':
        name = 'setecientos';
        break;
      case '9':
        name = 'novecientos';
        break;
    }
    if (name === '') {
      name = `${getUnits(hundreds)}cientos`;
    }
    if (parseInt(tensHundreds) > 0) {
      name += ` ${getName(tensHundreds)}`;
    }
    return name;
  };

  const getThousands = (number) => {
    let name = 'mil';
    // Obtener cuantos dígitos están en los miles
    const thousandsLength = number.length - 3;
    // Obtener los miles
    const thousands = number.substr(0, thousandsLength);
    // Obtener las centenas, decenas y unidades
    const hundreds = number.substr(thousandsLength);

    if (thousands > 1) {
      // Se reemplaza la palabra uno por un en numeros como 21000, 31000, 41000, etc.
      name = `${getName(thousands).replace('uno', 'un')} mil`;
    }
    if (hundreds > 0) {
      name += ` ${getName(hundreds)}`;
    }
    return name;
  };

  return getName(props);
};
export default NumberToWord;
