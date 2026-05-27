import React from 'react';

import { buttonDefault } from '../FormButtons';
import DetailStructure from '../Structure/DetailStructure';

const DetailSection = ({
  detailProps = {
    data: {},
    save: () => {},
  },
  click = () => {},
  back = () => {},
  title = '',
}) => {
  const saveAndContinue = (submittedValues) => {
    detailProps.save(submittedValues);
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
      text: 'Revisar documento',
    },
  ];

  return (
    <DetailStructure
      data={detailProps.data}
      title={title}
      buttons={formButtons}
      submitAction={saveAndContinue}
    />
  );
};

export default DetailSection;
