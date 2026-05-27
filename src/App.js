import { lazy, Suspense, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';
import { DataPerson } from './Data/DataPerson';
import { DataCar } from './Data/DataCar';
import { DataAgent } from './Data/DataAgent';
import { DataDetails } from './Data/DataDetails';
import GetAge from './Functions/GetAge';
import { createCarSalePayload } from './Forms/CarSalePayload';
import { downloadCarSaleDocument } from './Api/DocumentsApi';
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
  const documentData = createCarSalePayload(state);

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
