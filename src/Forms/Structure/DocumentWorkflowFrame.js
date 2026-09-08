import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import Header from '../../HomePage/Header';
import ReturnDialog from '../Dialogs/ReturnDialog';

export default function DocumentWorkflowFrame({
  title,
  draftLabel,
  steps,
  activeStep,
  lastStep,
  generating,
  autosave,
  exitOpen,
  setExitOpen,
  onDiscard,
  onSelect,
  children,
}) {
  const reviewStep = steps.length;
  const progress =
    activeStep === reviewStep
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
            boxShadow: { md: '0 12px 36px rgba(19,47,43,.07)' },
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
            <Box>
              <Breadcrumbs sx={{ mb: 0.75 }} separator="/">
                <Link color="inherit" href="/" underline="hover">
                  Documentos
                </Link>
                <Typography color="text.secondary" variant="body2">
                  {title}
                </Typography>
              </Breadcrumbs>
              <Typography component="h1" variant="h4">
                {title}
              </Typography>
            </Box>
            <Button
              color="inherit"
              variant="outlined"
              onClick={() => setExitOpen(true)}
            >
              Salir
            </Button>
          </Stack>
          <ReturnDialog
            open={exitOpen}
            handleClose={() => setExitOpen(false)}
          />
          {autosave.recovered && (
            <Alert
              action={
                <Button color="inherit" onClick={onDiscard} size="small">
                  Descartar
                </Button>
              }
              severity="info"
              sx={{ mb: 2 }}
            >
              Se recuperó borrador de {draftLabel}.
            </Alert>
          )}
          {(autosave.saving || autosave.savedAt) && (
            <Typography color="text.secondary" sx={{ mb: 2 }} variant="caption">
              {autosave.saving
                ? 'Guardando borrador...'
                : 'Borrador guardado a las ' +
                  new Intl.DateTimeFormat('es-SV', {
                    hour: 'numeric',
                    minute: '2-digit',
                    second: '2-digit',
                  }).format(new Date(autosave.savedAt))}
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
                  {activeStep === reviewStep
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
                  sx={{ borderRadius: 1, height: 6, mb: { xs: 2, md: 3 } }}
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
                        onClick={() => onSelect(index)}
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
                  {activeStep === reviewStep
                    ? 'Revisión final'
                    : 'Paso actual: ' + steps[activeStep]}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={9}>
              <Box sx={{ minHeight: 560, pl: { md: 2 }, py: { xs: 1, md: 0 } }}>
                {children}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
