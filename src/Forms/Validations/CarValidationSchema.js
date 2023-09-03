import * as Yup from 'yup';

export const CarValidationSchema = {
  placa: Yup.string()
    .required('Required')
    .matches(
      /^([A-Z0-9])+(-{1})([A-Z0-9])+$/g,
      'Solo se admiten numeros, letras mayusculas y el uso de un solo guión'
    ),
  marca: Yup.string()
    .required('Required')
    .matches(
      /^(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)+$/,
      'Solo se aceptan letras en este campo'
    ),
  modelo: Yup.string()
    .required('Required')
    .matches(
      /^(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)+$/,
      'Solo se aceptan letras en este campo'
    ),
  color: Yup.string()
    .required('Required')
    .matches(
      /^(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)+$/,
      'Solo se aceptan letras en este campo'
    ),
  fabricado: Yup.date()
    .required('Required')
    .max('2030-12-31', 'Debe ser una fecha válida')
    .min('1900-01-01', 'Debe ser una fecha válida'),
  capacidad: Yup.number()
    .required('Required')
    .positive('Solo se permiten numeros positivos'),
  dominio: Yup.string().required('Required'),
  clase: Yup.string()
    .required('Required')
    .matches(
      /^(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)+$/,
      'Solo se aceptan letras en este campo'
    ),
  num_motor: Yup.string()
    .required('Required')
    .matches(
      /^[A-Z0-9]+$|N\/T\b/,
      'Solo se admiten numeros y letras mayusculas'
    ),
  num_chasis: Yup.string()
    .required('Required')
    .matches(
      /^[A-Z0-9]+$|N\/T\b/,
      'Solo se admiten numeros y letras mayusculas'
    ),
  num_vin: Yup.string()
    .required('Required')
    .matches(
      /^[A-Z0-9]+$|N\/T\b/,
      'Solo se admiten numeros y letras mayusculas'
    ),
};
