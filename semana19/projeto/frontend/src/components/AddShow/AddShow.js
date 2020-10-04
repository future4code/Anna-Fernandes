import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';

import { axiosConfig, baseUrl } from '../../variables/mainVariables';
import useForm from '../../hooks/useForm';

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
  
export const AddShow = () => {
    const [ bandName, setBandName ] = useState();
    const [ bandId, setBandId ] = useState();
    const classes = useStyles();
    const history = useHistory();

    const getBandId = async() => {
        setBandName(form.name)
      try {
        const data = await axios.get(`${baseUrl}/band/searchBand?search=${bandName}`)
        setBandId(data.data.result[0].name)

      } catch(err) {
        console.log(err.message)
      }
    }

    const { form, onChange, resetForm } = useForm({
        name: "", 
        day: "",
        start_time: "",
        end_time: ""
      });
  
    const handleInputChange = event => {
        const { name, value } = event.target;
        onChange(name, value)
    }

    const handleAddShow = async(e) => {
        e.preventDefault();
        getBandId();

        const body = {     
            "day": form.day, 
            "start_time": form.start_time,
            "end_time": form.end_time,
            "band_id": bandId,
        }
        
        try {
            axios.put(`${baseUrl}/show/add`, body, axiosConfig)
            setRequestMessage("Show adicionado com sucesso.")

        } catch(err) {
            setRequestMessage(err.message)
        }
    }

    const [ requestMessage, setRequestMessage ] = useState("");
    
    return (
        <Card>
            <CenterObjects>
                <Typography variant="h4" noWrap className={classes.title}>
                    Cadastrar Show
                </Typography>

                <form noValidate autoComplete="off" onSubmit={handleAddShow}>
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
                        type="number"
                        id="outlined-error-helper-text"
                        label="Início"
                        variant="outlined"
                        name="start_time"
                        value={form.start_time}
                        onChange={handleInputChange}
                        />
                        <TextField
                        fullWidth
                        required
                        className={clsx(classes.marginBottom)}
                        type="number"
                        id="outlined-error-helper-text"
                        label="Término"
                        variant="outlined"
                        name="end_time"
                        value={form.end_time}
                        onChange={handleInputChange}
                        />
                        <Select
                            fullWidth
                            required
                            className={clsx(classes.marginBottom)}
                            variant="outlined"
                            native
                            label="Função"
                            name="day"
                            value={form.day}
                            onChange={handleInputChange}
                        >
                            <option aria-label="None" value="Função" />
                            <option value="DAY1">Primeiro dia</option>
                            <option value="DAY2">Segundo dia</option>
                            <option value="DAY3">Terceiro dia</option>
                        </Select>
                    </div>
                    <Button type="submit" className={clsx(classes.button)} variant="contained" color="primary">entrar</Button>
                </form>
                {requestMessage !== "" && <h2>{ requestMessage}</h2>}
            </CenterObjects>
        </Card>
    )
}