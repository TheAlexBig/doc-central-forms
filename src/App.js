import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';
import { createCarSalePayload } from './Forms/CarSalePayload';
import { createCarSaleReviewData } from './Forms/CarSaleReviewData';
import { validateCarSaleState } from './Forms/CarSaleRules';
import {
  downloadCarSaleDocument,
  downloadMutualDocument,
} from './Api/DocumentsApi';
import { useAgents } from './Hooks/useAgents';
import { useCarSaleFormState } from './Hooks/useCarSaleFormState';
import { useDesktopDiagnostics } from './Hooks/useDesktopDiagnostics';
import { useDocumentHistory } from './Hooks/useDocumentHistory';
import { usePeopleMemory } from './Hooks/usePeopleMemory';
import { useVehicleMemory } from './Hooks/useVehicleMemory';
import { useLicense } from './Hooks/useLicense';
import { useCarSaleTemplates } from './Hooks/useCarSaleTemplates';
import { useMaintenanceTools } from './Hooks/useMaintenanceTools';
import LicenseActivation from './License/LicenseActivation';
import ScrollToTop from './View/ScrollToTop';
import theme from './Theme';

const Blog = lazy(() => import('./HomePage/Blog'));
const CarSale = lazy(() => import('./Forms/CarSale'));
const Mutual = lazy(() => import('./Forms/Mutual'));
const HistoryPage = lazy(() => import('./View/HistoryPage'));
const SettingsPage = lazy(() => import('./View/SettingsPage'));

const App = () => {
  const form = useCarSaleFormState();
  const peopleMemory = usePeopleMemory();
  const vehicleMemory = useVehicleMemory();
  const history = useDocumentHistory();
  const desktopDiagnostics = useDesktopDiagnostics();
  const license = useLicense();
  const maintenanceTools = useMaintenanceTools();
  const carSaleTemplates = useCarSaleTemplates();
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

  const historyProps = {
    data: history.documentHistory,
    error: history.historyError,
    download: history.downloadHistoricalDocument,
  };
  const settingsProps = {
    error:
      vehicleMemory.vehicleError ||
      peopleMemory.peopleError ||
      agentsMemory.agentError ||
      desktopDiagnostics.diagnosticsError ||
      maintenanceTools.maintenanceError ||
      carSaleTemplates.templatesError,
    people: peopleMemory.savedPeople,
    agents: agentsMemory.agents,
    agentsLoading: agentsMemory.agentsLoading,
    vehicleOptions: vehicleMemory.vehicleOptions,
    removePerson: peopleMemory.removeSavedPerson,
    updatePerson: peopleMemory.updateSavedPerson,
    createAgent: agentsMemory.saveAgent,
    updateAgent: agentsMemory.editAgent,
    removeAgent: agentsMemory.removeAgent,
    removeVehicleOption: vehicleMemory.removeVehicleCatalogOption,
    diagnostics: desktopDiagnostics.diagnostics,
    openLogsFolder: desktopDiagnostics.openDiagnosticsLogs,
    downloadSupportPackage: desktopDiagnostics.downloadDiagnosticsPackage,
    supportPackageLoading: desktopDiagnostics.supportPackageLoading,
    ...maintenanceTools,
    carSaleTemplates,
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {license.loading && !license.status ? (
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            minHeight: '100vh',
            justifyContent: 'center',
          }}
        >
          <CircularProgress size={32} />
        </Box>
      ) : !license.status?.active ? (
        <LicenseActivation {...license} />
      ) : (
        <Router>
          <ScrollToTop />
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
                path="/mutuo"
                element={
                  <Mutual
                    agents={{
                      data: agentsMemory.agents,
                      loading: agentsMemory.agentsLoading,
                      error: agentsMemory.agentError,
                      create: agentsMemory.saveAgent,
                      update: agentsMemory.editAgent,
                      remove: agentsMemory.removeAgent,
                    }}
                    people={peopleMemory.savedPeople}
                    savePerson={peopleMemory.savePersonMemory}
                    generateDocument={async (payload, draft, format) => {
                      await downloadMutualDocument(payload, draft, format);
                      await history.refreshDocumentHistory();
                    }}
                  />
                }
              />
              <Route
                exact
                path="/compra-venta"
                element={
                  <CarSale
                    agentProps={{
                      data: agentsMemory.agents,
                      loading: agentsMemory.agentsLoading,
                      error: agentsMemory.agentError,
                      selected: state.agentStates,
                      preparer: state.preparedByStates,
                      save: form.selectAgent,
                      savePreparer: form.selectPreparer,
                      create: agentsMemory.saveAgent,
                      update: agentsMemory.editAgent,
                      remove: agentsMemory.removeAgent,
                    }}
                    personProps={{
                      data: state.personStates,
                      error: peopleMemory.peopleError,
                      people: peopleMemory.savedPeople,
                      occupations: peopleMemory.occupationOptions,
                      excludedDui: state.vendorStates.documento,
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
                      excludedDui: state.personStates.documento,
                      save: vendorSubmit,
                    }}
                    detailProps={{
                      data: state.detailStates,
                      save: detailSubmit,
                    }}
                    reviewData={reviewData}
                    autosave={form.autosave}
                    discardAutosavedDraft={form.discardAutosavedDraft}
                    generateDocument={async (format) => {
                      await downloadCarSaleDocument(
                        documentData,
                        state,
                        format
                      );
                      await history.refreshDocumentHistory();
                    }}
                    validateDocument={() => validateCarSaleState(state)}
                    historyProps={{
                      activeDraft: form.activeDraft,
                      clearDraft: form.clearHistoryDraft,
                    }}
                  />
                }
              />
              <Route
                exact
                path="/historial"
                element={
                  <HistoryPage
                    historyProps={historyProps}
                    loadDraft={form.loadHistoryDraft}
                  />
                }
              />
              <Route
                exact
                path="/configuracion"
                element={<SettingsPage settingsProps={settingsProps} />}
              />
              <Route exact path="/" element={<Blog />} />
            </Routes>
          </Suspense>
        </Router>
      )}
    </ThemeProvider>
  );
};

export default App;
