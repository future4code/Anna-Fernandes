import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import useInput from '../../hooks/useInput';
import Header from '../Header/Header';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';

import { useStyles } from '../../styles';

const baseUrl = "https://us-central1-labenu-apis.cloudfunctions.net/labeX/anna-fernandes-turing/signup"

function SignUpPage() {
    const classes = useStyles();

    const [email, atualizaEmail] = useInput("");
    const [senha, atualizaSenha] = useInput("");

    const history = useHistory();

    const signUp = () => {
        const body = {
          "email": email,
          "password": senha
      }

        axios.post(baseUrl, body)
        .then(() => {
          alert("Usuário cadastrado com sucesso!")
          history.push("/trips/create");
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
            label="usuário"
            variant="outlined"
            value={email}
            onChange={atualizaEmail}
            />
            <TextField
            required
            className={classes.input}
            label="senha"
            type="password"
            autoComplete="current-password"
            variant="outlined"
            value={senha}
            onChange={atualizaSenha}
            />
            <Button className={classes.button} color="primary" variant="contained" onClick={signUp}>cadastrar</Button>
        </form>
    </Container>
    </>
  );
}

export default SignUpPage;
