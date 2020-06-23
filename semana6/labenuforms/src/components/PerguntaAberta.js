import React from 'react';
import styled from 'styled-components';

const EtapaPergunta = styled.div `
  display: flex;
  flex-direction: column;
  align-items: center;
`

const LabelPergunta = styled.div `
  margin: 16px 0 8px 0;
`

const InputPergunta = styled.input `
  min-width: 320px;
  height: 32px;
  background-color: #fff;
  border-radius: 5px;
  border: none;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
`


class PerguntaAberta extends React.Component {

  render() {
    return (
      <EtapaPergunta>
          <LabelPergunta>{this.props.pergunta}</LabelPergunta>
          <InputPergunta onChange={this.props.onInputChange} name="pergunta" id="pergunta" />
      </EtapaPergunta>
    );
  }
}

export default PerguntaAberta;
