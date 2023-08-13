import { defaultStyle } from './FormStyles';

export const viewDefaultEdit = (action) => ({
  color: 'secondary',
  variant: 'contained',
  style: defaultStyle.button,
  type: 'submit',
  action: action || (() => {}),
  text: 'Modificar',
});

export const formButton = (action) => ({
  color: 'primary',
  variant: 'contained',
  style: defaultStyle.button,
  type: 'submit',
  action: action || (() => {}),
  text: 'Guardar',
});

export const buttonDefault = {
  color: 'primary',
  variant: 'contained',
  style: defaultStyle.button,
  type: 'submit',
  text: 'Button',
  action: () => {},
};
