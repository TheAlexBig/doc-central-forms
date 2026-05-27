import React from 'react';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import InputMask from 'react-input-mask';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { DataTerritorialDivision } from '../../Data/DataTerritorialDivision';
import { PersonValidationSchema } from '../Validations/PersonValidationSchema';
import { FieldGroup, FormActions, FormHeading } from './FormScaffold';

const fieldProps = (name, values, touched, errors) => ({
  error: Boolean(touched[name] && errors[name]),
  helperText: touched[name] && errors[name],
  name,
  value: values[name],
  fullWidth: true,
});

const PersonStructure = ({ data, title, buttons, submitAction }) => (
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
    }) => (
      <form onSubmit={handleSubmit} noValidate>
        <FormHeading
          title={title}
          description="Ingrese la información tal como aparece en los documentos de identidad."
        />
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
          description="El DUI, NIT y la división territorial vigente se incorporarán al contrato."
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <InputMask
                mask="99999999-9"
                maskChar=""
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.documento}
              >
                {() => (
                  <TextField
                    {...fieldProps('documento', values, touched, errors)}
                    label="DUI"
                    placeholder="00000000-0"
                  />
                )}
              </InputMask>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputMask
                mask="9999-999999-999-9"
                maskChar=""
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.nit}
              >
                {() => (
                  <TextField
                    {...fieldProps('nit', values, touched, errors)}
                    label="NIT"
                    placeholder="0000-000000-000-0"
                  />
                )}
              </InputMask>
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
          <TextField
            {...fieldProps('oficio', values, touched, errors)}
            label="Oficio o profesión"
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </FieldGroup>
        <FormActions buttons={buttons} />
      </form>
    )}
  </Formik>
);

export default PersonStructure;
