import * as Yup from 'yup';

export const PersonValidationSchema = {
  nombre: Yup.string()
    .required('Requerido')
    .matches(
      /^(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)+$/,
      'Solo se aceptan letras en este campo'
    ),
  apellido: Yup.string()
    .required('Requerido')
    .matches(
      /^(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)+$/,
      'Solo se aceptan letras en este campo'
    ),
  departamento: Yup.string().required('Requerido'),
  domicilio: Yup.string().required('Requerido'),
  fecha_nacimiento: Yup.date()
    .required('Required')
    .max('2030-12-31', 'Debe ser una fecha válida')
    .min('1900-01-01', 'Debe ser una fecha válida'),
  documento: Yup.string().required('Requerido').min(10, 'completa este campo'),
  nit: Yup.string().required('Requerido').min(17, 'completa este campo'),
  genero: Yup.string().required('Requerido'),
};
