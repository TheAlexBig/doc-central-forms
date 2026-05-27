import React from 'react';
import { buttonDefault } from '../FormButtons';

import CarStructure from '../Structure/CarStructure';

const CarSection = ({
  carProps = {
    data: {},
    save: () => {},
  },
  click = () => {},
  back = () => {},
  title = '',
}) => {
  const saveAndContinue = (submittedValues) => {
    carProps.save(submittedValues);
    click();
  };

  const formButtons = [
    {
      ...buttonDefault,
      variant: 'outlined',
      type: 'button',
      text: 'Atrás',
      action: back,
    },
    {
      ...buttonDefault,
      text: 'Guardar y continuar',
    },
  ];

  return (
    <CarStructure
      data={carProps.data}
      title={title}
      buttons={formButtons}
      submitAction={saveAndContinue}
    />
  );
};

export default CarSection;
