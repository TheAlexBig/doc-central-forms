import React from 'react';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { DataTerritorialDivision } from '../../Data/DataTerritorialDivision';
import { DetailValidationSchema } from '../Validations/DetailValidationSchema';
import { FieldGroup, FormActions, FormHeading } from './FormScaffold';

const fieldProps = (name, values, touched, errors) => ({
  error: Boolean(touched[name] && errors[name]),
  helperText: touched[name] && errors[name],
  name,
  value: values[name],
  fullWidth: true,
});

const formatCurrency = (value) => {
  const [integer = '', cents] = String(value ?? '').split('.');
  const formattedInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return cents === undefined
    ? formattedInteger
    : `${formattedInteger}.${cents}`;
};

const cleanCurrency = (value) => {
  const withoutSeparators = value.replace(/,/g, '').replace(/[^\d.]/g, '');
  const [integer = '', ...decimalParts] = withoutSeparators.split('.');
  if (!decimalParts.length) {
    return integer;
  }
  return `${integer || '0'}.${decimalParts.join('').slice(0, 2)}`;
};

const todayValue = () => new Date().toISOString().slice(0, 10);

const currentTimeValue = () => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

const DetailStructure = ({ data, title, buttons, submitAction }) => (
  <Formik
    enableReinitialize
    initialValues={data}
    onSubmit={submitAction}
    validationSchema={Yup.object().shape(DetailValidationSchema)}
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
          description="Defina las condiciones de venta y los datos del acto notarial."
        />
        <FieldGroup title="Condiciones de la venta">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                {...fieldProps('precio', values, touched, errors)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                inputProps={{ inputMode: 'decimal' }}
                label="Precio de venta"
                onBlur={handleBlur}
                onChange={(event) =>
                  setFieldValue('precio', cleanCurrency(event.target.value))
                }
                placeholder="0.00"
                type="text"
                value={formatCurrency(values.precio)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                {...fieldProps('calidad_de', values, touched, errors)}
                label="Calidad de entrega"
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
          title="Lugar y momento de firma"
          description="Seleccione municipio y distrito según la reorganización territorial vigente."
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                {...fieldProps('departamento', values, touched, errors)}
                label="Departamento"
                onBlur={handleBlur}
                onChange={(event) => {
                  handleChange(event);
                  setFieldValue('municipio', '');
                  setFieldValue('domicilio', '');
                }}
                select
              >
                {Object.keys(DataTerritorialDivision).map((option) => (
                  <MenuItem value={option} key={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                {...fieldProps('municipio', values, touched, errors)}
                disabled={!values.departamento}
                label="Municipio"
                onBlur={handleBlur}
                onChange={(event) => {
                  handleChange(event);
                  setFieldValue('domicilio', '');
                }}
                select
              >
                {Object.keys(
                  DataTerritorialDivision[values.departamento] || {}
                ).map((option) => (
                  <MenuItem value={option} key={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                {...fieldProps('domicilio', values, touched, errors)}
                disabled={!values.municipio}
                label="Distrito"
                onBlur={handleBlur}
                onChange={handleChange}
                select
              >
                {(
                  DataTerritorialDivision[values.departamento]?.[
                    values.municipio
                  ] || []
                ).map((option) => (
                  <MenuItem value={option} key={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Grid container spacing={1}>
                <Grid item xs>
                  <TextField
                    {...fieldProps('fecha_firma', values, touched, errors)}
                    InputLabelProps={{ shrink: true }}
                    label="Fecha de firma"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="date"
                  />
                </Grid>
                <Grid item xs="auto">
                  <Button
                    onClick={() => setFieldValue('fecha_firma', todayValue())}
                    sx={{ height: '100%' }}
                    variant="outlined"
                  >
                    Hoy
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Grid container spacing={1}>
                <Grid item xs>
                  <TextField
                    {...fieldProps('hora_firma', values, touched, errors)}
                    InputLabelProps={{ shrink: true }}
                    inputProps={{ step: 300 }}
                    label="Hora de firma"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="time"
                  />
                </Grid>
                <Grid item xs="auto">
                  <Button
                    onClick={() =>
                      setFieldValue('hora_firma', currentTimeValue())
                    }
                    sx={{ height: '100%' }}
                    variant="outlined"
                  >
                    Ahora
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </FieldGroup>
        <FieldGroup
          title="Identificación ante notario"
          description="Indique si el notario conoce personalmente a cada compareciente."
        >
          <Grid container spacing={2}>
            {[
              ['identifica_vendedor', 'El notario conoce al vendedor'],
              ['identifica_comprador', 'El notario conoce al comprador'],
            ].map(([field, label]) => (
              <Grid item xs={12} sm={6} key={field}>
                <Box
                  sx={{
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    py: 1,
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={values[field] === 'Sí'}
                        onChange={(event) =>
                          setFieldValue(
                            field,
                            event.target.checked ? 'Sí' : 'No'
                          )
                        }
                      />
                    }
                    label={
                      <Typography variant="body2" fontWeight={500}>
                        {label}
                      </Typography>
                    }
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        </FieldGroup>
        <FormActions buttons={buttons} />
      </form>
    )}
  </Formik>
);

export default DetailStructure;
