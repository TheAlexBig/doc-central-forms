import React from 'react';

import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import { getStepContent } from './Steps/CarSaleSteps';
import Header from '../HomePage/Header';

import ReturnDialog from './Dialogs/ReturnDialog';
import CarSaleReviewPanel from './Panels/CarSaleReviewPanel';

const steps = ['Agente', 'Comprador', 'Vehículo', 'Vendedor', 'Firma y venta'];

const CarSale = ({
  agentProps,
  personProps,
  carProps,
  vendorProps,
  detailProps,
  reviewData,
  autosave = { savedAt: null, recovered: false, saving: false },
  discardAutosavedDraft = () => {},
  generateDocument,
  validateDocument = () => '',
  historyProps = {
    activeDraft: null,
    clearDraft: () => {},
  },
}) => {
  const [activeStep, setActiveStep] = React.useState(
    historyProps.activeDraft ? steps.length : 0
  );
  const [lastStep, setLastStep] = React.useState(
    historyProps.activeDraft ? steps.length : 0
  );
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
  const handleGenerate = async (format) => {
    const validationError = validateDocument();
    if (validationError) {
      setGenerationError(validationError);
      return;
    }
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
            borderRadius: { md: 2 },
            boxShadow: { md: '0 12px 36px rgba(19, 47, 43, 0.07)' },
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
              {historyProps.activeDraft && (
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
          <ReturnDialog open={open} handleClose={handleClose} />
          {historyProps.activeDraft && (
            <Alert severity="info" sx={{ mb: 3 }}>
              Borrador abierto: {historyProps.activeDraft.title}
            </Alert>
          )}
          {autosave.recovered && (
            <Alert
              action={
                <Button
                  color="inherit"
                  onClick={discardAutosavedDraft}
                  size="small"
                >
                  Descartar
                </Button>
              }
              severity="info"
              sx={{ mb: 3 }}
            >
              Se recuperó el borrador guardado automáticamente.
            </Alert>
          )}
          {(autosave.saving || autosave.savedAt) && (
            <Typography color="text.secondary" sx={{ mb: 2 }} variant="caption">
              {autosave.saving
                ? 'Guardando borrador...'
                : `Borrador guardado automáticamente a las ${new Intl.DateTimeFormat('es-SV', { hour: 'numeric', minute: '2-digit', second: '2-digit' }).format(new Date(autosave.savedAt))}`}
            </Typography>
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
                {activeStep === steps.length ? (
                  <CarSaleReviewPanel
                    documentData={reviewData}
                    generating={generating}
                    generatingFormat={generatingFormat}
                    generationError={generationError}
                    generated={generated}
                    onBack={handleBack}
                    onEdit={handleReviewEdit}
                    onGenerate={handleGenerate}
                  />
                ) : (
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
                )}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default CarSale;
