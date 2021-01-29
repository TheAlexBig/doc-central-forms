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
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { ValidatorForm} from 'react-material-ui-form-validator';
import GetAge from './Functions/GetAge'
import PersonForm from "./Forms/PersonForm";
import CarForm from "./Forms/CarForm";
import Stepper from "./Utils/Stepper"
import Contact from "./p"


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

  const [vendorStates, setVendorStates] = useState(
    JSON.parse(JSON.stringify(DataPerson))
  );

  const [savedVendorStates, setSavedVendorStates] = useState(
    DataPerson
  );

  const [personStates, setPersonStates] = useState(
    JSON.parse(JSON.stringify(DataPerson))
  );

  const [savedPersonStates, setSavedPersonStates] = useState(
    DataPerson
  );

  const [carStates, setCarStates] = useState(
    JSON.parse(JSON.stringify(DataCar))
  );

  const [savedCarStates, setSavedCarStates] = useState(
    ''
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

  const handlePersonSubmit = (values) => {
      setSavedPersonStates(values);
  };

  const changeVendorHandler = (event, atributo) => {
    const vendors = {
      ...vendorStates,
    };
    vendors[atributo].value = event.target.value;
    setVendorStates(vendors);
    
  };

  const handleVendorSubmit = (event) => {
    if(personValidation(vendorStates)){
      event.preventDefault();
      setSavedVendorStates(vendorStates);
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

  const handleCarSubmit = (values) => {
      setSavedCarStates(values);
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
      marginTop:-10,

    },
  };

  const setVista = (data, savedData, textData, handler, press, label) =>{
    vista =(
      <Paper elevation={2} style={{width: "25%"}}>
        <Typography variant="h5" style={{display:"flex", justifyContent:"center", alignItems:"center"}}>{label}</Typography>
        <Divider />
      <ValidatorForm  style={style.container} onSubmit={press}>
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
    </Paper>
    );
  return vista;
  }

  switch(step.show){
    default:{
      vista =(
        <div style={{display:"flex", height:"100%", width:"100%", justifyContent:"space-evenly", alignItems:"center"}}>
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
      setVista(personStates, savedPersonStates, 'vendor', changePersonHandler, handlePersonSubmit, "Datos del Comprador");
      break;
    }
    case 'vendor':{
      setVista(vendorStates, savedVendorStates, 'car', changeVendorHandler, handleVendorSubmit, "Datos del Vendedor");
      break;
    }
    case 'car':{
      setVista(carStates, savedCarStates, 'detail', changeCarHandler, handleCarSubmit, "Datos del Vehiculo");
      break;
    }
    case 'detail':{
     setVista(detailStates, savedDetailStates, 'agent', changeDetailHandler, handleDetailSubmit, "Datos adicionales")
      break;
    }
  }


  return (
    <div  >
            {/* <Paper elevation={2} style={{width: "25%"}}>
        <Typography variant="h5" style={{display:"flex", justifyContent:"center", alignItems:"center"}}>Formulario Persona</Typography>
        <Divider /><PersonForm
      submit={handlePersonSubmit}
      />
      </Paper>
      <Paper elevation={2} style={{width: "25%"}}>
        <Typography variant="h5" style={{display:"flex", justifyContent:"center", alignItems:"center"}}>Formulario de carro</Typography>
        <Divider /><CarForm
      submit={handleCarSubmit}
      />
      </Paper> */}
      <Stepper 
      data={savedPersonStates}
      data1={savedVendorStates}
      save={handlePersonSubmit}/>
      <p>{savedPersonStates.nombre} y {savedVendorStates.nombre}</p>
      <p>{savedPersonStates.genero}</p>
      <p>{savedCarStates.placa}</p>
      {/* <Contact/> */}
    </div>
  );
};

export default App;
