import React from "react";
import { makeStyles } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SelectAgentView from "../View/SelectAgentView";
import PersonForm from "../Forms/PersonForm";
import CarForm from "../Forms/CarForm";
import DetailForm from "../Forms/DetailForm";
import Header from "../HomePage/Header";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

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
    minHeight: 400,
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  header: {
    display: "flex",
    flexDirection: "row",
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
  buttonHome: {
    marginTop: theme.spacing(-3),
    marginLeft: theme.spacing(-3),
    justifyContent: "left",
    alignSelf: "flex-start",
  },
  dialog: {
    padding: theme.spacing(1),
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
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dialog = (
    <Dialog
        className={classes.dialog}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Ventana de confirmación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography> Al regresar a Inicio perderas todos los datos que hayas ingresado</Typography>
            <Typography>¿Estas seguro de que quieres regresar?</Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" autoFocus>
            Cancelar
          </Button>
          <Button href="/" >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
  ) 

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
          <SelectAgentView
            data={props.dataA}
            click={handleNext}
            save={props.saveA}
          />
        );
      case 1:
        return (
          <PersonForm
            data={props.dataP}
            save={props.saveP}
            click={handleNext}
            back={handleBack}
            title={"Datos del comprador"}
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
            title={"Datos del vendedor"}
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
      <Header title="Central Docs" />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Button
            color="default"
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
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel onClick={() => handleStep(index)}>{label}</StepLabel>{" "}
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
                <Button className={classes.button} href="/compra-venta">
                  Repetir formulario
                </Button>
                <Button className={classes.button} href="/">
                  Volver al menú
                </Button>
              </React.Fragment>
            ) : (
              <React.Fragment>{getStepContent(activeStep)}</React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
  );
}
