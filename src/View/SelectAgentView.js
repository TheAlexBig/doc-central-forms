import React, { useState } from "react";
import {makeStyles } from "@mui/material";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ConfirmAgentView from "./ConfirmAgentView";
import Grid from "@mui/material/Grid";

const useStyles = makeStyles((theme) => ({
  title: {
    display: "flex",
    justifyContent: "center",
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: 20,
    marginLeft: 10,
  },
}));

const SelectAgentView = (props) => {
  const [open, setOpen] = useState(true);
  const [confirmView, setConfirmView] = useState(<div></div>);

  const setView = (index) =>{
    setConfirmView(<ConfirmAgentView
      value={props.data[index]}
      index={index}
      click={props.click}
      save={props.save}
      back={handleClose} />);
  }

  const handleOpen = () => {
    setOpen(false)    
  };
  const handleClose=()=>{
    setOpen(true)
  }

  const classes = useStyles();

  return (
    <React.Fragment>
      {open ? (
        <div>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h5" className={classes.title}>
                Selección de agente
              </Typography>
            </Grid>
            {props.data.map((agent, index) => {
              return (
                <Grid item xs={12} sm={4}>
                  <Card>
                    <CardActionArea
                      className={classes.container}
                      onClick={() => {setView(index); handleOpen()}}
                    >
                      <CardContent
                        style={{ display: "flex", flexDirection: "column" }}
                      >
                        <Typography variant="h6">{agent.nombres}</Typography>
                        <Divider />
                        <Typography variant="body2">
                          Carnet: {agent.carnet}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </div>
      ) : (
        <div>
          <p>{confirmView}</p>
        </div>
      )}
    </React.Fragment>
  );
};
export default SelectAgentView;
