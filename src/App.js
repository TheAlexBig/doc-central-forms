import React, { useState } from "react";
import "./App.css";
import SelectAgentView from "./View/SelectAgentView";
import ConfirmDataView from "./View/ConfirmDataView";
import { DataPerson } from "./Data/DataPerson";
import { DataCar } from "./Data/DataCar";
import { DataAgent } from "./Data/DataAgent";
import {DataDetails} from "./Data/DataDetails";
import personValidation from "./Validations/PersonValidation"
import carValidation from "./Validations/CarValidation"
import DefaultForm from "./Forms/DefaultForm";
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import { ValidatorForm} from 'react-material-ui-form-validator';


const App = () => {

  let vista=null;
  let verificar=null;
  const[step, setStep]=useState({
    show:'car'
  });

  const [viewModal, SetViewModal]=useState(false)

  const [detailStates, setDetailStates] = useState(
    JSON.parse(JSON.stringify(DataDetails))
  );

  const [savedDetailStates, setSavedDetailStates] = useState(
    JSON.parse(JSON.stringify(DataDetails))
  );

  const [personStates, setPersonStates] = useState(
    JSON.parse(JSON.stringify(DataPerson))
  );

  const [savedPersonStates, setSavedPersonStates] = useState(
    JSON.parse(JSON.stringify(DataPerson))
  );

  const [carStates, setCarStates] = useState(
    JSON.parse(JSON.stringify(DataCar))
  );

  const [savedCarStates, setSavedCarStates] = useState(
    JSON.parse(JSON.stringify(DataCar))
  );

  const [agent, setAgent] = useState({
    savedAgent: '',
  });

  const selectAgent = (event, id) => {    
    setAgent({savedAgent:DataAgent[id]})
    console.log(agent.savedAgent)
  };

  const changePersonHandler = (event, atributo) => {
    const persons = {
      ...personStates,
    };
    persons[atributo].value = event.target.value;
    setPersonStates(persons);
    
  };

  const handlePersonSubmit = (event) => {
    if(personValidation(personStates)){
      event.preventDefault();
      setSavedPersonStates(personStates);
      SetViewModal(true)

    }
  };

  const changeState = (event, next) =>{
    setStep({show:next})
    SetViewModal(false)
  };

  const stayEvent = (event)=>{
    SetViewModal(false)
  }
  const changeCarHandler = (event, atributo) => {
    const cars = {
      ...carStates,
    };
    cars[atributo].value = event.target.value;
    setCarStates(cars);
  };

  const handleCarSubmit = (event) => {
    if(carValidation(carStates)){
      event.preventDefault();
      setSavedCarStates(carStates);
      SetViewModal(true)
    }

  };

  const changeDetailHandler = (event, atributo) => {
    const details = {
      ...detailStates,
    };
    details[atributo].value = event.target.value;
    setDetailStates(details);
  };

  const handleDetailSubmit = (event) => {
    event.preventDefault();
    setSavedDetailStates(detailStates);
    SetViewModal(true)
  };

  const style = {
    container: {
      display: "flex",
      flexDirection: "column",
      backgroundColor:"white"
    },
  };

  const setVista = (data, savedData, textData, handler, press) =>{
    vista =(
      <div >
        
      <ValidatorForm style={style.container} onSubmit={press}>
        {Object.keys(data).map((atributo, index) => {
          return (
            <DefaultForm
              key={data[atributo].label}
              data={data}
              atributo={data[atributo]}
              changed={(event) => handler(event, atributo)}
            />
          );
        })}
        <Button type="submit">Guardar</Button>
      </ValidatorForm>
      {viewModal?
          <div>
            <ConfirmDataView
            data={savedData}
            confirm={(event) => changeState(event, textData)}
            stay={(event)=>stayEvent(event)}
            />
          </div>
        :null}
    </div>
    );
  return vista;
  }

  switch(step.show){
    default:{
      vista =(
        <div>
        {DataAgent.map((agent, index) => {
          return (
            <SelectAgentView
              key={agent.id.value}
              agent={agent}
              click={(event) => {selectAgent(event, agent.id.value); changeState(event, 'person')}}
            />
          );
        })}
      </div>
      );
       break;
    }
    case 'person':{
      setVista(personStates, savedPersonStates, 'car', changePersonHandler, handlePersonSubmit);
      break;
    }
    case 'car':{
      setVista(carStates, savedCarStates, 'detail', changeCarHandler, handleCarSubmit);
      break;
    }
    case 'detail':{
     setVista(detailStates, savedDetailStates, 'agent', changeDetailHandler, handleDetailSubmit)
      break;
    }
  }


  return (
    <div style={{display: "flex", backgroundColor:"#eeeeee",  height:"100vh", justifyContent:"center", alignItems:"center"}} >
      {vista}
      {verificar}

    </div>
  );
};

export default App;
