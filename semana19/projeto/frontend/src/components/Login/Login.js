import React from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import { CenterObjects } from '../../styles/mainStyles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';

import useForm from '../../hooks/useForm';
import Axios from 'axios';

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
  
export const Login = () => {
    const classes = useStyles();
    const history = useHistory();

    const goToSignUp = () => {
        history.push('/signup');
    }
    
    const { form, onChange, resetForm } = useForm({
        email: "", 
        password: "", 
      });
  
    const handleInputChange = event => {
        const { name, value } = event.target;
        onChange(name, value)
    }

    const handleLogin = async(e) => {
        e.preventDefault();

        const body = {
            "email": form.email,
            "password": form.password
        }
        try {
            const response = axios.post("http://localhost:3001/user/login", body)
            
            window.localStorage.setItem("token", response.data.token);

        } catch(err) {
            console.log(err.message)
        }
    }
    
    return (
        <Card>
            <CenterObjects>
                <Typography variant="h4" noWrap className={classes.title}>
                    Login
                </Typography>

                <form noValidate autoComplete="off" onSubmit={handleLogin}>
                    <div>
                        <TextField
                        required
                        fullWidth
                        className={clsx(classes.marginBottom)}
                        error
                        id="outlined-error"
                        label="Error"
                        defaultValue="email"
                        variant="outlined"
                        type="email"
                        name="email"
                        value={form.email}
                        onChage={handleInputChange}
                        />
                        <TextField
                        fullWidth 
                        required
                        className={clsx(classes.marginBottom)}
                        error
                        id="outlined-error-helper-text"
                        label="Error"
                        defaultValue="senha"
                        helperText="Incorrect entry."
                        variant="outlined"
                        type="password"
                        name="password"
                        value={form.password}
                        onChage={handleInputChange}
                        />
                    </div>
                    <Button type="submit" className={clsx(classes.button)} variant="contained" color="primary">entrar</Button>
                </form>
                <Link color="inherit" onClick={goToSignUp}>Não tem login? Se cadastre aqui.</Link>
            </CenterObjects>
        </Card>
    )
}