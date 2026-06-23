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
  const saveAndContinue = async (submittedValues) => {
    const saved = await carProps.save(submittedValues);
    if (saved !== false) {
      click();
    }
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
      error={carProps.error}
      options={carProps.options}
      title={title}
      buttons={formButtons}
      submitAction={saveAndContinue}
    />
  );
};

export default CarSection;
