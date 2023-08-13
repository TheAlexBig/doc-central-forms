import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import InputMask from 'react-input-mask';
import Grid from '@mui/material/Grid';
import { Formik } from 'formik';
import Typography from '@mui/material/Typography';
import * as Yup from 'yup';
import { DataDepMuni } from '../../Data/DataDepMuni';
import { defaultStyle } from '../FormStyles';
import { PersonValidationSchema } from '../ValidationSchema/PersonValidationSchema';

const PersonStructure = ({
  data,
  title = 'No title',
  buttons = [],
  submitAction = () => {},
}) => (
  <Formik
    initialValues={data}
    onSubmit={submitAction}
    validationSchema={Yup.object().shape(PersonValidationSchema)}
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
                error={errors.nombre && touched.nombre && errors.nombre}
                label="Nombre:"
                name="nombre"
                value={values.nombre}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={errors.nombre && touched.nombre && errors.nombre}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                style={defaultStyle.wide}
                error={errors.apellido && touched.apellido && errors.apellido}
                label="Apellido:"
                name="apellido"
                value={values.apellido}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={
                  errors.apellido && touched.apellido && errors.apellido
                }
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
              <InputMask
                mask="99999999-9"
                onChange={handleChange}
                maskChar=""
                onBlur={handleBlur}
                value={values.documento}
              >
                {() => (
                  <TextField
                    style={defaultStyle.wide}
                    error={
                      errors.documento && touched.documento && errors.documento
                    }
                    helperText={
                      errors.documento && touched.documento && errors.documento
                    }
                    label="DUI:"
                    name="documento"
                    margin="normal"
                  />
                )}
              </InputMask>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputMask
                mask="9999-999999-999-9"
                onChange={handleChange}
                maskChar=""
                onBlur={handleBlur}
                value={values.nit}
              >
                {() => (
                  <TextField
                    style={defaultStyle.wide}
                    error={errors.nit && touched.nit && errors.nit}
                    helperText={errors.nit && touched.nit && errors.nit}
                    label="NIT:"
                    name="nit"
                    margin="normal"
                  />
                )}
              </InputMask>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                style={defaultStyle.wide}
                error={
                  errors.fecha_nacimiento &&
                  touched.fecha_nacimiento &&
                  errors.fecha_nacimiento
                }
                label="Fecha de nacimiento:"
                name="fecha_nacimiento"
                value={values.fecha_nacimiento}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={
                  errors.fecha_nacimiento &&
                  touched.fecha_nacimiento &&
                  errors.fecha_nacimiento
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
                error={errors.genero && touched.genero && errors.genero}
                select
                label="Genero:"
                name="genero"
                value={values.genero}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={errors.genero && touched.genero && errors.genero}
                margin="normal"
              >
                <MenuItem value="Femenino">Femenino</MenuItem>
                <MenuItem value="Masculino">Masculino</MenuItem>
              </TextField>
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

export default PersonStructure;
