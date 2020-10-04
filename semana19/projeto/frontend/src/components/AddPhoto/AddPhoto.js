import React from 'react';
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
  
export const AddPhoto = () => {
    const classes = useStyles();
    const history = useHistory();

    const goToSignUp = () => {
        history.push('/signup');
    }
    
    return (
        <Card>
            <CenterObjects>
                <Typography variant="h4" noWrap className={classes.title}>
                    Adicionar Foto
                </Typography>

                <form noValidate autoComplete="off">
                    <div>
                        <TextField
                        fullWidth
                        className={clsx(classes.marginBottom)}
                        error
                        id="outlined-error"
                        label="Foto"
                        defaultValue="link da foto"
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
                            <option value="lama-event-001">Primeiro dia</option>
                            <option value="lama-event-002">Segundo dia</option>
                            <option value="lama-event-003">Terceiro dia</option>
                        </Select>
                    </div>
                    <Button className={clsx(classes.button)} variant="contained" color="primary">entrar</Button>
                </form>
            </CenterObjects>
        </Card>
    )
}