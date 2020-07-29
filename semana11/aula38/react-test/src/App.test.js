import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"
import App from "./App";

const addPost = () => {
  
  const utils = render(<App/>)

  const input = utils.getByPlaceholderText('Novo post')

  fireEvent.change(input, {
    target: {
      value: 'post teste'
    }
  })
  
  const addButton = utils.getByText('Adicionar')

  fireEvent.click(addButton)

  const post = utils.getAllByTestId('item-post')

  return utils
}

describe("Renderização inicial", () => {
  test("Input existe na tela", () => {
    const {getByPlaceholderText} = render(<App/>)
    const input = getByPlaceholderText('Novo post')

    expect(input).toBeInTheDocument()
  });

  test("Botão existe na tela", () => {
    const {getByText} = render(<App/>)
    const addButton = getByText('Adicionar')

    expect(addButton).toBeInTheDocument()
  });
});

describe("Ao adicionar novo post", () => {
  test("Quando o usuário digita e clica em adicionar, o texto tem que aparecer na tela", () => {
    const {getByPlaceholderText, getByText} = render(<App/>)

    const input = getByPlaceholderText('Novo post')

    fireEvent.change(input, {
      target: {
        value: 'post teste'
      }
    })
    
    const addButton = getByText('Adicionar')

    fireEvent.click(addButton)

    expect(getByText(/post test/)).toBeInTheDocument()
  });
  test("Quando o usuário digitar e clica em adicionar duas tarefas, os dois textos têm que aparecer na tela", () => {
    const { getByPlaceholderText, getByText, getAllByTestId } = render(<App/>)

    const input = getByPlaceholderText('Novo post')
    const addButton = getByText('Adicionar')

    fireEvent.change(input, {
      target: {
        value: 'post teste'
      }
    })
    fireEvent.click(addButton)
    
    fireEvent.change(input, {
      target: {
        value: 'post teste 2'
      }
    })
    fireEvent.click(addButton)


    expect(getByText('post teste')).toBeInTheDocument()
    expect(getByText('post teste 2')).toBeInTheDocument()
    expect(getAllByTestId('item-post')).toHaveLength(2)
  });  
  
  test("Quando o usuário digita e clica em adicionar, o input deve ser limpo", () => {
    const {getByPlaceholderText, getByText} = render(<App/>)

    const input = getByPlaceholderText('Novo post')

    fireEvent.change(input, {
      target: {
        value: 'post teste'
      }
    })
    
    const addButton = getByText('Adicionar')

    fireEvent.click(addButton)

    expect(input).toHaveValue('')
  });
});

describe('Curtir um post', () => {
  test('Quando clicar em curtir, deve trocar o texto do botão para descurtir', () => {
    const {getByTestId} = addPost()

    const likeButton = getByTestId('like-button')

    fireEvent.click(likeButton)

    expect(likeButton).toHaveTextContent('Descurtir')
  });
});

describe('Apagar um post', () => {
  test('Quando adiciona post, aparece botão apagar e o botão apaga o post', () => {
    const {getByText, queryByTestId} = addPost()

    const deleteButton = getByText('Apagar')

    fireEvent.click(deleteButton)

    const post = queryByTestId('item-post')

    expect(post).toEqual(null)
  });
});


describe('Conferir se não há posts e adicionar mensagem', () => {
  test('Quando não há posts, aparece mensagem', () => {
    const {getByText} = render(<App/>)
    const noPostMessage = getByText(/Não há posts/i)

    expect(noPostMessage).toBeInTheDocument()
  });
  test('A mensagem não deve aparecer caso haja posts', () => {
    const {queryByText} = addPost()
    const noPostMessage = queryByText(/Não há posts/i)

    expect(noPostMessage).not.toBeInTheDocument()
  });
});

describe('A quantidade de posts deve ser mostrada, caso pelo menos um post exista', () => {
  test("A quantidade de posts deve ser mostrada no formato 'Quantidade de posts: 1'", () => {
    const {getByText} = addPost()

    const quantity = getByText('Quantidade de posts: 1')

    expect(quantity).toBeInTheDocument()
  });
  test("Não deve haver a indicação de quantidade de posts caso não haja posts", () => {
    const {queryByText} = render(<App/>)

    const quantity = queryByText('Quantidade de posts: 1')

    expect(quantity).not.toBeInTheDocument()
  });
});

describe('Se um usuário tenta criar um post com o texto vazio, uma mensagem deve aparecer na tela ', () => {
  test("Aparece a mensagem na tela e o post não é criado", () => {
    
    const {getByPlaceholderText, getByText} = render(<App/>)

    const input = getByPlaceholderText('Novo post')

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