import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';
import axios from 'axios';

import useForm from '../../hooks/useForm';
import { baseUrl } from '../../variables/mainVariables';
import useProtectedRoute from '../../hooks/useProtectedRoute';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import { CenterObjects } from '../../styles/mainStyles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';

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
  
export const AddBand = () => {
    const classes = useStyles();
    const history = useHistory();
    const token = useProtectedRoute();

    const axiosConfig = {
        headers: {
            Authorization: token
        }
    }

    const { form, onChange, resetForm } = useForm({
        name: "", 
        music_genre: "", 
        responsible: ""
      });
  
    const handleInputChange = event => {
        const { name, value } = event.target;
        onChange(name, value)
    }

    const handleAddBand = async(e) => {
        e.preventDefault();

        const body = {     
            "name": form.name, 
            "music_genre": form.music_genre, 
            "responsible": form.responsible
        }
        try {
            await axios.put(`${baseUrl}/band/register`, body, axiosConfig)
            setRequestMessage("Banda adicionada com sucesso.")

        } catch(err) {
            setRequestMessage(err.message)
        }
    }

    const [ requestMessage, setRequestMessage ] = useState("");
    
    return (
        <Card>
            <CenterObjects>
                <Typography variant="h4" noWrap className={classes.title}>
                    Cadastrar Banda
                </Typography>

                <form noValidate autoComplete="off" onSubmit={handleAddBand}>
                    <div>
                        <TextField
                        fullWidth
                        required
                        className={clsx(classes.marginBottom)}
                        id="outlined-error"
                        label="Nome da banda"
                        variant="outlined"
                        name="name"
                        value={form.name}
                        onChange={handleInputChange}
                        />
                        <TextField
                        fullWidth 
                        required
                        className={clsx(classes.marginBottom)}
                        id="outlined-error-helper-text"
                        label="Responsável"
                        variant="outlined"
                        name="responsible"
                        value={form.responsible}
                        onChange={handleInputChange}
                        />
                        <Select
                            fullWidth 
                            required
                            className={clsx(classes.marginBottom)}
                            variant="outlined"
                            native
                            label="Função"
                            name="music_genre"
                            value={form.music_genre}
                            onChange={handleInputChange}
                        >
                            <option aria-label="None" value="Função" />
                            <option value="ROCK">Rock</option>
                            <option value="INDIE">Indie</option>
                            <option value="METAL">Metal</option>
                            <option value="HIPHOP">Hip-hop</option>
                            <option value="FUNK">Funk</option>
                            <option value="POPULAR">Popular</option>
                        </Select>
                    </div>
                    <Button type="submit" className={clsx(classes.button)} variant="contained" color="primary">entrar</Button>
                </form>
                {requestMessage !== "" && <h2>{ requestMessage}</h2>}
            </CenterObjects>
        </Card>
    )
}