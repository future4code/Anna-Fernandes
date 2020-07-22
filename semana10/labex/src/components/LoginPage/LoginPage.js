import React from 'react';
import axios from 'axios';
import useInput from '../../hooks/useInput';
import { useHistory } from 'react-router-dom';

import Header from '../Header/Header';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import { useStyles } from '../../styles';

function LoginPage() {
  const classes = useStyles();
  const [email, atualizaEmail] = useInput("");
  const [senha, atualizaSenha] = useInput("");
  const history = useHistory();
  
  const baseUrl = "https://us-central1-labenu-apis.cloudfunctions.net/labeX/anna-fernandes-turing/login"
  
  const goToSignUp = () => {
    history.push("/signup");
  }
  
  const goToCreateForm = () => {
    history.push("/");
  }

  const login = () => {
    const body = {
      "email": email,
      "password": senha
    }

    axios.post(baseUrl, body)
    .then( response => {
      window.localStorage.setItem("token", response.data.token);
      goToCreateForm();
    })
    .catch( err => {
      alert("Usuário ou senha incorretos.")
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
            id="outlined-required"
            label="usuário"
            variant="outlined"
            value={email}
            onChange={atualizaEmail}
            />
            <TextField
            required
            className={classes.input}
            id="outlined-password-input"
            label="senha"
            type="password"
            autoComplete="current-password"
            variant="outlined"
            value={senha}
            onChange={atualizaSenha}
            />
            <Button className={classes.button}  color="primary" variant="contained" onClick={login}>entrar</Button>
            <Button className={classes.button}  color="primary" variant="contained" onClick={goToSignUp}>cadastrar</Button>
        </form>
    </Container>
    </>
  );
}

export default LoginPage;
