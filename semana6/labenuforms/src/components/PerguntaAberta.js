import React from 'react';
import styled from 'styled-components';

const LabelPergunta = styled.div `
  margin: 16px 0 8px 0;
`


class PerguntaAberta extends React.Component {
  render() {
    return (
      <div>
          <LabelPergunta>{this.props.pergunta}</LabelPergunta>
          <input name="pergunta" id="pergunta" />
      </div>
    );
  }
}

export default PerguntaAberta;
