import React from "react";
import { render, fireEvent, wait, act } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"
import App from "./App";
import axios from "axios";
import userEvent from "@testing-library/user-event";

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
        day: 'Segunda-7'
      }]
    });
    const {getByPlaceholderText, getByText, findByText} = render(<App/>)
    
    const input = getByPlaceholderText(/Nova Tarefa/i)
    expect(input).toBeInTheDocument()

    const select = getByText(/Selecione o dia/i)
    expect(select).toBeInTheDocument()

    const selectHour = await findByText(/Selecione o horário/i)
    expect(selectHour).toBeInTheDocument()
    
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
      getByText,
      getByTestId
    } = render(<App />)

    const input = getByPlaceholderText('Nova tarefa');

    await userEvent.type(input, 'tarefa teste')
    expect(input).toHaveValue('tarefa teste')
    
    const select = getByTestId(/days/i)
    userEvent.selectOptions(select, 'Segunda')
    expect(select).toHaveValue('Segunda')
    
    
    const selectHour = getByTestId(/hours/i)
    userEvent.selectOptions(selectHour, '7')
    expect(selectHour).toHaveValue('7')

    const addButton = getByText(/Adicionar/)
    fireEvent.click(addButton)

    await wait(
      expect(axios.post).toHaveBeenCalledWith('https://us-central1-labenu-apis.cloudfunctions.net/generic/planner-turing-anna-fernandes', {
        text: 'tarefa teste',
        day: 'Segunda-7'
      })
    );

    await wait(() => expect(axios.get).toHaveBeenCalledTimes(2));
    await wait(() => expect(input).toHaveValue(''));
  });
});

describe('Testa edição de uma tarefa', () => {
  test('Quando clicar na tarefa, aparecem os elementos de edição o trecho é editado', async () => {
    axios.get = jest.fn().mockResolvedValue({
      data: [{
        id: '1',
        text: 'tarefa teste para editar',
        day: 'Segunda-7'
      }]
    })

    axios.put = jest.fn().mockResolvedValue()

    const {getByPlaceholderText, findByTestId, getByText, getByLabelText} = render(<App/>)
    
    await wait(() => {
      const task = getByText('tarefa teste para editar')
      expect(task).toBeInTheDocument()
  
      fireEvent.click(task)
    });

    window.alert = jest.fn();
    
    const input = getByPlaceholderText('Editar tarefa');
    expect(input).toBeInTheDocument()

    await userEvent.type(input, 'tarefa teste editada')
    expect(input).toHaveValue('tarefa teste editada');
  
    const select = getByLabelText(/editar dia/i);
    expect(select).toBeInTheDocument()
    
    userEvent.selectOptions(select, 'Terça')
  
    expect(select).toHaveValue('Terça')
  
    const selectHour = getByLabelText(/editar horário/i);
    expect(selectHour).toBeInTheDocument()
    
    userEvent.selectOptions(selectHour, '7')
  
    expect(selectHour).toHaveValue('7')

    const editButton = await findByTestId('atualizarBtn')
    userEvent.click(editButton)

    expect(axios.put).toHaveBeenCalledWith('https://us-central1-labenu-apis.cloudfunctions.net/generic/planner-turing-anna-fernandes/1', {
      text: "tarefa teste editada",
      day: "Terça-7"
    })

    await wait(() => {
      expect(axios.get).toHaveBeenCalledTimes(2)
    })
  });
});

