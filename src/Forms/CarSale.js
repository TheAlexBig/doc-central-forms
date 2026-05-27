import React from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { getStepContent } from './Steps/CarSaleSteps';
import Header from '../HomePage/Header';

import ReturnDialog from './Dialogs/ReturnDialog';
import CarSaleReview from '../View/CarSaleReview';

const steps = ['Notario', 'Comprador', 'Vehículo', 'Vendedor', 'Firma y venta'];

const CarSale = ({
  agentProps,
  personProps,
  carProps,
  vendorProps,
  detailProps,
  documentData,
  generateDocument,
}) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [lastStep, setLastStep] = React.useState(0);
  const [generating, setGenerating] = React.useState(false);
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

  const handleGenerate = async () => {
    setGenerating(true);
    setGenerationError('');
    try {
      await generateDocument();
      setGenerated(true);
    } catch (error) {
      setGenerationError(error.message);
    } finally {
      setGenerating(false);
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
      <Box component="main" sx={{ py: { xs: 2.5, md: 4 } }}>
        <Container
          maxWidth="lg"
          sx={{
            bgcolor: 'background.paper',
            border: { md: '1px solid' },
            borderColor: 'divider',
            minHeight: 'calc(100vh - 116px)',
            px: { xs: 2, sm: 3.5, md: 5 },
            py: { xs: 2.5, md: 4 },
          }}
        >
          <Stack direction="row" justifyContent="space-between" sx={{ mb: 3 }}>
            <Box>
              <Typography
                color="text.secondary"
                variant="body2"
                sx={{ mb: 0.75 }}
              >
                Documentos / Compra venta de vehículos
              </Typography>
              <Typography component="h1" variant="h4">
                Compra venta de vehículos
              </Typography>
            </Box>
            <Button
              color="inherit"
              sx={{ alignSelf: 'flex-start' }}
              variant="outlined"
              onClick={handleClickOpen}
            >
              Salir
            </Button>
          </Stack>
          <ReturnDialog open={open} handleClose={handleClose} />
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
                  sx={{ height: 4, mb: { xs: 2, md: 3 } }}
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
              <Box sx={{ minHeight: 560, pl: { md: 2 }, py: { xs: 1, md: 0 } }}>
                {activeStep === steps.length ? (
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
                    <Typography color="text.secondary" sx={{ mb: 3 }}>
                      Revise cada bloque antes de generar. Central Docs no
                      almacena los datos de las partes ni del vehículo. Solo
                      conserva en este equipo los agentes que usted registre
                      para reutilizarlos. Los números se muestran en letras tal
                      como se incorporarán al documento legal.
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
                          Generando documento Word...
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
                        onClick={handleGenerate}
                        disabled={generating}
                      >
                        {generating && (
                          <CircularProgress size={18} sx={{ mr: 1 }} />
                        )}
                        Descargar documento Word
                      </Button>
                      {generated && (
                        <Button href="/compra-venta" variant="outlined">
                          Crear otro
                        </Button>
                      )}
                    </Stack>
                  </>
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
