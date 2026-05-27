import { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';
import { DataPerson } from './Data/DataPerson';
import { DataCar } from './Data/DataCar';
import { DataDetails } from './Data/DataDetails';
import GetAge from './Functions/GetAge';
import { createCarSalePayload } from './Forms/CarSalePayload';
import { downloadCarSaleDocument } from './Api/DocumentsApi';
import {
  createAgent,
  deleteAgent,
  listAgents,
  updateAgent,
} from './Api/AgentsApi';
import theme from './Theme';

const Blog = lazy(() => import('./HomePage/Blog'));
const CarSale = lazy(() => import('./Forms/CarSale'));

const initialState = {
  detailStates: JSON.parse(JSON.stringify(DataDetails)),
  vendorStates: JSON.parse(JSON.stringify(DataPerson)),
  personStates: JSON.parse(JSON.stringify(DataPerson)),
  carStates: JSON.parse(JSON.stringify(DataCar)),
  agentStates: '',
};

const App = () => {
  const [state, setState] = useState(initialState);
  const [agents, setAgents] = useState([]);
  const [agentsLoading, setAgentsLoading] = useState(true);
  const [agentError, setAgentError] = useState('');
  const documentData = createCarSalePayload(state);

  useEffect(() => {
    listAgents()
      .then(setAgents)
      .catch((error) => setAgentError(error.message))
      .finally(() => setAgentsLoading(false));
  }, []);

  const selectAgent = (agent) => {
    setState((currentState) => ({
      ...currentState,
      agentStates: agent,
    }));
  };

  const saveAgent = async (agent) => {
    setAgentError('');
    try {
      const savedAgent = await createAgent(agent);
      setAgents((currentAgents) => [...currentAgents, savedAgent]);
      return true;
    } catch (error) {
      setAgentError(error.message);
      return false;
    }
  };

  const removeAgent = async (agent) => {
    setAgentError('');
    try {
      await deleteAgent(agent.id);
      setAgents((currentAgents) =>
        currentAgents.filter((currentAgent) => currentAgent.id !== agent.id)
      );
      setState((currentState) => ({
        ...currentState,
        agentStates:
          currentState.agentStates?.id === agent.id
            ? ''
            : currentState.agentStates,
      }));
    } catch (error) {
      setAgentError(error.message);
    }
  };

  const editAgent = async (agent) => {
    setAgentError('');
    try {
      const savedAgent = await updateAgent(agent.id, agent);
      setAgents((currentAgents) =>
        currentAgents.map((currentAgent) =>
          currentAgent.id === savedAgent.id ? savedAgent : currentAgent
        )
      );
      setState((currentState) => ({
        ...currentState,
        agentStates:
          currentState.agentStates?.id === savedAgent.id
            ? savedAgent
            : currentState.agentStates,
      }));
      return true;
    } catch (error) {
      setAgentError(error.message);
      return false;
    }
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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Suspense
          fallback={
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                minHeight: '60vh',
                justifyContent: 'center',
              }}
            >
              <CircularProgress size={32} />
              <Typography color="text.secondary">
                Preparando Central Docs...
              </Typography>
            </Box>
          }
        >
          <Routes>
            <Route
              exact
              path="/compra-venta"
              element={
                <CarSale
                  agentProps={{
                    data: agents,
                    loading: agentsLoading,
                    error: agentError,
                    save: selectAgent,
                    create: saveAgent,
                    update: editAgent,
                    remove: removeAgent,
                  }}
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
                  documentData={documentData}
                  generateDocument={() => downloadCarSaleDocument(documentData)}
                />
              }
            />
            <Route exact path="/" element={<Blog />} />
          </Routes>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
};

export default App;
