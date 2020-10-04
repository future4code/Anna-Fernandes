import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';
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
    const [ bandId, setBandId ] = useState();
    const classes = useStyles();
    const history = useHistory();

    const goToSignUp = () => {
        history.push('/signup');
    }

    const getBandId = async(e) => {
        e.preventDefault();
        const bandName = "anda"
      try {
        const data = await axios.get(`http://localhost:3001/band/searchBand?search=${bandName}`)
        setBandId(data.data.result[0].name)

      } catch(err) {
        console.log(err.message)
      }
    }
    
    return (
        <Card>
            <CenterObjects>
                <Typography variant="h4" noWrap className={classes.title}>
                    Cadastrar Show
                </Typography>

                <form noValidate autoComplete="off" onSubmit={getBandId}>
                    <div>
                        <TextField
                        fullWidth
                        className={clsx(classes.marginBottom)}
                        error
                        id="outlined-error"
                        label="Nome da banda"
                        defaultValue="Nome da banda"
                        variant="outlined"
                        />
                        <TextField
                        className={clsx(classes.marginBottom)}
                        error
                        type="number"
                        id="outlined-error-helper-text"
                        label="Início"
                        defaultValue="Início"
                        helperText="Incorrect entry."
                        variant="outlined"
                        />
                        <TextField
                        className={clsx(classes.marginBottom)}
                        error
                        type="number"
                        id="outlined-error-helper-text"
                        label="Término"
                        defaultValue="Término"
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
                            <option value="DAY1">Primeiro dia</option>
                            <option value="DAY2">Segundo dia</option>
                            <option value="DAY3">Terceiro dia</option>
                        </Select>
                    </div>
                    <Button type="submit" className={clsx(classes.button)} variant="contained" color="primary">entrar</Button>
                </form>
            </CenterObjects>
        </Card>
    )
}