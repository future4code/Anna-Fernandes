import React from 'react';
import axios from 'axios';
import useInput from '../../hooks/useInput';
import { useHistory } from 'react-router-dom';
import useProtectedRoute from '../../hooks/useProtectedRoute';
import usePermission from '../../hooks/usePermission';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { useStyles } from '../../styles';

import Header from '../Header/Header';

function CreateTripPage() {
  const classes = useStyles();
  const history = useHistory();
  const token = useProtectedRoute();
  const permission = usePermission();
  
  const [name, updateName] = useInput("");
  const [planet, updatePlanet] = useInput("");
  const [description, updateDescription] = useInput("");
  const [date, updateDate] = useInput("");
  const [durationInDays, updateDurationInDays] = useInput("");
  
  const baseUrl = "https://us-central1-labenu-apis.cloudfunctions.net/labeX/anna-fernandes-turing/trips";

  const axiosConfig = {
      headers: {
          auth: token
      }
  };

  const getTripDetails = () => {      
    const formatDate = new Date(date);

    const body = {
      "name": name,
      "planet": planet,
      "date": formatDate.toLocaleDateString('en-GB', {day: 'numeric', month: 'numeric', year: '2-digit'}),
      "description": description,
      "durationInDays": durationInDays
    }

    axios.post(baseUrl, body, axiosConfig)
      .then(() => {
        alert("Viagem cadastrada com sucesso!")
        history.push("/trips/list");
      })
      .catch(err => {
        alert("Ops, algo deu errado:" + err.message)
      })
  }

  return (
    <>
    <Header />
    {permission !== "admin" && <Container maxWidth="sm"> <Typography variant="h5" component="h2" className={classes.center}>
      Você não tem permissão para criar viagens.
    </Typography></Container>}
    {permission === "admin" && <Container>
        <form className={classes.form} noValidate autoComplete="off">
            <TextField
              required
              className={classes.input}
              label="nome"
              variant="outlined"
              value={name}
              onChange={updateName}
            />
            <TextField
              required
              className={classes.input}
              label="planeta"
              variant="outlined"
              value={planet}
              onChange={updatePlanet}
            />
            <TextField
              required
              className={classes.input}
              label=""
              type="date"
              variant="outlined"
              value={date}
              onChange={updateDate}
            />
            <TextField
              required
              className={classes.input}
              label="duração (dias)"
              type="number"
              variant="outlined"
              value={durationInDays}
              onChange={updateDurationInDays}
            />
            <TextField
              required
              className={classes.input}
              label="descrição"
              variant="outlined"
              multiline
              rows={6}
              value={description}
              onChange={updateDescription}
            />
            <Button 
              className={classes.button} 
              color="primary" 
              variant="contained" 
              onClick={getTripDetails}>
                enviar
            </Button>
        </form>
    </Container>}
    </>
  );
}

export default CreateTripPage;
