import React, { useState } from 'react';

import ConfirmDataView from '../../View/ConfirmDataView';
import { formButton, viewDefaultEdit, buttonDefault } from '../FormButtons';

import CarStructure from '../Structure/CarStructure';

const CarSection = ({
  data = {},
  click = () => {},
  back = () => {},
  save = () => {},
  title = '',
}) => {
  const [open, setOpen] = useState(true);

  const fillForm = (submittedValues) => {
    save(submittedValues);
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
      <CarStructure
        data={data}
        title={title}
        buttons={formButtons}
        submitAction={fillForm}
      />
    );
  }

  return <ConfirmDataView data={data} buttons={viewButtons} />;
};

export default CarSection;
