import React, { useState } from 'react';

import { Formik } from 'formik';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import * as Yup from 'yup';
import { defaultStyle } from '../FormStyles';

import { CarValidationSchema } from '../Validations/CarValidationSchema';

const CarStructure = ({
  data,
  title = 'No title',
  buttons = [],
  submitAction = () => {},
}) => {
  const [dispone, setDispone] = useState({
    motor: true,
    chasis: true,
    vin: true,
  });
  const disable = (type) => {
    const tiene = {
      ...dispone,
    };
    tiene[type] = !dispone[type];
    setDispone(tiene);
  };

  return (
    <Formik
      initialValues={data}
      onSubmit={submitAction}
      validationSchema={Yup.object().shape(CarValidationSchema)}
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
        } = props;
        return (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h5" style={defaultStyle.title}>
                  {title}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  style={defaultStyle.wide}
                  error={errors.placa && touched.placa && errors.placa}
                  label="Placa:"
                  name="placa"
                  onBlur={handleBlur}
                  value={values.placa}
                  onChange={handleChange}
                  helperText={errors.placa && touched.placa && errors.placa}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  style={defaultStyle.wide}
                  error={errors.marca && touched.marca && errors.marca}
                  label="Marca:"
                  name="marca"
                  onBlur={handleBlur}
                  value={values.marca}
                  onChange={handleChange}
                  helperText={errors.marca && touched.marca && errors.marca}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  style={defaultStyle.wide}
                  error={errors.modelo && touched.modelo && errors.modelo}
                  label="Modelo:"
                  name="modelo"
                  onBlur={handleBlur}
                  value={values.modelo}
                  onChange={handleChange}
                  helperText={errors.modelo && touched.modelo && errors.modelo}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  style={defaultStyle.wide}
                  error={errors.color && touched.color && errors.color}
                  label="Color:"
                  name="color"
                  onBlur={handleBlur}
                  value={values.color}
                  onChange={handleChange}
                  helperText={errors.color && touched.color && errors.color}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  style={defaultStyle.wide}
                  error={
                    errors.fabricado && touched.fabricado && errors.fabricado
                  }
                  label="fecha de fabricación:"
                  name="fabricado"
                  value={values.fabricado}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    errors.fabricado && touched.fabricado && errors.fabricado
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
                  style={defaultStyle.wide}
                  error={
                    errors.capacidad && touched.capacidad && errors.capacidad
                  }
                  label="Capacidad:"
                  name="capacidad"
                  type="number"
                  onBlur={handleBlur}
                  value={values.capacidad}
                  onChange={handleChange}
                  helperText={
                    errors.capacidad && touched.capacidad && errors.capacidad
                  }
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  style={defaultStyle.wide}
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
                  style={defaultStyle.wide}
                  error={errors.clase && touched.clase && errors.clase}
                  label="Clase:"
                  name="clase"
                  onBlur={handleBlur}
                  value={values.clase}
                  onChange={handleChange}
                  helperText={errors.clase && touched.clase && errors.clase}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={8}>
                <TextField
                  style={defaultStyle.wide}
                  error={
                    errors.num_motor && touched.num_motor && errors.num_motor
                  }
                  label="Numero del motor:"
                  name="num_motor"
                  onBlur={handleBlur}
                  value={values.num_motor}
                  onChange={handleChange}
                  disabled={!dispone.motor}
                  helperText={
                    errors.num_motor && touched.num_motor && errors.num_motor
                  }
                  margin="normal"
                />
              </Grid>
              <Grid item xs={4} alignContent="center" justify="center">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={dispone.motor}
                      onClick={() => {
                        disable('motor');
                        props.setFieldValue(
                          'num_motor',
                          !dispone.motor ? '' : 'N/T'
                        );
                      }}
                      value="N/T"
                      color="primary"
                      size="small"
                    />
                  }
                  label="Dispone"
                />
              </Grid>
              <Grid item xs={8}>
                <TextField
                  style={defaultStyle.wide}
                  error={
                    errors.num_chasis && touched.num_chasis && errors.num_chasis
                  }
                  label="Numero de chasis :"
                  name="num_chasis"
                  onBlur={handleBlur}
                  value={values.num_chasis}
                  onChange={handleChange}
                  disabled={!dispone.chasis}
                  helperText={
                    errors.num_chasis && touched.num_chasis && errors.num_chasis
                  }
                  margin="normal"
                />
              </Grid>
              <Grid item xs={4} alignContent="center" justify="center">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={dispone.chasis}
                      onClick={() => {
                        disable('chasis');
                        props.setFieldValue(
                          'num_chasis',
                          !dispone.chasis ? '' : 'N/T'
                        );
                      }}
                      color="primary"
                      size="small"
                    />
                  }
                  label="Dispone"
                />
              </Grid>
              <Grid item xs={8}>
                <TextField
                  style={defaultStyle.wide}
                  error={errors.num_vin && touched.num_vin && errors.num_vin}
                  label="Numero de vin :"
                  name="num_vin"
                  onBlur={handleBlur}
                  value={values.num_vin}
                  onChange={handleChange}
                  disabled={!dispone.vin}
                  helperText={
                    errors.num_vin && touched.num_vin && errors.num_vin
                  }
                  margin="normal"
                />
              </Grid>
              <Grid item xs={4} alignContent="center" justify="center">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={dispone.vin}
                      name="check-vin"
                      onClick={() => {
                        disable('vin');
                        props.setFieldValue(
                          'num_vin',
                          !dispone.vin ? '' : 'N/T'
                        );
                      }}
                      color="primary"
                      size="small"
                    />
                  }
                  label="Dispone"
                />
              </Grid>
            </Grid>
            <Grid container style={defaultStyle.buttons}>
              {buttons.map((buttonItem, index) => (
                <Grid
                  item
                  xs={6}
                  key={`Grid-${title}-${buttonItem.text}:${index}`}
                >
                  <Button
                    key={`${title}-${buttonItem.text}:${index}`}
                    color={buttonItem.color}
                    variant={buttonItem.variant}
                    style={defaultStyle.button}
                    onClick={buttonItem.action}
                    type={buttonItem.type}
                  >
                    {buttonItem.text}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </form>
        );
      }}
    </Formik>
  );
};

export default CarStructure;
