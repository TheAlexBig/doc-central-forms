import * as Yup from 'yup';

export const PersonValidationSchema = {
  nombre: Yup.string()
    .required('Required')
    .matches(
      /^(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)+$/,
      'Solo se aceptan letras en este campo'
    ),
  apellido: Yup.string()
    .required('Required')
    .matches(
      /^(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)+$/,
      'Solo se aceptan letras en este campo'
    ),
  departamento: Yup.string().required('Required'),
  domicilio: Yup.string().required('Required'),
  fecha_nacimiento: Yup.date()
    .required('Required')
    .max('2030-12-31', 'Debe ser una fecha válida')
    .min('1900-01-01', 'Debe ser una fecha válida'),
  documento: Yup.string().required('Required').min(10, 'completa este campo'),
  nit: Yup.string().required('Required').min(17, 'completa este campo'),
  genero: Yup.string().required('Required'),
};
