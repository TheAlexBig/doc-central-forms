import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
export default function ConfirmAgentView(props) {
  const style = {
    title: {
      display: "flex",
      justifyContent: "center",
    },
    buttons: {
        display: "flex",
        justifyContent: "flex-end",
      },
      button: {
        marginTop: 20,
        marginLeft: 10,
      },
  };
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h5" style={style.title}>
            Verificación de datos
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1">
            <b>Nombres: </b> {props.value.nombres}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1">
            <b>Apellidos: </b> {props.value.apellidos}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1">
            <b>Departamento: </b> {props.value.departamento}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1">
            <b>Municipio: </b> {props.value.municipio}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1">
            <b>Carnet: </b> {props.value.carnet}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1">
            <b>Genero: </b> {props.value.genero}
          </Typography>
        </Grid>
      </Grid>
      <div style={style.buttons}>
        <Button style={style.button} onClick={props.back} >
          Cambiar
        </Button>
        <Button
          color="primary"
          variant="contained"
          style={style.button}
          onClick={()=>{props.save(props.index);props.click()}}
        >
          Seleccionar
        </Button>
      </div>
    </React.Fragment>
  );
}
