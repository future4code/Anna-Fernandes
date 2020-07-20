import React from 'react';

import useRequestData from '../../hooks/useRequestData';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles({
    root: {
        padding: 24,
    },
    cards: {
      display: "flex",
      alignItems: "stretch",
      justifyContent: "center",
      flexWrap: 'wrap',
      paddingTop: 24,
      paddingBottom: 24,
      paddingRight: 0,
      paddingLeft: 0,
    },
    card: {
      maxWidth: 240,
      margin: 16,
      padding: 8
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 16,
    },
    button: {
      marginBottom: 16,
    },
  });

const baseUrl = "https://us-central1-labenu-apis.cloudfunctions.net/labeX/anna-fernandes-turing/trips"

function ListTripsPage() {
    const classes = useStyles();
    const trips = useRequestData(baseUrl, []);
  return (
      
    <Container maxWidth="lg" className={classes.root}>
         <Typography align="center" variant="h3" component="h3" className={classes.pos} >
         Viagens
        </Typography>
        <Divider />
        <Container maxWidth="lg" className={classes.cards}>
            {trips.map( trip => {
                return (
                    <Card className={classes.card} key={trip.id}>
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                            {trip.date} – {trip.durationInDays} dias
                            </Typography>
                            <Typography variant="h5" component="h2">
                            {trip.name}
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary">
                            {trip.planet}
                            </Typography>
                            <Typography variant="body2" component="p">
                            {trip.description}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button className={classes.button} color="primary" size="medium" variant="contained">inscrever-se</Button>
                        </CardActions>
                        <CardActions>
                            <Button className={classes.button} color="primary" size="medium" variant="contained">candidatos</Button>
                        </CardActions>
                    </Card>
                )
            })}
        </Container>
    </Container>
  );
}

export default ListTripsPage;
