import React, { useState } from 'react';
import { formButton, viewDefaultEdit, buttonDefault } from '../FormButtons';
import PersonStructure from '../Structure/PersonStructure';
import ConfirmDataView from '../../View/ConfirmDataView';

const PersonSection = ({
  personProps = {
    data: {},
    save: () => {},
  },
  click = () => {},
  back = () => {},
  title = '',
}) => {
  const [open, setOpen] = useState(true);

  const fillForm = (submittedValues) => {
    personProps.save(submittedValues);
    setOpen(!open);
  };
  const nextStep = () => {
    setOpen(!open);
    click();
  };

  const formButtons = [
    {
      ...buttonDefault,
      variant: 'outlined',
      type: 'button',
      text: 'Atras',
      action: back,
    },
    {
      ...buttonDefault,
      text: 'Verificar',
    },
  ];

  const viewButtons = [viewDefaultEdit, formButton(nextStep)];

  if (open) {
    return (
      <PersonStructure
        data={personProps.data}
        title={title}
        buttons={formButtons}
        submitAction={fillForm}
      />
    );
  }

  return <ConfirmDataView data={personProps.data} buttons={viewButtons} />;
};

export default PersonSection;
