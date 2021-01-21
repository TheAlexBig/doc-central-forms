import React from "react";
import { DataDepMuni } from "../Data/DataDepMuni";
import InputMask from "react-input-mask";

const InputSelectView = (props) => {
  let typeInput = null;

  const style = {
    container: {
      display: "flex",
      flexDirection: "column",
      margin: "0px 0px 15px 0px",
    },
  };

  const input = (toMap) => {
    typeInput = (
      <label style={style.container}>
        {props.atributo.label}
        <select onChange={props.changed}>
          {toMap.map((opt, index) => {
            return <option value={opt}>{opt}</option>;
          })}
        </select>
      </label>
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
