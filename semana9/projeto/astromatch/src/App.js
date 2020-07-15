import React, { useState } from 'react';
import axios from 'axios';

import { GlobalStyle } from './global';
import { Header, HeaderLogo, Screen, AppContainer, PageBtn,ResetBtn } from './styles';

import Profiles from './components/Profiles/Profiles';
import Matches from './components/Matches/Matches';

import logoAstromatch from './images/astromatch.svg';
import matchesIcon from './images/matches.svg';
import profilesIcon from './images/find_love.svg';

const baseUrl = "https://us-central1-missao-newton.cloudfunctions.net/astroMatch"

const axiosConfig = {
    headers: {
        'Content-Type': 'application/json'
    }
};

const path = "anna-fernandes"

function App() {

  const [ currentPage, setCurrentPage ] = useState('Profiles');

  const [ cleanSwipesAndMatches, setcleanSwipesAndMatches ] = useState(0);

  const changePage = () => {
    switch(currentPage) {
      case 'Matches':
        setCurrentPage('Profiles');
        break;
      default: 
        setCurrentPage('Matches');
    }
  }

  const clear = async () => {
      if(window.confirm('Você tem certeza de que deseja limpar seus matches?')) {
          await axios.put(`${baseUrl}/${path}/clear`, axiosConfig)
          setcleanSwipesAndMatches(cleanSwipesAndMatches + 1);
      }
  }

  const page = currentPage === 'Profiles' ? 
  <Profiles currentPage={currentPage} updateAfterClear={cleanSwipesAndMatches} /> : <Matches currentPage={currentPage} updateAfterClear={cleanSwipesAndMatches} />

  const iconPage = currentPage === 'Profiles' ? 
  matchesIcon : profilesIcon
  
  return (
    <Screen>
      <AppContainer>
        <GlobalStyle />
        <Header>
          <HeaderLogo src={logoAstromatch} alt="Logo Astromatch" />
          <PageBtn onClick={changePage}><img src={iconPage} alt="Ícone do botão de mudar a página"/></PageBtn>
        </Header>
        {page}
      </AppContainer>
      <ResetBtn onClick={clear}>Limpar swipes e matches</ResetBtn>
    </Screen>
  );
}

export default App;
