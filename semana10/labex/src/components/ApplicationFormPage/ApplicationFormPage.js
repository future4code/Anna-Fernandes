import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useForm from '../../hooks/useForm';
import { useHistory, useParams } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { useStyles } from '../../styles';

import Header from '../Header/Header';

const baseUrl = "https://us-central1-labenu-apis.cloudfunctions.net/labeX/anna-fernandes-turing/trips"

function ApplicationsFormPage() {
    const classes = useStyles();
    const pathParams = useParams();

    const history = useHistory();
    const [isValidated, setIsValidade] = useState(false);

    const { form, onChange, resetForm } = useForm({
      name: "", 
      age: "", 
      applicationText: "", 
      profession: "", 
      country: ""
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
      event.preventDefault();
      validateForm();

      const id = pathParams.id;
      const body = {
        "name": form.name,
        "age": form.age,
        "applicationText": form.applicationText,
        "profession": form.profession,
        "country": form.country
      }
      
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

  return (
    <>
    <Header />
    <Container className={classes.container}>
        <form
          className={classes.form}
          autoComplete="off"
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
            helpertext={errorName}
            />
            <TextField
            required
            className={classes.input}
            name="age"
            label="idade"
            type="number"
            min="18"
            variant="outlined"
            value={form.age}
            onChange={handleInputChange}
            error={isWrongAge}
            helpertext={errorAge}
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
            helpertext={errorProfession}
            />
            <Select
              required
              variant="outlined"
              className={classes.input}
              name="country"
              value={form.country}
              onChange={handleInputChange}
              label="País"
              error={isWrongCountry}
              helpertext={errorCountry}
            >
              <option value="">selecione seu país</option>
              <option value={"brasil"}>Brasil</option>
              <option value={"eua"}>EUA</option>
              <option value={"canada"}>Canadá</option>
            </Select>
            <TextField
              required
              className={classes.input}
              name="applicationText"
              label="por que você deve ir..."
              variant="outlined"
              multiline
              inputProps={{ pattern: "[a-z]{30,300}" }}
              rows={6}
              value={form.applicationText}
              onChange={handleInputChange}
              error={isWrongApplication}
              helpertext={errorApplicationText}
            />
            <Button 
              className={classes.button} 
              color="primary" 
              variant="contained"
              onClick={applyTrip}
            >
                enviar
            </Button>
        </form>
    </Container>
    </>
  );
}

export default ApplicationsFormPage;
