import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import useClasses from '../../Utils/UseClasses';

const ReturnDialog = ({ open, handleClose }) => {
  const styles = (_theme) => ({
    dialog: {
      padding: '4px',
    },
  });
  const classes = useClasses(styles);

  return (
    <Dialog className={classes.dialog} open={open} onClose={handleClose}>
      <DialogTitle>Ventana de confirmación</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography>
            {' '}
            Al regresar a Inicio perderas todos los datos que hayas ingresado
          </Typography>
          <Typography>¿Estas seguro de que quieres regresar?</Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary" autoFocus>
          Cancelar
        </Button>
        <Button href="/">Aceptar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReturnDialog;
