import React , { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core';


const useStyles=makeStyles((theme) =>({
    container:{
        display:'flex',
        flexDirection:'column',
        margin: '15px 0px 15px 0px',
        width: '50%',
        backgroundColor: 'gray'
    },
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        //border: '2px solid #000',
        //boxShadow: theme.shadows[5],
        marginTop: 50,
        padding: theme.spacing(2, 4, 3),
      },
}));


const SelectAgentView = (props)=>{
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
          <h2 id="modal-title">Agente: {props.agent.id.value}</h2>
          <div id="modal-content">
            <p>Nombre: {props.agent.nombres.value}</p>
            <p>Apellido: {props.agent.apellidos.value}</p>
            <p>Departamento: {props.agent.departamento.value}</p>
            <p>Municipio: {props.agent.municipio.value}</p>
            <p>Carnet: {props.agent.carnet.value}</p>
            <p>Genero: {props.agent.genero.value}</p>
            <button onClick={handleClose}>modificar</button>
            <button onClick={props.click, props.confirm} >guardar</button>
          </div>
        </div>
      );
    return(
        <div>
        <div onClick={handleOpen} className={classes.container}>
            <p>Nombre: {props.agent.nombres.value}</p>
            <p>Carnet: {props.agent.carnet.value}</p>
        </div>
            <div>
            <Modal
            
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-title"
              aria-describedby="modal-content"
            >
              {body}
            </Modal>
          </div>
          </div>
        )
};
export default SelectAgentView;