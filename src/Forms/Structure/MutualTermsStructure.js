import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
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
import { calculateMutualPreview } from '../MutualFinancialPreview';
import MutualPaymentPlanSummary from './MutualPaymentPlanSummary';

const todayValue = () => new Date().toISOString().slice(0, 10);

const currentTimeValue = () => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

const required = 'Campo requerido';
const schema = Yup.object({
  amount: Yup.number().positive('Debe ser mayor que cero').required(required),
  termMode: Yup.string().required(required),
  termQuantity: Yup.number().when('termMode', {
    is: 'DURATION',
    then: (value) => value.integer().positive().required(required),
  }),
  termUnit: Yup.string().when('termMode', {
    is: 'DURATION',
    then: (value) => value.required(required),
  }),
  dueDate: Yup.string().when('termMode', {
    is: 'SPECIFIC_DATE',
    then: (value) =>
      value
        .required(required)
        .test(
          'after-start',
          'Debe ser posterior a la fecha de firma',
          function validateDueDate(date) {
            return (
              !date ||
              !this.parent.signingDate ||
              date > this.parent.signingDate
            );
          }
        ),
  }),
  installmentCount: Yup.number().integer().positive().required(required),
  paymentBank: Yup.string().required(required),
  paymentAccount: Yup.string().required(required),
  fundsPurpose: Yup.string().required(required),
  instrumentType: Yup.string().required(required),
  guaranteeType: Yup.string().required(required),
  deedNumber: Yup.number().when('instrumentType', {
    is: 'PUBLIC_DEED',
    then: (value) => value.integer().positive().required(required),
  }),
  guaranteeDetails: Yup.string().when('guaranteeType', {
    is: (value) => ['MOVABLE', 'MORTGAGE'].includes(value),
    then: (value) => value.required(required),
  }),
  pledgeValue: Yup.number().when('guaranteeType', {
    is: 'VEHICLE_PLEDGE',
    then: (value) =>
      value.positive('Debe ser mayor que cero').required(required),
  }),
  signingState: Yup.string().required(required),
  signingMunicipality: Yup.string().required(required),
  signingDistrict: Yup.string().required(required),
  signingDate: Yup.string().required(required),
  signingTime: Yup.string().required(required),
}).test('valid-payment-plan', '', function validatePaymentPlan(values) {
  const termReady =
    values?.termMode === 'SPECIFIC_DATE'
      ? values.dueDate
      : values?.termQuantity && values?.termUnit;
  if (
    !values?.amount ||
    !values?.installmentCount ||
    !values?.signingDate ||
    !termReady
  ) {
    return true;
  }
  return (
    Boolean(calculateMutualPreview(values)) ||
    this.createError({
      path: 'installmentCount',
      message: 'Las cuotas no caben dentro del plazo seleccionado',
    })
  );
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
    <Formik
      enableReinitialize
      initialValues={data}
      onSubmit={(values) => {
        const preview = calculateMutualPreview(values);
        if (!preview) return;
        const unit = { DAYS: 'días', MONTHS: 'meses', YEARS: 'años' };
        onSubmit({
          ...values,
          dueDate: preview.dueDate,
          installmentAmount: String(preview.installmentAmount),
          term:
            values.termMode === 'SPECIFIC_DATE'
              ? `hasta el ${preview.dueDate}`
              : `${values.termQuantity} ${unit[values.termUnit]}`,
        });
      }}
      validationSchema={schema}
    >
      {({
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
      }) => {
        const preview = calculateMutualPreview(values);
        return (
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
                <Grid item xs={12} sm={6}>
                  <TextField
                    {...field('amount', values, touched, errors)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                    label="Capital"
                    type="number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    {...field('monthlyInterest', values, touched, errors)}
                    label="Tasa mensual incluida en la cuota (%) — opcional"
                    type="number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    {...field('termMode', values, touched, errors)}
                    label="Definir vencimiento por"
                    select
                    onChange={(event) => {
                      handleChange(event);
                      setFieldValue('dueDate', '');
                    }}
                    onBlur={handleBlur}
                  >
                    <MenuItem value="DURATION">Cantidad y unidad</MenuItem>
                    <MenuItem value="SPECIFIC_DATE">Fecha específica</MenuItem>
                  </TextField>
                </Grid>
                {values.termMode === 'DURATION' ? (
                  <>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        {...field('termQuantity', values, touched, errors)}
                        label="Cantidad"
                        type="number"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        {...field('termUnit', values, touched, errors)}
                        label="Unidad"
                        select
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <MenuItem value="DAYS">Días</MenuItem>
                        <MenuItem value="MONTHS">Meses</MenuItem>
                        <MenuItem value="YEARS">Años</MenuItem>
                      </TextField>
                    </Grid>
                  </>
                ) : (
                  <Grid item xs={12} sm={6}>
                    <TextField
                      {...field('dueDate', values, touched, errors)}
                      InputLabelProps={{ shrink: true }}
                      inputProps={{ min: values.signingDate }}
                      label="Fecha de vencimiento"
                      type="date"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Grid>
                )}
                <Grid item xs={12} sm={6}>
                  <TextField
                    {...field('installmentCount', values, touched, errors)}
                    label="Número de cuotas"
                    type="number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    InputProps={{ readOnly: true }}
                    label="Valor inicial por cuota"
                    value={
                      preview ? `$${preview.installmentAmount.toFixed(2)}` : ''
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    {...field('paymentBank', values, touched, errors)}
                    label="Banco para el pago"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    {...field('paymentAccount', values, touched, errors)}
                    label="Número de cuenta"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
              </Grid>
              {Number(values.monthlyInterest) > 0 && (
                <Alert severity="info" sx={{ mt: 2 }}>
                  La cuota ya incluye este costo. El documento lo identifica
                  expresamente y aclara que no se agregará otro interés
                  ordinario si los pagos se realizan según lo pactado.
                </Alert>
              )}
              {preview && <MutualPaymentPlanSummary preview={preview} />}
            </FieldGroup>
            <FieldGroup title="Intereses y destino" accent="#8a6540">
              <Grid container spacing={2}>
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
                    {...field('defaultInterest', values, touched, errors)}
                    label="Interés mensual por mora (%) — opcional"
                    type="number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    {...field(
                      'administrativeExpenses',
                      values,
                      touched,
                      errors
                    )}
                    label="Gastos administrativos (%) — opcional"
                    type="number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
              </Grid>
            </FieldGroup>
            <FieldGroup title="Instrumento" accent="#2f7c70">
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    {...field('instrumentType', values, touched, errors)}
                    disabled={values.guaranteeType === 'MORTGAGE'}
                    label="Tipo de instrumento"
                    select
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <MenuItem value="PRIVATE_AUTHENTICATED">
                      Documento privado autenticado
                    </MenuItem>
                    <MenuItem value="PUBLIC_DEED">Escritura pública</MenuItem>
                  </TextField>
                </Grid>
                {values.instrumentType === 'PUBLIC_DEED' && (
                  <Grid item xs={12} sm={6}>
                    <TextField
                      {...field('deedNumber', values, touched, errors)}
                      label="Número de escritura"
                      type="number"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Grid>
                )}
              </Grid>
            </FieldGroup>
            <FieldGroup title="Garantía" accent="#52766e">
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    {...field('guaranteeType', values, touched, errors)}
                    label="Tipo de garantía"
                    select
                    onChange={(event) => {
                      handleChange(event);
                      if (event.target.value === 'MORTGAGE') {
                        setFieldValue('instrumentType', 'PUBLIC_DEED');
                      }
                    }}
                    onBlur={handleBlur}
                  >
                    <MenuItem value="NONE">Sin garantía</MenuItem>
                    <MenuItem value="PERSONAL_GUARANTOR">
                      Fiador o garante personal
                    </MenuItem>
                    <MenuItem value="VEHICLE_PLEDGE">
                      Prenda sin desplazamiento sobre vehículo
                    </MenuItem>
                    <MenuItem value="MOVABLE">Garantía mobiliaria</MenuItem>
                    <MenuItem value="MORTGAGE">Garantía hipotecaria</MenuItem>
                  </TextField>
                </Grid>
                {['MOVABLE', 'MORTGAGE'].includes(values.guaranteeType) && (
                  <Grid item xs={12}>
                    <TextField
                      {...field('guaranteeDetails', values, touched, errors)}
                      label="Descripción del bien dado en garantía"
                      multiline
                      minRows={3}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Grid>
                )}
                {values.guaranteeType === 'VEHICLE_PLEDGE' && (
                  <Grid item xs={12} sm={6}>
                    <TextField
                      {...field('pledgeValue', values, touched, errors)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">$</InputAdornment>
                        ),
                      }}
                      label="Valor convenido del vehículo"
                      type="number"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Grid>
                )}
              </Grid>
              {values.guaranteeType === 'MORTGAGE' && (
                <Alert severity="info" sx={{ mt: 2 }}>
                  Garantía hipotecaria requiere escritura pública. Tipo
                  seleccionado automáticamente.
                </Alert>
              )}
              {values.guaranteeType === 'PERSONAL_GUARANTOR' && (
                <Alert severity="info" sx={{ mt: 2 }}>
                  Datos del fiador se solicitarán en siguiente paso.
                </Alert>
              )}
              {values.guaranteeType === 'VEHICLE_PLEDGE' && (
                <Alert severity="info" sx={{ mt: 2 }}>
                  Los datos del vehículo se solicitarán en el siguiente paso. La
                  inscripción registral debe tramitarse por separado.
                </Alert>
              )}
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
            <FieldGroup
              title="Lugar y momento de firma"
              description="Seleccione municipio y distrito según la reorganización territorial vigente."
              accent="#2f7c70"
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    {...field('signingState', values, touched, errors)}
                    label="Departamento"
                    onBlur={handleBlur}
                    onChange={(event) => {
                      handleChange(event);
                      setFieldValue('signingMunicipality', '');
                      setFieldValue('signingDistrict', '');
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
                    {...field('signingMunicipality', values, touched, errors)}
                    disabled={!values.signingState}
                    label="Municipio"
                    onBlur={handleBlur}
                    onChange={(event) => {
                      handleChange(event);
                      setFieldValue('signingDistrict', '');
                    }}
                    select
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
                    label="Distrito"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    select
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
                <Grid item xs={12} sm={6}>
                  <Grid container spacing={1}>
                    <Grid item xs>
                      <TextField
                        {...field('signingDate', values, touched, errors)}
                        InputLabelProps={{ shrink: true }}
                        label="Fecha de firma"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="date"
                      />
                    </Grid>
                    <Grid item xs="auto">
                      <Button
                        onClick={() =>
                          setFieldValue('signingDate', todayValue())
                        }
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
                        {...field('signingTime', values, touched, errors)}
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
                          setFieldValue('signingTime', currentTimeValue())
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
        );
      }}
    </Formik>
  );
}
