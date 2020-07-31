import React, { useState } from "react";
import axios from "axios";
import { PlannerAddTask, Input, Select, Button, PlannerQtd, Label, TaksForm } from "./styles";

import { daysList, hours } from '../variables';
import useForm from '../../hooks/useForm';

const baseUrl = 'https://us-central1-labenu-apis.cloudfunctions.net/generic/planner-turing-anna-fernandes'

export const AddTask = props => {

  const [errorMessage, setErrorMessage] = useState(false);
  const { form, onChange, resetForm } = useForm({
    task: "", 
    day: "", 
    hour: ""
  });

  const handleInputChange = event => {
    const { name, value } = event.target;
    onChange(name, value)
  }

  const addTask = async (e) => {
    e.preventDefault();
    if ( form.task !== "") {
      const body = {
        "text": form.task,
        "day": `${form.day}-${form.hour}`
      };

      await axios.post(baseUrl, body);
  
      props.getTasks();
      setErrorMessage(false);
      resetForm()
    } else {
      setErrorMessage(true);
    }
  };

  return (
    <PlannerAddTask>
        <PlannerQtd color={props.color}>Total de tarefas na semana: {props.list}</PlannerQtd>
        
        <TaksForm onSubmit={addTask}>
        <Input
          required
          type="text"
          name="task"
          onChange={handleInputChange}
          value={form.task}
          placeholder={"Nova tarefa"}
        />
        <Label htmlFor={'days'}>Dias da semana</Label>
        <Select 
          required
          data-testid='days' 
          name="day"
          onChange={handleInputChange}
          value={form.day}
          id={'days'}
        >
            <option value="">Selecione o dia</option>
            {daysList.map( day => {
              return <option data-testid="option" key={day} value={day}>{day}</option>
            })}
        </Select>
        <Label htmlFor={'hours'}>Horários</Label>
        <Select 
          required
          data-testid='hours' 
          name="hour" 
          onChange={handleInputChange} 
          value={form.hour} 
          id={'hours'}
        >
          <option value="">Selecione o horário</option>
          {hours.map( hour => {
            return <option key={hour} value={hour}>{hour}</option>
          })}
        </Select>
        <Button color={props.color}>Adicionar</Button>
          {errorMessage && <p>O texto não pode estar em branco.</p>}
        </TaksForm>

    </PlannerAddTask>
  );
};
