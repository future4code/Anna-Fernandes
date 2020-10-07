import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import clsx from 'clsx';

import useForm from '../../hooks/useForm';
import { baseUrl } from '../../variables/mainVariables';

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
            const response = await axios.put(`${baseUrl}/user/signup`, body)
            
            window.localStorage.setItem("token", response.data.token.accessToken);
            window.localStorage.setItem("role", response.data.token.role);
            setRequestMessage("Cadastro realizado com sucesso")

        } catch(err) {
            console.log(err.message)
        }
    }

    const [ requestMessage, setRequestMessage ] = useState("");

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
                        required
                        className={clsx(classes.marginBottom)}
                        id="outlined-error"
                        label="Nome"
                        variant="outlined"
                        name="name"
                        value={form.name}
                        onChange={handleInputChange}
                        />
                        <TextField
                        fullWidth
                        required
                        className={clsx(classes.marginBottom)}
                        id="outlined-error"
                        label="Email"
                        defaultValue="email"
                        variant="outlined"
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleInputChange}
                        />
                        <TextField
                        fullWidth 
                        required
                        className={clsx(classes.marginBottom)}
                        id="outlined-error-helper-text"
                        label="Senha"
                        defaultValue="senha"
                        variant="outlined"
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleInputChange}
                        />
                        <Select
                            fullWidth 
                            required
                            className={clsx(classes.marginBottom)}
                            variant="outlined"
                            native
                            label="Função"
                            name="role"
                            value={form.role}
                            onChange={handleInputChange}
                        >
                            <option aria-label="None" value="Função" />
                            <option value="ADMIN">Administrador</option>
                            <option value="NORMAL">Usuário</option>
                        </Select>
                    </div>
                    <Button type="submit" className={clsx(classes.button)}variant="contained" color="primary">cadastrar</Button>
                </form>
                <Link color="inherit" onClick={goToLogin}>Já tem login? Acesse o login aqui.</Link>
                {requestMessage !== "" && <h2>{ requestMessage}</h2>}
            </CenterObjects>
        </Card>
    )
}