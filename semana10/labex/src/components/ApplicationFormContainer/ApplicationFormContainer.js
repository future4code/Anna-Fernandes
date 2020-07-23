import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useForm from '../../hooks/useForm';
import useRequestData from '../../hooks/useRequestData';
import { useHistory, useParams } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';
import { useStyles } from '../../styles';

import Header from '../Header/Header';
import Countries from '../Countries/Countries';

const baseUrl = "https://us-central1-labenu-apis.cloudfunctions.net/labeX/anna-fernandes-turing/trips"

function ApplicationFormContainer() {
    const classes = useStyles();
    const pathParams = useParams();
    const trips = useRequestData(baseUrl, [],);

    const history = useHistory();

    const { form, onChange, resetForm } = useForm({
      name: "", 
      age: "", 
      applicationText: "", 
      profession: "", 
      country: "",
      tripId: ""
    });

    const handleInputChange = event => {
      const { name, value } = event.target;
      onChange(name, value)
    }

    const [ errorName, setErrorName ] = useState("")
    const [ errorAge, setErrorAge ] = useState("")
    const [ errorProfession, setErrorProfession ] = useState("")
    const [ errorCountry, setErrorCountry ] = useState("")
    const [ errorApplicationText, setErrorApplicationText ] = useState("")

    const [ isWrongName, setIsWrongName ] = useState(false)
    const [ isWrongAge, setIsWrongAge ] = useState(false)
    const [ isWrongProfession, setIsWrongProfession ] = useState(false)
    const [ isWrongCountry, setIsWrongCountry ] = useState(false)
    const [ isWrongApplication, setIsWrongApplication ] = useState(false)

    const validateForm = () => {
      if( form.name.length ) {
        setErrorName("");
        setIsWrongName(false);
      } else {
        setIsWrongName(true);
        setErrorName("O nome deve ter no mínimo 3 letras");
      }
      if( Number(form.age) > 18 ) {
        setErrorAge("");
        setIsWrongAge(false);
      } else {
        setIsWrongAge(true);
        setErrorAge("Você deve ter mais do que 18 anos");
      }
      if( form.profession.length > 5 ) {
        setErrorProfession("");
        setIsWrongAge(false);
      } else {
        setIsWrongProfession(true);
        setErrorProfession("Sua profissão ter no mínimo 5 caracteres");
      }
      if( form.country !== "" ) {
        setErrorCountry("");
        setIsWrongCountry(false);
      } else {
        setIsWrongCountry(true);
        setErrorCountry("Você deve selecionar um país");
      }
      if( form.applicationText.length > 30 ) {
        setErrorApplicationText("");
        setIsWrongApplication(false);
      } else {
        setIsWrongApplication(true);
        setErrorApplicationText("Você deve escrever mais do que 30 caracteres");
      }      
    }

    const applyTrip = event => {
      const id = form.tripId;
      
      event.preventDefault();
      validateForm();

      const body = {
        "name": form.name,
        "age": form.age,
        "applicationText": form.applicationText,
        "profession": form.profession,
        "country": form.country
      }

      if( form.name.length && Number(form.age) > 18 &&form.profession.length > 5 && form.country !== "" && form.applicationText.length > 30 ) {
        
        axios.post(`${baseUrl}/${id}/apply`, body)
          .then( () => {
            alert("Sua inscrição foi enviada!");
            resetForm();
            history.push("/trips/list");
          })
          .catch( err => {
            alert("Ops, algo deu errado: " + err.message);
          })
      } 
    }

  return (
    <form
        className={classes.form}
        autoComplete="off"
        onSubmit={applyTrip}
    >
        
        <TextField
            required
            className={classes.input}
            name="name"
            inputProps={{ pattern: "[A-Za-z]{3,}" }}
            label="nome"
            variant="outlined"
            value={form.name}
            onChange={handleInputChange}
            error={isWrongName}
            helperText={errorName}
        />
        <TextField
            required
            className={classes.input}
            name="age"
            label="idade"
            type="number"
            inputProps={{ min: 18 }}
            variant="outlined"
            value={form.age}
            onChange={handleInputChange}
            error={isWrongAge}
            helperText={errorAge}
        />
        <TextField
            required
            className={classes.input}
            name="profession"
            label="profissão"
            variant="outlined"
            value={form.profession}
            inputProps={{ pattern: "[a-z]{5,}" }}
            onChange={handleInputChange}
            error={isWrongProfession}
            helperText={errorProfession}
        />
        <Countries
            error={isWrongCountry}
            value={form.country}
            onChange={handleInputChange}
        />
        <TextField
            required
            select
            variant="outlined"
            className={classes.input}
            name="tripId"
            defaultValue="Brasil"
            value={form.tripId}
            onChange={handleInputChange}
            label="viagens"
        > 
            <MenuItem value="">selecione seu país</MenuItem>
            {trips.map( trip => {
              return <MenuItem key={trip.id} value={trip.id}>{trip.name}</MenuItem>
            })}
        </TextField>
        <TextField
            required
            className={classes.input}
            name="applicationText"
            label="por que você deve ir..."
            variant="outlined"
            multiline
            inputProps={{ pattern: "[a-z]{30,300}" }}
            rows={4}
            value={form.applicationText}
            onChange={handleInputChange}
            error={isWrongApplication}
            helperText={errorApplicationText}
        />
        <Button 
            className={classes.button} 
            color="primary" 
            variant="contained"
            type="submit"
        >
            enviar
        </Button>
    </form>
  );
}

export default ApplicationFormContainer;
