import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import { DataPerson } from "./Data/DataPerson";
import { DataCar } from "./Data/DataCar";
import { DataAgent } from "./Data/DataAgent";
import { DataDetails } from "./Data/DataDetails";
import Stepper from "./Utils/Stepper";
import Blog from "./HomePage/Blog";

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

  const [, setAgent] = useState({
    savedAgent: "",
  });

  const selectAgent = (event, id) => {
    setAgent({ savedAgent: DataAgent[id] });
  };

  const handlePersonSubmit = (values) => {
    setSavedPersonStates(values);
  };

  const handleVendorSubmit = (values) => {
    setSavedVendorStates(values);
  };

  const handleCarSubmit = (values) => {
    setSavedCarStates(values);
  };

  const handleDetailSubmit = (values) => {
    setSavedDetailStates(values);
  };

  // const style = {
  // };

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/compra-venta">
            <Stepper
              dataA={DataAgent}
              saveA={selectAgent}
              dataP={savedPersonStates}
              saveP={handlePersonSubmit}
              dataV={savedVendorStates}
              saveV={handleVendorSubmit}
              dataC={savedCarStates}
              saveC={handleCarSubmit}
              dataD={savedDetailStates}
              saveD={handleDetailSubmit}
            />
          </Route>
          <Route exact path="/">
            <Blog />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
