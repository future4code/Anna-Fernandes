import React from 'react';
import styled from 'styled-components';
import GlobalStyle from './styles/global';

import CreatePlaylist from './components/CreatePlaylist/CreatePlaylist';
import PlaylistsList from './components/PlaylistList/PlaylistsList';

const MainContainer = styled.div `
  width: 100%;
  height: 100vh;
`

// usuário visualiza conteúdo da playlist
// usuário adiciona músicas à playlist (nome, artista, link)
// usuário ouve músicas da playlist

class App extends React.Component {
  render() {
    return (
      <MainContainer>
        <GlobalStyle />
        <CreatePlaylist />
        <PlaylistsList />
      </MainContainer>
    );
  }
}

export default App;
