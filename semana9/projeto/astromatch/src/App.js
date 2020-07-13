import React from 'react';
import { GlobalStyle } from './global';
import { Screen, AppContainer } from './styles';

import Profiles from './components/Profiles/Profiles';
import Matches from './components/Matches/Matches';
import Reset from './components/Reset/Reset';

function App() {
  return (
    <Screen>
      <AppContainer>
        <GlobalStyle />
        <div>
          <button>Mudar Página</button>
        </div>
        <hr />
        <Matches />
        <hr />
        <Profiles />
      </AppContainer>
      <Reset />
    </Screen>
  );
}

export default App;
