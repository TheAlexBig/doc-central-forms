import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DataPerson } from './Data/DataPerson';
import { DataCar } from './Data/DataCar';
import { DataAgent } from './Data/DataAgent';
import { DataDetails } from './Data/DataDetails';
import CarSale from './Forms/CarSale';
import Blog from './HomePage/Blog';
import GetAge from './Functions/GetAge';

const initialState = {
  detailStates: JSON.parse(JSON.stringify(DataDetails)),
  vendorStates: JSON.parse(JSON.stringify(DataPerson)),
  personStates: JSON.parse(JSON.stringify(DataPerson)),
  carStates: JSON.parse(JSON.stringify(DataCar)),
  agentStates: '',
};

const App = () => {
  const [state, setState] = useState(initialState);

  const selectAgent = (id) => {
    setState({
      ...state,
      agentStates: DataAgent[id],
    });
  };

  const personSubmit = (values) => {
    setState({
      ...state,
      personStates: {
        ...values,
        edad: GetAge(values.fecha_nacimiento),
      },
    });
  };

  const vendorSubmit = (values) => {
    setState({
      ...state,
      vendorStates: {
        ...values,
        edad: GetAge(values.fecha_nacimiento),
      },
    });
  };

  const carSubmit = (values) => {
    setState({
      ...state,
      carStates: values,
    });
  };

  const detailSubmit = (values) => {
    setState({
      ...state,
      detailStates: values,
    });
  };

  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/compra-venta"
          element={
            <CarSale
              agentProps={{ data: DataAgent, save: selectAgent }}
              personProps={{
                data: state.personStates,
                save: personSubmit,
              }}
              carProps={{ data: state.carStates, save: carSubmit }}
              vendorProps={{
                data: state.vendorStates,
                save: vendorSubmit,
              }}
              detailProps={{
                data: state.detailStates,
                save: detailSubmit,
              }}
            />
          }
        />
        <Route exact path="/" element={<Blog />} />
      </Routes>
    </Router>
  );
};

export default App;
