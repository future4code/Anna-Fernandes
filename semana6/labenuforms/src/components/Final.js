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
        <p>Agradecemos a participação na nossa pesquisa.</p>
    </EtapaContainer>
  );
}

export default Etapa1;
