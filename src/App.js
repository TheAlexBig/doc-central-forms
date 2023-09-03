import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DataPerson } from './Data/DataPerson';
import { DataCar } from './Data/DataCar';
import { DataAgent } from './Data/DataAgent';
import { DataDetails } from './Data/DataDetails';
import CarSale from './Forms/CarSale';
import Blog from './HomePage/Blog';
import GetAge from './Functions/GetAge';

const App = () => {
  const [savedDetailStates, setSavedDetailStates] = useState(
    JSON.parse(JSON.stringify(DataDetails))
  );
  const [savedVendorStates, setSavedVendorStates] = useState(
    JSON.parse(JSON.stringify(DataPerson))
  );

  const [savedPersonStates, setSavedPersonStates] = useState(
    JSON.parse(JSON.stringify(DataPerson))
  );

  const [savedCarStates, setSavedCarStates] = useState(
    JSON.parse(JSON.stringify(DataCar))
  );

  const [, setSavedAgent] = useState({
    savedAgent: '',
  });

  const selectAgent = (id) => {
    setSavedAgent({ savedAgent: DataAgent[id] });
  };

  const handlePersonSubmit = (values) => {
    setSavedPersonStates({
      ...values,
      edad: GetAge(values.fecha_nacimiento),
    });
  };

  const handleVendorSubmit = (values) => {
    setSavedVendorStates({
      ...values,
      edad: GetAge(values.fecha_nacimiento),
    });
  };

  const handleCarSubmit = (values) => {
    setSavedCarStates(values);
  };

  const handleDetailSubmit = (values) => {
    setSavedDetailStates(values);
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
                data: savedPersonStates,
                save: handlePersonSubmit,
              }}
              carProps={{ data: savedCarStates, save: handleCarSubmit }}
              vendorProps={{
                data: savedVendorStates,
                save: handleVendorSubmit,
              }}
              detailProps={{
                data: savedDetailStates,
                save: handleDetailSubmit,
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
