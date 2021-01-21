import React from "react";
import InputMask from "react-input-mask";

const InputTextView = (props) => {
  let typeInput = null;
  const nit = "9999-999999-999-9";
  const dui = "99999999-9";

  const style = {
    container: {
      display: "flex",
      flexDirection: "column",
      margin: "0px 0px 15px 0px",
    },
  };

  const input = (toMask) => {
    if (toMask == null) {
      if (props.atributo.type == "text") {
        typeInput = (
          <label style={style.container}>
            {props.atributo.label}
            <input type="text" onChange={props.changed} />
          </label>
        );
      } else {
        typeInput = (
          <label style={style.container}>
            {props.atributo.label}
            <input type="text" onChange={props.changed} />
          </label>
        );
      }
    } else {
      typeInput = (
        <label style={style.container}>
          {props.atributo.label}
          <InputMask mask={toMask} onChange={props.changed} maskChar="" />
        </label>
      );
    }
    return typeInput;
  };

  switch (props.atributo.label) {
    case "Documento": {
      input(dui);
      break;
    }
    case "NIT": {
      input(nit);
      break;
    }
    default: {
      input(null);
      break;
    }
  }
  return <div>{typeInput}</div>;
};
export default InputTextView;
