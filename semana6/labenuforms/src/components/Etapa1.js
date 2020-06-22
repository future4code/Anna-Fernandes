import React from 'react';
import styled from 'styled-components';

import PerguntaAberta from './PerguntaAberta';
import PerguntaOpcoes from './PerguntaOpcoes';
import Etapa2 from './Etapa2';
import Etapa3 from './Etapa3';
import Final from './Final';

const EtapaContainer = styled.div `
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Btn = styled.button `
  display: block;
  margin: 24px auto;
`


class Etapa1 extends React.Component {
  
  state = {
    etapa: 1,
    temSuperior: false,
  }
  
  onHandleChange = event => {

    if (event.target.value === "Ensino Superior Incompleto") {
      this.setState({ temSuperior: true })
    } else if (event.target.value === "Ensino Superior Completo") {
      this.setState({ temSuperior: true })
    } else {
      this.setState({ temSuperior: false })
    }
    
  }
  
  render() {

    return (
      <EtapaContainer>
            <h2>Etapa 1 – Dados Gerais</h2>
            <PerguntaAberta pergunta={"1. Qual o seu nome?"} />
            <PerguntaAberta pergunta={"2. Qual é a sua idade?"} />
            <PerguntaAberta pergunta={"3. Qual é o seu email?"} />
            <PerguntaOpcoes
              pergunta={"4. Qual é a sua escolaridade?"} 
              opcoes={[
                "Ensino Médio Incompleto",
                "Ensino Médio Completo",
                "Ensino Superior Incompleto",
                "Ensino Superior Completo",
              ]
              }
            />
      </EtapaContainer>
    );
  }
}

export default Etapa1;
