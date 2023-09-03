import React, { useState } from 'react';

import { formButton, viewDefaultEdit, buttonDefault } from '../FormButtons';
import DetailStructure from '../Structure/DetailStructure';
import ConfirmDataView from '../../View/ConfirmDataView';

const DetailSection = ({
  detailProps = {
    data: {},
    save: () => {},
  },
  click = () => {},
  back = () => {},
  title = '',
}) => {
  const [open, setOpen] = useState(true);
  const fillForm = (submittedValues) => {
    detailProps.save(submittedValues);
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
      <DetailStructure
        data={detailProps.data}
        title={title}
        buttons={formButtons}
        submitAction={fillForm}
      />
    );
  }

  return <ConfirmDataView data={detailProps.data} buttons={viewButtons} />;
};

export default DetailSection;
