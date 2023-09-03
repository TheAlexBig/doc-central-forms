import * as Yup from 'yup';

export const DetailValidationSchema = {
  precio: Yup.number()
    .required('Required')
    .positive('Solo se permiten numeros positivos'),
  departamento: Yup.string().required('Required'),
  domicilio: Yup.string().required('Required'),
  fecha_firma: Yup.date()
    .required('Required')
    .max('2030-12-31', 'Debe ser una fecha válida')
    .min('1900-01-01', 'Debe ser una fecha válida'),
  hora_firma: Yup.string().required('Required'),
  calidad_de: Yup.string().required('Required'),
};
