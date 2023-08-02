import React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import UseClasses from '../Utils/UseClasses';

const styles = (_theme) => ({
  toolbar: {
    borderBottom: '1px solid #1565c0',
  },
  toolbarTitle: {
    flex: 1,
  },
});

export default function Header(props) {
  const classes = UseClasses(styles);
  const { title } = props;

  return (
    <Toolbar className={classes.toolbar}>
      <Typography
        component="h2"
        variant="h5"
        color="inherit"
        align="center"
        noWrap
        className={classes.toolbarTitle}
      >
        {title}
      </Typography>
    </Toolbar>
  );
}

Header.propTypes = {
  title: PropTypes.string,
};
