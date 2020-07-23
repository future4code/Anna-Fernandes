import React from 'react';
import { useHistory } from 'react-router-dom';

import Header from '../Header/Header';
import rocketImg from '../../images/rocket.png';

import { useStyles } from '../../styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import ApplicationFormContainer from '../ApplicationFormContainer/ApplicationFormContainer';

function HomePage() {
    const classes = useStyles();
    const history = useHistory();

    const goToLogin = () => {
      history.push("/login");
    }

  return (
    <div className={classes.root}>
      <Header />
      <Container maxWidth="lg" className={classes.flex}>
        <Box>
          <Typography 
            variant="h4" 
            component="h2"
            color="primary"
            className={classes.center}>
              Bem-vinda(o) à LabeX
          </Typography>
          <img src={rocketImg} className={classes.image} />
          <Typography 
            variant="h5" 
            component="h2"
            color="primary"
            className={classes.center}>
              Inscreva-se em uma viagem ou<br /> <span className={classes.link} onClick={goToLogin}>faça login</span> para mais detalhes
          </Typography>
        </Box>
        <Box>
          <ApplicationFormContainer />
        </Box>
      </Container>
    </div>
  );
}

export default HomePage;
