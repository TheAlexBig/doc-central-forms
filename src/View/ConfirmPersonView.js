import React from "react";
import GetAge from "../Functions/GetAge"
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
export default function ConfirmPersonView(props) {
    const style = {
        title:{
            display:"flex",
            justifyContent:"center"
        }
    };
  return (
    <React.Fragment>
      <Grid container spacing={3} alignItems="center">
          <Grid item xs={12}>
            <Typography variant="h5" style={style.title}>Verificación de datos</Typography>
          </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1">
            <b>Nombre: </b> {props.value.nombre}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1" >
            <b>Apellido: </b> {props.value.apellido}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1">
            <b>Departamento: </b> {props.value.departamento}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1" >
            <b>Domicilio: </b> {props.value.domicilio}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1" >
            <b>DUI: </b> {props.value.documento}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1">
            <b>NIT: </b> {props.value.nit}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1">
            <b>Fecha de nacimiento: </b> {props.value.fecha_nacimiento}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1" >
            <b>Edad: </b> {GetAge(props.value.fecha_nacimiento)}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1" >
            <b>Genero: </b> {props.value.genero}
          </Typography>
        </Grid>

      </Grid>
    </React.Fragment>
  );
}
