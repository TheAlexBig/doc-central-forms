import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    //border: '2px solid #000',
    //boxShadow: theme.shadows[5],
    marginTop: 50,
    padding: theme.spacing(2, 4, 3),
  },
}));

const ConfirmDataView = (props) => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    props.stay();
    setOpen(false);
  };
  const classes = useStyles();

  const body = (
    <div className={classes.paper}>
      <h2 id="modal-title">Modal</h2>
      <div id="modal-content">
        {Object.keys(props.data).map((atributo, index) => {
          return (
            <p>
              {atributo != "id" ?
                <div>
                  {props.data[atributo].label}: {props.data[atributo].value}
                </div>: null}
            </p>
          );
        })}
        <button onClick={handleClose}>modificar</button>
        <button onClick={props.confirm}>guardar</button>
      </div>
    </div>
  );
  return (
    <div>
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
  );
};
export default ConfirmDataView;
