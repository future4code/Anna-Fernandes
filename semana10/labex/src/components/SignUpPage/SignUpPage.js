import React from 'react';
import useInput from '../../hooks/useInput';
import { useHistory } from 'react-router-dom';
import Header from '../Header/Header';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';

import { useStyles } from '../../styles';


function SignUpPage() {
    const classes = useStyles();

    const [email, atualizaEmail] = useInput("");
    const [senha, atualizaSenha] = useInput("");

    const history = useHistory();
    const goToCreateForm = () => {
      history.push("/trips/create");
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
            <Button className={classes.button} color="primary" variant="contained" onClick={goToCreateForm}>cadastrar</Button>
        </form>
    </Container>
    </>
  );
}

export default SignUpPage;
