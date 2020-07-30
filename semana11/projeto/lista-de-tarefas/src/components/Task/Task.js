import React, { useState } from "react";
import axios from "axios";
import { TaskText, TaskEdit, Label, TaskContainer, TaskCheck, Checkmark, IconBtn, Icon, Input, Select, DeleteBtn } from "./styles";

import iconDelete from '../../images/delete.svg';
import iconUpdate from '../../images/update.svg';
import iconCancel from '../../images/cancel.svg';

const baseUrl = 'https://us-central1-labenu-apis.cloudfunctions.net/generic/planner-turing-anna-fernandes'

export const Task = props => {

  const [checked, setChecked] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [editContainer, setEditContainer] = useState(false);
  const [selectValue, setSelectValue] = useState("");
  const [selectHoursValue, setSelectHoursValue] = useState("");

  const onChangeInput = event => {
    setInputValue(event.target.value);
  };

  const onChangeSelect = event => {
    setSelectValue(event.target.value);
  };

  const onChangeSelectHours = event => {
    setSelectHoursValue(event.target.value);
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`${baseUrl}/${taskId}`);
      alert("Tarefa deletada com sucesso!")
    } catch (err) {
     alert("Ops, algo deu errado: " + err)
    }

    props.getTasks();
  };

  const onClickTask = () => {
    setEditContainer(!editContainer)
  }

  const onClickInput = () => {
    setChecked(!checked)
  }

  const editTask = async (taskId) => {
    const body = {
      "text": inputValue,
      "day": `${selectValue}-${selectHoursValue}`
    };

    await axios.put(`${baseUrl}/${taskId}`, body);
    try {
      alert("Tarefa editada com sucesso!")
    } catch (err) {
     alert("Ops, algo deu errado: " + err)
    }
    props.getTasks();
  };
  
  const hours = [];
  for(let i=7; i < 23; i++) {
    hours.push(i)
  }


  return (
    <TaskContainer>
      <TaskCheck isEditing={editContainer}>
        <Checkmark 
          isEditing={editContainer}
          onClick={onClickInput} 
          checked={checked}
          />
        <TaskText
          data-testid={'item-tarefa'}
          onClick={onClickTask}
          checked={checked}
        >
          {props.task.text}
        </TaskText>
      </TaskCheck>

      {editContainer && 
        <TaskEdit>
          <Input
            type="text"
            onChange={onChangeInput}
            value={inputValue}
            placeholder={"Editar tarefa"}
          />
          <Label htmlFor={'editarDia'}>Editar dia da semana</Label>
          <Select onChange={onChangeSelect} value={selectValue} id={'editarDia'}>
            <option value="">Dia</option>
              {props.daysList.map( day => {
              return <option key={day} value={day}>{day}</option>
              })}
          </Select>
          <Label htmlFor={'editarHora'}>Editar horário</Label>
          <Select onChange={onChangeSelectHours} value={selectHoursValue} id={'editarHora'}>
            <option value="">Horário</option>
              {hours.map( hour => {
              return <option key={hour} value={hour}>{hour}</option>
              })}
          </Select>
            <IconBtn data-testid="atualizarBtn" onClick={() => editTask(props.task.id)}><Icon src={iconUpdate} alt="Ícone de atualizar"/></IconBtn>
            <IconBtn onClick={onClickTask}><Icon src={iconCancel} alt="Ícone de cancelar" /></IconBtn>
        </TaskEdit>
      }

      <DeleteBtn isEditing={editContainer}><IconBtn data-testid="deleteBtn" onClick={() => deleteTask(props.task.id)}><Icon src={iconDelete} alt="Ícone de deletar" /></IconBtn></DeleteBtn>
    </TaskContainer>
  );
};