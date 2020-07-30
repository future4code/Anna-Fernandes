import React, { useState, useEffect } from "react";
import axios from "axios";
import { AppContainer, Header, HeaderTitle, Planner, PlannerAddTask, Input, Select, Button,PlannerQtd, PlannerDay, PlannerTitle, Label, NoTaskMessage, TaskRow, HourSpan } from "./styles";
import { Task } from "./components/Task/Task";
import { GlobalStyle } from "./GlobalStyle";

const baseUrl = 'https://us-central1-labenu-apis.cloudfunctions.net/generic/planner-turing-anna-fernandes'

const App = () => {
  const [tasksList, setTasksList] = useState([]);
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

  const getTasks = async () => {
    const response = await axios.get(baseUrl);
    setTasksList(response.data)
  }

  useEffect( () => {
    getTasks();
  }, [])

  const addTask = async () => {
    if ( inputValue !== "") {
      const body = {
        "text": inputValue,
        "day": `${selectValue}-${selectHoursValue}`
      };

      await axios.post(baseUrl, body);
  
      getTasks();
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
    <AppContainer>
      <GlobalStyle />
      <Header>
        <HeaderTitle>Weekly Planner</HeaderTitle>
      </Header>
      <Planner data-testid="tarefas-lista">
        <PlannerAddTask>
          <PlannerQtd>Quantidade de tarefas: {tasksList.length}</PlannerQtd>
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
          {daysList.map( day => {
            return (
              <PlannerDay key={day}>
                <PlannerTitle>{day}</PlannerTitle>
                {!tasksList.find(task => task.day.search(day)) && hours.map( hour => {
                  return (
                    <TaskRow>
                      <HourSpan>{hour}</HourSpan>
                      {tasksList.map(task => {
                        if( task.day === `${day}-${hour}` ) {
                          if(task.day) {
                            return (
                              <Task
                                key={task.id}
                                task={task}
                                getTasks={getTasks}
                                daysList={daysList}
                              />
                            );
                          }
                        }
                      })
                      }
                    </TaskRow>
                  )
                })}
                {tasksList.find(task => task.day.search(day)) && <NoTaskMessage>Não há tarefas cadastradas</NoTaskMessage>}

              </PlannerDay>
            )
          })}
      </Planner>
    </AppContainer>
  );
};

export default App;