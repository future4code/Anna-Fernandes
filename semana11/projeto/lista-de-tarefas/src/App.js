import React, {useState} from "react";
import { Task } from "./components/Task/Task";
import { AddTask } from "./components/AddTask/AddTask";
import { ColorsContainer } from "./components/ColorsContainer/ColorsContainer";
import { daysList, hours } from './components/variables';
import useTasksList from "./hooks/useTasksList";

import { AppContainer, Header, HeaderTitle, Planner,PlannerDay, PlannerTitle, NoTaskMessage, TaskRow, HourSpan, OpenColorBox } from "./styles";
import { GlobalStyle } from "./GlobalStyle";

import iconArrowDown from "./images/arrow-down.svg";
import iconArrowUp from "./images/arrow-up.svg";

const App = () => {
  const { tasksList, fetchData } = useTasksList();

  const [colorBoxOpen, setColorBoxOpen] = useState(false)
  const [color, setColor] = useState('')

  const onClickShowColorBox = () => {
    setColorBoxOpen(!colorBoxOpen)
  }

  const onClickChangeColor = e => {
    if(e.target.id === 'blue') {
      setColor('blue');
    } else if (e.target.id === 'dark') {
      setColor('dark');
    } else {
      setColor('');
    }
  }

  const iconArrow = colorBoxOpen ? iconArrowUp : iconArrowDown;

  return (
    <AppContainer>
      <GlobalStyle />
      <Header color={color} data-testid='header'>
        <HeaderTitle>Weekly Planner</HeaderTitle>
        <OpenColorBox onClick={onClickShowColorBox} src={iconArrow} alt="Ícone de seta para abrir cores"/>
      </Header>
      {colorBoxOpen && <ColorsContainer onClickChangeColor={onClickChangeColor}/>}
      <Planner data-testid="tarefas-lista">
        <AddTask 
          color={color} 
          list={tasksList.length} 
          getTasks={fetchData} 
        />
        {daysList.map( day => {
          return (
            <PlannerDay key={day}>
              <PlannerTitle color={color.toString()}>{day}</PlannerTitle>
              {tasksList.find(task => task.day.search(day) !== -1 ) && hours.map( hour => {
                return (
                  <TaskRow key={hour}>
                    <HourSpan color={color} >{hour}</HourSpan>
                    {tasksList.map(task => {
                      if( task.day === `${day}-${hour}` ) {
                        if(task.day) {
                          return <Task
                              key={task.id}
                              task={task}
                              getTasks={fetchData}
                              daysList={daysList}
                              color={color}
                            />
                        }
                      }
                    })
                    }
                  </TaskRow>
                )
              })}
              {!tasksList.find(task => task.day.search(day) !== -1 ) && <NoTaskMessage color={color} >Não há tarefas cadastradas</NoTaskMessage>}
            </PlannerDay>
          )
        })}
      </Planner>
    </AppContainer>
  );
};

export default App;