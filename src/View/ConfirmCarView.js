import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
export default function ConfirmCarView(props) {
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
            <b>Placa: </b> {props.value.placa}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1" >
            <b>Marca: </b> {props.value.marca}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1">
            <b>Modelo: </b> {props.value.modelo}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1" >
            <b>Color: </b> {props.value.color}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1" >
            <b>Fabricado: </b> {props.value.fabricado}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1">
            <b>Capacidad: </b> {props.value.capacidad}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1">
            <b>Dominio: </b> {props.value.dominio}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1" >
            <b>Clase: </b> {props.value.clase}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1" >
            <b>Numero de motor: </b> {props.value.num_motor}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1" >
            <b>Numero de chasis: </b> {props.value.num_chasis}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1" >
            <b>Numero de vin: </b> {props.value.num_vin}
          </Typography>
        </Grid>

      </Grid>
    </React.Fragment>
  );
}
