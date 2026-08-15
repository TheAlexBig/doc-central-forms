import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';
import { createCarSalePayload } from './Forms/CarSalePayload';
import { createCarSaleReviewData } from './Forms/CarSaleReviewData';
import { downloadCarSaleDocument } from './Api/DocumentsApi';
import { useAgents } from './Hooks/useAgents';
import { useCarSaleFormState } from './Hooks/useCarSaleFormState';
import { useDesktopDiagnostics } from './Hooks/useDesktopDiagnostics';
import { useDocumentHistory } from './Hooks/useDocumentHistory';
import { usePeopleMemory } from './Hooks/usePeopleMemory';
import { useVehicleMemory } from './Hooks/useVehicleMemory';
import theme from './Theme';

const Blog = lazy(() => import('./HomePage/Blog'));
const CarSale = lazy(() => import('./Forms/CarSale'));

const App = () => {
  const form = useCarSaleFormState();
  const peopleMemory = usePeopleMemory();
  const vehicleMemory = useVehicleMemory();
  const history = useDocumentHistory();
  const desktopDiagnostics = useDesktopDiagnostics();
  const agentsMemory = useAgents({
    clearSelectedAgent: form.clearSelectedAgent,
    updateSelectedAgent: form.updateSelectedAgent,
  });
  const { state } = form;
  const documentData = createCarSalePayload(state);
  const reviewData = createCarSaleReviewData(state);

  const personSubmit = async (values) => {
    const saved = await peopleMemory.savePersonMemory(values);
    if (!saved) {
      return false;
    }
    form.saveBuyer(values);
    return true;
  };

  const vendorSubmit = async (values) => {
    const saved = await peopleMemory.savePersonMemory(values);
    if (!saved) {
      return false;
    }
    form.saveSeller(values);
    return true;
  };

  const carSubmit = async (values) => {
    const saved = await vehicleMemory.saveVehicleMemory(values);
    if (!saved) {
      return false;
    }
    form.saveVehicle(values);
    return true;
  };

  const detailSubmit = (values) => {
    form.saveDetails(values);
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
                    data: agentsMemory.agents,
                    loading: agentsMemory.agentsLoading,
                    error: agentsMemory.agentError,
                    save: form.selectAgent,
                    create: agentsMemory.saveAgent,
                    update: agentsMemory.editAgent,
                    remove: agentsMemory.removeAgent,
                  }}
                  personProps={{
                    data: state.personStates,
                    error: peopleMemory.peopleError,
                    people: peopleMemory.savedPeople,
                    occupations: peopleMemory.occupationOptions,
                    save: personSubmit,
                  }}
                  carProps={{
                    data: state.carStates,
                    error: vehicleMemory.vehicleError,
                    options: vehicleMemory.vehicleOptions,
                    save: carSubmit,
                  }}
                  vendorProps={{
                    data: state.vendorStates,
                    error: peopleMemory.peopleError,
                    people: peopleMemory.savedPeople,
                    occupations: peopleMemory.occupationOptions,
                    save: vendorSubmit,
                  }}
                  detailProps={{
                    data: state.detailStates,
                    save: detailSubmit,
                  }}
                  reviewData={reviewData}
                  generateDocument={async (format) => {
                    await downloadCarSaleDocument(documentData, state, format);
                    await history.refreshDocumentHistory();
                  }}
                  historyProps={{
                    data: history.documentHistory,
                    error: history.historyError,
                    activeDraft: form.activeDraft,
                    clearDraft: form.clearHistoryDraft,
                    load: form.loadHistoryDraft,
                    download: history.downloadHistoricalDocument,
                  }}
                  settingsProps={{
                    error:
                      vehicleMemory.vehicleError ||
                      peopleMemory.peopleError ||
                      desktopDiagnostics.diagnosticsError,
                    people: peopleMemory.savedPeople,
                    vehicleOptions: vehicleMemory.vehicleOptions,
                    removePerson: peopleMemory.removeSavedPerson,
                    removeVehicleOption:
                      vehicleMemory.removeVehicleCatalogOption,
                    diagnostics: desktopDiagnostics.diagnostics,
                    openLogsFolder: desktopDiagnostics.openDiagnosticsLogs,
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
