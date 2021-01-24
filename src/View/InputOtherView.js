import React , { useState } from "react";
import TextField from "@material-ui/core/TextField";

const InputTextView = (props) => {
  let typeInput = null;
  const [isError, setIsError] = useState({
    error:false,
    errorMessage: ""
  })

  const style = {
    container: {
      display: "flex",
      flexDirection: "column",
      // margin: "0px 0px 15px 0px",
    },
  };

  const validateNumber = () =>{
    if(!/^[0-9]+$/.test(props.atributo.value)){
      setIsError({
        error:true,
        errorMessage:"Solo se admiten numeros"
      })
    }else{
      setIsError({
        error:false,
        errorMessage:""
      })
    }
  }

  const input = (type) => {
if(type==="number"){
typeInput=(
  <TextField
  error={isError.error}
  helperText={isError.errorMessage}
    style={style.container}
    label={props.atributo.label}
    onChange={props.changed}
    type={type}
    onBlur={validateNumber}
    onKeyUp={validateNumber}
    required
  />
);
}else{
  typeInput = (
    <div style={style.container}>
      <TextField
        id="date"
        label={props.atributo.label}
        type={type}
        onChange={props.changed}
        required
        InputLabelProps={{
          shrink: true,
        }}
      />
    </div>
  );
}
    return typeInput;
  };

  switch (props.atributo.type) {
    case "date": {
      input("date");
      break;
    }
    case "time": {
      input("time");
      break;
    }
    default: {
      input("number");
      break;
    }
  }
  return <div>{typeInput}</div>;
};
export default InputTextView;
