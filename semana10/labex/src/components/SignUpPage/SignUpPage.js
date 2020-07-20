import React from 'react';
import useInput from '../../hooks/useInput';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles({
    root: {
      background: '#f5f5f5',
      border: 0,
      borderRadius: 4,
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 24,
    },
    input: {
        minWidth: 240,
        margin: 8,
    },
    button: {
        minWidth: 240,
        margin: 8,
        backgroundColor: "#3BD97F",
        color: "#ffffff",
    }
  });

function SignUpPage() {
    const classes = useStyles();

    const [email, atualizaEmail] = useInput("");
    const [senha, atualizaSenha] = useInput("");

  return (
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
            <Button className={classes.button} color="primary" variant="contained">cadastrar</Button>
        </form>
    </Container>
  );
}

export default SignUpPage;
