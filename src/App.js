import React, { useState } from 'react';
import './App.css';
import PersonForm from "./Forms/PersonForm";
import {DataPerson} from "./Data/DataPerson"

const App =() =>{
  const [personState, setPersonState] = useState({
    person:DataPerson.person
  });
    return (
      <div>
        <PersonForm
        dataPerson={personState.person}        
        />
      </div>
    );
  }


export default App;
