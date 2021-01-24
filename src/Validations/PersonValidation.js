const personValidation = (data) => {
  let correct = false;
  if(/^(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)+$/.test(data.nombres.value)){
    console.log("primer paso")
    if(/^(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)+$/.test(data.apellidos.value)){
      console.log("segundo paso")
      if(data.documento.value.length===10){
        console.log("cuarto paso")
        if(data.nit.value.length===17){
          console.log("quinto paso, se logró")
          correct=true;
          return correct
        }
      }else{
        return correct
      }
    }else{
      return correct
    }
  }else{
    return correct
  }

}
  export default personValidation;