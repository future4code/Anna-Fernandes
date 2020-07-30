import React, { useState } from "react";
import axios from "axios";
import { PlannerAddTask, Input, Select, Button, PlannerQtd, Label } from "./styles";

const baseUrl = 'https://us-central1-labenu-apis.cloudfunctions.net/generic/planner-turing-anna-fernandes'

export const AddTask = props => {

  const [inputValue, setInputValue] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [selectHoursValue, setSelectHoursValue] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);

  const onChangeInput = event => {
    setInputValue(event.target.value);
  };

  const onChangeSelectDays = event => {
    setSelectValue(event.target.value);
  };

  const onChangeSelectHours = event => {
    setSelectHoursValue(event.target.value);
  };

  const addTask = async () => {
    if ( inputValue !== "") {
      const body = {
        "text": inputValue,
        "day": `${selectValue}-${selectHoursValue}`
      };

      await axios.post(baseUrl, body);
  
      props.getTasks();
      setInputValue("");
      setErrorMessage(false);
    } else {
      setErrorMessage(true);
    }
  };

  const daysList = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"]

  const hours = [];
  for(let i=7; i < 23; i++) {
    hours.push(i)
  }

  return (
    <PlannerAddTask>
        <PlannerQtd>Total de tarefas na semana: {props.list}</PlannerQtd>
        <Input
            type="text"
            onChange={onChangeInput}
            value={inputValue}
            placeholder={"Nova tarefa"}
        />
        <Label htmlFor={'days'}>Dias da semana</Label>
        <Select data-testid='days' onChange={onChangeSelectDays} value={selectValue} id={'days'}>
            <option value="">Selecione o dia</option>
            {daysList.map( day => {
              return <option data-testid="option" key={day} value={day}>{day}</option>
            })}
        </Select>
        <Label htmlFor={'hours'}>Horários</Label>
        <Select data-testid='hours' onChange={onChangeSelectHours} value={selectHoursValue} id={'hours'}>
            <option value="">Selecione o horário</option>
            {hours.map( hour => {
              return <option key={hour} value={hour}>{hour}</option>
            })}
        </Select>
        <Button onClick={addTask}>Adicionar</Button>
          {errorMessage && <p>O texto não pode estar em branco.</p>}
    </PlannerAddTask>
  );
};
