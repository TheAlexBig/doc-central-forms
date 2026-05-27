import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import PropertyViewItem from './PropertyViewItem';

const ConfirmDataView = ({ data = {}, buttons = [] }) => {
  return (
    <>
      <Typography variant="h5" sx={{ mb: 1 }}>
        Verificación de datos
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Confirme la información para continuar con el documento.
      </Typography>
      <Paper
        variant="outlined"
        sx={{ bgcolor: '#fbfcfa', borderRadius: 2.5, p: 3 }}
      >
        <Grid container spacing={2.5} alignItems="center">
          {Object.keys(data)
            .filter((key) => key !== 'id')
            .map((key) => (
              <PropertyViewItem key={key} label={key} value={data[key]} />
            ))}
        </Grid>
      </Paper>
      <Stack
        direction={{ xs: 'column-reverse', sm: 'row' }}
        justifyContent="flex-end"
        spacing={1.5}
        sx={{ mt: 3 }}
      >
        {buttons.map((buttonItem) => (
          <Button
            key={buttonItem.text}
            color={buttonItem.color}
            variant={buttonItem.variant}
            onClick={buttonItem.action}
            type={buttonItem.type}
          >
            {buttonItem.text}
          </Button>
        ))}
      </Stack>
    </>
  );
};

export default ConfirmDataView;
