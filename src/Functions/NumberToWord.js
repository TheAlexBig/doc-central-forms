const NumberToWord = (props) => {
    const units = ['cero', 'uno', 'dos', 'tres' ,'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve']
    const tenToSixteen = ['diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis'];
    const tens = ['treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];

    const getName = (number) => {

        number = deleteZerosLeft(number);

        if (number.length === 1) {
            return getUnits(number);
        }
        if (number.length === 2) {
            return getTens(number);
        }
        if (number.length === 3) {
            return getHundreds(number);
        }
        if (number.length < 7) {
            return getThousands(number);
        }
      }
      const deleteZerosLeft=(number)=> {
        let i = 0;
        let isZero = true;
        for (i = 0; i < number.length; i++) {
            if (number.charAt(i) != 0) {
                isZero = false;
                break;
            }
        }
        return isZero ? '0' : number.substr(i);
    }

      const getUnits=(number)=> {
          
        let numberInt = parseInt(number);
        return units[numberInt];
    }

    const getTens= (number) => {
        // Obtener las unidades
        let units = number.charAt(1);

        if (number < 17) {
            return tenToSixteen[number - 10];
        }
        if (number < 20) {
            return 'dieci' + getUnits(units);
        }
        // Nombres especiales
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
            return 'veinti' + getUnits(units);
        }
        let name = tens[number.charAt(0) - 3];
        if (units > 0) {
            name += ' y ' + getUnits(units);
        }
        return name;
    }

     const getHundreds=(number)=> {
        let name = '';
        // Obtener las centenas
        let hundreds = number.charAt(0);
        // Obtener las decenas y unidades
        let tens = number.substr(1);
        if (number == 100) {
            return 'cien';
        }
        // Nombres especiales
        switch(hundreds) {
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
        }
        if (name === '') {
            name = getUnits(hundreds) + 'cientos';
        }
        if (parseInt(tens) > 0) {
            name += ' ' + getName(tens);
        }
        return name;
    }

    const getThousands= (number)=> {
        let name = 'mil';
        // Obtener cuantos dígitos están en los miles
        let thousandsLength = number.length - 3;
        // Obtener los miles
        let thousands = number.substr(0, thousandsLength);
        // Obtener las centenas, decenas y unidades
        let hundreds = number.substr(thousandsLength);

        if (thousands > 1) {
            // Se reemplaza la palabra uno por un en numeros como 21000, 31000, 41000, etc.
            name = getName(thousands).replace('uno', 'un') + ' mil';
        }
        if (hundreds > 0) {
            name += ' ' + getName(hundreds);
        }
        return name;
    }



    return getName(props);
}
export default NumberToWord;