describe('Apagar um tarefa', () => {
  test('Quando adiciona tarefa, aparece botão apagar e o botão apaga o tarefa', async () => {
    axios.get = jest.fn().mockResolvedValueOnce({
      data: [{
        id: '1',
        text: 'tarefa teste para deletar',
        day: 'Segunda-7'
      }]
    })

    axios.delete = jest.fn().mockResolvedValue()
    
    window.alert = jest.fn();

    const {findByTestId, queryByText} = render(<App/>)
    
    const deleteButton = await findByTestId('deleteBtn')
    userEvent.click(deleteButton)
    
    axios.get = jest.fn().mockResolvedValueOnce({
      data: []
    })
    
    await wait(() => {
      expect(axios.delete).toHaveBeenCalledWith('https://us-central1-labenu-apis.cloudfunctions.net/generic/planner-turing-anna-fernandes/1')
    });
    
    await wait(() => {
      expect(axios.get).toHaveBeenCalled()
    })
    
    await wait(() => {
      expect(queryByText('tarefa teste para deletar')).toBeNull()
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

    const quantity = await findByText('Total de tarefas na semana: 1')

    expect(quantity).toBeInTheDocument()
  });

  test("Não deve haver a indicação de quantidade de tarefas caso não haja tarefas", () => {
    
    const {queryByText} = render(<App/>)
    
    const quantity = queryByText('Total de tarefas na semana: 1')
    expect(quantity).not.toBeInTheDocument()

  });
});

describe('Se um usuário tenta criar um tarefa com o texto vazio, uma mensagem deve aparecer na tela ', () => {
  test("Aparece a mensagem na tela e o tarefa não é criada", () => {

    const {getByPlaceholderText, getByText} = render(<App/>)
    
    const input = getByPlaceholderText('Nova tarefa')
    userEvent.type(input, '')
    
    const addButton = getByText('Adicionar')
    userEvent.click(addButton)

    expect(getByText('O texto não pode estar em branco.')).toBeInTheDocument()
  });
});

describe('Teste das definições de estilo', () => {
  test('Quando o checkbox da tarefa não é marcado, ele aparece em branco', async() => {
    axios.get = jest.fn().mockResolvedValue({
      data: [{
        id: '1',
        text: 'tarefa teste',
        day: 'Segunda-7'
      }]
    })

    const {getByTestId, findByText} = render(<App/>)
   
    const text = await findByText('tarefa teste');
    expect(text).toBeInTheDocument();

    const checkmark = getByTestId('checkmark');
    
    const taskcheck = getByTestId('taskcheck');
    
    await wait(() => {
      expect(checkmark).toHaveStyle(`
        backgroundColor: '#ffffff'
      `)

      expect(taskcheck).toHaveStyle(`
        display: inline
      `)
    })
  });
  test('Quando o checkbox da tarefa é marcado, aparece o check e o texto da tarefa aparece riscado', async() => {
    axios.get = jest.fn().mockResolvedValue({
      data: [{
        id: '1',
        text: 'tarefa teste',
        day: 'Segunda-7'
      }]
    })

    const {getByTestId, findByText} = render(<App/>)
   
      const text = await findByText('tarefa teste');
      
      const checkmark = getByTestId('checkmark');
      userEvent.click(checkmark)
      
      const taskcheck = getByTestId('taskcheck');

      await wait(() => {
        expect(taskcheck).toHaveStyle(`
          display: inline
        `)
  
        expect(text).toHaveStyle(`
          text-decoration: line-through
        `)
      })
  });

  test('Quando o usuário mudar a cor azul do tema, todos os background-color e color que não são neutros mudam', () => {

    const {getByTestId, getByAltText, getByText} = render(<App/>)
    const arrow = getByAltText('Ícone de seta para abrir cores');;
    expect(arrow).toBeInTheDocument();
    userEvent.click(arrow)
    
    const blueBox = getByTestId('blue');
    expect(blueBox).toBeInTheDocument();
    userEvent.click(blueBox)
    
    const header = getByTestId('header');
    expect(header).toHaveStyle(`
      backgroundColor: '#4FC0ED'
    `)
    
    const addButton = getByText('Adicionar');
    expect(addButton).toHaveStyle(`
      backgroundColor: '#4FC0ED'
    `)
  });

  test('Quando o usuário mudar a cor dark do tema, todos os background-color e color que não são neutros mudam', async() => {
    const {getByTestId, getByAltText, getByText} = render(<App/>)

    const arrow = getByAltText('Ícone de seta para abrir cores');
    expect(arrow).toBeInTheDocument();
    userEvent.click(arrow)
    
    const darkBox = getByTestId('dark');
    expect(darkBox).toBeInTheDocument();
    userEvent.click(darkBox)
    
    const header = getByTestId('header');
    expect(header).toHaveStyle(`
      backgroundColor: '#4e4e4e'
    `)
    
    const addButton = getByText('Adicionar');
    expect(addButton).toHaveStyle(`
      backgroundColor: '#4e4e4e'
    `)
  });

  test('Quando clica em atualizar um item, o icone de atualizar tem a cor do tema', async() => {
    axios.get = jest.fn().mockResolvedValue({
      data: [{
        id: '1',
        text: 'tarefa teste para editar',
        day: 'Segunda-7'
      }]
    })

    const {findByAltText, getByText, getByAltText, getByTestId} = render(<App/>)
    
    await wait(() => {
      const task = getByText('tarefa teste para editar')
      userEvent.click(task)
    });
    
    const arrow = getByAltText('Ícone de seta para abrir cores');
    expect(arrow).toBeInTheDocument();
    userEvent.click(arrow)
    
    const darkBox = getByTestId('dark');
    expect(darkBox).toBeInTheDocument();
    userEvent.click(darkBox)

    const editButton = await findByAltText('Ícone de atualizar')
    expect(editButton).toHaveAttribute('src', expect.stringContaining('update-dark.svg'))

  })

})