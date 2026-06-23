import * as Yup from 'yup';

export const PersonValidationSchema = {
  nombre: Yup.string()
    .required('Campo requerido')
    .matches(
      /^(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)+$/,
      'Solo se aceptan letras en este campo'
    ),
  apellido: Yup.string()
    .required('Campo requerido')
    .matches(
      /^(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)+$/,
      'Solo se aceptan letras en este campo'
    ),
  departamento: Yup.string().required('Campo requerido'),
  municipio: Yup.string().required('Campo requerido'),
  domicilio: Yup.string().required('Campo requerido'),
  fecha_nacimiento: Yup.date()
    .required('Campo requerido')
    .max('2030-12-31', 'Debe ser una fecha válida')
    .min('1900-01-01', 'Debe ser una fecha válida'),
  documento: Yup.string()
    .required('Campo requerido')
    .min(10, 'Son un minimo de 10 caracteres'),
  genero: Yup.string().required('Campo requerido'),
  oficio: Yup.string().required('Campo requerido'),
};
