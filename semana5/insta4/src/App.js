import React from 'react';
import './App.css';
import Post from './components/Post/Post';

class App extends React.Component {
  render() {
    return (
      <div className={'app-container'}>
        <Post
          nomeUsuario={'paulinha'}
          fotoUsuario={'https://picsum.photos/50/50'}
          fotoPost={'https://picsum.photos/200/150'}
        />
        <Post
          nomeUsuario={'pedro'}
          fotoUsuario={'https://picsum.photos/id/1062/5092/3395'}
          fotoPost={'https://picsum.photos/id/1001/5616/3744'}
        />
        <Post
          nomeUsuario={'jorge'}
          fotoUsuario={'https://picsum.photos/id/1005/5760/3840'}
          fotoPost={'https://picsum.photos/id/1011/5472/3648.jpg'}
        />
      </div>
    );
  }
}

export default App;
