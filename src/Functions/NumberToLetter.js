const numberToLetter = (number) => {
    const units = ['cero ', 'uno ', 'dos ', 'tres ' ,'cuatro ', 'cinco ', 'seis ', 'siete ', 'ocho ', 'nueve ']
    let i = 0;
    let Lnumber = "";
    for (i = 0; i < number.length; i++) {
      Lnumber= Lnumber + units[parseInt(number.charAt(i))]
      }
    return Lnumber;
  }
  export default numberToLetter;