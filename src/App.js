import React, { useState } from "react";
import "./App.css";
import SelectAgentView from "./View/SelectAgentView";
import ConfirmDataView from "./View/ConfirmDataView";
import { DataPerson } from "./Data/DataPerson";
import { DataCar } from "./Data/DataCar";
import { DataAgent } from "./Data/DataAgent";
import {DataDetails} from "./Data/DataDetails";
import DefaultForm from "./Forms/DefaultForm";

const App = () => {

  let vista=null;
  let verificar=null;
  const[step, setStep]=useState({
    show:'agent'
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
    event.preventDefault();
    setSavedPersonStates(personStates);
    SetViewModal(true)
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
    event.preventDefault();
    setSavedCarStates(carStates);
    SetViewModal(true)
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
      vista =(
        <div>
          
        <form onSubmit={handlePersonSubmit}>
          {Object.keys(personStates).map((atributo, index) => {
            return (
              <DefaultForm
                key={personStates[atributo].label}
                id={atributo}
                text={personStates[atributo].label}
                dep={personStates.departamento.value}
                gen={personStates.genero.option}
                changed={(event) => changePersonHandler(event, atributo)}
              />
            );
          })}
          <button type="submit">Guardar</button>
        </form>
        {viewModal?
            <div>
              <ConfirmDataView
              data={savedPersonStates}
              confirm={(event) => changeState(event, 'car')}
              stay={(event)=>stayEvent(event)}
              />
            </div>
          :null}
      </div>
      );
      break;
    }
    case 'car':{
      vista=(
        <div>
        <form onSubmit={handleCarSubmit}>
          {Object.keys(carStates).map((atributo, index) => {
            return (
              <DefaultForm
                key={atributo}
                id={atributo}
                text={carStates[atributo].label}
                type="text"
                changed={(event) => changeCarHandler(event, atributo)}
              />
            );
          })}
          <button type="submit">Guardar</button>
        </form>
        {viewModal?
            <div>
              <ConfirmDataView
              data={savedCarStates}
              confirm={(event) => changeState(event, 'detail')}
              stay={(event)=>stayEvent(event)}
              />
            </div>
          :null}
      </div>
      );
      break;
    }
    case 'detail':{
      vista=(
        <div>
        <form onSubmit={handleDetailSubmit}>
          {Object.keys(detailStates).map((atributo, index) => {
            return (
              <DefaultForm
                key={atributo}
                id={atributo}
                text={detailStates[atributo].label}
                dep={detailStates.departamento.value}
                changed={(event) => changeDetailHandler(event, atributo)}
              />
            );
          })}
          <button type="submit">Guardar</button>
        </form>
        {viewModal?
            <div>
              <ConfirmDataView
              data={savedDetailStates}
              confirm={(event) => changeState(event, 'agent')}
              stay={(event)=>stayEvent(event)}
              />
            </div>
          :null}
      </div>
      );
      break;
    }
  }


  return (
    <div>
      {vista}
      {verificar}

    </div>
  );
};

export default App;
