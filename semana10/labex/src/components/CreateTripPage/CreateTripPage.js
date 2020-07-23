import React, { useState } from 'react';
import axios from 'axios';
import useForm from '../../hooks/useForm';
import { useHistory } from 'react-router-dom';
import useProtectedRoute from '../../hooks/useProtectedRoute';
import usePermission from '../../hooks/usePermission';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import { useStyles } from '../../styles';

import Header from '../Header/Header';

function CreateTripPage() {
  const classes = useStyles();
  const history = useHistory();
  const token = useProtectedRoute();
  const permission = usePermission();

  const { form, onChange, resetForm } = useForm({
    name: "", 
    planet: "", 
    description: "", 
    date: "", 
    durationInDays: ""
  });

  const handleInputChange = event => {
    const { name, value } = event.target;
    onChange(name, value)
  }

  const baseUrl = "https://us-central1-labenu-apis.cloudfunctions.net/labeX/anna-fernandes-turing/trips";

  const axiosConfig = {
      headers: {
          auth: token
      }
  };

  const [ errorName, setErrorName ] = useState("")
  const [ errorDate, setErrorDate ] = useState("")
  const [ errorDuration, setErrorDuration ] = useState("")
  const [ errorPlanet, setErrorPlanet ] = useState("")
  const [ errorDescription, setErrorDescription ] = useState("")

  const [ isWrongName, setIsWrongName ] = useState(false)
  const [ isWrongDate, setIsWrongDate ] = useState(false)
  const [ isWrongDuration, setIsWrongDuration ] = useState(false)
  const [ isWrongPlanet, setIsWrongPlanet ] = useState(false)
  const [ isWrongDescription, setIsWrongDescription ] = useState(false)

  const [ isValidate, setValidation ] = useState(false)

  const validateForm = () => {
    const today = new Date();
    const formattedDate = new Date(form.date);

    if( form.name.length >= 8 ) {
      setErrorName("");
      setIsWrongName(false);
    } else {
      setIsWrongName(true);
      setErrorName("O nome deve ter no mínimo 8 letras");
    }

    if( formattedDate > today ) {
      setErrorDate("");
      setIsWrongDate(false);
    } else {
      setIsWrongDate(true);
      setErrorDate("Deve ser uma data no futuro");
    }

    if( Number(form.durationInDays) >= 50 ) {
      setErrorDuration("");
      setIsWrongDuration(false);
    } else {
      setIsWrongDuration(true);
      setErrorDuration("No mínimo 50 dias");
    }

    if( form.planet !== "" ) {
      setErrorPlanet("");
      setIsWrongPlanet(false);
    } else {
      setIsWrongPlanet(true);
      setErrorPlanet("Você deve selecionar um planeta");
    }

    if( form.description.length >= 30 ) {
      setErrorDescription("");
      setIsWrongDescription(false);
    } else {
      setIsWrongDescription(true);
      setErrorDescription("No mínimo 30 caracteres");
    }


    // && setIsWrongDate === false && setIsWrongDuration === false && setIsWrongPlanet === false && setIsWrongDescription
  }

  const getTripDetails = event => {  
    event.preventDefault();
    validateForm();

    console.log("oi")

    // const formatDate = new Date(form.date);

    // const body = {
    //   "name": form.name,
    //   "planet": form.planet,
    //   "date": formatDate.toLocaleDateString('en-GB', {day: 'numeric', month: 'numeric', year: '2-digit'}),
    //   "description": form.description,
    //   "durationInDays": form.durationInDays
    // }

    // axios.post(baseUrl, body, axiosConfig)
    //   .then(() => {
    //     alert("Viagem cadastrada com sucesso!")
    //     resetForm();
    //     history.push("/trips/list");
    //   })
    //   .catch(err => {
    //     alert("Ops, algo deu errado:" + err.message)
    //   })
  }

  return (
    <>
    <Header />
      <Typography variant="h4" component="h4" className={classes.center}>
        Crie uma viagem
      </Typography>

    {permission !== "adm" && <Container maxWidth="sm"> <Typography variant="h5" component="h2" className={classes.center}>
      Você não tem permissão para criar viagens.
    </Typography></Container>}
    {permission === "adm" && <Container>
        <form 
          className={classes.form} 
          autoComplete="off" 
          onSubmit={getTripDetails}
        >
            <TextField
              required
              className={classes.input}
              name="name"
              label="nome"
              inputProps={{ pattern: "[A-Za-z]{5,}" }}
              variant="outlined"
              value={form.name}
              onChange={handleInputChange}
              error={isWrongName}
              helperText={errorName}
            />
            <TextField
            select
            required
            variant="outlined"
            className={classes.input}
            name="planet"
            value={form.planet}
            onChange={handleInputChange}
            label="Planeta"
            error={isWrongPlanet}
            helperText={errorPlanet}
            >
              <option value="">selecione o planeta</option>
              <option value={"mercurio"}>Mercúrio</option>
              <option value={"venus"}>Vênus</option>
              <option value={"terra"}>Terra</option>
              <option value={"jupiter"}>Júpiter</option>
              <option value={"Saturno"}>Saturno</option>
              <option value={"Urano"}>Urano</option>
              <option value={"Netuno"}>Neturo</option>
              <option value={"Plutão"}>Plutão, porque Plutão sempre estará em nossos corações</option>
            </TextField>
            <TextField
              required
              className={classes.input}
              name="date"
              label=""
              type="date"
              InputProps={{ inputProps: { min: "2020-07-30" } }}
              variant="outlined"
              value={form.date}
              onChange={handleInputChange}
              error={isWrongDate}
              helperText={errorDate}
            />
            <TextField
              required
              className={classes.input}
              name="durationInDays"
              label="duração (dias)"
              type="number"
              InputProps={{ inputProps: { min: 49 } }}
              variant="outlined"
              value={form.durationInDays}
              onChange={handleInputChange}
              error={isWrongDuration}
              helperText={errorDuration}
            />
            <TextField
              required
              className={classes.input}
              name="description"
              label="descrição"
              inputProps={{ pattern: "[A-Za-z]{30,}" }}
              variant="outlined"
              multiline
              rows={6}
              value={form.description}
              onChange={handleInputChange}
              error={isWrongDescription}
              helperText={errorDescription}
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
    </Container>}
    </>
  );
}

export default CreateTripPage;
