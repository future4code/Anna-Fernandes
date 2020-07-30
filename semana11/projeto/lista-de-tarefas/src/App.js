import React, { useState, useEffect } from "react";
import axios from "axios";
import { AppContainer, Header, HeaderTitle, Planner,PlannerDay, PlannerTitle, NoTaskMessage, TaskRow, HourSpan } from "./styles";
import { Task } from "./components/Task/Task";
import { AddTask } from "./components/AddTask/AddTask";
import { GlobalStyle } from "./GlobalStyle";

const baseUrl = 'https://us-central1-labenu-apis.cloudfunctions.net/generic/planner-turing-anna-fernandes'

const App = () => {
  const [tasksList, setTasksList] = useState([]);

  const getTasks = async () => {
    const response = await axios.get(baseUrl);
    setTasksList(response.data)
  }

  useEffect( () => {
    getTasks();
  }, [])

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
        <AddTask list={tasksList.length} getTasks={getTasks} />
        {daysList.map( day => {
          return (
            <PlannerDay key={day}>
              <PlannerTitle>{day}</PlannerTitle>
              {tasksList.find(task => task.day.search(day) !== -1 ) && hours.map( hour => {
                return (
                  <TaskRow key={hour}>
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
              {!tasksList.find(task => task.day.search(day) !== -1 ) && <NoTaskMessage>Não há tarefas cadastradas</NoTaskMessage>}

              </PlannerDay>
            )
          })}
      </Planner>
    </AppContainer>
  );
};

export default App;