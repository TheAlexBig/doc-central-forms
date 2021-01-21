import React from "react";

const InputTextView = (props) => {
  let typeInput = null;

  const style = {
    container: {
      display: "flex",
      flexDirection: "column",
      margin: "0px 0px 15px 0px",
    },
  };

  const input = (toMask) => {
    typeInput = (

            <label style={style.container} >{props.atributo.label}
          <input onChange={props.changed}/>
          </label>
    );
    return typeInput;
  };

  switch (props.atributo.type) {
    case "date": {
      input("date");
      break;
    }
    case "hour": {
      input("hour");
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