import React from 'react';
import { buttonDefault } from '../FormButtons';
import PersonStructure from '../Structure/PersonStructure';

const PersonSection = ({
  personProps = {
    data: {},
    save: () => {},
  },
  click = () => {},
  back = () => {},
  title = '',
}) => {
  const saveAndContinue = (submittedValues) => {
    personProps.save(submittedValues);
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
    <PersonStructure
      data={personProps.data}
      title={title}
      buttons={formButtons}
      submitAction={saveAndContinue}
    />
  );
};

export default PersonSection;
