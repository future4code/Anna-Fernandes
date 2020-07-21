import React from 'react';
import useInput from '../../hooks/useInput';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import { useStyles } from '../../styles';

import Header from '../Header/Header';

function CreateTripPage() {
    const classes = useStyles();

    const [name, updateName] = useInput("");
    const [planet, updatePlanet] = useInput("");
    const [description, updateDescription] = useInput("");
    const [date, updateDate] = useInput("");
    const [durationInDays, updateDurationInDays] = useInput([]);

  return (
    <>
    <Header />
    <Container>
        <form className={classes.form} noValidate autoComplete="off">
            <TextField
            required
            className={classes.input}
            label="nome"
            variant="outlined"
            value={name}
            onChange={updateName}
            />
            <TextField
            required
            className={classes.input}
            label="planeta"
            variant="outlined"
            value={planet}
            onChange={updatePlanet}
            />
            <TextField
            required
            className={classes.input}
            label="data"
            type="number"
            variant="outlined"
            value={durationInDays}
            onChange={updateDurationInDays}
            />
            <TextField
            required
            className={classes.input}
            label="duração (dias)"
            type="number"
            variant="outlined"
            value={date}
            onChange={updateDate}
            />
            <TextField
            required
            className={classes.input}
            label="descrição"
            variant="outlined"
            multiline
            rows={6}
            value={description}
            onChange={updateDescription}
            />
            <Button className={classes.button}  color="primary" variant="contained">enviar</Button>
        </form>
    </Container>
    </>
  );
}

export default CreateTripPage;
