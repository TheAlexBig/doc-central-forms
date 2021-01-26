import React from "react";
import { DataDepMuni } from "../Data/DataDepMuni";
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

const InputSelectView = (props) => {
  let typeInput = null;

  const style = {
    container: {
      display: "flex",
      flexDirection: "column",
    },
  };

  const input = (toMap) => {
    typeInput = (
      <FormControl style={style.container}>
      <InputLabel id={props.atributo.label} > {props.atributo.label} </InputLabel>        
        <Select labelId={props.atributo.label} onChange={props.changed} value={props.atributo.value}  required>
          {toMap.map((opt, index) => {
            return <MenuItem value={opt}>{opt}</MenuItem>;
          })}
        </Select>
      </FormControl>

    );
    return typeInput;
  };

  switch (props.atributo.label) {
    case "Domicilio": {
      input(DataDepMuni[props.data["departamento"].value]);
      break;
    }
    case "Departamento": {
      input(Object.keys(DataDepMuni));
      break;
    }
    default: {
      input(props.atributo.option);
      break;
    }
  }
  return <div>{typeInput}</div>;
};
export default InputSelectView;
