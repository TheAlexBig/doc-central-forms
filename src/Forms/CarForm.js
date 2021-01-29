import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { DataCar } from "../Data/DataCar";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import { Formik} from "formik";
import * as Yup from "yup";

const CarForm = (props) => {
  const [dispone, setDispone] = useState({
    motor:true,
    chasis:true,
    vin:true
});
  const style = {
    ancho: {
      width: "100%",
    },
  };
  const disable =(type)=>{
    const tiene ={
      ...dispone
    };
    tiene[type]=!dispone[type];
    setDispone(tiene)
    
  }

  return (
    <React.Fragment>
      <Formik
        initialValues={DataCar}
        onSubmit={(Values) => {
          console.log(Values.num_motor+" y "+ Values.num_chasis+ " y "+ Values.num_vin)
          //props.submit(Values);
        }}
        validationSchema={Yup.object().shape({
          placa: Yup.string().required("Required"),
          marca: Yup.string().required("Required"),
          modelo: Yup.string().required("Required"),
          color: Yup.string().required("Required"),
          fabricado: Yup.string().required("Required"),
          capacidad: Yup.string().required("Required"),
          dominio: Yup.string().required("Required"),
          clase: Yup.string().required("Required"),
          num_motor: Yup.string().required("Required"),
          num_chasis: Yup.string().required("Required"),
          num_vin: Yup.string().required("Required"),
        })}
      >
        {(props) => {
          const {
            values,
            touched,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
            //handleReset,
          } = props;
          return (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    style={style.ancho}
                    error={errors.placa && touched.placa && errors.placa}
                    label="Placa:"
                    name="placa"
                    value={values.placa}
                    onChange={handleChange}
                    helperText={errors.placa && touched.placa && errors.placa}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    style={style.ancho}
                    error={errors.marca && touched.marca && errors.marca}
                    label="Marca:"
                    name="marca"
                    value={values.marca}
                    onChange={handleChange}
                    helperText={errors.marca && touched.marca && errors.marca}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    style={style.ancho}
                    error={errors.modelo && touched.modelo && errors.modelo}
                    label="Modelo:"
                    name="modelo"
                    value={values.modelo}
                    onChange={handleChange}
                    helperText={
                      errors.modelo && touched.modelo && errors.modelo
                    }
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    style={style.ancho}
                    error={errors.color && touched.color && errors.color}
                    label="Color:"
                    name="color"
                    value={values.color}
                    onChange={handleChange}
                    helperText={errors.color && touched.color && errors.color}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    style={style.ancho}
                    error={
                      errors.fabricado &&
                      touched.fabricado &&
                      errors.fabricado
                    }
                    label="fecha de fabricación:"
                    name="fabricado"
                    value={values.fabricado}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={
                      errors.fabricado &&
                      touched.fabricado &&
                      errors.fabricado
                    }
                    type="date"
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    style={style.ancho}
                    error={errors.capacidad && touched.capacidad && errors.capacidad}
                    label="Capacidad:"
                    name="capacidad"
                    type="number"
                    value={values.capacidad}
                    onChange={handleChange}
                    helperText={errors.capacidad && touched.capacidad && errors.capacidad}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    style={style.ancho}
                    error={errors.dominio && touched.dominio && errors.dominio}
                    select
                    label="Dominio:"
                    name="dominio"
                    value={values.dominio}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={
                      errors.dominio && touched.dominio && errors.dominio
                    }
                    margin="normal"
                  >
                    <MenuItem value="Propiedad">Propiedad</MenuItem>
                    <MenuItem value="Prenda">Prenda</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    style={style.ancho}
                    error={errors.clase && touched.clase && errors.clase}
                    label="Clase:"
                    name="clase"
                    value={values.clase}
                    onChange={handleChange}
                    helperText={errors.clase && touched.clase && errors.clase}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    style={style.ancho}
                    error={errors.num_motor && touched.num_motor && errors.num_motor}
                    label="Numero del motor:"
                    name="num_motor"
                    value={values.num_motor}
                    onChange={handleChange}
                    disabled={!dispone.motor}
                    helperText={errors.num_motor && touched.num_motor && errors.num_motor}
                    margin="normal"
                  />
                </Grid>
                <Grid container  xs={4} alignContent="center" justify="center">
                  <Grid item>
                <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked
                    onClick={()=>{disable('motor'); props.setFieldValue("num_motor", !dispone.motor?"":"N/T");}}
                    value="N/T"
                    color="primary"
                    size="small"
                  />
                }
                label="Dispone"
              />
              </Grid>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    style={style.ancho}
                    error={errors.num_chasis && touched.num_chasis && errors.num_chasis}
                    label="Numero de chasis :"
                    name="num_chasis"
                    value={values.num_chasis}
                    onChange={handleChange}
                    disabled={!dispone.chasis}
                    helperText={errors.num_chasis && touched.num_chasis && errors.num_chasis}
                    margin="normal"
                  />
                </Grid>
                <Grid container  xs={4} alignContent="center" justify="center">
                  <Grid item>
                <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked
                    onClick={()=>{disable('chasis'); props.setFieldValue("num_chasis", !dispone.chasis?"":"N/T");}}

                    color="primary"
                    size="small"
                  />
                }
                label="Dispone"
              />
              </Grid>              
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    style={style.ancho}
                    error={errors.num_vin && touched.num_vin && errors.num_vin}
                    label="Numero de vin :"
                    name="num_vin"
                    value={values.num_vin}
                    onChange={handleChange}
                    disabled={!dispone.vin}
                    helperText={errors.num_vin && touched.num_vin && errors.num_vin}
                    margin="normal"
                  />
                </Grid>
                <Grid container  xs={4} alignContent="center" justify="center">
                  <Grid item>
                <FormControlLabel
                control={
                  <Checkbox
                    checked={dispone.vin}
                    name="check-vin"
                    onClick={()=>{disable('vin'); props.setFieldValue("num_vin", !dispone.vin?"":"N/T");}}
                    color="primary"
                    size="small"

                  />
                }
                label="Dispone"
              />
              </Grid>              
                </Grid>
              </Grid>
              <Grid container justify="flex-end">
                <Grid item xs={12} sm={4}>
                  <Button style={style.ancho} type="submit">
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          );
        }}
      </Formik>
    </React.Fragment>
  );
};

export default CarForm;
