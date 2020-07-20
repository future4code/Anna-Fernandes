import React from 'react';
import useInput from '../../hooks/useInput';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles({
    root: {
      background: '#f5f5f5',
      border: 0,
      borderRadius: 4,
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 24,
    },
    input: {
        minWidth: 240,
        margin: 8,
    },
    button: {
        minWidth: 240,
        margin: 8,
        backgroundColor: "#3BD97F",
        color: "#ffffff",
    }
  });


function ApplicationsFormPage() {
    const classes = useStyles();

    const [name, updateName] = useInput("");
    const [age, updateAge] = useInput("");
    const [applicationText, updateApplicationText] = useInput("");
    const [profession, updateProfession] = useInput("");
    const [country, updateCountry] = useInput([]);
  return (
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
            label="idade"
            type="number"
            variant="outlined"
            value={age}
            onChange={updateAge}
            />
            <TextField
            required
            className={classes.input}
            label="profissão"
            variant="outlined"
            value={profession}
            onChange={updateProfession}
            />
            <Select
            variant="outlined"
            className={classes.input}
            value={country}
            onChange={updateCountry}
            label="País"
            >
              <MenuItem value="">
                <em>selecione seu país</em>
              </MenuItem>
              <MenuItem value={"brasil"}>Brasil</MenuItem>
              <MenuItem value={"eua"}>EUA</MenuItem>
              <MenuItem value={"canada"}>Canadá</MenuItem>
            </Select>
            <TextField
            required
            className={classes.input}
            label="por que você deve ir..."
            variant="outlined"
            multiline
            rows={6}
            value={applicationText}
            onChange={updateApplicationText}
            />
            <Button className={classes.button}  color="primary" variant="contained">enviar</Button>
        </form>
    </Container>
  );
}

export default ApplicationsFormPage;
