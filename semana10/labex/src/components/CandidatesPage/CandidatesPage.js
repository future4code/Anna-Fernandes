import React, {useEffect, useState} from 'react';
import axios from 'axios';

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
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      padding: 16,
    },
    card: {
      width: "100%",
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

const baseUrl = "https://us-central1-labenu-apis.cloudfunctions.net/labeX/anna-fernandes-turing/trip"

const axiosConfig = {
    headers: {
        auth: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IndXUGhLZDNzSzB1SlJraWR4dnpwIiwiZW1haWwiOiJhc3Ryb2RldkBnbWFpbC5jb20uYnIiLCJpYXQiOjE1OTUyNTY1MzZ9.dB20BczThbqRPooTcq1LDEeI9ywDtG82BGYm01d7nlc"
    }
};

function CandidatesPage(props) {
    const classes = useStyles();
    
    const [tripDetails, setTripDetails] = useState({})
    const [candidates, setCandidates] = useState([])

    const getTripDetails = async () => {
        const id = "yBWreQUoP3rjFwoBwfQm";
        const response = await axios.get(`${baseUrl}/${id}`, axiosConfig)
        setTripDetails(response.data.trip)
        setCandidates(response.data.trip.candidates)
    }

    useEffect(() => {
        getTripDetails();
    }, [])

  return (
      
    <Container maxWidth="lg" className={classes.root}>
         <Typography align="center" variant="h3" component="h3" className={classes.pos} >
         {tripDetails.name}
        </Typography>
        <Divider />
         <Typography align="center" variant="body2" component="p" className={classes.pos} >
         {tripDetails.date} – {tripDetails.durationInDays}
        </Typography>
         <Typography align="center" variant="body2" component="p" className={classes.pos} >
         {tripDetails.planet}
        </Typography>
         <Typography align="center" variant="body2" component="p" className={classes.pos} >
         {tripDetails.description}
        </Typography>
        <Container maxWidth="sm" className={classes.cards}>
            {candidates.map( candidate => {
                return (
                    <Card className={classes.card} key={candidate.id}>
                        <CardContent>
                            <Typography variant="h6" component="h2">
                            {candidate.name}, {candidate.age}, {candidate.profession}
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary">
                            {candidate.country}
                            </Typography>
                            <Typography variant="body2" component="p">
                            {candidate.applicationText}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button className={classes.button} color="primary" size="medium" variant="contained">aceitar</Button>
                            <Button className={classes.button} color="secondary" size="medium" variant="contained">recusar</Button>
                        </CardActions>
                    </Card>
                )
            })}
        </Container>
    </Container>
  );
}

export default CandidatesPage;
