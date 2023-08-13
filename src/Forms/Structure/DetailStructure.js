import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import { Formik } from 'formik';
import Typography from '@mui/material/Typography';
import * as Yup from 'yup';
import React, { useState } from 'react';
import { DataDepMuni } from '../../Data/DataDepMuni';
import { DetailValidationSchema } from '../ValidationSchema/DetailValidationSchema';
import { defaultStyle } from '../FormStyles';

const DetailStructure = ({
  data,
  title = 'No title',
  buttons = [],
  submitAction = () => {},
}) => {
  const [conoce, setConoce] = useState({
    vendedor: false,
    comprador: false,
  });

  const checkKnow = (type) => {
    const conocer = {
      ...conoce,
    };
    conocer[type] = !conoce[type];
    setConoce(conocer);
  };

  return (
    <Formik
      initialValues={data}
      onSubmit={submitAction}
      validationSchema={Yup.object().shape(DetailValidationSchema)}
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
                  error={errors.precio && touched.precio && errors.precio}
                  label="Precio:"
                  name="precio"
                  value={values.precio}
                  onChange={handleChange}
                  type="number"
                  helperText={errors.precio && touched.precio && errors.precio}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  style={defaultStyle.wide}
                  error={
                    errors.departamento &&
                    touched.departamento &&
                    errors.departamento
                  }
                  select
                  label="Departamento:"
                  name="departamento"
                  value={values.departamento}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    errors.departamento &&
                    touched.departamento &&
                    errors.departamento
                  }
                  margin="normal"
                >
                  {Object.keys(DataDepMuni).map((opt, index) => (
                    <MenuItem value={opt} key={`Departamento-${index}`}>
                      {opt}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  style={defaultStyle.wide}
                  error={
                    errors.domicilio && touched.domicilio && errors.domicilio
                  }
                  select
                  label="Municipio:"
                  name="domicilio"
                  value={values.domicilio}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={values.departamento.length === 0}
                  helperText={
                    errors.domicilio && touched.domicilio && errors.domicilio
                  }
                  margin="normal"
                >
                  {values.departamento.length === 0 ? (
                    <MenuItem value="0">0</MenuItem>
                  ) : (
                    DataDepMuni[values.departamento].map((opt, index) => (
                      <MenuItem value={opt} key={`Municipio-${index}`}>
                        {opt}
                      </MenuItem>
                    ))
                  )}
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  style={defaultStyle.wide}
                  error={
                    errors.fecha_firma &&
                    touched.fecha_firma &&
                    errors.fecha_firma
                  }
                  label="Fecha de firma:"
                  name="fecha_firma"
                  value={values.fecha_firma}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    errors.fecha_firma &&
                    touched.fecha_firma &&
                    errors.fecha_firma
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
                    errors.hora_firma && touched.hora_firma && errors.hora_firma
                  }
                  label="Hora de firma:"
                  name="hora_firma"
                  value={values.hora_firma}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    errors.hora_firma && touched.hora_firma && errors.hora_firma
                  }
                  type="time"
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
                    errors.calidad_de && touched.calidad_de && errors.calidad_de
                  }
                  select
                  label="En calidad de:"
                  name="calidad_de"
                  value={values.calidad_de}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    errors.calidad_de && touched.calidad_de && errors.calidad_de
                  }
                  margin="normal"
                >
                  <MenuItem value="Propiedad">Propiedad</MenuItem>
                  <MenuItem value="Prenda">Prenda</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={conoce.vendedor}
                      name="identifica_vendedor"
                      onClick={() => checkKnow('vendedor')}
                      color="primary"
                      size="small"
                      onChange={(event) => {
                        handleChange(event);
                        props.setFieldValue(
                          'identifica_vendedor',
                          conoce.vendedor ? 'No' : 'Sí'
                        );
                      }}
                    />
                  }
                  label="Conoce al vendedor"
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="identifica_comprador"
                      checked={conoce.comprador}
                      onClick={() => checkKnow('comprador')}
                      color="primary"
                      size="small"
                      onChange={(event) => {
                        handleChange(event);
                        props.setFieldValue(
                          'identifica_comprador',
                          conoce.comprador ? 'No' : 'Sí'
                        );
                      }}
                    />
                  }
                  label="Conoce al comprador"
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

export default DetailStructure;
