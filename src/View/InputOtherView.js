import React , { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const InputTextView = (props) => {
  let typeInput = null;
  const [conoce, setConoce] = useState(false);
  const style = {
    container: {
      display: "flex",
      // flexDirection: "column",
      // margin: "0px 0px 15px 0px",
    },
  };

  const input = (type) => {
if(type==="number"){
typeInput=(
  <TextField
    style={style.container}
    label={props.atributo.label}
    onChange={props.changed}
    type={type}
    required
  />
);
}
if(type==="checkbox"){
  typeInput=(
    <FormControlLabel
    control={
      <Checkbox
      onClick={() => setConoce(!conoce)}
        onChange={props.changed}
        value={conoce?"No":"Sí"}
        color="primary"
        size="small"
        name="conoce"
      />
    }
    label={props.atributo.label}
  />
  )

}else{
  typeInput = (
      <TextField
      style={style.container}
        label={props.atributo.label}
        type={type}
        onChange={props.changed}
        required
        value={props.atributo.value} 
        InputLabelProps={{
          shrink: true,
        }}
      />

  );
}
    return typeInput;
  };

  switch (props.atributo.type) {
    case "date": {
      input(props.atributo.type);
      break;
    }
    case "time": {
      input(props.atributo.type);
      break;
    }
    default: {
      input(props.atributo.type);
      break;
    }
  }
  return <div>{typeInput}</div>;
};
export default InputTextView;
