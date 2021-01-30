import React, { useState } from "react";
import { Button, DialogActions, DialogContent, DialogTitle, makeStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth:300,
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3),
  },

  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const SelectAgentView = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const classes = useStyles();

  const body = (
    <div className={classes.paper}>
      <DialogTitle id="modal-title">Datos del agente</DialogTitle>
      <DialogContent id="modal-content" dividers>
        <Typography gutterBottom><b>Nombre: </b>{props.agent.nombres.value}</Typography>
        <Typography gutterBottom><b>Apellido: </b>{props.agent.apellidos.value}</Typography>
        <Typography gutterBottom><b>Departamento: </b>{props.agent.departamento.value}</Typography>
        <Typography gutterBottom><b>Municipio: </b>{props.agent.municipio.value}</Typography>
        <Typography gutterBottom><b>Carnet: </b>{props.agent.carnet.value}</Typography>
        <Typography gutterBottom><b>Genero: </b>{props.agent.genero.value}</Typography>

      </DialogContent>
      <DialogActions>
      <Button autoFocus color="primary" onClick={props.click}>Seleccionar</Button>
      </DialogActions>
    </div>
  );
  return (
    <Grid item xs={12} sm={4} >
      <Card>
        <CardActionArea onClick={handleOpen} className={classes.container}>
          <CardContent style={{display:"flex", flexDirection:"column", }}>
          
          <Typography variant="h6">
            {props.agent.nombres.value}
            </Typography>
            <Divider/>
            <Typography variant="body2">
              Carnet: {props.agent.carnet.value}
            </Typography>
   

          </CardContent>
        </CardActionArea>
      </Card>
      <div>
        <Dialog
          className={classes.modal}
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-title"
          aria-describedby="modal-content"
        >
          {body}
        </Dialog>
      </div>
    </Grid>
  );
};
export default SelectAgentView;
