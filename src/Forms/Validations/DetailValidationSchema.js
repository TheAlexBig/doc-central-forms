import * as Yup from 'yup';

export const DetailValidationSchema = {
  precio: Yup.number()
    .required('Campo requerido')
    .positive('Solo se permiten números positivos'),
  departamento: Yup.string().required('Campo requerido'),
  domicilio: Yup.string().required('Campo requerido'),
  fecha_firma: Yup.date()
    .required('Campo requerido')
    .max('2030-12-31', 'Debe ser una fecha válida')
    .min('1900-01-01', 'Debe ser una fecha válida'),
  hora_firma: Yup.string().required('Campo requerido'),
  calidad_de: Yup.string().required('Campo requerido'),
};
