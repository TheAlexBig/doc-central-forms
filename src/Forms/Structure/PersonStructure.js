import React from 'react';
import Alert from '@mui/material/Alert';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { DataTerritorialDivision } from '../../Data/DataTerritorialDivision';
import { formatDui, normalizeDui } from '../PersonMemory';
import { PersonValidationSchema } from '../Validations/PersonValidationSchema';
import { FieldGroup, FormActions, FormHeading } from './FormScaffold';

const fieldProps = (name, values, touched, errors) => ({
  error: Boolean(touched[name] && errors[name]),
  helperText: touched[name] && errors[name],
  name,
  value: values[name],
  fullWidth: true,
});

const personLabel = (person) =>
  [
    [person.nombre, person.apellido].filter(Boolean).join(' '),
    person.documento,
    person.oficio,
  ]
    .filter(Boolean)
    .join(' / ');

const PersonStructure = ({
  data,
  title,
  buttons,
  submitAction,
  error = '',
  people = [],
  occupations = [],
}) => (
  <Formik
    enableReinitialize
    initialValues={data}
    onSubmit={submitAction}
    validationSchema={Yup.object().shape(PersonValidationSchema)}
  >
    {({
      values,
      touched,
      errors,
      handleChange,
      handleBlur,
      handleSubmit,
      setFieldValue,
      setValues,
    }) => (
      <form onSubmit={handleSubmit} noValidate>
        <FormHeading
          title={title}
          description="Ingrese la información tal como aparece en los documentos de identidad."
        />
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
        {people.length > 0 && (
          <FieldGroup
            title="Persona guardada"
            description="Busque por nombre, DUI u oficio para reutilizar datos anteriores."
          >
            <Autocomplete
              options={people}
              getOptionLabel={personLabel}
              isOptionEqualToValue={(option, value) =>
                normalizeDui(option.documento) === normalizeDui(value.documento)
              }
              onChange={(event, person) => {
                if (person) {
                  setValues({
                    ...data,
                    ...person,
                    documento: formatDui(person.documento),
                  });
                }
              }}
              renderOption={(props, person) => (
                <Box
                  component="li"
                  {...props}
                  key={normalizeDui(person.documento)}
                >
                  <Box sx={{ minWidth: 0 }}>
                    <Typography fontWeight={650} variant="body2">
                      {[person.nombre, person.apellido]
                        .filter(Boolean)
                        .join(' ')}
                    </Typography>
                    <Typography color="text.secondary" variant="caption">
                      {person.documento} / {person.oficio}
                    </Typography>
                  </Box>
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  label="Buscar persona guardada"
                />
              )}
            />
          </FieldGroup>
        )}
        <FieldGroup title="Identidad personal">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                {...fieldProps('nombre', values, touched, errors)}
                label="Nombres"
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                {...fieldProps('apellido', values, touched, errors)}
                label="Apellidos"
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                {...fieldProps('fecha_nacimiento', values, touched, errors)}
                InputLabelProps={{ shrink: true }}
                label="Fecha de nacimiento"
                onBlur={handleBlur}
                onChange={handleChange}
                type="date"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                {...fieldProps('genero', values, touched, errors)}
                label="Género"
                onBlur={handleBlur}
                onChange={handleChange}
                select
              >
                <MenuItem value="Femenino">Femenino</MenuItem>
                <MenuItem value="Masculino">Masculino</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </FieldGroup>
        <FieldGroup
          title="Documentos y domicilio"
          description="El DUI y la división territorial vigente se incorporarán al contrato."
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                {...fieldProps('documento', values, touched, errors)}
                label="DUI"
                onBlur={handleBlur}
                onChange={(event) => {
                  setFieldValue('documento', formatDui(event.target.value));
                }}
                placeholder="00000000-0"
                inputProps={{
                  inputMode: 'numeric',
                  maxLength: 10,
                }}
              />
            </Grid>
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
          </Grid>
        </FieldGroup>
        <FieldGroup title="Actividad">
          <Autocomplete
            freeSolo
            inputValue={values.oficio || ''}
            onChange={(event, newValue) => {
              setFieldValue('oficio', newValue || '');
            }}
            onInputChange={(event, newInputValue) => {
              setFieldValue('oficio', newInputValue);
            }}
            options={occupations}
            renderInput={(params) => (
              <TextField
                {...params}
                error={Boolean(touched.oficio && errors.oficio)}
                fullWidth
                helperText={touched.oficio && errors.oficio}
                label="Oficio o profesión"
                name="oficio"
                onBlur={handleBlur}
              />
            )}
          />
        </FieldGroup>
        <FormActions buttons={buttons} />
      </form>
    )}
  </Formik>
);

export default PersonStructure;
