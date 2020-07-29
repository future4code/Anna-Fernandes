import React, { useState } from "react";
import axios from "axios";
import { TaskText } from "./styles";

const baseUrl = 'https://us-central1-labenu-apis.cloudfunctions.net/generic/planner-turing-anna-fernandes'

export const Task = props => {

  const [inputValue, setInputValue] = useState("");
  const [editContainer, setEditContainer] = useState(false);
  const [selectValue, setSelectValue] = useState("");

  const onChangeInput = event => {
    setInputValue(event.target.value);
  };

  const onChangeSelect = event => {
    setSelectValue(event.target.value);
  };

  const deleteTask = async (taskId) => {
    await axios.delete(`${baseUrl}/${taskId}`);

    props.getTasks();
  };

  const onClickTask = () => {
    setEditContainer(!editContainer)
  }

  const editTask = async (taskId) => {
    const body = {
      "text": inputValue,
      "day": selectValue
    };

    await axios.put(`${baseUrl}/${taskId}`, body);
    try {
      alert("Tarefa editada com sucesso!")
    } catch (err) {
     alert("Ops, algo deu errado: " + err)
    }
    props.getTasks();
  };

  return (
    <div className={"tarefa-container"}>
      <TaskText
        data-testid={'item-tarefa'}
        onClick={onClickTask}
      >
        {props.task.text}
      </TaskText>
      {editContainer && 
        <>
        <input
          type="text"
          onChange={onChangeInput}
          value={inputValue}
          placeholder={"Editar tarefa"}
        />
        <label htmlFor={'editarDia'}>Editar dia da semana</label>
        <select onChange={onChangeSelect} value={selectValue} id={'editarDia'}>
          <option value="">Selecione o dia</option>
          {props.daysList.map( day => {
            return <option key={day} value={day}>{day}</option>
          })}
        </select>

        <button onClick={() => editTask(props.task.id)}>Editar</button>
        </>
      }

      <button onClick={() => deleteTask(props.task.id)}>Apagar</button>
    </div>
  );
};