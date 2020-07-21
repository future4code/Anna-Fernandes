import React, { useState } from 'react';
import axios from 'axios';

import { GlobalStyle } from './global';
import { Header, HeaderLogo, Screen, AppContainer, PageBtn,ResetBtn } from './styles';

import Profiles from './components/Profiles/Profiles';
import Matches from './components/Matches/Matches';
import UserProfile from './components/UserProfile/UserProfile';
import Home from './components/Home/Home';

import logoAstromatch from './images/astromatch.svg';
import matchesIcon from './images/matches.svg';
import profilesIcon from './images/find_love.svg';
import userIcon from './images/user.svg';

const baseUrl = "https://us-central1-missao-newton.cloudfunctions.net/astroMatch"

const axiosConfig = {
    headers: {
        'Content-Type': 'application/json'
    }
};

const path = "anna-fernandes"

function App() {

  const [ currentPage, setCurrentPage ] = useState('Home');

  const [ cleanSwipesAndMatches, setcleanSwipesAndMatches ] = useState(0);

  const changePage = () => {
    switch(currentPage) {
      case 'Profiles':
        setCurrentPage('Matches');
        break;
      default: 
        setCurrentPage('Profiles');
    }
  }

  const goToUserProfile = () => {
    setCurrentPage('User')
  }

  const goHome = () => {
    setCurrentPage('Home')
  }

  const clear = async () => {
      if(window.confirm('Você tem certeza de que deseja limpar seus swipes e matches?')) {
          await axios.put(`${baseUrl}/${path}/clear`, axiosConfig)
          setcleanSwipesAndMatches(cleanSwipesAndMatches + 1);
      }
  }

  const page = () => {
    switch(currentPage) {
    case "Matches":
      return <Matches currentPage={currentPage} updateAfterClear={cleanSwipesAndMatches} />
    case "User":
      return <UserProfile currentPage={currentPage} />
    case "Home":
      return <Home currentPage={currentPage} onClickBtn={changePage} />
    default:
      return <Profiles currentPage={currentPage} updateAfterClear={cleanSwipesAndMatches} />
    }
  }
  
  const iconPage = currentPage === 'Profiles' ? 
  matchesIcon : profilesIcon
  
  return (
    <Screen>
      <AppContainer>
        <GlobalStyle />
        <Header>
          <PageBtn onClick={goToUserProfile}><img src={userIcon} alt="Ícone do botão de mudar a página"/></PageBtn>
          <HeaderLogo src={logoAstromatch} alt="Logo Astromatch" onClick={goHome}/>
          <PageBtn onClick={changePage}><img src={iconPage} alt="Ícone do botão de mudar a página"/></PageBtn>
        </Header>
        {page()}
      </AppContainer>
      <ResetBtn onClick={clear}>Limpar swipes e matches</ResetBtn>
    </Screen>
  );
}

export default App;
