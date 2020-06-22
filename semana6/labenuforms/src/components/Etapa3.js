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
      <LabelPergunta>1. Por que você não terminou um curso de graduação?</LabelPergunta>
      <input name="pergunta1" id="pergunta1" />
      <LabelPergunta>2. Você fez curso complementar?</LabelPergunta>
      <select name="pergunta2" id="pergunta2">
        <option value="curso-tecnico">Curso técnico</option>
        <option value="curso-ingles">Curso de inglês</option>
        <option value="nenhum">Não fiz curso complementar</option>
      </select>
    </EtapaContainer>
  );
}

export default Etapa1;
