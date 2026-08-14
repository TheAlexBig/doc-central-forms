import React, { useState } from 'react';
import Alert from '@mui/material/Alert';
import Autocomplete from '@mui/material/Autocomplete';
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

const autocompleteField = (
  name,
  label,
  options,
  values,
  touched,
  errors,
  handleBlur,
  setFieldValue
) => (
  <Autocomplete
    freeSolo
    inputValue={values[name] || ''}
    onChange={(event, newValue) => {
      setFieldValue(name, newValue || '');
    }}
    onInputChange={(event, newInputValue) => {
      setFieldValue(name, newInputValue);
    }}
    options={options}
    renderInput={(params) => (
      <TextField
        {...params}
        error={Boolean(touched[name] && errors[name])}
        fullWidth
        helperText={touched[name] && errors[name]}
        label={label}
        name={name}
        onBlur={handleBlur}
      />
    )}
  />
);

const getModelOptions = (brand, options) => {
  const matchingBrand = Object.keys(options.modelsByBrand || {}).find(
    (savedBrand) => savedBrand.toLocaleLowerCase() === brand.toLocaleLowerCase()
  );

  return matchingBrand
    ? options.modelsByBrand[matchingBrand]
    : options.models || [];
};

const vehicleClassOptions = ['Automóvil', 'Camión liviano', 'Camión pesado'];
const vehicleTypeOptions = [
  'Sedán',
  'Hatchback',
  'Pick-up',
  'Microbús',
  'Panel',
  'Cabezal',
];

const capacityUnitForClass = (vehicleClass) =>
  vehicleClass.toLocaleLowerCase().startsWith('camión') ? 'TON' : 'ASS';

const carSummary = (values) => [
  { label: 'Placa', value: values.placa },
  {
    label: 'Vehículo',
    value: [values.marca, values.modelo].filter(Boolean).join(' '),
  },
  { label: 'Color', value: values.color },
];

const CarStructure = ({
  data,
  title,
  buttons,
  submitAction,
  error = '',
  options = {
    colors: [],
    brands: [],
    models: [],
    modelsByBrand: {},
  },
}) => {
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
            eyebrow="Datos del vehículo"
            summary={carSummary(values)}
          />
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}
          <FieldGroup title="Identificación del vehículo" accent="#285f9f">
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
                {autocompleteField(
                  'marca',
                  'Marca',
                  options.brands || [],
                  values,
                  touched,
                  errors,
                  handleBlur,
                  setFieldValue
                )}
              </Grid>
              <Grid item xs={12} sm={4}>
                {autocompleteField(
                  'modelo',
                  'Modelo',
                  getModelOptions(values.marca || '', options),
                  values,
                  touched,
                  errors,
                  handleBlur,
                  setFieldValue
                )}
              </Grid>
            </Grid>
          </FieldGroup>
          <FieldGroup title="Características" accent="#8a5b1f">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                {autocompleteField(
                  'color',
                  'Color',
                  options.colors || [],
                  values,
                  touched,
                  errors,
                  handleBlur,
                  setFieldValue
                )}
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
              <Grid item xs={12} sm={3}>
                <TextField
                  {...fieldProps('capacidad', values, touched, errors)}
                  inputProps={{ min: 0, step: '0.01' }}
                  label="Capacidad"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder={
                    values.unidad_capacidad === 'TON' ? '2.00' : '5.00'
                  }
                  type="number"
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  {...fieldProps('unidad_capacidad', values, touched, errors)}
                  label="Unidad"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  select
                >
                  <MenuItem value="ASS">ASS (asientos)</MenuItem>
                  <MenuItem value="TON">TON (toneladas)</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={3}>
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
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  freeSolo
                  inputValue={values.clase || ''}
                  onChange={(event, newValue) => {
                    const vehicleClass = newValue || '';
                    setFieldValue('clase', vehicleClass);
                    setFieldValue(
                      'unidad_capacidad',
                      capacityUnitForClass(vehicleClass)
                    );
                  }}
                  onInputChange={(event, newInputValue, reason) => {
                    setFieldValue('clase', newInputValue);
                    if (reason === 'input') {
                      setFieldValue(
                        'unidad_capacidad',
                        capacityUnitForClass(newInputValue)
                      );
                    }
                  }}
                  options={vehicleClassOptions}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={Boolean(touched.clase && errors.clase)}
                      helperText={touched.clase && errors.clase}
                      label="Clase"
                      name="clase"
                      onBlur={handleBlur}
                      placeholder="Automóvil"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                {autocompleteField(
                  'tipo',
                  'Tipo',
                  vehicleTypeOptions,
                  values,
                  touched,
                  errors,
                  handleBlur,
                  setFieldValue
                )}
              </Grid>
            </Grid>
          </FieldGroup>
          <FieldGroup
            title="Números registrales"
            description="Marque “No consta” únicamente cuando el dato no aparezca en la documentación."
            accent="#7c3f58"
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
