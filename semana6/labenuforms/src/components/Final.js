import React from 'react';
import styled from 'styled-components';

const EtapaContainer = styled.div `
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Medium =  styled.p `
    text-align: center;
    font-size: 20px;
    color: #163840;
`

function Etapa1() {
  return (
    <EtapaContainer>
        <Medium>Agradecemos a participação na nossa pesquisa.</Medium>
    </EtapaContainer>
  );
}

export default Etapa1;
