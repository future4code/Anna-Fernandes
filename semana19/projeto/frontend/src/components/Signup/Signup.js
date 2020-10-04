import React from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import clsx from 'clsx';

import useForm from '../../hooks/useForm';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import { CenterObjects } from '../../styles/mainStyles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
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

    const { form, onChange, resetForm } = useForm({
        name: "", 
        email: "", 
        password: "", 
        role: "", 
      });
  
    const handleInputChange = event => {
        const { name, value } = event.target;
        onChange(name, value)
    }

    const handleSignup = async(e) => {
        e.preventDefault();

        const body = {
            "name": form.name,
            "email": form.email,
            "password": form.password,
            "role": form.role
        }
        try {
            const response = axios.put("http://localhost:3001/user/signup", body)
            
            window.localStorage.setItem("token", response.data.token);

        } catch(err) {
            console.log(err.message)
        }
    }

    return (
        <Card>
            <CenterObjects>
                <Typography variant="h4" noWrap className={classes.title}>
                    Cadastro
                </Typography>

                <form noValidate autoComplete="off" onSubmit={handleSignup}>
                    <div>
                        <TextField
                        fullWidth
                        className={clsx(classes.marginBottom)}
                        error
                        id="outlined-error"
                        label="Error"
                        defaultValue="nome"
                        variant="outlined"
                        name="name"
                        value={form.name}
                        onChage={handleInputChange}
                        />
                        <TextField
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
                        <Select
                            fullWidth 
                            className={clsx(classes.marginBottom)}
                            variant="outlined"
                            native
                            label="Função"
                            name="role"
                            value={form.role}
                            onChage={handleInputChange}
                        >
                            <option aria-label="None" value="Função" />
                            <option value="ADMIN">Administrador</option>
                            <option value="NORMAL">Usuário</option>
                        </Select>
                    </div>
                    <Button type="submit" className={clsx(classes.button)}variant="contained" color="primary">cadastrar</Button>
                </form>
                <Link color="inherit" onClick={goToLogin}>Já tem login? Acesse o login aqui.</Link>
            </CenterObjects>
        </Card>
    )
}