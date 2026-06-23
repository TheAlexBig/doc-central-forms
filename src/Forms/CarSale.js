import React from 'react';

import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { getStepContent } from './Steps/CarSaleSteps';
import Header from '../HomePage/Header';

import ReturnDialog from './Dialogs/ReturnDialog';
import CarSaleReview from '../View/CarSaleReview';
import {
  EmptyState,
  SectionHeader,
  SurfaceRow,
} from './Structure/FormScaffold';

const steps = ['Agente', 'Comprador', 'Vehículo', 'Vendedor', 'Firma y venta'];

const formatDateTime = (value) =>
  new Intl.DateTimeFormat('es-SV', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));

const CarSale = ({
  agentProps,
  personProps,
  carProps,
  vendorProps,
  detailProps,
  documentData,
  generateDocument,
  historyProps = {
    data: [],
    error: '',
    activeDraft: null,
    clearDraft: () => {},
    load: () => {},
    download: () => {},
  },
  settingsProps = {
    error: '',
    people: [],
    vehicleOptions: {
      colors: [],
      brands: [],
      models: [],
    },
    removePerson: () => {},
    removeVehicleOption: () => {},
  },
}) => {
  const [view, setView] = React.useState('form');
  const [activeStep, setActiveStep] = React.useState(0);
  const [lastStep, setLastStep] = React.useState(0);
  const [generating, setGenerating] = React.useState(false);
  const [generatingFormat, setGeneratingFormat] = React.useState('');
  const [generationError, setGenerationError] = React.useState('');
  const [generated, setGenerated] = React.useState(false);
  const [returnToReview, setReturnToReview] = React.useState(false);

  const handleNext = () => {
    if (returnToReview) {
      setReturnToReview(false);
      setActiveStep(steps.length);
      return;
    }
    if (activeStep + 1 > lastStep) {
      setLastStep(activeStep + 1);
    }
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setGenerationError('');
    setGenerated(false);
    setActiveStep(activeStep - 1);
  };
  const handleStep = (index) => {
    if (!generating && index <= lastStep) {
      setGenerationError('');
      setActiveStep(index);
    }
  };
  const handleReviewEdit = (index) => {
    setGenerationError('');
    setGenerated(false);
    setReturnToReview(true);
    setActiveStep(index);
  };
  const handleHistoryLoad = (historyItem) => {
    historyProps.load(historyItem);
    setView('form');
    setGenerated(false);
    setGenerationError('');
    setLastStep(steps.length);
    setActiveStep(steps.length);
  };

  const handleGenerate = async (format) => {
    setGenerating(true);
    setGeneratingFormat(format);
    setGenerationError('');
    try {
      await generateDocument(format);
      setGenerated(true);
    } catch (error) {
      setGenerationError(error.message);
    } finally {
      setGenerating(false);
      setGeneratingFormat('');
    }
  };

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const progress =
    activeStep === steps.length
      ? 100
      : Math.round(((activeStep + 1) / steps.length) * 100);

  const renderHistory = () => (
    <Box>
      <SectionHeader
        title="Historial"
        description="Documentos generados y borradores disponibles."
      />
      {historyProps.error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {historyProps.error}
        </Alert>
      )}
      {historyProps.data.length === 0 ? (
        <EmptyState>Aún no hay documentos generados.</EmptyState>
      ) : (
        <Stack spacing={1.25}>
          {historyProps.data.map((historyItem) => (
            <SurfaceRow key={historyItem.id}>
              <Stack
                alignItems={{ xs: 'stretch', sm: 'center' }}
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
              >
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography
                    fontWeight={650}
                    sx={{ overflowWrap: 'anywhere' }}
                  >
                    {historyItem.title}
                  </Typography>
                  <Stack
                    direction={{ xs: 'column', md: 'row' }}
                    spacing={{ xs: 0.25, md: 1.5 }}
                    sx={{ mt: 0.5 }}
                  >
                    <Typography color="text.secondary" variant="body2">
                      {formatDateTime(historyItem.createdAt)}
                    </Typography>
                    <Typography color="text.secondary" variant="body2">
                      {historyItem.buyerName} / {historyItem.sellerName}
                    </Typography>
                  </Stack>
                </Box>
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={1}
                  sx={{ flexShrink: 0 }}
                >
                  <Button
                    disabled={!Object.keys(historyItem.draft || {}).length}
                    onClick={() => handleHistoryLoad(historyItem)}
                    variant="outlined"
                    size="small"
                  >
                    Abrir borrador
                  </Button>
                  <Button
                    onClick={() => historyProps.download(historyItem, 'docx')}
                    size="small"
                  >
                    Word
                  </Button>
                  <Button
                    onClick={() => historyProps.download(historyItem, 'pdf')}
                    size="small"
                  >
                    PDF
                  </Button>
                </Stack>
              </Stack>
            </SurfaceRow>
          ))}
        </Stack>
      )}
    </Box>
  );

  const renderOptionList = (title, kind, options) => (
    <Box sx={{ mb: 3 }}>
      <Typography fontWeight={650} sx={{ mb: 1.25 }}>
        {title}
      </Typography>
      {options.length === 0 ? (
        <EmptyState>No hay opciones guardadas.</EmptyState>
      ) : (
        <Grid container spacing={1}>
          {options.map((option) => (
            <Grid item xs={12} sm={6} md={4} key={`${kind}-${option}`}>
              <SurfaceRow>
                <Stack
                  alignItems="center"
                  direction="row"
                  justifyContent="space-between"
                  spacing={1}
                >
                  <Typography
                    sx={{ overflowWrap: 'anywhere', minWidth: 0 }}
                    variant="body2"
                  >
                    {option}
                  </Typography>
                  <Button
                    color="error"
                    onClick={() =>
                      settingsProps.removeVehicleOption(kind, option)
                    }
                    size="small"
                    sx={{ flexShrink: 0 }}
                  >
                    Remover
                  </Button>
                </Stack>
              </SurfaceRow>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );

  const renderPeopleSettings = () => (
    <Box sx={{ mb: 3 }}>
      <Typography fontWeight={650} sx={{ mb: 1 }}>
        Personas guardadas
      </Typography>
      {settingsProps.people.length === 0 ? (
        <EmptyState>No hay personas guardadas.</EmptyState>
      ) : (
        <Grid container spacing={1}>
          {settingsProps.people.map((person) => (
            <Grid item xs={12} sm={6} key={person.documento}>
              <SurfaceRow>
                <Stack
                  alignItems="center"
                  direction="row"
                  justifyContent="space-between"
                  spacing={1.5}
                >
                  <Box sx={{ minWidth: 0 }}>
                    <Typography
                      fontWeight={650}
                      sx={{ overflowWrap: 'anywhere' }}
                      variant="body2"
                    >
                      {[person.nombre, person.apellido]
                        .filter(Boolean)
                        .join(' ')}
                    </Typography>
                    <Typography color="text.secondary" variant="caption">
                      {person.documento} / {person.oficio}
                    </Typography>
                  </Box>
                  <Button
                    color="error"
                    onClick={() => settingsProps.removePerson(person)}
                    size="small"
                    sx={{ flexShrink: 0 }}
                  >
                    Remover
                  </Button>
                </Stack>
              </SurfaceRow>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );

  const renderSettings = () => (
    <Box>
      <SectionHeader
        title="Configuración"
        description="Limpieza de valores guardados para personas, marcas, modelos y colores."
      />
      {settingsProps.error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {settingsProps.error}
        </Alert>
      )}
      {renderPeopleSettings()}
      {renderOptionList(
        'Marcas',
        'brands',
        settingsProps.vehicleOptions.brands
      )}
      {renderOptionList(
        'Modelos',
        'models',
        settingsProps.vehicleOptions.models
      )}
      {renderOptionList(
        'Colores',
        'colors',
        settingsProps.vehicleOptions.colors
      )}
    </Box>
  );

  return (
    <>
      <Header title="Central Docs" />
      <Box
        component="main"
        sx={{
          bgcolor: 'background.default',
          minHeight: 'calc(100vh - 64px)',
          py: { xs: 2, md: 3 },
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            bgcolor: 'background.paper',
            border: { md: '1px solid' },
            borderColor: 'divider',
            boxShadow: { md: '0 12px 36px rgba(15, 23, 42, 0.06)' },
            minHeight: 'calc(100vh - 104px)',
            px: { xs: 2, sm: 3, md: 4 },
            py: { xs: 2, md: 3 },
          }}
        >
          <Stack
            alignItems={{ xs: 'stretch', md: 'flex-start' }}
            direction={{ xs: 'column', md: 'row' }}
            justifyContent="space-between"
            spacing={2}
            sx={{ mb: 2.5 }}
          >
            <Box sx={{ minWidth: 0 }}>
              <Breadcrumbs sx={{ mb: 0.75 }} separator="/">
                <Link color="inherit" href="/" underline="hover">
                  Documentos
                </Link>
                <Typography color="text.secondary" variant="body2">
                  Compra venta de vehículos
                </Typography>
              </Breadcrumbs>
              <Typography component="h1" variant="h4">
                Compra venta de vehículos
              </Typography>
            </Box>
            <Stack
              alignItems={{ xs: 'stretch', sm: 'center' }}
              direction={{ xs: 'column', sm: 'row' }}
              spacing={1}
            >
              {historyProps.activeDraft && view === 'form' && (
                <Button
                  color="primary"
                  onClick={() => {
                    historyProps.clearDraft();
                    setGenerated(false);
                    setGenerationError('');
                    setLastStep(0);
                    setActiveStep(0);
                  }}
                  variant="outlined"
                >
                  Cerrar borrador
                </Button>
              )}
              <Button
                color="inherit"
                variant="outlined"
                onClick={handleClickOpen}
              >
                Salir
              </Button>
            </Stack>
          </Stack>
          <Tabs
            value={view}
            onChange={(event, nextView) => setView(nextView)}
            variant="scrollable"
            allowScrollButtonsMobile
            sx={{
              borderBottom: '1px solid',
              borderColor: 'divider',
              mb: 3,
            }}
          >
            <Tab label="Formulario" value="form" />
            <Tab label="Historial" value="history" />
            <Tab label="Configuración" value="settings" />
          </Tabs>
          <ReturnDialog open={open} handleClose={handleClose} />
          {historyProps.activeDraft && view === 'form' && (
            <Alert severity="info" sx={{ mb: 3 }}>
              Borrador abierto: {historyProps.activeDraft.title}
            </Alert>
          )}
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <Box
                sx={{
                  borderRight: { md: '1px solid' },
                  borderColor: 'divider',
                  pr: { md: 3 },
                  position: { md: 'sticky' },
                  top: { md: 100 },
                }}
              >
                <Typography
                  color="text.secondary"
                  fontWeight={650}
                  sx={{ mb: 1.5 }}
                  variant="overline"
                >
                  {activeStep === steps.length
                    ? 'Revisión final'
                    : steps[activeStep]}
                </Typography>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  sx={{ mb: 1 }}
                >
                  <Typography fontWeight={650} variant="body2">
                    Progreso
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    {progress}%
                  </Typography>
                </Stack>
                <LinearProgress
                  value={progress}
                  variant="determinate"
                  sx={{
                    borderRadius: 1,
                    height: 6,
                    mb: { xs: 2, md: 3 },
                  }}
                />
                <Stepper
                  activeStep={activeStep}
                  nonLinear
                  orientation="vertical"
                  sx={{ display: { xs: 'none', md: 'flex' } }}
                >
                  {steps.map((label, index) => (
                    <Step
                      key={label}
                      completed={index < activeStep || index < lastStep}
                    >
                      <StepButton
                        disabled={generating || index > lastStep}
                        onClick={() => handleStep(index)}
                      >
                        {label}
                      </StepButton>
                    </Step>
                  ))}
                </Stepper>
                <Typography
                  color="text.secondary"
                  sx={{ display: { xs: 'block', md: 'none' } }}
                  variant="body2"
                >
                  {activeStep === steps.length
                    ? 'Revisión final'
                    : `Paso actual: ${steps[activeStep]}`}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={9}>
              <Box
                sx={{
                  minHeight: 560,
                  pl: { md: 2 },
                  py: { xs: 1, md: 0 },
                }}
              >
                {view === 'history' && renderHistory()}
                {view === 'settings' && renderSettings()}
                {view === 'form' && activeStep === steps.length ? (
                  <>
                    <Typography
                      color="primary.main"
                      fontWeight={700}
                      sx={{
                        mb: 2,
                      }}
                      variant="overline"
                    >
                      Revisión final
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                      Confirme el contenido del documento
                    </Typography>
                    <CarSaleReview
                      data={documentData}
                      onEdit={handleReviewEdit}
                    />
                    {generating && (
                      <Box
                        sx={{
                          borderLeft: '3px solid',
                          borderColor: 'primary.main',
                          bgcolor: '#f8fafc',
                          mt: 3,
                          px: 2,
                          py: 2,
                        }}
                      >
                        <Typography fontWeight={650} sx={{ mb: 1 }}>
                          Generando documento{' '}
                          {generatingFormat === 'pdf' ? 'PDF' : 'Word'}...
                        </Typography>
                        <Typography
                          color="text.secondary"
                          variant="body2"
                          sx={{ mb: 2 }}
                        >
                          La primera generación puede tardar unos segundos.
                          Mantenga esta ventana abierta.
                        </Typography>
                        <LinearProgress />
                      </Box>
                    )}
                    {generationError && (
                      <Alert severity="error" sx={{ mt: 3 }}>
                        {generationError}
                      </Alert>
                    )}
                    {generated && (
                      <Alert severity="success" sx={{ mt: 3 }}>
                        El documento fue generado y descargado correctamente.
                      </Alert>
                    )}
                    <Divider sx={{ my: 3 }} />
                    <Stack
                      direction={{ xs: 'column', sm: 'row' }}
                      justifyContent="flex-end"
                      spacing={1.5}
                    >
                      <Button disabled={generating} onClick={handleBack}>
                        Volver a firma y venta
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => handleGenerate('docx')}
                        disabled={generating}
                      >
                        {generating && generatingFormat === 'docx' && (
                          <CircularProgress size={18} sx={{ mr: 1 }} />
                        )}
                        Descargar Word
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() => handleGenerate('pdf')}
                        disabled={generating}
                      >
                        {generating && generatingFormat === 'pdf' && (
                          <CircularProgress size={18} sx={{ mr: 1 }} />
                        )}
                        Descargar PDF
                      </Button>
                      {generated && (
                        <Button href="/compra-venta" variant="outlined">
                          Crear otro
                        </Button>
                      )}
                    </Stack>
                  </>
                ) : view === 'form' ? (
                  getStepContent(
                    activeStep,
                    {
                      agentProps,
                      personProps,
                      carProps,
                      vendorProps,
                      detailProps,
                    },
                    handleNext,
                    handleBack
                  )
                ) : null}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default CarSale;
