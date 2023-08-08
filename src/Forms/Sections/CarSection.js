import React, { useState } from 'react';

import ConfirmDataView from '../../View/ConfirmDataView';
import {
  viewDefaultAccept,
  viewDefaultEdit,
  buttonDefault,
} from '../FormButtons';
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
      buttonAction: back,
    },
    {
      ...buttonDefault,
      text: 'Verificar',
    },
  ];

  const viewButtons = [viewDefaultEdit, viewDefaultAccept(nextStep)];

  open ? (
    <CarStructure
      data={data}
      title={title}
      buttons={formButtons}
      submitAction={fillForm}
    />
  ) : (
    <ConfirmDataView data={data} buttons={viewButtons} />
  );
};

export default CarSection;
