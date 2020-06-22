import React from 'react';
import styled from 'styled-components';

const LabelPergunta = styled.div `
  margin: 16px 0 8px 0;
`

class PerguntaOpcoes extends React.Component {
    render() {
        const selectOptions = this.props.opcoes.map ( (opcao, idx) => {
            return <option value={opcao} key={idx}>{opcao}</option>
            });
            
        return (
          <div>
              <LabelPergunta>{this.props.pergunta}</LabelPergunta>
              <select onChange={this.props.onHandleChange}>
                  {selectOptions}
              </select>
          </div>
        );
    }
}

export default PerguntaOpcoes;
