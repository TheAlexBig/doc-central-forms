import React, { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { CarValidationSchema } from '../Validations/CarValidationSchema';
import { FieldGroup, FormActions, FormHeading } from './FormScaffold';

const fieldProps = (name, values, touched, errors) => ({
  error: Boolean(touched[name] && errors[name]),
  helperText: touched[name] && errors[name],
  name,
  value: values[name],
  fullWidth: true,
});

const CarStructure = ({ data, title, buttons, submitAction }) => {
  const [notAvailable, setNotAvailable] = useState({
    motor: data.num_motor === 'N/T',
    chasis: data.num_chasis === 'N/T',
    vin: data.num_vin === 'N/T',
  });

  const toggleNumber = (key, field, checked, setFieldValue) => {
    setNotAvailable((current) => ({ ...current, [key]: checked }));
    setFieldValue(field, checked ? 'N/T' : '');
  };

  return (
    <Formik
      enableReinitialize
      initialValues={data}
      onSubmit={submitAction}
      validationSchema={Yup.object().shape(CarValidationSchema)}
    >
      {({
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
      }) => (
        <form onSubmit={handleSubmit} noValidate>
          <FormHeading
            title={title}
            description="Copie las características registrales del vehículo para evitar errores en el contrato."
          />
          <FieldGroup title="Identificación del vehículo">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField
                  {...fieldProps('placa', values, touched, errors)}
                  label="Placa"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="P-123456"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  {...fieldProps('marca', values, touched, errors)}
                  label="Marca"
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  {...fieldProps('modelo', values, touched, errors)}
                  label="Modelo"
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </FieldGroup>
          <FieldGroup title="Características">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...fieldProps('color', values, touched, errors)}
                  label="Color"
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...fieldProps('fabricado', values, touched, errors)}
                  InputLabelProps={{ shrink: true }}
                  label="Fecha de fabricación"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="date"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  {...fieldProps('capacidad', values, touched, errors)}
                  label="Capacidad de personas"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="number"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  {...fieldProps('clase', values, touched, errors)}
                  label="Clase"
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  {...fieldProps('dominio', values, touched, errors)}
                  label="Dominio"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  select
                >
                  <MenuItem value="Propiedad">Propiedad</MenuItem>
                  <MenuItem value="Prenda">Prenda</MenuItem>
                </TextField>
              </Grid>
            </Grid>
          </FieldGroup>
          <FieldGroup
            title="Números registrales"
            description="Marque “No consta” únicamente cuando el dato no aparezca en la documentación."
          >
            <Grid container spacing={2}>
              {[
                ['motor', 'num_motor', 'Número de motor'],
                ['chasis', 'num_chasis', 'Número de chasis'],
                ['vin', 'num_vin', 'Número VIN'],
              ].map(([key, field, label]) => (
                <Grid item xs={12} key={field}>
                  <Grid container spacing={1.5} alignItems="center">
                    <Grid item xs={12} sm>
                      <TextField
                        {...fieldProps(field, values, touched, errors)}
                        disabled={notAvailable[key]}
                        label={label}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs={12} sm="auto">
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={notAvailable[key]}
                            onChange={(event) =>
                              toggleNumber(
                                key,
                                field,
                                event.target.checked,
                                setFieldValue
                              )
                            }
                          />
                        }
                        label="No consta"
                      />
                    </Grid>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </FieldGroup>
          <FormActions buttons={buttons} />
        </form>
      )}
    </Formik>
  );
};

export default CarStructure;
