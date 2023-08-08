import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import PropertyViewItem from './PropertyViewItem';

const ConfirmDataView = ({ data = {}, buttons = [] }) => {
  const style = {
    title: {
      display: 'flex',
      justifyContent: 'left',
    },
    buttons: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    button: {
      marginTop: 20,
      marginLeft: 10,
    },
  };

  return (
    <>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h5" style={style.title}>
            Verificación de datos
          </Typography>
        </Grid>
        {Object.keys(data).map((key, index) => (
          <PropertyViewItem
            key={`${key}:${index}`}
            label={key}
            value={data[key]}
          />
        ))}
      </Grid>
      <Grid container style={style.buttons}>
        {buttons.map((buttonItem, index) => (
          <Grid item xs={6} key={`Grid-${buttonItem.text}:${index}`}>
            <Button
              key={`${buttonItem.text}:${index}`}
              color={buttonItem.color}
              variant={buttonItem.variant}
              style={style.button}
              onClick={buttonItem.action}
            >
              {buttonItem.text}
            </Button>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ConfirmDataView;
