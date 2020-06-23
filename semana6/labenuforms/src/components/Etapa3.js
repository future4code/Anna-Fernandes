import React from 'react';
import styled from 'styled-components';

import PerguntaAberta from './PerguntaAberta';
import PerguntaOpcoes from './PerguntaOpcoes';

const EtapaContainer = styled.div `
  display: flex;
  flex-direction: column;
  align-items: center;
`

const EtapaTitulo = styled.h2 `
  color: #163840;
`
const Alerta = styled.p `
  background-color: #D94141;
  border-radius: 5px;
  padding: 8px;
  color: #f2f2f2;
`

const Btn = styled.button `
  display: block;
  margin: 24px auto;
  padding: 16px;
  background-color: #163840;
  color: #f2f2f2;
  border: none;
  border-radius: 5px;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
  font-weight: 700;
  text-transform: uppercase;
`
class Etapa1 extends React.Component {

  state = {
    inputMotivo: "",
    preenchidoMotivo: true,
  }

  handleInputValueMotivo = event => {
    this.setState({ inputMotivo: event.target.value })
  }


  onClickChild = event => {
    if (this.state.inputMotivo === "") {
      this.setState({ preenchidoMotivo: false })
    } else {
      this.setState({ preenchidoMotivo: true })
    }

    if ( this.state.inputMotivo !== "" ) {
      this.props.onClickSuperior()
    } else {
      alert("Você deve preencher todas as perguntas antes de prosseguir")
      event.preventDefault();
    }
  }
  
  render() {
    const renderAlertaMotivo = this.state.preenchidoMotivo ? null : <Alerta>Você precisa preencher o motivo</Alerta>
    return (
      <EtapaContainer>
        <EtapaTitulo>Etapa 2 – Educação</EtapaTitulo>
        <PerguntaAberta  onInputChange={this.handleInputValueMotivo} pergunta={"1. Por que você não terminou um curso de graduação?"} />
        <div>{renderAlertaMotivo}</div>
        <PerguntaOpcoes
          pergunta={"2. Você fez curso complementar?"}
          opcoes={[
            "Curso técnico",
            "Curso de inglês",
            "Não fiz curso complementar"
          ]
        }
        />
        <Btn onClick={this.onClickChild}>Próxima etapa</Btn>
      </EtapaContainer>
    );
  }
}

export default Etapa1;
