import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import SelectAgentView from "../View/SelectAgentView";
import PersonForm from "../Forms/PersonForm";
import CarForm from "../Forms/CarForm";
import DetailForm from "../Forms/DetailForm";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(700 + theme.spacing(2) * 2)]: {
      width: 700,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = [
  "Seleccionar agente",
  "Datos comprador",
  "Datos vehiculo",
  "Datos vendedor",
  "Detalles adicionales",
];

export default function Checkout(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            {props.dataA.map((agent, index) => {
              return (
                <SelectAgentView
                  key={agent.id}
                  agent={agent}
                  click={(event) => {
                    props.saveA(event, agent.id.value);
                    handleNext();
                  }}
                />
              );
            })}
          </Grid>
        );
      case 1:
        return (
          <PersonForm
            data={props.dataP}
            save={props.saveP}
            click={handleNext}
            back={handleBack}
          />
        );
      case 2:
        return (
          <CarForm
            data={props.dataC}
            save={props.saveC}
            click={handleNext}
            back={handleBack}
          />
        );
      case 3:
        return (
          <PersonForm
            data={props.dataV}
            save={props.saveV}
            click={handleNext}
            back={handleBack}
          />
        );
      case 4:
        return (
          <DetailForm
            data={props.dataD}
            save={props.saveD}
            click={handleNext}
            back={handleBack}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Central Docs
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Compra venta de vehiculo
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>{" "}
                {/* //AQUI PUEDO CAMBIAR ORIENTACION STEPPER */}
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Los datos han sido guardados exitosamente.
                </Typography>
                <Button onClick={handleBack} className={classes.button}>
                  Generar documento
                </Button>
                <Button  className={classes.button} href="/compra-venta">
                  Repetir formulario
                </Button>
                <Button  className={classes.button} href="/">
                  Volver al menú
                </Button>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
}
