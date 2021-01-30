import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { DataDepMuni } from "../Data/DataDepMuni";
import MenuItem from "@material-ui/core/MenuItem";
import InputMask from "react-input-mask";
import Grid from "@material-ui/core/Grid";
import { Formik } from "formik";
import ConfirmPersonView from "../View/ConfirmPersonView"
import * as Yup from "yup";

const PersonForm = (prop) => {
  const [open, setOpen] = useState(true);
  const [guardar, setGuardar]=useState(false);
  const style = {
    ancho: {
      width: "100%",
    },
    buttons: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    button: {
      marginTop: 20,
      marginLeft: 10,
    },
  };

  return (
    <React.Fragment>
      <Formik
        initialValues={prop.data}
        onSubmit={(Values, { resetForm }) => {
          if(guardar){
            prop.save(Values)          
            //resetForm()
            setGuardar(!guardar)
            setOpen(!open)
            prop.click()
          } else setOpen(!open)
        }}
        validationSchema={Yup.object().shape({
          nombre: Yup.string()
            .required("Requerido")
            .matches(
              /^(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)+$/,
              "Solo se aceptan letras en este campo"
            ),
          apellido: Yup.string()
            .required("Requerido")
            .matches(
              /^(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)+$/,
              "Solo se aceptan letras en este campo"
            ),
          departamento: Yup.string().required("Requerido"),
          domicilio: Yup.string().required("Requerido"),
          fecha_nacimiento: Yup.date()
            .required("Required")
            .max("2030-12-31", "Debe ser una fecha válida")
            .min("1900-01-01", "Debe ser una fecha válida"),
          documento: Yup.string()
            .required("Requerido")
            .min(10, "completa este campo"),
          nit: Yup.string()
            .required("Requerido")
            .min(17, "completa este campo"),
          genero: Yup.string().required("Requerido"),
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
            {open?
              <div>
              <Grid container spacing={3}>

                <Grid item xs={12} sm={6}>
                  <TextField
                    style={style.ancho}
                    error={errors.nombre && touched.nombre && errors.nombre}
                    label="Nombre:"
                    name="nombre"
                    value={values.nombre}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={
                      errors.nombre && touched.nombre && errors.nombre
                    }
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    style={style.ancho}
                    error={
                      errors.apellido && touched.apellido && errors.apellido
                    }
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
                      errors.domicilio && touched.domicilio && errors.domicilio
                    }
                    select
                    label="Municipio:"
                    name="domicilio"
                    value={values.domicilio}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={values.departamento.length === 0 ? true : false}
                    helperText={
                      errors.domicilio && touched.domicilio && errors.domicilio
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
                  <InputMask
                    mask={"99999999-9"}
                    onChange={handleChange}
                    maskChar=""
                    onBlur={handleBlur}
                    value={values.documento}
                  >
                    {() => (
                      <TextField
                        style={style.ancho}
                        error={
                          errors.documento &&
                          touched.documento &&
                          errors.documento
                        }
                        helperText={
                          errors.documento &&
                          touched.documento &&
                          errors.documento
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
                    mask={"9999-999999-999-9"}
                    onChange={handleChange}
                    maskChar=""
                    onBlur={handleBlur}
                    value={values.nit}
                  >
                    {() => (
                      <TextField
                        style={style.ancho}
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
                    style={style.ancho}
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
                    style={style.ancho}
                    error={errors.genero && touched.genero && errors.genero}
                    select
                    label="Genero:"
                    name="genero"
                    value={values.genero}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={
                      errors.genero && touched.genero && errors.genero
                    }
                    margin="normal"
                  >
                    <MenuItem value="Femenino">Femenino</MenuItem>
                    <MenuItem value="Masculino">Masculino</MenuItem>
                  </TextField>
                </Grid>
              </Grid>
              <div style={style.buttons}>   
              <Button onClick={prop.back} style={style.button}>
                      Atras
                    </Button>       
                  <Button color="primary" variant="outlined" style={style.button} type="submit">
                    Verificar
                  </Button>   
              </div>
              </div>
        :
            <div>
              <ConfirmPersonView
              value={values}/>
              <div style={style.buttons}>
                  <Button style={style.button} type="submit">
                    Modificar
                  </Button>
                  <Button color="primary" variant="contained" style={style.button} type="submit" onClick={()=>setGuardar(!guardar)}>
                    Guardar
                  </Button>  
              </div>
            </div>
        }
            </form>
          );
        }}
      </Formik>
    </React.Fragment>
  );
};

export default PersonForm;
