import React, { useState } from 'react';
import { GlobalStyle } from './global';
import { Screen, AppContainer, PageBtn } from './styles';

import Profiles from './components/Profiles/Profiles';
import Matches from './components/Matches/Matches';
import Reset from './components/Reset/Reset';

import matchesIcon from './images/matches.svg';
import profilesIcon from './images/find_love.svg';

function App() {

  const [ currentPage, setCurrentPage ] = useState('Profiles');

  const changePage = () => {
    switch(currentPage) {
      case 'Matches':
        setCurrentPage('Profiles');
        break;
      default: 
        setCurrentPage('Matches');
    }
  }

  const page = currentPage === 'Profiles' ? 
  <Profiles currentPage={currentPage} /> : <Matches currentPage={currentPage} />

  const iconPage = currentPage === 'Profiles' ? 
  matchesIcon : profilesIcon
  
  return (
    <Screen>
      <AppContainer>
        <GlobalStyle />
        <div>
          <PageBtn onClick={changePage}><img src={iconPage} alt="Ícone do botão de mudar a página"/></PageBtn>
        </div>
        <hr />
        {page}
      </AppContainer>
      <Reset />
    </Screen>
  );
}

export default App;
