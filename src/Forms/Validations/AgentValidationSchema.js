import * as Yup from 'yup';

const namePattern = /^(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)+$/;

export const AgentValidationSchema = {
  nombres: Yup.string()
    .required('Campo requerido')
    .matches(namePattern, 'Solo se aceptan letras en este campo'),
  apellidos: Yup.string()
    .required('Campo requerido')
    .matches(namePattern, 'Solo se aceptan letras en este campo'),
  departamento: Yup.string().required('Campo requerido'),
  municipio: Yup.string().required('Campo requerido'),
  distrito: Yup.string().required('Campo requerido'),
  carnet: Yup.string().required('Campo requerido'),
  genero: Yup.string().required('Campo requerido'),
};
