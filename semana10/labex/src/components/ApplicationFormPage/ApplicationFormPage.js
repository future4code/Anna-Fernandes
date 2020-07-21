import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useInput from '../../hooks/useInput';
import { useParams } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { useStyles } from '../../styles';

import Header from '../Header/Header';

const baseUrl = "https://us-central1-labenu-apis.cloudfunctions.net/labeX/anna-fernandes-turing/trip"

const axiosConfig = {
    headers: {
        auth: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IndXUGhLZDNzSzB1SlJraWR4dnpwIiwiZW1haWwiOiJhc3Ryb2RldkBnbWFpbC5jb20uYnIiLCJpYXQiOjE1OTUyNTY1MzZ9.dB20BczThbqRPooTcq1LDEeI9ywDtG82BGYm01d7nlc"
    }
};

function ApplicationsFormPage() {
    const classes = useStyles();
    const pathParams = useParams();

    const [name, updateName] = useInput("");
    const [age, updateAge] = useInput("");
    const [applicationText, updateApplicationText] = useInput("");
    const [profession, updateProfession] = useInput("");
    const [country, updateCountry] = useInput([]);

    const getTripDetails = async () => {
        const id = pathParams.id;
        const response = await axios.get(`${baseUrl}/${id}`, axiosConfig)
    }

    useEffect(() => {
        getTripDetails();
    }, []);

  return (
    <>
    <Header />
    <Container className={classes.container}>
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
            label="idade"
            type="number"
            variant="outlined"
            value={age}
            onChange={updateAge}
            />
            <TextField
            required
            className={classes.input}
            label="profissão"
            variant="outlined"
            value={profession}
            onChange={updateProfession}
            />
            <Select
            variant="outlined"
            className={classes.input}
            value={country}
            onChange={updateCountry}
            label="País"
            >
              <MenuItem value="">
                <em>selecione seu país</em>
              </MenuItem>
              <MenuItem value={"brasil"}>Brasil</MenuItem>
              <MenuItem value={"eua"}>EUA</MenuItem>
              <MenuItem value={"canada"}>Canadá</MenuItem>
            </Select>
            <TextField
            required
            className={classes.input}
            label="por que você deve ir..."
            variant="outlined"
            multiline
            rows={6}
            value={applicationText}
            onChange={updateApplicationText}
            />
            <Button className={classes.button}  color="primary" variant="contained">enviar</Button>
        </form>
    </Container>
    </>
  );
}

export default ApplicationsFormPage;
