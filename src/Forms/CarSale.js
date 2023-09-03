import React from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { Grid } from '@mui/material';
import { getStepContent } from './Steps/CarSaleSteps';
import Header from '../HomePage/Header';
import useClasses from '../Utils/UseClasses';

import ReturnDialog from './Dialogs/ReturnDialog';

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
});

const steps = [
  'Seleccionar agente',
  'Datos comprador',
  'Datos vehiculo',
  'Datos vendedor',
  'Detalles adicionales',
];

const CheckOut = ({
  agentProps,
  personProps,
  carProps,
  vendorProps,
  detailProps,
}) => {
  const classes = useClasses(styles);

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

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

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
          <ReturnDialog open={open} handleClose={handleClose} />
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
            <>
              {getStepContent(
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
              )}
            </>
          )}
        </Paper>
      </Grid>
    </>
  );
};

export default CheckOut;
