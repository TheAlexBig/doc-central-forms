import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
export default function ConfirmDetailsView(props) {
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
            <b>Precio: </b> {props.value.precio}
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
            <b>Fecha de firma: </b> {props.value.fecha_firma}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1">
            <b>Hora de firma: </b> {props.value.hora_firma}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1">
            <b>En calidad de: </b> {props.value.calidad_de}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1" >
            <b>Identifica al vendedor: </b> {props.value.identifica_vendedor}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1" >
            <b>Identifica al comprador: </b> {props.value.identifica_comprador}
          </Typography>
        </Grid>

      </Grid>
    </React.Fragment>
  );
}
