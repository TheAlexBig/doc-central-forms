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
  rol: 'Notario',
};

const fieldProps = (name, values, touched, errors) => ({
  error: Boolean(touched[name] && errors[name]),
  helperText: touched[name] && errors[name],
  name,
  value: values[name],
  fullWidth: true,
});

const agentSummary = (values) => [
  {
    label: 'Persona',
    value: [values.nombres, values.apellidos].filter(Boolean).join(' '),
  },
  { label: 'Rol', value: values.rol },
  { label: 'Carnet', value: values.carnet },
];

const AgentStructure = ({
  agent,
  buttons,
  submitAction,
  allowedRoles = ['Notario', 'Abogado', 'Asistente', 'Escriba', 'Otro'],
}) => (
  <Formik
    enableReinitialize
    initialValues={{ ...initialAgent, ...(agent || {}) }}
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
          title={agent ? 'Editar persona' : 'Nueva persona'}
          description="Registre profesionales y colaboradores que participan en la preparación o autorización de documentos."
          eyebrow="Profesional o colaborador"
          summary={agentSummary(values)}
        />
        <FieldGroup title="Información de la persona" accent="#17695d">
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
                label={
                  ['Notario', 'Abogado'].includes(values.rol)
                    ? 'Carnet'
                    : 'Carnet (opcional)'
                }
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                {...fieldProps('rol', values, touched, errors)}
                label="Rol"
                onBlur={handleBlur}
                onChange={handleChange}
                select
              >
                {allowedRoles.map((role) => (
                  <MenuItem key={role} value={role}>
                    {role}
                  </MenuItem>
                ))}
              </TextField>
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
