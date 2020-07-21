import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';

import { useStyles } from '../../styles';

import Header from '../Header/Header';

const baseUrl = "https://us-central1-labenu-apis.cloudfunctions.net/labeX/anna-fernandes-turing/trip"

const axiosConfig = {
    headers: {
        auth: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IndXUGhLZDNzSzB1SlJraWR4dnpwIiwiZW1haWwiOiJhc3Ryb2RldkBnbWFpbC5jb20uYnIiLCJpYXQiOjE1OTUyNTY1MzZ9.dB20BczThbqRPooTcq1LDEeI9ywDtG82BGYm01d7nlc"
    }
};

function CandidatesPage(props) {
  const classes = useStyles();
  const pathParams = useParams();
  const history = useHistory();
    
  const [tripDetails, setTripDetails] = useState({})
  const [candidates, setCandidates] = useState([])

  const getTripDetails = () => {
    const id = pathParams.id;
    axios.get(`${baseUrl}/${id}`, axiosConfig)
    .then( response => {
      setTripDetails(response.data.trip)
      setCandidates(response.data.trip.candidates)
    })
    .catch( err => {
      alert("Ops, algo deu errado: " + err.message)
    })
  }

  useEffect(() => {
    getTripDetails();
  }, []);

  const decideCandidate = (candidate, approve) => {
    const id = pathParams.id;
    const candidateId = candidate;
    const body = {
      "approve": approve
    }

    axios.put(`${baseUrl}s/${id}/candidates/${candidateId}/decide`, body, axiosConfig)
    .then(() => {
      approve ? alert("Candidato aprovado :)") : alert("Candidato rejeitado :(");
      getTripDetails();
    })
    .catch( err => {
      alert("Ops, algo deu errado: " + err.message)
    })
  }
  
  const deleteTrip = () => {
    const id = pathParams.id;

    axios.delete(`${baseUrl}s/${id}`, axiosConfig)
    .then(() => {
      alert("Viagem deletada com sucesso!");
      history.push("/trips/list");
    })
    .catch(err => {
      alert("Ops, algo deu errado: " + err.message);
    })
  }

  return (
    <>
      <Header />
      <Container maxWidth="lg" className={classes.container}>
         <Typography align="center" variant="h3" component="h3" className={classes.pos} >
         {tripDetails.name}
        </Typography>
        <Divider  className={classes.pos} />
        <Container  maxWidth="sm">
          <Typography align="center" variant="body2" component="p" className={classes.pos} >
          {tripDetails.date} – {tripDetails.durationInDays}
          </Typography>
          <Typography align="center" variant="body2" component="p" className={classes.pos} >
          {tripDetails.planet}
          </Typography>
          <Typography align="center" variant="body2" component="p" className={classes.pos} >
          {tripDetails.description}
          </Typography>
        </Container>
        <Container maxWidth="sm" className={classes.cards}>
            {candidates.map( candidate => {
                return (
                    <Card className={classes.cardLarge} key={candidate.id}>
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
                            <Button className={classes.button} color="primary" size="medium" variant="contained" onClick={()=>{decideCandidate(candidate.id, true)}}>aceitar</Button>
                            <Button className={classes.button} color="secondary" size="medium" variant="contained" onClick={()=>{decideCandidate(candidate.id, false)}}>recusar</Button>
                        </CardActions>
                    </Card>
                )
            })}
        </Container>
        
        <Button
          className={classes.button} color="secondary"
          size="medium"
          variant="contained"
          onClick={deleteTrip}>
            deletar viagem
        </Button>
      </Container>
    </>
  );
}

export default CandidatesPage;
