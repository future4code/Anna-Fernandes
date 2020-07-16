import React from 'react';

import { HomeContainer, ImgHome, IntroText, Btn } from './styles';

import logoAstromatch from '../../images/astromatch.svg';

function Home(props) {

    return (
    <HomeContainer>
        <ImgHome src={logoAstromatch} alt="logo Astromatch" />
        <IntroText>Bem-vindo ao app de relacionamento mais garantido do mundo virtual.</IntroText>
           
        <Btn onClick={props.onClickBtn}>Começar</Btn>
    </HomeContainer>
  );
}

export default Home;
