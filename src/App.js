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
import {
  downloadCarSaleDocument,
  downloadHistoryDocument,
  listDocumentHistory,
} from './Api/DocumentsApi';
import {
  deletePerson,
  listOccupations,
  listPeople,
  savePerson,
} from './Api/PeopleApi';
import {
  listVehicleOptions,
  removeVehicleOption,
  saveVehicle,
} from './Api/VehiclesApi';
import { normalizeDui } from './Forms/PersonMemory';
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

const moveOptionToTop = (options, nextOption) => [
  nextOption,
  ...options.filter(
    (option) => option.toLocaleLowerCase() !== nextOption.toLocaleLowerCase()
  ),
];

const App = () => {
  const [state, setState] = useState(initialState);
  const [agents, setAgents] = useState([]);
  const [savedPeople, setSavedPeople] = useState([]);
  const [occupationOptions, setOccupationOptions] = useState([]);
  const [vehicleOptions, setVehicleOptions] = useState({
    colors: [],
    brands: [],
    models: [],
    modelsByBrand: {},
  });
  const [agentsLoading, setAgentsLoading] = useState(true);
  const [agentError, setAgentError] = useState('');
  const [peopleError, setPeopleError] = useState('');
  const [vehicleError, setVehicleError] = useState('');
  const [documentHistory, setDocumentHistory] = useState([]);
  const [historyError, setHistoryError] = useState('');
  const [activeDraft, setActiveDraft] = useState(null);
  const documentData = createCarSalePayload(state);

  useEffect(() => {
    listAgents()
      .then(setAgents)
      .catch((error) => setAgentError(error.message))
      .finally(() => setAgentsLoading(false));
  }, []);

  useEffect(() => {
    Promise.all([listPeople(), listOccupations()])
      .then(([people, occupations]) => {
        setSavedPeople(people);
        setOccupationOptions(occupations);
      })
      .catch((error) => setPeopleError(error.message));
  }, []);

  useEffect(() => {
    listVehicleOptions()
      .then(setVehicleOptions)
      .catch((error) => setVehicleError(error.message));
  }, []);

  const refreshDocumentHistory = async () => {
    try {
      setDocumentHistory(await listDocumentHistory());
      setHistoryError('');
    } catch (error) {
      setHistoryError(error.message);
    }
  };

  useEffect(() => {
    refreshDocumentHistory();
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

  const savePersonMemory = async (values) => {
    setPeopleError('');
    try {
      const savedPerson = await savePerson(values);
      const savedDui = normalizeDui(savedPerson.documento);
      setSavedPeople((currentPeople) => [
        savedPerson,
        ...currentPeople.filter(
          (currentPerson) => normalizeDui(currentPerson.documento) !== savedDui
        ),
      ]);
      setOccupationOptions((currentOccupations) => [
        savedPerson.oficio,
        ...currentOccupations.filter(
          (occupation) =>
            occupation.toLocaleLowerCase() !==
            savedPerson.oficio.toLocaleLowerCase()
        ),
      ]);
      return true;
    } catch (error) {
      setPeopleError(error.message);
      return false;
    }
  };

  const personSubmit = async (values) => {
    const saved = await savePersonMemory(values);
    if (!saved) {
      return false;
    }
    setState({
      ...state,
      personStates: {
        ...values,
        edad: GetAge(values.fecha_nacimiento),
      },
    });
    return true;
  };

  const vendorSubmit = async (values) => {
    const saved = await savePersonMemory(values);
    if (!saved) {
      return false;
    }
    setState({
      ...state,
      vendorStates: {
        ...values,
        edad: GetAge(values.fecha_nacimiento),
      },
    });
    return true;
  };

  const carSubmit = async (values) => {
    setVehicleError('');
    try {
      const savedVehicle = await saveVehicle(values);
      setVehicleOptions((currentOptions) => {
        const brandModels =
          currentOptions.modelsByBrand[savedVehicle.marca] || [];
        return {
          colors: moveOptionToTop(currentOptions.colors, savedVehicle.color),
          brands: moveOptionToTop(currentOptions.brands, savedVehicle.marca),
          models: moveOptionToTop(currentOptions.models, savedVehicle.modelo),
          modelsByBrand: {
            ...currentOptions.modelsByBrand,
            [savedVehicle.marca]: moveOptionToTop(
              brandModels,
              savedVehicle.modelo
            ),
          },
        };
      });
    } catch (error) {
      setVehicleError(error.message);
      return false;
    }
    setState({
      ...state,
      carStates: values,
    });
    return true;
  };

  const detailSubmit = (values) => {
    setState({
      ...state,
      detailStates: values,
    });
  };

  const loadHistoryDraft = (historyItem) => {
    setState({
      ...initialState,
      ...historyItem.draft,
    });
    setActiveDraft(historyItem);
  };

  const clearHistoryDraft = () => {
    setState(initialState);
    setActiveDraft(null);
  };

  const downloadHistoricalDocument = async (historyItem, format) => {
    try {
      setHistoryError('');
      await downloadHistoryDocument(historyItem.id, format);
    } catch (error) {
      setHistoryError(error.message);
    }
  };

  const removeVehicleCatalogOption = async (kind, value) => {
    try {
      setVehicleError('');
      setVehicleOptions(await removeVehicleOption(kind, value));
    } catch (error) {
      setVehicleError(error.message);
    }
  };

  const removeSavedPerson = async (person) => {
    setPeopleError('');
    try {
      await deletePerson(person.documento);
      setSavedPeople((currentPeople) =>
        currentPeople.filter(
          (currentPerson) =>
            normalizeDui(currentPerson.documento) !==
            normalizeDui(person.documento)
        )
      );
      const people = await listPeople();
      const occupations = await listOccupations();
      setSavedPeople(people);
      setOccupationOptions(occupations);
    } catch (error) {
      setPeopleError(error.message);
    }
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
                    error: peopleError,
                    people: savedPeople,
                    occupations: occupationOptions,
                    save: personSubmit,
                  }}
                  carProps={{
                    data: state.carStates,
                    error: vehicleError,
                    options: vehicleOptions,
                    save: carSubmit,
                  }}
                  vendorProps={{
                    data: state.vendorStates,
                    error: peopleError,
                    people: savedPeople,
                    occupations: occupationOptions,
                    save: vendorSubmit,
                  }}
                  detailProps={{
                    data: state.detailStates,
                    save: detailSubmit,
                  }}
                  documentData={documentData}
                  generateDocument={async (format) => {
                    await downloadCarSaleDocument(documentData, state, format);
                    await refreshDocumentHistory();
                  }}
                  historyProps={{
                    data: documentHistory,
                    error: historyError,
                    activeDraft,
                    clearDraft: clearHistoryDraft,
                    load: loadHistoryDraft,
                    download: downloadHistoricalDocument,
                  }}
                  settingsProps={{
                    error: vehicleError || peopleError,
                    people: savedPeople,
                    vehicleOptions,
                    removePerson: removeSavedPerson,
                    removeVehicleOption: removeVehicleCatalogOption,
                  }}
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
