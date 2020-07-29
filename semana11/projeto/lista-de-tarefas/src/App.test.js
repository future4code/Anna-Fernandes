import React from "react";
import { render, fireEvent, wait, findAllByText, getByLabelText } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"
import App from "./App";
import axios from "axios";

axios.get = jest.fn().mockResolvedValue({
  data: []
});

axios.post = jest.fn().mockResolvedValue();

axios.put = jest.fn().mockResolvedValue();

axios.delete = jest.fn().mockResolvedValue();

describe('Lista de tarefas', () => {
  test('Testa renderização inicial', async () => { 
    axios.get = jest.fn().mockResolvedValue({
      data: [{
        id: '1',
        text: 'tarefa teste 1',
        day: 'Segunda'
      }]
    });
    const {getByPlaceholderText, getByText, findByText} = render(<App/>)
    
    const input = getByPlaceholderText(/Nova Tarefa/i)
    expect(input).toBeInTheDocument()

    const select = getByText(/Selecione o dia/i)
    expect(select).toBeInTheDocument()
    
    const addButton = getByText(/adicionar/i)
    expect(addButton).toBeInTheDocument()
    
    expect(axios.get).toHaveBeenCalledWith('https://us-central1-labenu-apis.cloudfunctions.net/generic/planner-turing-anna-fernandes')
    expect(axios.get).toHaveBeenCalled()

    const task = await findByText(/tarefa teste 1/i)
    expect(task).toBeInTheDocument()
  });

  test('Testa criação de tarefas com sucesso', async () => {
    axios.post = jest.fn().mockResolvedValue()
    axios.get = jest.fn().mockResolvedValue({
      data: []
    })

    const {
      getByPlaceholderText,
      getByLabelText,
      getByText
    } = render(<App />)

    const input = getByPlaceholderText('Nova tarefa');

    fireEvent.change(input, {
      target: {
        value: 'tarefa teste'
      }
    })

    expect(input).toHaveValue('tarefa teste')
  
    const select = getByLabelText(/Dias/i)
  
    fireEvent.change(select, {
      target: {
        value: 'Segunda'
      }
    })
  
    expect(select).toHaveValue('Segunda')

    const addButton = getByText(/Adicionar/)
    fireEvent.click(addButton)

    expect(axios.post).toHaveBeenCalledWith('https://us-central1-labenu-apis.cloudfunctions.net/generic/planner-turing-anna-fernandes', {
      text: 'tarefa teste',
      day: 'Segunda'
    })

    await wait(() => expect(axios.get).toHaveBeenCalledTimes(2));
    await wait(() => expect(input).toHaveValue(''));
  });
});

describe('Testa edição de uma tarefa', () => {
  test('Quando clicar na tarefa, aparecem os elementos de edição', async () => {
    axios.get = jest.fn().mockResolvedValue({
      data: [{
        id: '1',
        text: 'tarefa teste para editar',
        day: 'Segunda'
      }]
    })

    axios.put = jest.fn().mockResolvedValue()

    const {getByPlaceholderText, getByText, findByText, getByLabelText} = render(<App/>)

    const task = await findByText(/tarefa teste para editar/)
    expect(task).toBeInTheDocument()

    fireEvent.click(task)

    const input = getByPlaceholderText('Editar tarefa');

    fireEvent.change(input, {
      target: {
        value: 'tarefa teste editada'
      }
    })

    expect(input).toHaveValue('tarefa teste editada');
  
    const select = getByLabelText(/editar dia/i)
  
    fireEvent.change(select, {
      target: {
        value: 'Terça'
      }
    })
  
    expect(select).toHaveValue('Terça')

    const editButton = getByText('Editar')
    fireEvent.click(editButton)

    expect(axios.put).toHaveBeenCalledWith('https://us-central1-labenu-apis.cloudfunctions.net/generic/planner-turing-anna-fernandes/1', {
      text: "tarefa teste editada",
      day: "Terça"
    })

    await wait(() => {
      expect(axios.get).toHaveBeenCalledTimes(2)
    })
  });
});

describe('Apagar um tarefa', () => {
  test('Quando adiciona tarefa, aparece botão apagar e o botão apaga o tarefa', async () => {
    axios.get = jest.fn().mockResolvedValue({
      data: [{
        id: '1',
        text: 'tarefa teste para deletar',
        day: 'Segunda'
      }]
    })

    axios.delete = jest.fn().mockResolvedValue()
    
    const {findByText} = render(<App/>)
    
    const deleteButton = await findByText('Apagar')
    
    fireEvent.click(deleteButton)
    
    expect(axios.delete).toHaveBeenCalledWith('https://us-central1-labenu-apis.cloudfunctions.net/generic/planner-turing-anna-fernandes/1')

    await wait(() => {
      expect(axios.get).toHaveBeenCalledTimes(2)
    })
  });
});

describe('A quantidade de tarefas deve ser mostrada, caso pelo menos uma tarefa exista', () => {
  test("A quantidade de tarefas deve ser mostrada no formato 'Quantidade de tarefas: 1'", async () => {
    axios.get = jest.fn().mockResolvedValue({
      data: [{
        id: '1',
        text: 'tarefa teste',
        day: 'Segunda'
      }]
    })

    axios.delete = jest.fn().mockResolvedValue()
    
    const { findByText } = render(<App/>)

    const quantity = await findByText('Quantidade de tarefas: 1')

    expect(quantity).toBeInTheDocument()
  });
  test("Não deve haver a indicação de quantidade de tarefas caso não haja tarefas", () => {
    const {queryByText} = render(<App/>)

    const quantity = queryByText('Quantidade de tarefas: 1')

    expect(quantity).not.toBeInTheDocument()
  });
});

describe('Se um usuário tenta criar um tarefa com o texto vazio, uma mensagem deve aparecer na tela ', () => {
  test("Aparece a mensagem na tela e o tarefa não é criado", () => {
    
    const {getByPlaceholderText, getByText} = render(<App/>)

    const input = getByPlaceholderText('Nova tarefa')

    fireEvent.change(input, {
      target: {
        value: ''
      }
    })
    
    const addButton = getByText('Adicionar')

    fireEvent.click(addButton)

    expect(getByText('O texto não pode estar em branco.')).toBeInTheDocument()
  });
});