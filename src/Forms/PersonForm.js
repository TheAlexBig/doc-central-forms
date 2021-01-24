import React, { useState } from "react";
import DefaultForm from "./DefaultForm";
import NumberToWord from "../Functions/NumberToWord";
import NumberToLetter from "../Functions/NumberToLetter";
import { DataAgent } from "../Data/DataAgent";
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';


const PersonForm = (props) => {

  const style = {
    container: {
      display: "flex",
      flexDirection: "column",
      width: "20vw",
      padding: "10px"
    },
  };
  if (!ValidatorForm.hasValidationRule('isPasswordMatch')) {
    ValidatorForm.addValidationRule('isPasswordMatch', () => {
        if (!/^(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)+$/.test(props.data.nombres.value)) {
            return false;
        }
        return true;
    });
}

return(
  <div>
    <ValidatorForm style={style.container} onSubmit={props.submit}>
      <TextValidator
      style={style.container}
      label={props.data.nombres.label}
      onChange={(event) => props.changed(event, "nombres")}
      name="nombres"
      validators={['isPasswordMatch', 'required']}
      errorMessages={['solo letras', 'no vacio']}
      value={props.data.nombres.value}
      />
      <Button type="submit">Guardar</Button>
    </ValidatorForm>
  </div>
)
};


export default PersonForm;


// vista =(
//   <div >           
//   <PersonForm
//           data={personStates}
//           changed={changePersonHandler}
//           submit={(event)=>handlePersonSubmit(event)}
//         />
//   {viewModal?
//       <div>
//         <ConfirmDataView
//         data={savedPersonStates}
//         confirm={(event) => changeState(event, 'person')}
//         stay={(event)=>stayEvent(event)}
//         />
//       </div>
//     :null}
// </div>
// );