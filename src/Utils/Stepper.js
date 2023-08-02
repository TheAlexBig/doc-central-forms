import React from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid } from '@mui/material';
import AgentSection from '../Forms/Sections/AgentSection';
import PersonSection from '../Forms/Sections/PersonSection';
import CarSection from '../Forms/Sections/CarSection';
import DetailForm from '../Forms/Sections/DetailSection';
import Header from '../HomePage/Header';
import useClasses from './UseClasses';

const styles = (_theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: '4px',
    marginRight: '4px',
  },
  paper: {
    marginTop: '4px',
    marginBottom: '4px',
    padding: '4px',
    minHeight: 400,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
  },
  stepper: {
    padding: '3px 0px 6px',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: '4px',
    marginLeft: '4px',
  },
  buttonHome: {
    marginTop: '-4px',
    marginLeft: '-4px',
    justifyContent: 'left',
    alignSelf: 'flex-start',
  },
  dialog: {
    padding: '4px',
  },
});

const steps = [
  'Seleccionar agente',
  'Datos comprador',
  'Datos vehiculo',
  'Datos vendedor',
  'Detalles adicionales',
];

const CheckOut = ({
  dataA,
  saveA,
  dataP,
  saveP,
  dataC,
  saveC,
  dataV,
  saveV,
  dataD,
  saveD,
}) => {
  const classes = useClasses(styles);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dialog = (
    <Dialog className={classes.dialog} open={open} onClose={handleClose}>
      <DialogTitle>Ventana de confirmación</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography>
            {' '}
            Al regresar a Inicio perderas todos los datos que hayas ingresado
          </Typography>
          <Typography>¿Estas seguro de que quieres regresar?</Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary" autoFocus>
          Cancelar
        </Button>
        <Button href="/">Aceptar</Button>
      </DialogActions>
    </Dialog>
  );

  const [activeStep, setActiveStep] = React.useState(0);
  const [lastStep, setLastStep] = React.useState(0);

  const handleNext = () => {
    if (activeStep + 1 > lastStep) {
      setLastStep(activeStep + 1);
    }
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  const handleStep = (index) => {
    if (index <= lastStep) {
      setActiveStep(index);
    }
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <AgentSection
            data={dataA}
            click={handleNext}
            save={saveA}
            title="Selección de agente"
          />
        );
      case 1:
        return (
          <PersonSection
            data={dataP}
            save={saveP}
            click={handleNext}
            back={handleBack}
            title="Datos del comprador"
          />
        );
      case 2:
        return (
          <CarSection
            data={dataC}
            save={saveC}
            click={handleNext}
            back={handleBack}
            title="Datos del vehiculo"
          />
        );
      case 3:
        return (
          <PersonSection
            data={dataV}
            save={saveV}
            click={handleNext}
            back={handleBack}
            title="Datos del vendedor"
          />
        );
      case 4:
        return (
          <DetailForm
            data={dataD}
            save={saveD}
            click={handleNext}
            back={handleBack}
            title="Datos adicionales"
          />
        );
      default:
        throw new Error('Unknown step');
    }
  }

  return (
    <>
      <CssBaseline />
      <Header title="Central Docs" />
      <Grid container className={classes.layout}>
        <Paper className={classes.paper}>
          <Button
            variant="outlined"
            className={classes.buttonHome}
            onClick={handleClickOpen}
          >
            Volver al menú
          </Button>
          {dialog}
          <Typography
            component="h1"
            variant="h4"
            align="center"
            style={{ marginTop: -15 }}
          >
            Compra venta de vehiculo
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps?.map((label, index) => (
              <Step key={label}>
                <StepLabel onClick={() => handleStep(index)}>{label}</StepLabel>{' '}
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <>
              <Typography variant="h5" gutterBottom>
                Los datos han sido guardados exitosamente.
              </Typography>
              <Button onClick={handleBack} className={classes.button}>
                Generar documento
              </Button>
              <Button className={classes.button} href="/compra-venta">
                Repetir formulario
              </Button>
              <Button className={classes.button} href="/">
                Volver al menú
              </Button>
            </>
          ) : (
            <>{getStepContent(activeStep)}</>
          )}
        </Paper>
      </Grid>
    </>
  );
};

export default CheckOut;
