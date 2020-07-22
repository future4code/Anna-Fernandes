import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import useInput from '../../hooks/useInput';
import Header from '../Header/Header';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { useStyles } from '../../styles';

const baseUrl = "https://us-central1-labenu-apis.cloudfunctions.net/labeX/anna-fernandes-turing/signup"

function SignUpPage() {
    const classes = useStyles();

    const [mail, setMail] = useInput("");
    const [password, setPassword] = useInput("");
    const [permission, setPermission] = useInput("");

    const history = useHistory();

    const signUp = () => {
        const body = {
          "email": mail,
          "password": password
      }

        axios.post(baseUrl, body)
        .then(response => {
          alert("Usuário cadastrado com sucesso!");
          window.localStorage.setItem("permission", permission);
          window.localStorage.setItem("token", response.data.token);
          history.push("/");
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
              value={mail}
              onChange={setMail}
            />
            <TextField
              required
              className={classes.input}
              label="senha"
              type="password"
              autoComplete="current-password"
              variant="outlined"
              value={password}
              onChange={setPassword}
            />
            <Select
              variant="outlined"
              className={classes.input}
              value={permission}
              onChange={setPermission}
              label="permissão"
              >
                <MenuItem value="">
                  <em>tipo de permissão</em>
                </MenuItem>
                <MenuItem value={"admin"}>administrador</MenuItem>
                <MenuItem value={"reviewer"}>revisor</MenuItem>
                <MenuItem value={"user"}>usuario</MenuItem>
            </Select>
            <Button 
              className={classes.button} 
              color="primary" 
              variant="contained" 
              onClick={signUp}>
                cadastrar
            </Button>
        </form>
    </Container>
    </>
  );
}

export default SignUpPage;
