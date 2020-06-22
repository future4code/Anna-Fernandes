import React from 'react';
import styled from 'styled-components';

const EtapaContainer = styled.div `
  display: flex;
  flex-direction: column;
  align-items: center;
`
const LabelPergunta = styled.div `
  margin: 16px 0 8px 0;
`


function Etapa1() {
  return (
    <EtapaContainer>
          <LabelPergunta>1. Qual é O seu curso?</LabelPergunta>
          <input name="pergunta1" id="pergunta1" />
          <LabelPergunta>2. Qual é a unidade de ensino?</LabelPergunta>
          <input name="pergunta2" id="pergunta2" />
    </EtapaContainer>
  );
}

export default Etapa1;
