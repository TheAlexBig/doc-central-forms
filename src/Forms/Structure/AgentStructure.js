import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { DataTerritorialDivision } from '../../Data/DataTerritorialDivision';
import { AgentValidationSchema } from '../Validations/AgentValidationSchema';
import { FieldGroup, FormActions, FormHeading } from './FormScaffold';

const initialAgent = {
  nombres: '',
  apellidos: '',
  departamento: '',
  municipio: '',
  distrito: '',
  carnet: '',
  genero: '',
};

const fieldProps = (name, values, touched, errors) => ({
  error: Boolean(touched[name] && errors[name]),
  helperText: touched[name] && errors[name],
  name,
  value: values[name],
  fullWidth: true,
});

const AgentStructure = ({ agent, buttons, submitAction }) => (
  <Formik
    enableReinitialize
    initialValues={agent || initialAgent}
    onSubmit={submitAction}
    validationSchema={Yup.object().shape(AgentValidationSchema)}
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
          title="Nuevo agente"
          description="Los datos se guardan solo en este equipo para utilizarlos en documentos futuros."
        />
        <FieldGroup title="Información del profesional">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                {...fieldProps('nombres', values, touched, errors)}
                label="Nombres"
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                {...fieldProps('apellidos', values, touched, errors)}
                label="Apellidos"
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                {...fieldProps('carnet', values, touched, errors)}
                label="Carnet"
                onBlur={handleBlur}
                onChange={handleChange}
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
            <Grid item xs={12} sm={6}>
              <TextField
                {...fieldProps('departamento', values, touched, errors)}
                label="Departamento"
                onBlur={handleBlur}
                onChange={(event) => {
                  handleChange(event);
                  setFieldValue('municipio', '');
                  setFieldValue('distrito', '');
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
                  setFieldValue('distrito', '');
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
                {...fieldProps('distrito', values, touched, errors)}
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
        <FormActions buttons={buttons} />
      </form>
    )}
  </Formik>
);

export default AgentStructure;
