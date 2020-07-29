import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { AppContainer, Planner, PlannerQtd, PlannerDay } from "./styles";
import { Task } from "./components/Task/Task";

const baseUrl = 'https://us-central1-labenu-apis.cloudfunctions.net/generic/planner-turing-anna-fernandes'

const App = () => {
  const [tasksList, setTasksList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);

  const onChangeInput = event => {
    setInputValue(event.target.value);
  };

  const onChangeSelect = event => {
    setSelectValue(event.target.value);
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
        "day": selectValue
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
  return (
    <AppContainer>
      <div>
        <input
          type="text"
          onChange={onChangeInput}
          value={inputValue}
          placeholder={"Nova tarefa"}
        />
        <label htmlFor={'dias'}>Dias da semana</label>
        <select onChange={onChangeSelect} value={selectValue} id={'dias'}>
          <option value="">Selecione o dia</option>
          {daysList.map( day => {
            return <option key={day} value={day}>{day}</option>
          })}
        </select>
        <button onClick={addTask}>Adicionar</button>
      </div>
      <br />
      {errorMessage && <p>O texto não pode estar em branco.</p>}
      <Planner>
          <PlannerQtd>Quantidade de tarefas: {tasksList.length}</PlannerQtd>
          {daysList.map( day => {
            return (
              <PlannerDay key={day}>
                <h3>{day}</h3>
                {tasksList.map(task => {
                  if( task.day === day) {
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
                })}
                {!tasksList.find(task => task.day === day) && <p>Não há tarefas cadastradas</p>}
              </PlannerDay>
            )
          })}
      </Planner>
      {tasksList.length === 0 && <p>Não há tarefas cadastradas.</p>}
    </AppContainer>
  );
};

export default App;