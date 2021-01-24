const carValidation = (data) => {
  let correct = false;
  if (/^[A-Z\-0-9]+$/.test(data.placa.value)) {
    console.log("primer paso");
    if (/^(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)+$/.test(data.marca.value)) {
      console.log("segundo paso");
      if (/^(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)+$/.test(data.modelo.value)) {
        console.log("tercero paso");
        if (/^(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)+$/.test(data.color.value)) {
          console.log("cuarto paso");
          if (/^(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)+$/.test(data.clase.value)) {
            console.log("sexto paso");
            if (/^[A-Z\-0-9]+$/.test(data.num_motor.value)) {
              console.log("septimo paso");
              if (/^[A-Z\-0-9]+$/.test(data.num_chasis.value)) {
                console.log("octavo paso");
                if (/^[A-Z\-0-9]+$/.test(data.num_vin.value)) {
                  console.log("noveno paso, se logro");
                  correct = true;
                  return correct;
                } else {
                  return correct;
                }
              } else {
                return correct;
              }
            } else {
              return correct;
            }
          } else {
            return correct;
          }
        } else {
          return correct;
        }
      } else {
        return correct;
      }
    } else {
      return correct;
    }
  } else {
    return correct;
  }
};
export default carValidation;
