import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import { Formik } from 'formik';
import Typography from '@mui/material/Typography';
import * as Yup from 'yup';
import ConfirmDataView from '../../View/ConfirmDataView';
import { DataDepMuni } from '../../Data/DataDepMuni';
import { DetailValidationSchema } from '../ValidationSchema/DetailValidationSchema';
import { defaultStyle } from '../FormStyles';
import { generateButtons } from '../FormButtons';

const PersonForm = ({
  data = {},
  click = () => {},
  back = () => {},
  save = () => {},
  title = '',
}) => {
  const [open, setOpen] = useState(true);
  const [guardar, setGuardar] = useState(false);
  const [conoce, setConoce] = useState({
    vendedor: false,
    comprador: false,
  });
  const checkConoce = (type) => {
    const conocer = {
      ...conoce,
    };
    conocer[type] = !conoce[type];
    setConoce(conocer);
  };
  const submit = () => setGuardar(!guardar);
  const buttons = generateButtons({ nextStep: submit });

  return (
    <Formik
      initialValues={data}
      onSubmit={(submittedValues, { resetForm }) => {
        if (guardar) {
          save(submittedValues);
          setGuardar(!guardar);
          setOpen(!open);
          click();
        } else setOpen(!open);
      }}
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
            {open ? (
              <div>
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
                      helperText={
                        errors.precio && touched.precio && errors.precio
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
                      {Object.keys(DataDepMuni).map((opt) => (
                        <MenuItem value={opt}>{opt}</MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      style={defaultStyle.wide}
                      error={
                        errors.domicilio &&
                        touched.domicilio &&
                        errors.domicilio
                      }
                      select
                      label="Municipio:"
                      name="domicilio"
                      value={values.domicilio}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={values.departamento.length === 0}
                      helperText={
                        errors.domicilio &&
                        touched.domicilio &&
                        errors.domicilio
                      }
                      margin="normal"
                    >
                      {values.departamento.length === 0 ? (
                        <MenuItem value="0">0</MenuItem>
                      ) : (
                        DataDepMuni[values.departamento].map((opt) => (
                          <MenuItem value={opt}>{opt}</MenuItem>
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
                        errors.hora_firma &&
                        touched.hora_firma &&
                        errors.hora_firma
                      }
                      label="Hora de firma:"
                      name="hora_firma"
                      value={values.hora_firma}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={
                        errors.hora_firma &&
                        touched.hora_firma &&
                        errors.hora_firma
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
                        errors.calidad_de &&
                        touched.calidad_de &&
                        errors.calidad_de
                      }
                      select
                      label="En calidad de:"
                      name="calidad_de"
                      value={values.calidad_de}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={
                        errors.calidad_de &&
                        touched.calidad_de &&
                        errors.calidad_de
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
                          onClick={() => checkConoce('vendedor')}
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
                          onClick={() => checkConoce('comprador')}
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
                <div style={defaultStyle.buttons}>
                  <Button onClick={back} style={defaultStyle.button}>
                    Atras
                  </Button>
                  <Button
                    color="primary"
                    variant="outlined"
                    style={defaultStyle.button}
                    type="submit"
                  >
                    Verificar
                  </Button>
                </div>
              </div>
            ) : (
              <ConfirmDataView data={values} buttons={buttons} />
            )}
          </form>
        );
      }}
    </Formik>
  );
};

export default PersonForm;
