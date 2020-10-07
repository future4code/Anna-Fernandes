import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import clsx from 'clsx';

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
  
export const AddTicket = () => {
    const classes = useStyles();
    const history = useHistory();
    const token = useProtectedRoute();

    const axiosConfig = {
        headers: {
            Authorization: token
        }
    }

    const { form, onChange, resetForm } = useForm({
        event_id: "", 
        ticket_name: "", 
        ticket_price: "", 
        ticket_quantity: "", 
      });
  
    const handleInputChange = event => {
        const { name, value } = event.target;
        onChange(name, value)
    }

    const handleCreateTicket = async(e) => {
        e.preventDefault();

        const body = {     
            "event_id": form.event_id, 
            "ticket_name": form.ticket_name, 
            "ticket_price": Number(form.ticket_price), 
            "ticket_quantity": Number(form.ticket_quantity), 
        }
        
        try {
            await axios.put(`${baseUrl}/event/ticket`, body, axiosConfig)
            setRequestMessage("Cadastro realizado com sucesso.")

        } catch(err) {
            setRequestMessage(err.message)
        }
    }

    const [ requestMessage, setRequestMessage ] = useState("");
    
    return (
        <Card>
            <CenterObjects>
                <Typography variant="h4" noWrap className={classes.title}>
                    Cadastrar Ingresso
                </Typography>

                <form noValidate autoComplete="off" onSubmit={handleCreateTicket}>
                    <div>
                        <TextField
                        fullWidth
                        required
                        className={clsx(classes.marginBottom)}
                        id="outlined-error"
                        label="Ingresso"
                        variant="outlined"
                        name="ticket_name"
                        value={form.ticket_name}
                        onChage={handleInputChange}
                        />
                        <TextField
                        fullWidth
                        required
                        className={clsx(classes.marginBottom)}
                        type="number"
                        id="outlined-error-helper-text"
                        label="Preço"
                        variant="outlined"
                        type="number"
                        name="ticket_price"
                        value={form.ticket_price}
                        onChage={handleInputChange}
                        />
                        <TextField
                        fullWidth
                        required
                        className={clsx(classes.marginBottom)}
                        type="number"
                        id="outlined-error-helper-text"
                        label="Quantidade"
                        variant="outlined"
                        type="number"
                        name="event_id"
                        value={form.event_id}
                        onChage={handleInputChange}
                        />
                        <Select 
                            fullWidth
                            required
                            className={clsx(classes.marginBottom)}
                            variant="outlined"
                            native
                            label="Função"
                            name="ticket_name"
                            value={form.ticket_name}
                            onChage={handleInputChange}
                        >
                            <option aria-label="None" value="Função" />
                            <option value="lama-event-001">Primeiro dia</option>
                            <option value="lama-event-002">Segundo dia</option>
                            <option value="lama-event-003">Terceiro dia</option>
                        </Select>
                    </div>
                    <Button type="submit" className={clsx(classes.button)} variant="contained" color="primary">entrar</Button>
                </form>
                {requestMessage !== "" && <h2>{ requestMessage}</h2>}
            </CenterObjects>
        </Card>
    )
}