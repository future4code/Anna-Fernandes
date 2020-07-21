import React from 'react';
import { useHistory } from 'react-router-dom';

import { useStyles } from '../../styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

function Header() {
    const classes = useStyles();

    const history = useHistory();
    const goToHomePage = () => {
      history.push("/");
    }


  return (
      <AppBar position="static">
        <Toolbar className={classes.header}>
          <Typography variant="h6" className={classes.logo} onClick={goToHomePage}>
            LabeX
          </Typography>
        </Toolbar>
      </AppBar>
  );
}

export default Header;
