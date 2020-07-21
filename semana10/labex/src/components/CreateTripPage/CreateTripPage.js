import React, {useEffect, useState} from 'react';
import axios from 'axios';
import useInput from '../../hooks/useInput';
import { useHistory } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import { useStyles } from '../../styles';

import Header from '../Header/Header';

const baseUrl = "https://us-central1-labenu-apis.cloudfunctions.net/labeX/anna-fernandes-turing/trips"

const axiosConfig = {
    headers: {
        auth: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IndXUGhLZDNzSzB1SlJraWR4dnpwIiwiZW1haWwiOiJhc3Ryb2RldkBnbWFpbC5jb20uYnIiLCJpYXQiOjE1OTUyNTY1MzZ9.dB20BczThbqRPooTcq1LDEeI9ywDtG82BGYm01d7nlc"
    }
};

function CreateTripPage() {
    const classes = useStyles();
    const history = useHistory();

    const [name, updateName] = useInput("");
    const [planet, updatePlanet] = useInput("");
    const [description, updateDescription] = useInput("");
    const [date, updateDate] = useInput("");
    const [durationInDays, updateDurationInDays] = useInput("");

    const getTripDetails = () => {
        const body = {
          "name": name,
          "planet": planet,
          "date": date,
          "description": description,
          "durationInDays": durationInDays
      }

        axios.post(baseUrl, body, axiosConfig)
        .then(() => {
          history.push("/trips/list");
        })
        .catch(err => {
          alert("Ops, algo deu errado:" + err.message)
        })
    }


  return (
    <>
    <Header />
    <Container>
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
            label="data"
            type="number"
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
            <Button className={classes.button} color="primary" variant="contained" onClick={getTripDetails}>enviar</Button>
        </form>
    </Container>
    </>
  );
}

export default CreateTripPage;
