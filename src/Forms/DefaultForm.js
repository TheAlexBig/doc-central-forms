import React from "react";
import { DataDepMuni } from "../Data/DataDepMuni";
import InputMask from "react-input-mask";

const DefaultForm = (props) => {
  const style = {
    container: {
      display: "flex",
      flexDirection: "column",
      margin: "15px 0px 15px 0px",
      width: "25%",
    },
  };
  let typeInput = null;
  switch (props.text) {
    case "Domicilio": {
      typeInput = (
        <div style={style.container}>
          <label for={props.id}>{props.text}</label>
          <select id={props.id} onChange={props.changed}>
            {DataDepMuni[props.dep].map((dep, index) => {
              return <option value={dep}>{dep}</option>;
            })}
          </select>
        </div>
      );
      break;
    }
    case "Departamento": {
        typeInput = (
          <div style={style.container}>
            <label for={props.id}>{props.text}</label>
            <select id={props.id} onChange={props.changed}>
              {Object.keys(DataDepMuni).map((dep, index) => {
                return <option value={dep}>{dep}</option>;
              })}
            </select>
          </div>
        );
        break;
      }
      case "Documento": {
        typeInput = (
          <div style={style.container}>
              <label for={props.id}>{props.text}</label>
            <InputMask mask="99999999-9" id={props.id}  onChange={props.changed}/>
          </div>
        );
        break;
      }
      case "NIT": {
        typeInput = (
          <div style={style.container}>
              <label for={props.id}>{props.text}</label>
            <InputMask mask="9999-999999-999-9" id={props.id}  onChange={props.changed}/>
          </div>
        );
        break;
      }
      case "Genero": {
        typeInput = (
          <div style={style.container}>
            <label for={props.id}>{props.text}</label>
            <select id={props.id} onChange={props.changed}>
              {props.gen.map((dep, index) => {
                return <option value={dep}>{dep}</option>;
              })}
            </select>
          </div>
        );
        break;
      }
    default: {
      typeInput = (
        <div style={style.container}>
            <label for={props.id}>{props.text}</label>
          <input id={props.id} type="text" onChange={props.changed}></input>
        </div>
      );
      break;
    }
  }
  return <div>{props.text != "Id" ?  typeInput  : null}</div>;
};
export default DefaultForm;
