import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { DataDepMuni } from "../Data/DataDepMuni";
import MenuItem from "@material-ui/core/MenuItem";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import { Formik } from "formik";
import Typography from "@material-ui/core/Typography";
import ConfirmDetailsView from "../View/ConfirmDetailsView";
import * as Yup from "yup";

const PersonForm = (prop) => {
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
  const style = {
    ancho: {
      width: "100%",
    },
    buttons: {
      display: "flex",
      justifyContent: "flex-end",
    },
    button: {
      marginTop: 20,
      marginLeft: 10,
    },
    title: {
      display: "flex",
      justifyContent: "center",
    },
  };

  return (
    <React.Fragment>
      <Formik
        initialValues={prop.data}
        onSubmit={(Values, { resetForm }) => {
          if (guardar) {
            prop.save(Values);
            //resetForm()
            setGuardar(!guardar);
            setOpen(!open);
            prop.click();
          } else setOpen(!open);
        }}
        validationSchema={Yup.object().shape({
          precio: Yup.number()
            .required("Required")
            .positive("Solo se permiten numeros positivos"),
          departamento: Yup.string().required("Required"),
          domicilio: Yup.string().required("Required"),
          fecha_firma: Yup.date()
            .required("Required")
            .max("2030-12-31", "Debe ser una fecha válida")
            .min("1900-01-01", "Debe ser una fecha válida"),
          hora_firma: Yup.string().required("Required"),
          calidad_de: Yup.string().required("Required"),
        })}
      >
        {(props) => {
          const {
            values,
            touched,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
            //handleReset,
          } = props;
          return (
            <form onSubmit={handleSubmit}>
              {open ? (
                <div>
                  <Grid container spacing={3}>
                  <Grid item xs={12}>
              <Typography variant="h5" style={style.title}>
                Datos adicionales
              </Typography>
            </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        style={style.ancho}
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
                        style={style.ancho}
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
                        {Object.keys(DataDepMuni).map((opt, index) => {
                          return <MenuItem value={opt}>{opt}</MenuItem>;
                        })}
                      </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        style={style.ancho}
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
                        disabled={
                          values.departamento.length === 0 ? true : false
                        }
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
                          DataDepMuni[values.departamento].map((opt, index) => {
                            return <MenuItem value={opt}>{opt}</MenuItem>;
                          })
                        )}
                      </TextField>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        style={style.ancho}
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
                        style={style.ancho}
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
                        style={style.ancho}
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
                            onClick={() => checkConoce("vendedor")}
                            color="primary"
                            size="small"
                            onChange={(event) => {
                              handleChange(event);
                              props.setFieldValue(
                                "identifica_vendedor",
                                conoce.vendedor ? "No" : "Sí"
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
                            onClick={() => checkConoce("comprador")}
                            color="primary"
                            size="small"
                            onChange={(event) => {
                              handleChange(event);
                              props.setFieldValue(
                                "identifica_comprador",
                                conoce.comprador ? "No" : "Sí"
                              );
                            }}
                          />
                        }
                        label="Conoce al comprador"
                      />
                    </Grid>
                  </Grid>
                  <div style={style.buttons}>
                    <Button onClick={prop.back} style={style.button}>
                      Atras
                    </Button>
                    <Button
                      color="primary"
                      variant="outlined"
                      style={style.button}
                      type="submit"
                    >
                      Verificar
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <ConfirmDetailsView value={values} />
                  <div style={style.buttons}>
                    <Button style={style.button} type="submit">
                      Modificar
                    </Button>
                    <Button
                      color="primary"
                      variant="contained"
                      style={style.button}
                      type="submit"
                      onClick={() => setGuardar(!guardar)}
                    >
                      Guardar
                    </Button>
                  </div>
                </div>
              )}
            </form>
          );
        }}
      </Formik>
    </React.Fragment>
  );
};

export default PersonForm;
