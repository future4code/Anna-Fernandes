import React from 'react';
import styled from 'styled-components'
import Post from './components/Post/Post';

const AppContainer = styled.div `
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`

const NewPost = styled.div `
  width: 400px;
  margin: 16px 0;
  display:flex;
  align-items: flex-start;
  flex-direction: column;
`

const NewPostInput = styled.input `
  width: 100%;
  margin: 4px 0;
  padding: 4px;
  border: none;
  border-radius: 5px;
  box-shadow: 0px 0px 2px rgba(50, 50, 50, 0.5);
`

const NewPostBtn = styled.button `
  margin: 8px 0;
  padding: 8px;
  width: 80px;
  border: none;
  border-radius: 5px;
  background-color: #60AEEF;
  color: #fff;
  font-weight: 700;
  cursor: pointer;
  
  &:hover {
    opacity: 0.75;
  }
`


class App extends React.Component {
  state = {
    posts: [
     {
       nomeUsuario: 'paulinha',
       fotoUsuario: 'https://picsum.photos/50/50',
       fotoPost: 'https://picsum.photos/200/150'
     },
     {
       nomeUsuario: 'pedro',
       fotoUsuario: 'https://picsum.photos/id/1062/5092/3395',
       fotoPost: 'https://picsum.photos/id/1001/5616/3744'
     },
     {
       nomeUsuario: 'jorge',
       fotoUsuario: 'https://picsum.photos/id/1005/5760/3840',
       fotoPost: 'https://picsum.photos/id/1011/5472/3648.jpg'
     },

    ],
    valorInputNomeUsuario: "",
    valorInputFotoUsuario: "",
    valorInputFotoPost: ""
  };

  onClickPostarFoto = () => {
    const novoPost = {
      nomeUsuario: this.state.valorInputNomeUsuario,
      fotoUsuario: this.state.valorInputFotoUsuario,
      fotoPost: this.state.valorInputFotoPost
    };

    const postsAtualizados = [...this.state.posts, novoPost];

    this.setState({ posts: postsAtualizados, nome:"", email:"", telefone:""})

  }

  onChangeNomeUsuario = event => {
    this.setState({ valorInputNomeUsuario: event.target.value });
  }

  onChangeFotoUsuario = event => {
    this.setState({ valorInputFotoUsuario: event.target.value });
  }

  onChangeFotoPost = event => {
    this.setState({ valorInputFotoPost: event.target.value });
  }

  render() {
    const listaDePosts = this.state.posts.map( post => {
      return (
        <Post key={post.fotoPost} nomeUsuario={post.nomeUsuario} fotoUsuario={post.fotoUsuario} fotoPost={post.fotoPost} />
      )
    })
    return (
      <AppContainer>
        <NewPost>
          <NewPostInput name="" value={this.state.valorInputNomeUsuario} placeholder="Nome do usuário" onChange={this.onChangeNomeUsuario}></NewPostInput>
          <NewPostInput name="" value={this.state.valorInputFotoUsuario} placeholder="Link da foto do usuário" onChange={this.onChangeFotoUsuario}></NewPostInput>
          <NewPostInput name="" value={this.state.valorInputFotoPost} placeholder="Link da foto publicada" onChange={this.onChangeFotoPost}></NewPostInput>
          <NewPostBtn onClick={this.onClickPostarFoto}>Postar</NewPostBtn>
        </NewPost>
        <div className={'posts'}>
          {listaDePosts}
        </div>
      </AppContainer>
    );
  }
}

export default App;
