import React from 'react';
import GlobalStyle from './styles/global';

import { MainContainer } from './style';
import PlaylistsList from './components/PlaylistList/PlaylistsList';

class App extends React.Component {
  render() {
    return (
      <MainContainer>
        <GlobalStyle />
        <PlaylistsList />
      </MainContainer>
    );
  }
}

export default App;
