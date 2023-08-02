import { defaultStyle } from './FormStyles';

export const generateButtons = ({
  editStep = () => {},
  nextStep = () => {},
}) => [
  {
    color: 'secondary',
    variant: 'contained',
    style: defaultStyle.button,
    type: 'submit',
    action: editStep,
    text: 'Modificar',
  },
  {
    color: 'primary',
    variant: 'contained',
    style: defaultStyle.button,
    type: 'submit',
    action: nextStep,
    text: 'Guardar',
  },
];
