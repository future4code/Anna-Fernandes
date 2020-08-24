import React, { useState } from "react";
import axios from "axios";
import { TaskText, TaskEdit, Label, TaskContainer, TaskCheck, Checkmark, IconBtn, Icon, Input, Select, DeleteBtn } from "./styles";
import useForm from '../../hooks/useForm';
import { daysList, hours } from '../variables';

import iconDelete from '../../images/delete.svg';
import iconUpdateViolet from '../../images/update.svg';
import iconUpdateBlue from '../../images/update-blue.svg';
import iconUpdateDark from '../../images/update-dark.svg';
import iconCancel from '../../images/cancel.svg';

const baseUrl = 'https://us-central1-labenu-apis.cloudfunctions.net/generic/planner-turing-anna-fernandes'

export const Task = props => {

  const [checked, setChecked] = useState(false);
  const [editContainer, setEditContainer] = useState(false);
  
  const { form, onChange, resetForm } = useForm({
    text: "", 
    day: "", 
    hour: ""
  });

  const handleInputChange = event => {
    const { name, value } = event.target;
    onChange(name, value)
  }

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

  const editTask = async(e) => {
    e.preventDefault();
    const taskId = e.target.id;
    const body = {
      "text": form.text,
      "day": `${form.day}-${form.hour}`
    };

    await axios.put(`${baseUrl}/${taskId}`, body);
    try {
      alert("Tarefa editada com sucesso!")
    } catch (err) {
     alert("Ops, algo deu errado: " + err)
    }
    props.getTasks();
  };

  const iconUpdate = () => {
    switch(props.color) {
    case "blue" :
      return iconUpdateBlue
      break;
    case "dark":
      return iconUpdateDark
      break;
    default:
      return iconUpdateViolet;
  }} 

  return (
    <TaskContainer>
      <TaskCheck isEditing={editContainer} data-testid='taskcheck'>
        <Checkmark 
          isEditing={editContainer}
          onClick={onClickInput} 
          checked={checked}
          data-testid='checkmark'
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
        <TaskEdit onSubmit={editTask} id={props.task.id}>
          <Input
            required
            type="text"
            name="text"
            onChange={handleInputChange}
            value={form.text}
            placeholder={"Editar tarefa"}
          />
          <Label htmlFor={'editarDia'}>Editar dia da semana</Label>
          <Select
            required
            name="day"
            onChange={handleInputChange}
            value={form.day} 
            id={'editarDia'}
          >
            <option value="">Dia</option>
              {props.daysList.map( day => {
              return <option key={day} value={day}>{day}</option>
              })}
          </Select>
          <Label htmlFor={'editarHora'}>Editar horário</Label>
          <Select
            required
            name="hour"
            onChange={handleInputChange} 
            value={form.hour} 
            id={'editarHora'}
          >
            <option value="">Horário</option>
              {hours.map( hour => {
              return <option key={hour} value={hour}>{hour}</option>
              })}
          </Select>
            <IconBtn data-testid="atualizarBtn" type="submit"><Icon src={iconUpdate()} alt="Ícone de atualizar"/></IconBtn>
            <IconBtn onClick={onClickTask}><Icon src={iconCancel} alt="Ícone de cancelar" /></IconBtn>
        </TaskEdit>
      }

      <DeleteBtn isEditing={editContainer}><IconBtn data-testid="deleteBtn" onClick={() => deleteTask(props.task.id)}><Icon src={iconDelete} alt="Ícone de deletar" /></IconBtn></DeleteBtn>
    </TaskContainer>
  );
};