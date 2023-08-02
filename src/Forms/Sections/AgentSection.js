import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import { defaultStyle } from '../FormStyles';
import ConfirmDataView from '../../View/ConfirmDataView';
import useClasses from '../../Utils/UseClasses';

const styles = (_theme) => ({
  title: {
    display: 'flex',
    justifyContent: 'center',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: 20,
    marginLeft: 10,
  },
});

const AgentSection = ({
  data = [],
  click = () => {},
  save = () => {},
  title = '',
}) => {
  const [open, setOpen] = useState(true);
  const [selectedIndex, setSelectedItem] = useState(-1);

  const handleOpen = () => {
    setOpen(false);
  };
  const handleClose = () => {
    setOpen(true);
  };

  const verifyButtons = [
    {
      color: 'secondary',
      variant: 'contained',
      style: defaultStyle.button,
      type: 'submit',
      action: handleClose,
      text: 'Cambiar',
    },
    {
      color: 'primary',
      variant: 'contained',
      style: defaultStyle.button,
      type: 'submit',
      action: () => {
        save(selectedIndex);
        click();
      },
      text: 'Seleccionar',
    },
  ];

  const classes = useClasses(styles);

  return open ? (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h5" className={classes.title}>
          {title}
        </Typography>
      </Grid>
      {data?.map((agent, index) => (
        <Grid item xs={12} sm={4} key={`agentId-${agent.id}`}>
          <Card>
            <CardActionArea
              className={classes.container}
              onClick={() => {
                setSelectedItem(index);
                handleOpen();
              }}
            >
              <CardContent style={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6">{agent.nombres}</Typography>
                <Divider />
                <Typography variant="body2">Carnet: {agent.carnet}</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  ) : (
    <ConfirmDataView data={data[selectedIndex]} buttons={verifyButtons} />
  );
};
export default AgentSection;
