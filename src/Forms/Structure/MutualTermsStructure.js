import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { DataTerritorialDivision } from '../../Data/DataTerritorialDivision';
import { FieldGroup, FormActions, FormHeading } from './FormScaffold';

const required = 'Campo requerido';
const schema = Yup.object({
  amount: Yup.number().positive('Debe ser mayor que cero').required(required),
  term: Yup.string().required(required),
  dueDate: Yup.string().required(required),
  installmentCount: Yup.number().integer().positive().required(required),
  installmentAmount: Yup.number().positive().required(required),
  paymentBank: Yup.string().required(required),
  paymentAccount: Yup.string().required(required),
  fundsPurpose: Yup.string().required(required),
  specialDomicile: Yup.string().required(required),
  signingState: Yup.string().required(required),
  signingMunicipality: Yup.string().required(required),
  signingDistrict: Yup.string().required(required),
  signingDate: Yup.string().required(required),
  signingTime: Yup.string().required(required),
  guaranteeDueDate: Yup.string().when('billOfExchangeGuarantee', {
    is: true,
    then: (value) => value.required(required),
  }),
});

const field = (name, values, touched, errors) => ({
  fullWidth: true,
  name,
  value: values[name],
  error: Boolean(touched[name] && errors[name]),
  helperText: touched[name] && errors[name],
});

export default function MutualTermsStructure({ data, onSubmit, onBack }) {
  return (
    <Formik initialValues={data} onSubmit={onSubmit} validationSchema={schema}>
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
            eyebrow="Condiciones del crédito"
            title="Términos del mutuo"
            description="Defina capital, plazo, pago, intereses opcionales y datos de autenticación."
            summary={[
              { label: 'Monto', value: values.amount && `$${values.amount}` },
              { label: 'Cuotas', value: values.installmentCount },
            ]}
          />
          <FieldGroup title="Capital y forma de pago">
            <Grid container spacing={2}>
              {[
                ['amount', 'Monto mutuado', 'number', 6],
                ['installmentAmount', 'Monto de cada cuota', 'number', 6],
                ['term', 'Plazo (ej. seis meses)', 'text', 6],
                ['installmentCount', 'Número de cuotas', 'number', 6],
                ['dueDate', 'Fecha de vencimiento', 'date', 12],
                ['paymentBank', 'Banco para el pago', 'text', 6],
                ['paymentAccount', 'Número de cuenta', 'text', 6],
              ].map(([name, label, type, width]) => (
                <Grid item xs={12} sm={width} key={name}>
                  <TextField
                    {...field(name, values, touched, errors)}
                    InputLabelProps={
                      type === 'date' ? { shrink: true } : undefined
                    }
                    InputProps={
                      ['amount', 'installmentAmount'].includes(name)
                        ? {
                            startAdornment: (
                              <InputAdornment position="start">
                                $
                              </InputAdornment>
                            ),
                          }
                        : undefined
                    }
                    label={label}
                    type={type}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
              ))}
            </Grid>
          </FieldGroup>
          <FieldGroup title="Intereses y destino" accent="#8a6540">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...field('monthlyInterest', values, touched, errors)}
                  label="Interés mensual (%) — opcional"
                  type="number"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...field('defaultInterest', values, touched, errors)}
                  label="Interés mensual por mora (%) — opcional"
                  type="number"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...field('fundsPurpose', values, touched, errors)}
                  label="Destino de los fondos"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...field('administrativeExpenses', values, touched, errors)}
                  label="Gastos administrativos (%) — opcional"
                  type="number"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Grid>
            </Grid>
          </FieldGroup>
          <FieldGroup title="Garantía" accent="#52766e">
            <FormControlLabel
              control={
                <Checkbox
                  name="billOfExchangeGuarantee"
                  checked={values.billOfExchangeGuarantee}
                  onChange={handleChange}
                />
              }
              label="Se suscribirá letra de cambio sin protesto"
            />
            {values.billOfExchangeGuarantee && (
              <TextField
                {...field('guaranteeDueDate', values, touched, errors)}
                InputLabelProps={{ shrink: true }}
                label="Vencimiento de la letra"
                type="date"
                onChange={handleChange}
                onBlur={handleBlur}
                sx={{ mt: 2, maxWidth: 420 }}
              />
            )}
          </FieldGroup>
          <FieldGroup title="Firma y jurisdicción" accent="#2f7c70">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  {...field('specialDomicile', values, touched, errors)}
                  label="Domicilio especial"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...field('signingState', values, touched, errors)}
                  label="Departamento de firma"
                  select
                  onChange={(event) => {
                    handleChange(event);
                    setFieldValue('signingMunicipality', '');
                    setFieldValue('signingDistrict', '');
                  }}
                  onBlur={handleBlur}
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
                  {...field('signingMunicipality', values, touched, errors)}
                  disabled={!values.signingState}
                  label="Municipio de firma"
                  select
                  onChange={(event) => {
                    handleChange(event);
                    setFieldValue('signingDistrict', '');
                  }}
                  onBlur={handleBlur}
                >
                  {Object.keys(
                    DataTerritorialDivision[values.signingState] || {}
                  ).map((option) => (
                    <MenuItem value={option} key={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...field('signingDistrict', values, touched, errors)}
                  disabled={!values.signingMunicipality}
                  label="Distrito de firma"
                  select
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  {(
                    DataTerritorialDivision[values.signingState]?.[
                      values.signingMunicipality
                    ] || []
                  ).map((option) => (
                    <MenuItem value={option} key={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              {[
                ['signingDate', 'Fecha de firma', 'date'],
                ['signingTime', 'Hora de firma', 'time'],
              ].map(([name, label, type]) => (
                <Grid item xs={12} sm={6} key={name}>
                  <TextField
                    {...field(name, values, touched, errors)}
                    InputLabelProps={{ shrink: true }}
                    label={label}
                    type={type}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
              ))}
            </Grid>
          </FieldGroup>
          <FieldGroup
            title="Identificación ante notario"
            description="Indique si el notario conoce personalmente a cada compareciente."
            accent="#8a6540"
          >
            <Grid container spacing={2}>
              {[
                ['identifiesDebtor', 'El notario conoce al deudor'],
                ['identifiesCreditor', 'El notario conoce al acreedor'],
              ].map(([name, label]) => (
                <Grid item xs={12} sm={6} key={name}>
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
                          checked={values[name] === 'Sí'}
                          onChange={(event) =>
                            setFieldValue(
                              name,
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
          <FormActions
            buttons={[
              {
                text: 'Atrás',
                type: 'button',
                variant: 'outlined',
                action: onBack,
              },
              {
                text: 'Guardar y revisar',
                type: 'submit',
                variant: 'contained',
              },
            ]}
          />
        </form>
      )}
    </Formik>
  );
}
