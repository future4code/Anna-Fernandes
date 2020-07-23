import React from 'react';
import { useHistory } from 'react-router-dom';
import usePermission from '../../hooks/usePermission';

import Header from '../Header/Header';

import { useStyles } from '../../styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

function HomePage() {
    const classes = useStyles();
    const history = useHistory();
    const permission = usePermission();

    const goToCreatePage = () => {
      history.push("/trips/create");
    }

    const goToTripsList = () => {
      history.push("/trips/list");
    }

  return (
    <div className={classes.root}>
      <Header />
      <Container maxWidth="md" className={classes.cards}>
        <Card className={classes.cardLarge}>
          <CardContent>
            <Typography 
              variant="h5" 
              component="h2" 
              className={classes.center}>
                Se inscreva em uma viagem
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              className={classes.button} color="primary"
              size="medium"
              variant="contained"
              onClick={goToTripsList}>
                viagens
            </Button>
          </CardActions>
        </Card>
        {permission === "adm" && <Card className={classes.cardLarge}>
          <CardContent>
            <Typography 
              variant="h5" 
              component="h2" 
              className={classes.center}>
                Adicione uma viagem
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              className={classes.button} color="primary"
              size="medium"
              variant="contained"
              onClick={goToCreatePage}>
                criar
            </Button>
          </CardActions>
        </Card>}
      </Container>
    </div>
  );
}

export default HomePage;
