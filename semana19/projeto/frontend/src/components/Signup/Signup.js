import React from 'react';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import { CenterObjects } from '../../styles/mainStyles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    marginBottom: {
      marginBottom: theme.spacing(2),
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    textField: {
      width: '25ch',
    },
    title: {
        marginBottom: theme.spacing(4),
    },
    button: {
        marginBottom: theme.spacing(5),
        marginTop: theme.spacing(1),
    },
}));
  
export const Signup = () => {
    const classes = useStyles();
    const history = useHistory();

    const goToLogin = () => {
        history.push('/login');
    }
    
    return (
        <Card>
            <CenterObjects>
                <Typography variant="h4" noWrap className={classes.title}>
                    Cadastro
                </Typography>

                <form noValidate autoComplete="off">
                    <div>
                        <TextField
                        fullWidth
                        className={clsx(classes.marginBottom)}
                        error
                        id="outlined-error"
                        label="Error"
                        defaultValue="nome"
                        variant="outlined"
                        />
                        <TextField
                        fullWidth
                        className={clsx(classes.marginBottom)}
                        error
                        id="outlined-error"
                        label="Error"
                        defaultValue="email"
                        variant="outlined"
                        />
                        <TextField
                        fullWidth 
                        className={clsx(classes.marginBottom)}
                        error
                        id="outlined-error-helper-text"
                        label="Error"
                        defaultValue="senha"
                        helperText="Incorrect entry."
                        variant="outlined"
                        />
                        <Select
                            fullWidth 
                            className={clsx(classes.marginBottom)}
                            variant="outlined"
                            native
                            label="Função"
                        >
                            <option aria-label="None" value="Função" />
                            <option value="ADMIN">Administrador</option>
                            <option value="NORMAL">Usuário</option>
                        </Select>
                    </div>
                    <Button className={clsx(classes.button)}variant="contained" color="primary">cadastrar</Button>
                </form>
                <Link color="inherit" onClick={goToLogin}>Já tem login? Acesse o login aqui.</Link>
            </CenterObjects>
        </Card>
    )
}