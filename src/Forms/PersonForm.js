import React, { useState } from "react";
import DefaultForm from "./DefaultForm";
import NumberToWord from "../Functions/NumberToWord";
import NumberToLetter from "../Functions/NumberToLetter";
import { DataAgent } from "../Data/DataAgent";

const DataPerson = {
  "id":{label: "Id", value:"01", type:"text"}, 
  "nombres":{label: "Nombres", value:"Gerardo Moe", type:"text"},
  "apellidos":{label:"Apellidos", value:"Rivas contreras", type:"text"},
  "departamento":{label:"Departamento", value:"La libertad", type:"select"},
  "domicilio":{label:"Domicilio", value:"Antiguo Cuscatlan", type:"select"},
  "fecha_nacimiento":{label:"Fecha de nacimiento", value:"25/6/2019", type:"date"},
  "edad":{label:"Edad", value:"25", type:"number"},
  "documento":{label:"Documento", value:"51268929", type:"text"},
  "nit":{label:"NIT", value:"0552-05065-165", type:"text"},
  "genero":{label:"Genero", value:"masculino", type:"select", option:["masculino", "femenino"]},

};


const PersonForm = (props) => {
  const [States, setStates] = useState(
    JSON.parse(JSON.stringify(DataPerson))
  );

  const [deafaultState, setDefaultState] = useState(
    JSON.parse(JSON.stringify(DataPerson))
  );



   function changeHandler (event, atributo) {
    event.preventDefault();
    const persons = {
      ...States,
    };
    persons[atributo].value = event.target.value;
    setStates(persons);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setDefaultState(States);
    
  };

  const style = {
    container: {
      display: "flex",
      //alignItems: 'center',
      justifyContent: "center",
      marginTop: 20,
    },
    forms: {
      width: "50%",
    },
  };

  
  return (
    <div style={style.container}>
      <form style={style.forms} onSubmit={handleSubmit}>

        {Object.keys(States).map((atributo, index) => {
      
          return <DefaultForm
            key={atributo}
            id={atributo}
            text={States[atributo].label}
            type="text"
            changed={(event) => changeHandler(event, atributo)}
          />
        
        })}

  
        <button type="submit">Guardar</button>
      </form>


      {/* PRUEBS */}
      <div style={style.forms}>
        <p> PRUEBAS PERSONA</p>
        <div>
          <p>nombre modificado: {States.nombres.value}</p> 
          <p>nombre default: {deafaultState.nombres.value}</p> 
          <p>lo que viene: {DataPerson.nombres.value}</p>         
        </div>
 
         
        
      </div>
    </div>
  );
};


export default PersonForm;
