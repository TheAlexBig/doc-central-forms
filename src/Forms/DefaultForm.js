import React from "react";
import InputSelectView from "../View/InputSelectView";
import InputTextView from "../View/InputTextView";
import InputOtherView from "../View/InputOtherView";

const DefaultForm = (props) => {
  const style = {
    container: {
      display: "flex",
      flexDirection: "column",
      width: "20vw",
      padding: "10px"
    },
  };
  let input = null;

  switch (props.atributo.type) {
    case "select": {
      input = (
          <InputSelectView 
          data={props.data}
          atributo={props.atributo}
          changed={props.changed}
          />
      );
      break;
    }
    case("text-num"):
    case("text"):
    case ("textnum"):{
      input=(
        <InputTextView 
        atributo={props.atributo}
        changed={props.changed}
        />
      );
      break;
    }
    default:{
      input=(
        <InputOtherView 
          atributo={props.atributo}
          changed={props.changed}/>
      )
      break;
    }
  }
  return <div style={style.container}>{(props.atributo.label !== "Id" && props.atributo.label !== "Edad") ?  input  : null}</div>;
};
export default DefaultForm;