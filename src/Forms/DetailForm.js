import React , { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { DataDepMuni } from "../Data/DataDepMuni";
import { DataDetails } from "../Data/DataDetails";
import MenuItem from "@material-ui/core/MenuItem";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import { Formik} from "formik";
import * as Yup from "yup";

const PersonForm = (props) => {
  const [conoce, setConoce] = useState({
    vendedor:false,
    comprador:false,
});
const checkConoce =(type)=>{
  const conocer ={
    ...conoce
  };
  conocer[type]=!conoce[type];
  setConoce(conocer)    
}
  const style = {
    ancho: {
      width: "100%",
    },
  };

  return (
    <React.Fragment>
      <Formik
        initialValues={DataDetails}
        onSubmit={(Values) => {
          console.log(Values.identifica_vendedor+" y "+Values.identifica_comprador)
          //props.click();
          //props.submit(Values);
        }}
        validationSchema={Yup.object().shape({
          precio: Yup.string().required("Required"),
          departamento: Yup.string().required("Required"),
          domicilio: Yup.string().required("Required"),
          fecha_firma: Yup.string().required("Required"),
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
              <Grid container spacing={3}>
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
                    {values.departamento.length === 0
                      ? <MenuItem value="0">0</MenuItem>
                      : DataDepMuni[values.departamento].map((opt, index) => {
                          return <MenuItem value={opt}>{opt}</MenuItem>;
                        })}
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
                    error={errors.calidad_de && touched.calidad_de && errors.calidad_de}
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
                    name="identifica_vendedor"
                    value={conoce.vendedor?"No":"Sí"}
                    onClick={()=>checkConoce('vendedor')}
                    color="primary"
                    size="small"
                    onChange={handleChange}

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
                    defaultValue="no"
                    onClick={()=>checkConoce('comprador')}
                    color="primary"
                    size="small"
                    onChange={()=>{handleChange;props.setFieldValue("identifica_comprador", conoce.comprador?"No":"Sí")}}

                  />
                }
                label="Conoce al comprador"
              />
                </Grid>
              </Grid>
              <Grid container justify="flex-end">
                <Grid item xs={12} sm={4}>
                  <Button style={style.ancho} type="submit">
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          );
        }}
      </Formik>
    </React.Fragment>
  );
};

export default PersonForm;
