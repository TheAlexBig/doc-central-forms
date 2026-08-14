import * as Yup from 'yup';

export const CarValidationSchema = {
  placa: Yup.string()
    .required('Campo requerido')
    .matches(
      /^([A-Z0-9])+(-{1})([A-Z0-9])+$/g,
      'Solo se admiten numeros, letras mayusculas y el uso de un solo guión'
    ),
  marca: Yup.string()
    .required('Campo requerido')
    .matches(
      /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s.'-]+$/,
      'Solo se aceptan letras y signos comunes de marca'
    ),
  modelo: Yup.string()
    .required('Campo requerido')
    .matches(
      /^[a-zA-ZÀ-ÿ\u00f1\u00d10-9\s./-]+$/,
      'Solo se aceptan letras, números y signos comunes de modelo'
    ),
  color: Yup.string()
    .required('Campo requerido')
    .matches(
      /^[a-zA-ZÀ-ÿ\u00f1\u00d10-9\s./-]+$/,
      'Solo se aceptan letras, números y signos comunes de color'
    ),
  fabricado: Yup.string()
    .required('Campo requerido')
    .matches(/^\d{4}$/, 'Ingrese un año de cuatro dígitos')
    .test(
      'valid-year',
      'Ingrese un año entre 1900 y 2030',
      (value) => !value || (Number(value) >= 1900 && Number(value) <= 2030)
    ),
  capacidad: Yup.number()
    .required('Campo requerido')
    .positive('Solo se permiten numeros positivos'),
  unidad_capacidad: Yup.string()
    .oneOf(['ASS', 'TON'], 'Seleccione ASS o TON')
    .required('Campo requerido'),
  dominio: Yup.string().required('Campo requerido'),
  clase: Yup.string()
    .required('Campo requerido')
    .matches(
      /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s./-]+$/,
      'Solo se aceptan letras y signos comunes de clase'
    ),
  tipo: Yup.string()
    .required('Campo requerido')
    .matches(
      /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s./-]+$/,
      'Solo se aceptan letras y signos comunes de tipo'
    ),
  num_motor: Yup.string()
    .required('Campo requerido')
    .matches(
      /^[A-Z0-9]+$|N\/T\b/,
      'Solo se admiten numeros y letras mayusculas'
    ),
  num_chasis: Yup.string()
    .required('Campo requerido')
    .matches(
      /^[A-Z0-9]+$|N\/T\b/,
      'Solo se admiten numeros y letras mayusculas'
    ),
  num_vin: Yup.string()
    .required('Campo requerido')
    .matches(
      /^[A-Z0-9]+$|N\/T\b/,
      'Solo se admiten numeros y letras mayusculas'
    ),
};
