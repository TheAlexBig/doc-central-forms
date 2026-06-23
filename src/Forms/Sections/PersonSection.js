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
  const saveAndContinue = async (submittedValues) => {
    const saved = await personProps.save(submittedValues);
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
    <PersonStructure
      data={personProps.data}
      error={personProps.error}
      people={personProps.people}
      occupations={personProps.occupations}
      title={title}
      buttons={formButtons}
      submitAction={saveAndContinue}
    />
  );
};

export default PersonSection;
